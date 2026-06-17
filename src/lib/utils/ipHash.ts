import { createHmac } from 'crypto';

/**
 * Hash an IP address using HMAC-SHA256 with IP_HASH_SECRET.
 * The hash is stored in Firestore for duplicate/cooldown detection.
 * Raw IPs are never stored in Firestore.
 */
export function hashIp(ip: string): string {
  const secret = process.env.IP_HASH_SECRET;
  if (!secret) {
    throw new Error('IP_HASH_SECRET environment variable is not set.');
  }
  return createHmac('sha256', secret).update(ip).digest('hex');
}

/**
 * Extract the real IP from a Next.js request.
 * Respects X-Forwarded-For for Netlify / proxy environments.
 */
export function getRealIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  // Fallback — should not happen in production behind a proxy
  return '0.0.0.0';
}
