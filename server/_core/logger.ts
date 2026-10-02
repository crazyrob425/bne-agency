import pino from "pino";

// Structured JSON logs. Level via LOG_LEVEL (default "info"); in development
// pino still emits JSON (kept simple so log shippers parse one format).
export const log = pino({
  level: process.env.LOG_LEVEL ?? "info",
  redact: {
    paths: ["*.password", "*.token", "*.secret", "req.headers.authorization", "req.headers.cookie"],
    censor: "[redacted]",
  },
});
