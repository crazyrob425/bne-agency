/**
 * bne-api-gateway v2 — ES-module Worker.
 *
 * Replaces the v1 pure-proxy (upstream Render service has been suspended
 * since 2026-09-30 over an unpaid balance — it is not coming back).
 *
 * v2 handles these routes IN-WORKER:
 *   GET  /api/health      -> liveness JSON
 *   POST /api/apply       -> BNE application intake: validates the JSON the
 *                            Apply form sends, stores it durably in the
 *                            APPS_KV namespace ("bne-applications"), pushes
 *                            it to Rob's phone via his own ntfy server
 *                            (guardian-todo topic), returns { ok: true }
 *                            only when the durable store succeeded.
 *                            (MailChannels was tried first — its API now
 *                            401s keyless requests, so it is not used.)
 *   POST /api/onboarding  -> multipart intake, same KV + ntfy delivery.
 *   /api/trpc/*           -> tools.* (AI-backed, ported from the
 *                            dead Render server) and drafts.* (KV-backed
 *                            anonymous session drafts) run in-Worker too.
 * Everything else keeps the v1 behaviour: CORS owned here, proxy to the
 * (dead) upstream so untouched routes behave exactly as before.
 */

const SPA_ORIGIN = "https://blacklisted.studio";
const UPSTREAM = "https://bne-agency-api.onrender.com";

/* The Oracle box (guardian-ntfy) runs bne-api behind Caddy at
 * ntfy.blacklisted.studio/bne-api — it owns the account-shaped
 * namespaces (auth, progress, members, adminUsers, adminTools,
 * stripe) backed by a real SQLite DB. The Worker stays the front
 * door: browsers only ever talk to api.blacklisted.studio. */
const BOX_BASE = "https://ntfy.blacklisted.studio/bne-api";
const BOX_NS = new Set(["auth", "progress", "members", "adminUsers", "adminTools", "stripe"]);
const MAX_APPLY_BYTES = 8 * 1024 * 1024;
const MAX_BODY_BYTES = 100 * 1024 * 1024;

/* ES-module format (required for the Workers AI binding). Bindings
 * arrive via env; they are mirrored onto globalThis at request start so
 * the route handlers below can keep the simple global references. */
export default {
  async fetch(req, env, ctx) {
    globalThis.APPS_KV = env.APPS_KV;
    globalThis.NTFY_TOKEN = env.NTFY_TOKEN;
    globalThis.VENICE_API_KEY = env.VENICE_API_KEY;
    globalThis.AI = env.AI;
    return handle(req, ctx);
  },
};

async function handle(req, event) {
  const url = new URL(req.url);

  if (req.method === "OPTIONS") return preflight(req);

  if (url.pathname === "/api/health" && req.method === "GET") {
    return corsJson({ ok: true, service: "bne-api-gateway", version: 2, ts: new Date().toISOString() }, 200);
  }

  if (url.pathname === "/api/apply" && req.method === "POST") {
    return handleApply(req);
  }

  if (url.pathname === "/api/onboarding" && req.method === "POST") {
    return handleOnboarding(req);
  }

  if (url.pathname === "/api/trpc" || url.pathname.startsWith("/api/trpc/")) {
    return handleTrpc(req, url);
  }

  if (url.pathname === "/api/members/upload" || url.pathname.startsWith("/api/members/files/") || url.pathname === "/api/stripe/webhook") {
    return proxyToBox(req, url);
  }

  return proxy(req, url);
}

/* ------------------------------ Apply ------------------------------ */

async function handleApply(req) {
  const declared = Number(req.headers.get("content-length") || 0);
  if (declared > MAX_APPLY_BYTES) return corsJson({ ok: false, error: "Submission too large" }, 413);

  let data;
  try {
    data = await req.json();
  } catch {
    return corsJson({ ok: false, error: "Invalid JSON body" }, 400);
  }

  const required = ["firstName", "email", "phoneLocal", "contactPreference", "socialPlatform", "socialHandle", "hours", "goal", "experience"];
  const missing = required.filter((k) => !String(data[k] ?? "").trim());
  if (data.ageConfirm !== true) missing.push("ageConfirm");
  if (missing.length) {
    return corsJson({ ok: false, error: "Missing required fields", missing }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) {
    return corsJson({ ok: false, error: "Invalid email address" }, 400);
  }

  const phone = `${data.phoneCountryCode || "+1"} ${data.phoneLocal}`;
  const lines = [
    "NEW BNE APPLICATION — blacklisted.studio/apply",
    "",
    `Name:              ${data.firstName}`,
    `Email:             ${data.email}`,
    `Phone:             ${phone}`,
    `Contact via:       ${data.contactPreference}`,
    `Social platform:   ${data.socialPlatform}`,
    `Social handle:     ${data.socialHandle}`,
    `Hours/week:        ${data.hours}`,
    `Goal:              ${data.goal}`,
    `Experience:        ${data.experience}`,
    `Age 18+ confirmed: ${data.ageConfirm === true ? "yes" : "no"}`,
    `Marketing consent: ${data.marketingConsent === true ? "yes" : "no"}`,
    `Submitted:         ${new Date().toISOString()}`,
  ];

  let photoNote = "none";
  let photoData = null;
  if (data.photo && data.photo.dataBase64) {
    const approxBytes = Math.floor((data.photo.dataBase64.length * 3) / 4);
    if (approxBytes <= 3_500_000) {
      photoData = { name: data.photo.name || "applicant-photo", type: data.photo.type || "application/octet-stream", dataBase64: data.photo.dataBase64 };
      photoNote = `stored in KV (${data.photo.name || "file"}, ${Math.round(approxBytes / 1024)} KB)`;
    } else {
      photoNote = "applicant uploaded one but it exceeded the 3.5MB store cap — ask them to resend it";
    }
  }
  lines.push(`Photo:             ${photoNote}`);

  const record = { kind: "application", receivedAt: new Date().toISOString(), fields: data, photo: photoData, text: lines.join("\n") };
  const key = `apply:${record.receivedAt}:${String(data.email).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  try {
    await APPS_KV.put(key, JSON.stringify(record));
  } catch (err) {
    return corsJson({ ok: false, error: "Storage failed — application was NOT received. Please try again.", detail: String(err).slice(0, 200) }, 502);
  }

  const ntfyOk = await ntfyPush(`New BNE application — ${data.firstName}`, lines.join("\n"));
  return corsJson({ ok: true, received: true, stored: true, notified: ntfyOk }, 200);
}

/* ---------------------------- Onboarding ---------------------------- */

async function handleOnboarding(req) {
  let form;
  try {
    form = await req.formData();
  } catch {
    return corsJson({ ok: false, error: "Expected multipart form data" }, 400);
  }

  const lines = ["NEW BNE ONBOARDING SUBMISSION — blacklisted.studio/onboarding", ""];
  const fields = {};
  for (const [key, value] of form.entries()) {
    if (value && typeof value === "object" && "name" in value) {
      lines.push(`${key}: [file received: ${value.name}, ${Math.round(value.size / 1024)} KB — contents not stored in v2, request from applicant if needed]`);
      fields[key] = { file: value.name, size: value.size, type: value.type };
    } else {
      lines.push(`${key}: ${value}`);
      fields[key] = value;
    }
  }
  lines.push("", `Submitted: ${new Date().toISOString()}`);

  const record = { kind: "onboarding", receivedAt: new Date().toISOString(), fields, text: lines.join("\n") };
  const key = `onboard:${record.receivedAt}`;
  try {
    await APPS_KV.put(key, JSON.stringify(record));
  } catch (err) {
    return corsJson({ ok: false, error: "Storage failed", detail: String(err).slice(0, 200) }, 502);
  }
  const ntfyOk = await ntfyPush("New BNE onboarding submission", lines.join("\n"));
  return corsJson({ ok: true, received: true, stored: true, notified: ntfyOk }, 200);
}

/* ------------------------------ ntfy ------------------------------ */
/* NTFY_TOKEN arrives as a secret_text binding (a global in service-worker
 * format). It is the guardian-svc token, fenced to guardian-* topics, so
 * intake publishes to guardian-todo — the topic Rob already receives. */

async function ntfyPush(title, body) {
  try {
    const r = await fetch("https://ntfy.blacklisted.studio/guardian-todo", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NTFY_TOKEN}`,
        Title: title.replace(/[^\x20-\x7E]/g, ""),
        Tags: "clipboard",
        Priority: "high",
      },
      body,
    });
    return r.ok;
  } catch {
    return false;
  }
}


/* ------------------------------ tRPC ------------------------------ */
/* Minimal tRPC v11 + superjson wire implementation for the procedures
 * that never needed the dead database backend:
 *   tools.*   — prompt builders over the Pollinations text API
 *               (ported verbatim from server/toolsRouter.ts)
 *   drafts.*  — anonymous session drafts in KV
 *               (same shapes as server/draftsRouter.ts)
 * Anything else returns a proper tRPC NOT_FOUND error instead of the
 * dead upstream's 503 HTML page. */

const TRPC_ERR = {
  INTERNAL_SERVER_ERROR: { code: -32603, httpStatus: 500 },
  NOT_FOUND: { code: -32004, httpStatus: 404 },
  UNAUTHORIZED: { code: -32001, httpStatus: 401 },
  BAD_REQUEST: { code: -32600, httpStatus: 400 },
};

async function proxyToBox(req, url) {
  const target = BOX_BASE + url.pathname + url.search;
  const headers = new Headers(req.headers);
  headers.delete("host");
  const init = { method: req.method, headers, redirect: "manual" };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = await req.arrayBuffer();
  }
  let resp;
  try {
    resp = await fetch(target, init);
  } catch (e) {
    return corsJson({ error: "Account service unavailable" }, 502);
  }
  const h = new Headers();
  const ct = resp.headers.get("content-type");
  if (ct) h.set("content-type", ct);
  const cd = resp.headers.get("content-disposition");
  if (cd) h.set("content-disposition", cd);
  const cl = resp.headers.get("content-length");
  if (cl) h.set("content-length", cl);
  if (typeof resp.headers.getSetCookie === "function") {
    for (const sc of resp.headers.getSetCookie()) h.append("set-cookie", sc);
  }
  applyCors(h);
  return new Response(resp.body, { status: resp.status, headers: h });
}

async function handleTrpc(req, url) {
  const pathPart = decodeURIComponent(url.pathname.replace(/^\/api\/trpc\/?/, ""));
  const paths = pathPart ? pathPart.split(",") : [];
  const isBatch = url.searchParams.get("batch") === "1";

  let rawInputs = {};
  try {
    if (req.method === "POST") {
      rawInputs = await req.json();
    } else {
      rawInputs = JSON.parse(url.searchParams.get("input") || "{}");
    }
  } catch {
    rawInputs = {};
  }
  const unwrap = (v) => (v && typeof v === "object" && "json" in v ? v.json : v ?? undefined);
  const inputs = {};
  if (isBatch) {
    for (const [k, v] of Object.entries(rawInputs || {})) inputs[k] = unwrap(v);
  } else {
    inputs["0"] = unwrap(rawInputs);
  }

  const errEntry = (err, path) => {
    const kind = err && err.trpcKind ? err.trpcKind : "INTERNAL_SERVER_ERROR";
    const meta = TRPC_ERR[kind] || TRPC_ERR.INTERNAL_SERVER_ERROR;
    return {
      error: {
        json: {
          message: err && err.message ? String(err.message) : "Unknown error",
          code: meta.code,
          data: { code: kind, httpStatus: meta.httpStatus, path },
        },
      },
    };
  };

  const results = new Array(paths.length).fill(null);
  const boxIdx = [];
  const localIdx = [];
  paths.forEach((p, i) => {
    (BOX_NS.has(String(p).split(".")[0]) ? boxIdx : localIdx).push(i);
  });
  let extraSetCookies = [];

  if (boxIdx.length) {
    const subPaths = boxIdx.map((i) => paths[i]);
    const subInputs = {};
    boxIdx.forEach((origIdx, j) => {
      subInputs[String(j)] = { json: inputs[String(origIdx)] === undefined ? null : inputs[String(origIdx)] };
    });
    const headers = { "Content-Type": "application/json" };
    const cookie = req.headers.get("cookie");
    if (cookie) {
      headers["Cookie"] = cookie;
      headers["x-bne-cookie"] = cookie;
    }
    try {
      const resp = await fetch(BOX_BASE + "/api/trpc/" + subPaths.join(",") + "?batch=1", {
        method: "POST",
        headers,
        body: JSON.stringify(subInputs),
      });
      const arr = await resp.json();
      boxIdx.forEach((origIdx, j) => { results[origIdx] = arr[j]; });
      if (typeof resp.headers.getSetCookie === "function") {
        extraSetCookies = resp.headers.getSetCookie();
      }
      const xsc = resp.headers.get("x-bne-set-cookie");
      if (xsc) {
        try { extraSetCookies = JSON.parse(xsc); } catch { /* keep getSetCookie result */ }
      }
    } catch (e) {
      for (const origIdx of boxIdx) {
        const err = new Error("Account service unavailable");
        err.trpcKind = "INTERNAL_SERVER_ERROR";
        results[origIdx] = errEntry(err, paths[origIdx]);
      }
    }
  }

  for (const i of localIdx) {
    const path = paths[i];
    try {
      const out = await runProcedure(path, inputs[String(i)]);
      results[i] = { result: { data: { json: out === undefined ? null : out } } };
    } catch (err) {
      results[i] = errEntry(err, path);
    }
  }

  const payload = isBatch ? results : results[0] || { result: { data: { json: null } } };
  const h = new Headers({ "Content-Type": "application/json" });
  applyCors(h);
  for (const sc of extraSetCookies) h.append("set-cookie", sc);
  return new Response(JSON.stringify(payload), { status: 200, headers: h });
}

function trpcError(kind, message) {
  const e = new Error(message);
  e.trpcKind = kind;
  return e;
}

async function runProcedure(path, input) {
  switch (path) {
    case "tools.generateStrategy": return genStrategy(input || {});
    case "tools.generateClassifiedAd": return genClassifiedAd(input || {});
    case "tools.generateCreatorPushCaption": return genCreatorPushCaption(input || {});
    case "tools.generateFanBotResponse": return genFanBotResponse(input || {});
    case "tools.generatePulseInsights": return genPulseInsights(input || {});
    case "tools.generateSceneStoryboard": return genSceneStoryboard(input || {});
    case "drafts.save": return draftSave(input || {});
    case "drafts.get": return draftGet(input || {});
    case "drafts.abandon": return draftAbandon(input || {});
    case "drafts.list":
      throw trpcError("UNAUTHORIZED", "Login is not yet restored on the new backend.");
    default:
      throw trpcError("NOT_FOUND", `Procedure "${path}" is not available on the new backend yet.`);
  }
}

/* AI provider chain for the tools:
 *   1. Cloudflare Workers AI (AI binding) — in-platform, free daily
 *      allowance, no egress problem. Primary since 2026-11-09.
 *   2. Venice (VENICE_API_KEY secret binding, the account Roxy runs
 *      on) — kept as fallback; its balance ran dry during testing
 *      (HTTP 402) so it cannot be primary.
 *   3. Pollinations — free fallback; it answers HTTP 402 to Cloudflare
 *      Worker egress IPs (anonymous quota), so it only helps if that
 *      policy changes. The original Render server called it directly
 *      because its egress was not quota'd.
 * The prompts themselves are unchanged from the server. */
async function callAI(systemPrompt, userPrompt) {
  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];
  const errors = [];

  if (typeof AI !== "undefined" && AI && typeof AI.run === "function") {
    try {
      const out = await AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
        messages,
        max_tokens: 4000,
        temperature: 0.85,
      });
      const text = out && typeof out.response === "string" ? out.response : "";
      if (!text) throw new Error("workers-ai empty reply");
      return text;
    } catch (err) {
      errors.push(`workers-ai: ${String(err && err.message ? err.message : err)}`);
    }
  }

  if (typeof VENICE_API_KEY === "string" && VENICE_API_KEY) {
    try {
      const r = await fetch("https://api.venice.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${VENICE_API_KEY}`,
        },
        body: JSON.stringify({
          model: "venice-uncensored-1-2",
          messages,
          stream: false,
          max_tokens: 4000,
          temperature: 0.85,
        }),
      });
      if (!r.ok) throw new Error(`venice HTTP ${r.status}`);
      const j = await r.json();
      const text = j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content;
      if (!text) throw new Error("venice empty reply");
      return text;
    } catch (err) {
      errors.push(String(err && err.message ? err.message : err));
    }
  }

  try {
    const r = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, model: "openai" }),
    });
    if (!r.ok) throw new Error(`pollinations HTTP ${r.status}`);
    return await r.text();
  } catch (err) {
    errors.push(String(err && err.message ? err.message : err));
  }

  throw trpcError("INTERNAL_SERVER_ERROR", `Failed to generate content from AI (${errors.join("; ")})`);
}

async function genStrategy(input) {
  const systemPrompt = `You are the BNE Agency Content Strategy Engine, an AI designed to generate highly converting script ideas and content prompts for independent adult creators using advanced behavioral psychology.`;
  const userPrompt = `Generate 3 distinct, high-impact content concepts or scripts tailored for the following options:
Niche: ${input.niche}
Tone: ${input.tone}
Goal: ${input.goal}
Length: ${input.length}

For each concept, provide:
1. Concept Title & Psychological Hook (explaining why it works on the viewer's mind).
2. The exact script, caption, or prompt text matching the requested tone and length.
3. A Call to Action (CTA) optimized for the selected goal.

Format the output clearly using clean markdown.`;
  const content = await callAI(systemPrompt, userPrompt);
  return { content };
}

async function genClassifiedAd(input) {
  const sanitizeForAI = (text) => {
    if (!text) return text;
    const replacements = {
      dick: "service", cock: "service", pussy: "experience", cunt: "experience",
      fuck: "play", fucking: "playing", shit: "stuff", bitch: "girl",
      whore: "provider", slut: "provider", cum: "finish", asshole: "rear",
      sucks: "gives",
    };
    let sanitized = text;
    for (const [badWord, goodWord] of Object.entries(replacements)) {
      sanitized = sanitized.replace(new RegExp(`\\b${badWord}\\b`, "gi"), goodWord);
    }
    return sanitized;
  };

  const systemPrompt = `You are the BNE Agency Classified Ad Generator, an AI designed to generate high-converting, privacy-preserving, and professional classified ad copy for adult entertainers.`;

  const bneLine = `It must read exactly: "Ad professionally managed by BNE Studio at www.blacklisted.studio". Embed this directly into the final paragraph (e.g., blending it seamlessly into the closing statement, contact instructions, or copyright/disclaimer section) so that it is fully integrated into the text and not easily deletable as a standalone line.`;

  const userPrompt = `Generate a high-converting classified ad copy tailored for the platform: ${input.platformTarget}.
Options:
- Preferred Contact Method: ${input.contactMethod} ${input.contactInfo ? `(Contact Info: ${input.contactInfo})` : ""}
- Review Sites/Status: ${input.reviewSites}${input.reviewSiteInfo ? ` (${input.reviewSiteInfo})` : ""}
${input.reviewsList && input.reviewsList.length > 0 ? `- Client Reviews to feature:\n${input.reviewsList.map((r) => `  * "${sanitizeForAI(r.text)}" - ${r.handle} (${r.url})`).join("\n")}` : ""}
- Photos Attached: ${input.photoCount} pics
${input.photoUrls && input.photoUrls.length > 0 ? `- Photo URLs: \n${input.photoUrls.join("\n")}` : ""}

Location & Meeting Details:
- Meeting Type: ${input.meetingType || "Not specified"}
${input.meetingType === "Incall Only" || input.meetingType === "Incall & Outcall" ? `- Incall Location: ${input.incallLocation}` : ""}
${input.meetingType === "Outcall Only" || input.meetingType === "Incall & Outcall" ? `- Outcall Locations: ${input.outcallLocations} ${input.outcallSurrounding ? "(including surrounding areas)" : ""}` : ""}
${input.outcallDeposit ? `- Important: Deposit required for outcalls for all new clients.` : ""}

Here is the raw input from the creator:
- Service Menu & Info: ${sanitizeForAI(input.serviceMenu) || "Standard high-end companionship and entertainment"}
- No-No List/Boundaries: ${sanitizeForAI(input.noNoList) || "No drama, mutual respect expected"}

Generate a professional, high-end, and extremely appealing classified ad text tailored for the ${input.platformTarget} audience. Include:
1. An eye-catching headline.
2. An engaging introduction that seamlessly weaves in the location and meeting details.
3. A clean, structured presentation of the service menu (refined professionally).
4. If reviews are provided, format them beautifully as glowing testimonials to build trust.
5. A polite but firm boundaries/screening section (derived from the No-No list).
6. Clear contact/booking instructions matching the selected contact method and info.
7. If photos are attached via URLs, embed them into the ad copy using the standard markup for ${input.platformTarget} (use HTML for Eros/CityVibe/Others, BBCode for TNABoard/Forums).
${input.includeDisclaimer ? `8. You MUST include this standard legal disclaimer at the bottom of the ad: "Disclaimer: This advertisement is strictly for the compensation of time and companionship spent between two consenting adults. Anything else that may occur is a matter of personal choice between two consenting adults and is not for sale."\n9. AT THE VERY END OF THE AD, you MUST include a one-line advertisement for BNE Studio...` : `8. AT THE VERY END OF THE AD, you MUST include a one-line advertisement for BNE Studio...`}
${bneLine}

Ensure the ad text is completely optimized for ${input.platformTarget}, maintaining a high-end tone. Use clean markdown formatting for the text structure.`;

  const content = await callAI(systemPrompt, userPrompt);
  return { content };
}

async function genCreatorPushCaption(input) {
  const systemPrompt = `You are the BNE CreatorPush AI, an expert social media copywriter specializing in adult content creator marketing. You write high-converting captions that drive engagement, tips, and subscriptions.`;
  const userPrompt = `Generate 3 caption variations for a ${input.contentType} post on ${input.platform}.
Tone: ${input.tone}
Goal: ${input.goal}
Teaser Intensity: ${input.intensity}/10 (1=subtle, 10=explicit)

For each caption, provide:
1. The caption text (optimized for the platform's character limits)
2. Recommended hashtags (3-5 relevant tags)
3. A brief explanation of why this caption works psychologically

Format as clean markdown.`;
  const content = await callAI(systemPrompt, userPrompt);
  return { content };
}

async function genFanBotResponse(input) {
  const faqContext = input.faqs && input.faqs.length > 0
    ? `Knowledge Base (answer from here when relevant):\n${input.faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n")}`
    : "";
  const systemPrompt = `You are ${input.botName}, an AI fan assistant for an adult content creator.
Personality: ${input.personality}
Tone: ${input.tone}

Rules:
- Stay in character as ${input.botName}
- Be friendly, engaging, and professional
- Never break character or mention you are an AI
- If asked about pricing, rates, or services, provide helpful information
- If asked something you don't know, politely redirect to the creator's content
${faqContext ? `\n${faqContext}` : ""}

Respond naturally and warmly.`;
  const userPrompt = `A fan just sent this message: "${input.userMessage}"\n\nRespond as ${input.botName} would.`;
  const response = await callAI(systemPrompt, userPrompt);
  return { response };
}

async function genPulseInsights(input) {
  const systemPrompt = `You are the BNE CreatorPulse AI analytics advisor. You analyze creator performance data and provide actionable, specific insights to help them grow revenue and engagement.`;
  const userPrompt = `Analyze this creator's performance data for the last ${input.timeRange}:
- Total Visitors: ${Number(input.totalVisitors).toLocaleString("en-US")}
- Tips Received: $${Number(input.totalTips).toLocaleString("en-US")}
- New Subscribers: ${input.totalSubs}
- Revenue per Visitor: $${(input.totalTips / input.totalVisitors).toFixed(2)}

Top Performing Content:
${(input.topContent || []).map((c) => `- "${c.title}" on ${c.platform}: ${c.views} views, ${c.engagement} engagement`).join("\n")}

Provide 5 specific, actionable insights:
1. Which platform is converting best and why
2. What content type drives the most tips
3. Optimal posting frequency recommendations
4. One specific content idea to try next week
5. A pricing or monetization suggestion

Format as numbered list with bold headers.`;
  const insights = await callAI(systemPrompt, userPrompt);
  return { insights };
}

async function genSceneStoryboard(input) {
  const systemPrompt = `You are the BNE SceneForge AI storyboard director. You create professional content production plans for adult creators, focusing on visual storytelling, pacing, and audience engagement.`;
  const userPrompt = `Create ${input.sceneCount} scenes for a ${input.niche} content piece.
Vibe: ${input.vibe}
Setting: ${input.setting}

For each scene, provide:
1. Scene Title (catchy and descriptive)
2. Shot Description (what the camera captures)
3. Posing / Action (specific movements and positions)
4. Lighting Setup (specific lighting recommendations)
5. Duration Estimate
6. Pro Tip (one insider tip for this specific scene)

Format each scene clearly with markdown headers.`;
  const storyboard = await callAI(systemPrompt, userPrompt);
  return { storyboard };
}

/* ------------------------- drafts over KV ------------------------- */

const DRAFT_TTL_SECONDS = 90 * 24 * 60 * 60;

function draftKey(sessionId) {
  if (!sessionId || String(sessionId).length < 8 || String(sessionId).length > 128) {
    throw trpcError("BAD_REQUEST", "Invalid sessionId");
  }
  return `draft:${sessionId}`;
}

async function draftSave(input) {
  const key = draftKey(input.sessionId);
  const existingRaw = await APPS_KV.get(key);
  const existing = existingRaw ? JSON.parse(existingRaw) : null;
  const now = new Date().toISOString();
  const record = {
    id: existing ? existing.id : `kv-${input.sessionId}`,
    type: input.type,
    data: input.data || {},
    files: input.files ?? (existing ? existing.files : []),
    lastStep: input.lastStep ?? (existing ? existing.lastStep : null),
    savedForLater: input.savedForLater === true,
    updatedAt: now,
    abandonedAt: input.savedForLater ? now : existing ? existing.abandonedAt : null,
  };
  await APPS_KV.put(key, JSON.stringify(record), { expirationTtl: DRAFT_TTL_SECONDS });
  return { ok: true };
}

async function draftGet(input) {
  const key = draftKey(input.sessionId);
  const raw = await APPS_KV.get(key);
  if (!raw) return null;
  const d = JSON.parse(raw);
  return {
    id: d.id,
    type: d.type,
    data: d.data,
    files: d.files,
    lastStep: d.lastStep,
    savedForLater: d.savedForLater === true,
    updatedAt: d.updatedAt,
  };
}

async function draftAbandon(input) {
  const key = draftKey(input.sessionId);
  const raw = await APPS_KV.get(key);
  if (raw) {
    const d = JSON.parse(raw);
    d.abandonedAt = new Date().toISOString();
    if (input.lastStep) d.lastStep = input.lastStep;
    await APPS_KV.put(key, JSON.stringify(d), { expirationTtl: DRAFT_TTL_SECONDS });
  }
  return { ok: true };
}


/* --------------------------- v1 proxy path --------------------------- */

async function proxy(req, incoming) {
  const declared = req.headers.get("content-length");
  if (declared !== null && Number(declared) > MAX_BODY_BYTES) {
    return corsJson({ error: "Request body exceeds 100MB limit" }, 413);
  }
  const upstreamUrl = UPSTREAM + incoming.pathname + incoming.search;
  const fwd = new Headers(req.headers);
  fwd.set("X-Forwarded-Proto", "https");
  const clientIp = req.headers.get("CF-Connecting-IP");
  if (clientIp) fwd.append("X-Forwarded-For", clientIp);
  fwd.set("X-Forwarded-Host", incoming.host);
  fwd.delete("host");

  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  let upstreamRes;
  try {
    upstreamRes = await fetch(upstreamUrl, {
      method: req.method,
      headers: fwd,
      body: hasBody ? req.body : null,
      redirect: "manual",
    });
  } catch {
    return corsJson({ error: "Upstream unreachable" }, 502);
  }

  const out = new Headers();
  for (const [k, v] of upstreamRes.headers) {
    if (k.toLowerCase() === "set-cookie") continue;
    out.append(k, v);
  }
  if (typeof upstreamRes.headers.getSetCookie === "function") {
    for (const sc of upstreamRes.headers.getSetCookie()) out.append("Set-Cookie", sc);
  }
  applyCors(out);
  return new Response(upstreamRes.body, { status: upstreamRes.status, statusText: upstreamRes.statusText, headers: out });
}

/* ------------------------------ CORS ------------------------------ */

function applyCors(h) {
  h.set("Access-Control-Allow-Origin", SPA_ORIGIN);
  h.set("Access-Control-Allow-Credentials", "true");
  h.set("Vary", "Origin");
}

function preflight(req) {
  const h = new Headers();
  h.set("Access-Control-Allow-Origin", SPA_ORIGIN);
  h.set("Access-Control-Allow-Credentials", "true");
  h.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  h.set("Access-Control-Allow-Headers", req.headers.get("Access-Control-Request-Headers") || "Content-Type, Authorization");
  h.set("Access-Control-Max-Age", "86400");
  h.set("Vary", "Origin, Access-Control-Request-Headers");
  return new Response(null, { status: 204, headers: h });
}

function corsJson(payload, status) {
  const h = new Headers({ "Content-Type": "application/json" });
  applyCors(h);
  return new Response(JSON.stringify(payload), { status, headers: h });
}
