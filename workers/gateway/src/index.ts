/**
 * bne-api-gateway — Cloudflare Worker reverse proxy (v1).
 *
 * blacklisted.studio "smart site" · Phase 0.3 (IMPLEMENTATION_PLAN.md row 0.3)
 *
 *   browser (https://blacklisted.studio) ──▶ api.blacklisted.studio (this worker)
 *        ──▶ https://bne-agency-api.onrender.com/*   (Render free Node API)
 *
 * v1 contract — simple and correct, NO hedging/failover (that's Phase 1):
 *  1. Reverse proxy: preserve path + query, method; stream bodies through.
 *     Reject request bodies > 100 MB with 413 (Workers free-plan request body cap).
 *  2. CORS owned by the worker: exact `Access-Control-Allow-Origin:
 *     https://blacklisted.studio`, `Access-Control-Allow-Credentials: true`,
 *     OPTIONS preflights answered in-worker (204).
 *  3. Cookies: forward the `Cookie` request header untouched; forward EVERY
 *     `Set-Cookie` response header as a SEPARATE header line — never merge
 *     them (Headers iteration dedupes; we use getSetCookie() + append).
 *  4. Set `X-Forwarded-Proto: https` (and `X-Forwarded-For`) upstream so the
 *     backend's `trust proxy` yields the correct `req.secure`.
 *  5. No retries: a single attempt; upstream errors (5xx, network) pass through
 *     as-is. Non-idempotent mutations are never re-fired.
 *
 * Custom domain: `api.blacklisted.studio` attached to this Worker (auto TLS)
 * — see README.md; the browser keys the session cookie on the gateway host.
 */

const SPA_ORIGIN = "https://blacklisted.studio";
const DEFAULT_UPSTREAM = "https://bne-agency-api.onrender.com";
const MAX_BODY_BYTES = 100 * 1024 * 1024; // 100 MB — Workers free-plan cap

const BODY_TOO_LARGE = "gateway: request body exceeds 100MB";

interface Env {
  /** Override the upstream origin (wrangler.toml [vars] or --var). */
  UPSTREAM_URL?: string;
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    // 1. CORS preflight answered in-worker; never proxied.
    if (req.method === "OPTIONS") {
      return preflightResponse(req);
    }

    // 2. Body cap: fast path via declared Content-Length.
    const declared = req.headers.get("content-length");
    if (declared !== null) {
      const n = Number(declared);
      if (!Number.isNaN(n) && n > MAX_BODY_BYTES) {
        return corsJson({ error: "Request body exceeds 100MB limit" }, 413);
      }
    }

    // 3. Upstream URL: same path + query on the backend origin.
    const incoming = new URL(req.url);
    const upstreamBase = (env.UPSTREAM_URL || DEFAULT_UPSTREAM).replace(/\/+$/, "");
    const upstreamUrl = upstreamBase + incoming.pathname + incoming.search;

    // 4. Forward headers: copy everything, then stamp proxy headers.
    //    `Cookie` passes through untouched by construction.
    const fwd = new Headers(req.headers);
    fwd.set("X-Forwarded-Proto", "https");
    const clientIp = req.headers.get("CF-Connecting-IP");
    if (clientIp) {
      fwd.append("X-Forwarded-For", clientIp);
    }
    fwd.set("X-Forwarded-Host", incoming.host);
    fwd.delete("host"); // let fetch set Host from the upstream URL

    // 5. Stream the body through (never buffer uploads).
    //    Unknown length (chunked): enforce the cap while streaming.
    const hasBody = req.method !== "GET" && req.method !== "HEAD";
    let body: ReadableStream | null = null;
    if (hasBody && req.body) {
      body = declared === null ? capStream(req.body) : req.body;
    }

    let upstreamRes: Response;
    try {
      upstreamRes = await fetch(upstreamUrl, {
        method: req.method,
        headers: fwd,
        // @ts-expect-error duplex is required by undici/Node for stream bodies;
        // workerd accepts it per the Fetch Standard ("half" = streaming upload).
        duplex: "half",
        body,
        redirect: "manual", // pass redirects through; the browser follows
      });
    } catch (err) {
      // Streaming cap tripped mid-upload -> the client still gets a clean 413.
      // (Runtimes wrap the stream error — undici nests it under `cause` — so
      // walk the chain instead of comparing only the top-level message.)
      if (isBodyTooLarge(err)) {
        return corsJson({ error: "Request body exceeds 100MB limit" }, 413);
      }
      // v1: single attempt, no retry — pass the failure through.
      return corsJson({ error: "Upstream unreachable" }, 502);
    }

    return gatewayResponse(upstreamRes);
  },
};

/** Enforce the 100 MB cap on bodies with no declared Content-Length. O(1) memory. */
function capStream(body: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  let seen = 0;
  return body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        seen += chunk.byteLength;
        if (seen > MAX_BODY_BYTES) {
          controller.error(new Error(BODY_TOO_LARGE));
        } else {
          controller.enqueue(chunk);
        }
      },
    }),
  );
}

/** Walk an error's `cause` chain looking for our body-cap marker. */
function isBodyTooLarge(err: unknown): boolean {
  let cur: unknown = err;
  const seen = new Set<unknown>();
  while (cur instanceof Error && !seen.has(cur)) {
    seen.add(cur);
    if (cur.message === BODY_TOO_LARGE) return true;
    cur = (cur as { cause?: unknown }).cause;
  }
  return false;
}

/** Build the client response: copy status/headers, split Set-Cookie lines, own CORS. */
function gatewayResponse(up: Response): Response {
  const out = new Headers();
  for (const [k, v] of up.headers) {
    if (k.toLowerCase() === "set-cookie") continue; // handled below — never merge
    out.append(k, v);
  }
  // Forward EVERY Set-Cookie as its own header line.
  const setCookies: string[] =
    typeof up.headers.getSetCookie === "function" ? up.headers.getSetCookie() : [];
  for (const sc of setCookies) {
    out.append("Set-Cookie", sc);
  }
  applyCors(out);
  return new Response(up.body, {
    status: up.status,
    statusText: up.statusText,
    headers: out,
  });
}

/** CORS owned by the gateway: exact origin, credentials allowed. */
function applyCors(h: Headers): void {
  h.set("Access-Control-Allow-Origin", SPA_ORIGIN);
  h.set("Access-Control-Allow-Credentials", "true");
  h.set("Vary", "Origin");
}

function preflightResponse(req: Request): Response {
  const h = new Headers();
  h.set("Access-Control-Allow-Origin", SPA_ORIGIN);
  h.set("Access-Control-Allow-Credentials", "true");
  h.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  const requested = req.headers.get("Access-Control-Request-Headers");
  h.set("Access-Control-Allow-Headers", requested || "Content-Type, Authorization");
  h.set("Access-Control-Max-Age", "86400");
  h.set("Vary", "Origin, Access-Control-Request-Headers");
  return new Response(null, { status: 204, headers: h });
}

function corsJson(payload: unknown, status: number): Response {
  const h = new Headers({ "Content-Type": "application/json" });
  applyCors(h);
  return new Response(JSON.stringify(payload), { status, headers: h });
}
