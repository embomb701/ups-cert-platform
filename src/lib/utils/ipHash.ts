import { createHmac } from 'crypto';

const PLACEHOLDER_SECRET = 'generate-a-strong-random-secret-here';
const MIN_SECRET_LENGTH = 32;

/**
 * Resolve and validate IP_HASH_SECRET. Fails closed (throws) if the secret is
 * missing, still the shipped placeholder, or too short to be safe — a weak or
 * known secret lets an attacker recompute IP hashes and forge / probe the
 * cooldown locks.
 */
function getIpHashSecret(): string {
  const secret = process.env.IP_HASH_SECRET;
  if (!secret) {
    throw new Error('IP_HASH_SECRET environment variable is not set.');
  }
  if (secret === PLACEHOLDER_SECRET) {
    throw new Error(
      'IP_HASH_SECRET is still the example placeholder. Set a strong random secret (32+ chars).'
    );
  }
  if (secret.length < MIN_SECRET_LENGTH) {
    throw new Error(
      `IP_HASH_SECRET is too short (${secret.length} chars). Use at least ${MIN_SECRET_LENGTH} characters.`
    );
  }
  return secret;
}

/**
 * Hash an IP address using HMAC-SHA256 with IP_HASH_SECRET.
 * The hash is stored in Firestore for duplicate/cooldown detection.
 * Raw IPs are never stored in Firestore.
 */
export function hashIp(ip: string): string {
  return createHmac('sha256', getIpHashSecret()).update(ip).digest('hex');
}

/** Convenience: hash an IP that may be unresolvable (null in, null out). */
export function hashIpOrNull(ip: string | null): string | null {
  return ip ? hashIp(ip) : null;
}

/**
 * Extract the real client IP from a request, trusting only platform-set
 * headers — NOT the leftmost X-Forwarded-For hop, which is fully client
 * supplied and trivially spoofable (`curl -H 'X-Forwarded-For: 1.2.3.4'`).
 *
 * Returns null when no trusted client IP can be resolved. Callers must treat
 * null as "unknown" (skip IP-based locks) rather than hashing a sentinel like
 * '0.0.0.0', which would collapse every proxyless request into one shared lock.
 */
export function getRealIp(request: Request): string | null {
  // Netlify (and most edge platforms) set a trusted, non-spoofable client IP.
  const trusted =
    request.headers.get('x-nf-client-connection-ip') ||
    request.headers.get('x-real-ip');
  if (trusted && trusted.trim()) {
    return trusted.trim();
  }

  // Fall back to the RIGHTMOST X-Forwarded-For entry, which the trusted proxy
  // appends; the leftmost entries can be forged by the client.
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const parts = forwardedFor
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean);
    if (parts.length > 0) {
      return parts[parts.length - 1];
    }
  }

  return null;
}
