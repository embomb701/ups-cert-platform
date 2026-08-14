import { NextRequest, NextResponse } from 'next/server';

// ---------------------------------------------------------------
// Site-wide access gate — blocks every visitor until they sign in
// with SITE_GATE_USER / SITE_GATE_PASSWORD. Deliberately blank and
// unbranded: nothing on the gate page hints at what the site is.
//
// Scope: everything except Next.js internals, robots.txt/sitemap.xml
// (must stay reachable so the crawler block itself still works), and
// /api/* (webhooks, cron, and app API calls carry their own auth —
// Stripe signatures, CRON_SECRET, Firebase tokens — and gating them
// here would break server-to-server integrations).
//
// To go live: delete this file (or set SITE_GATE_ENABLED=false).
// ---------------------------------------------------------------

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/).*)'],
};

const COOKIE_NAME = '__gate_session';
const VERIFY_PATH = '/__gate/verify';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function hmac(secret: string, value: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(value));
  return bufToHex(sig);
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function gateHtml(opts: { error?: boolean; redirect: string }): string {
  const redirectAttr = opts.redirect.replace(/"/g, '&quot;');
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title></title>
<style>
  html, body { height: 100%; margin: 0; background: #000; }
  body { display: flex; align-items: center; justify-content: center; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  form { display: flex; flex-direction: column; gap: 12px; width: 260px; }
  input { background: #111; border: 1px solid #333; color: #eee; padding: 10px 12px; border-radius: 6px; font-size: 14px; outline: none; }
  input:focus { border-color: #555; }
  button { background: #eee; color: #000; border: none; padding: 10px 12px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; margin-top: 4px; }
  button:hover { background: #fff; }
  .error { color: #ff6b6b; font-size: 12px; text-align: center; min-height: 14px; }
</style>
</head>
<body>
  <form method="POST" action="${VERIFY_PATH}">
    <input type="hidden" name="redirect" value="${redirectAttr}" />
    <input type="text" name="username" placeholder="Username" autocomplete="username" autofocus required />
    <input type="password" name="password" placeholder="Password" autocomplete="current-password" required />
    <button type="submit">Sign in</button>
    <div class="error">${opts.error ? 'Incorrect username or password' : ''}</div>
  </form>
</body>
</html>`;
}

function htmlResponse(html: string, status = 200): NextResponse {
  return new NextResponse(html, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}

async function isValidSession(req: NextRequest, secret: string): Promise<boolean> {
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (!cookie) return false;
  const [expiryStr, sig] = cookie.split('.');
  if (!expiryStr || !sig) return false;
  const expiry = Number(expiryStr);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false;
  const expected = await hmac(secret, expiryStr);
  return safeEqual(sig, expected);
}

function safeRedirectPath(raw: string | null): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/';
  return raw;
}

export default async function middleware(req: NextRequest) {
  if (process.env.SITE_GATE_ENABLED === 'false') return NextResponse.next();

  const gateUser = process.env.SITE_GATE_USER ?? '';
  const gatePassword = process.env.SITE_GATE_PASSWORD ?? '';
  const gateSecret = process.env.SITE_GATE_SECRET ?? '';

  const { pathname } = req.nextUrl;

  // Handle the login form submission.
  if (pathname === VERIFY_PATH && req.method === 'POST') {
    const form = await req.formData();
    const username = String(form.get('username') ?? '');
    const password = String(form.get('password') ?? '');
    const redirect = safeRedirectPath(String(form.get('redirect') ?? '/'));

    const ok =
      gateUser.length > 0 &&
      gatePassword.length > 0 &&
      gateSecret.length > 0 &&
      safeEqual(username, gateUser) &&
      safeEqual(password, gatePassword);

    if (!ok) {
      return htmlResponse(gateHtml({ error: true, redirect }), 401);
    }

    const expiry = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
    const sig = await hmac(gateSecret, String(expiry));
    const res = NextResponse.redirect(new URL(redirect, req.url), { status: 303 });
    res.cookies.set(COOKIE_NAME, `${expiry}.${sig}`, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE_SECONDS,
    });
    return res;
  }

  if (await isValidSession(req, gateSecret)) return NextResponse.next();

  const redirectTarget = pathname + (req.nextUrl.search || '');
  return htmlResponse(gateHtml({ redirect: redirectTarget }), 401);
}
