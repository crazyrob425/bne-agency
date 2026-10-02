# bne-api-gateway — Worker gateway v1

Reverse proxy: `api.blacklisted.studio/*` → `https://bne-agency-api.onrender.com/*`.

## Contract (v1 — simple, correct; no hedging/failover, that's Phase 1)

- Preserves path + query, method; streams request/response bodies through.
- Request body > 100 MB → `413` (Workers free-plan request body cap).
- CORS owned by the worker: exact `Access-Control-Allow-Origin:
  https://blacklisted.studio`, `Access-Control-Allow-Credentials: true`;
  OPTIONS preflights answered in-worker with 204.
- Forwards the `Cookie` request header untouched; forwards **every**
  `Set-Cookie` response header as a **separate header line** (never merged —
  implemented via `getSetCookie()` + `Headers.append`).
- Sets `X-Forwarded-Proto: https` (+ `X-Forwarded-For`, `X-Forwarded-Host`)
  upstream so the backend's `trust proxy` yields the correct `req.secure`.
- No retries: single attempt; upstream 5xx / network errors pass through as-is
  (never re-fire non-idempotent mutations).

## Layout

- `src/index.ts` — the worker (zero dependencies, no build step)
- `wrangler.toml` — worker config (`UPSTREAM_URL` var points at Render)

## Deploy (requires Cloudflare auth — see wrangler.toml note)

```bash
cd workers/gateway
npx wrangler deploy
# Attach the custom domain (auto TLS):
npx wrangler custom-domains add api.blacklisted.studio
```

Worker URL after deploy: `https://bne-api-gateway.<account>.workers.dev`
Public gateway URL: `https://api.blacklisted.studio`

## Local verification (no auth needed)

```bash
# 1. Start the worker locally against the real backend:
npx wrangler dev --local --port 8787

# 2. Proxy mechanics — path/query preserved, CORS stamped, body streamed:
curl -sD - -o /dev/null "http://localhost:8787/api/ping?x=1"

# 3. Preflight:
curl -sD - -X OPTIONS "http://localhost:8787/api/trpc/auth" \
  -H "Origin: https://blacklisted.studio" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type, Authorization"

# 4. 413 on oversized body (declared Content-Length fast path):
curl -sD - -o /dev/null -X POST "http://localhost:8787/api/onboarding" \
  -H "Content-Length: 104857601"

# 5. Cookie forwarding — logout sets a Set-Cookie line through the gateway:
curl -sD - -o /dev/null -X POST "http://localhost:8787/api/oauth/logout"

# 6. Multi Set-Cookie lines, forwarded headers, query echo — point the worker
#    at a local mock origin instead:
#    (terminal A) node /tmp/mock-origin.js
#    (terminal B) npx wrangler dev --local --port 8787 --var UPSTREAM_URL:http://127.0.0.1:9999
curl -sD - "http://localhost:8787/api/anything?a=b" -H "Cookie: sess=abc123" | head -30
```

## Phase 1 (later)

Warmth-aware routing, staggered hedging (1.5 s), ordered failover for GETs,
cron → KV health state (writes only on state change), edge cache SWR.
