# bne-agency API — production image for Hugging Face Spaces (Docker SDK).
# HF Spaces Docker containers MUST listen on port 7860.
# Build:  pnpm install --include=dev && pnpm build   (mirrors render.yaml)
# Start:  NODE_ENV=production node dist/index.js     (mirrors render.yaml)

# ---------- builder ----------
FROM node:20-slim AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --include=dev --no-frozen-lockfile
COPY . .
RUN pnpm build

# ---------- runtime ----------
FROM node:20-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    PORT=7860
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY package.json pnpm-lock.yaml ./
# Server bundle is esbuild with --packages=external, so production
# node_modules are required at runtime.
RUN pnpm install --prod --no-frozen-lockfile && pnpm store prune
COPY --from=builder /app/dist ./dist
# Local-disk upload targets (ephemeral on HF; Phase 2 migrates these to B2).
# The app mkdir -p's the review inbox itself; ensure the rest exist.
RUN mkdir -p /app/media /app/uploads/review-inbox /app/client/public/media-files
EXPOSE 7860
CMD ["node", "dist/index.js"]
