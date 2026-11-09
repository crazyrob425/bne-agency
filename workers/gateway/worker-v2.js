/**
 * bne-api-gateway v2 — service-worker format.
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
 * Everything else keeps the v1 behaviour: CORS owned here, proxy to the
 * (dead) upstream so untouched routes behave exactly as before.
 */

const SPA_ORIGIN = "https://blacklisted.studio";
const UPSTREAM = "https://bne-agency-api.onrender.com";
const MAX_APPLY_BYTES = 8 * 1024 * 1024;
const MAX_BODY_BYTES = 100 * 1024 * 1024;

addEventListener("fetch", (event) => {
  event.respondWith(handle(event.request, event));
});

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
