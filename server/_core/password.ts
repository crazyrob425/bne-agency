/**
 * Password hashing utilities for local account registration.
 *
 * Uses Node's built-in `crypto.scrypt` (RFC 7914) with a per-user random salt —
 * constant-time comparison, no native dependencies. Argon2id would be a drop-in
 * upgrade if the `argon2` package is added later; the hash envelope is opaque so
 * the storage layer does not change.
 */
import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

const KEYLEN = 64;
const SALT_BYTES = 16;

/**
 * Hashes a plaintext password into `scrypt$N$<saltHex>$<hashHex>`.
 * The params N (cost) are embedded so future bumps stay backward compatible.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_BYTES);
  const derived = (await scryptAsync(password, salt, KEYLEN)) as Buffer;
  return `scrypt$16384$${salt.toString("hex")}$${derived.toString("hex")}`;
}

/**
 * Verifies a plaintext password against a stored hash envelope.
 * Returns false (never throws) on malformed input.
 */
export async function verifyPassword(
  password: string,
  stored: string
): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== "scrypt") return false;

  let salt: Buffer;
  let expected: Buffer;
  try {
    salt = Buffer.from(parts[2], "hex");
    expected = Buffer.from(parts[3], "hex");
  } catch {
    // Malformed stored hash — treat as non-match rather than throwing.
    return false;
  }
  if (salt.length === 0 || expected.length === 0) return false;

  let derived: Buffer;
  try {
    derived = (await scryptAsync(password, salt, expected.length)) as Buffer;
  } catch {
    return false;
  }

  if (derived.length !== expected.length) return false;
  try {
    return timingSafeEqual(derived, expected);
  } catch {
    return false;
  }
}

/** Lightweight policy: 8+ chars, at least one letter and one number. */
export function isStrongPassword(password: string): boolean {
  return (
    typeof password === "string" &&
    password.length >= 8 &&
    /[a-zA-Z]/.test(password) &&
    /[0-9]/.test(password)
  );
}

