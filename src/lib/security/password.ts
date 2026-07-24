import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

const KEY_LEN = 64;
const SALT_LEN = 16;

/**
 * Hashes a plain-text password using scrypt with random salt.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_LEN).toString("hex");
  const derivedKey = scryptSync(password, salt, KEY_LEN).toString("hex");
  return `${salt}:${derivedKey}`;
}

/**
 * Verifies a plain-text password against a stored scrypt hash in salt:key format.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [salt, key] = hash.split(":");
  if (!salt || !key) return false;

  const keyBuffer = Buffer.from(key, "hex");
  const derivedKey = scryptSync(password, salt, KEY_LEN);

  return timingSafeEqual(keyBuffer, derivedKey);
}
