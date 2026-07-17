/**
 * Signed, reversible unsubscribe tokens (HMAC).
 *
 * Replaces the previous base64(email) approach, which was forgeable and leaked the
 * address in the URL. Tokens are `base64url(payload).hmac` where payload is the
 * lowercased email; verification checks the MAC and returns the email or null.
 * Uses JWT_SECRET (same secret the session cookies use).
 */
import { createHmac, timingSafeEqual } from "node:crypto";

function secret(): string {
  return process.env.JWT_SECRET || "insecure-dev-secret-change-me";
}

function hmac(data: string): string {
  return createHmac("sha256", secret()).update(data).digest("base64url");
}

export function signUnsubscribeToken(email: string): string {
  const payload = Buffer.from(email.toLowerCase()).toString("base64url");
  const sig = hmac(payload);
  return `${payload}.${sig}`;
}

export function verifyUnsubscribeToken(token: string): string | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  const expected = hmac(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    return Buffer.from(payload, "base64url").toString("utf8");
  } catch {
    return null;
  }
}
