// ---------------------------------------------------------------
// Mastering Field Service — offline module caching service worker.
//
// Strategy:
//  - Hashed Next.js build assets (_next/static/*): cache-first —
//    immutable, safe to serve straight from cache forever.
//  - Everything else navigable (pages, including training modules
//    and slides): network-first, falling back to the last cached
//    copy when offline, then to /offline as a last resort. This
//    means any page you've already opened once (with signal) stays
//    readable in a mechanical room or basement with none — no
//    separate "download" step required.
//  - Never touches /api/*, /exam/*, /checkout*, or the site gate —
//    anything that must always hit the network for correctness or
//    auth reasons is left alone entirely (the fetch handler returns
//    without calling respondWith, so the browser does its default).
// ---------------------------------------------------------------

const CACHE_VERSION = 'v1';
const STATIC_CACHE = `fse-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `fse-runtime-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline';

const NEVER_CACHE_PREFIXES = [
  '/api/', '/exam/', '/checkout', '/__gate',
  // Personalized/sensitive pages — never worth the shared-device risk
  // of a stale cached copy outliving a sign-out on the same browser.
  '/dashboard', '/account', '/settings', '/admin', '/candidates', '/p/',
  // Video files: <video> issues byte-range requests for seeking, and
  // the Cache API rejects storing 206 Partial Content responses (it
  // would throw on every seek). Large media isn't what "offline
  // module caching" is for anyway — let the browser's own HTTP cache
  // handle these instead.
  '/videos/',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll([OFFLINE_URL])).catch(() => {})
  );
  self.skipWaiting();
});

// Sign-out sends this so a shared/public device doesn't keep serving
// the previous account's cached pages to whoever logs in next.
self.addEventListener('message', (event) => {
  if (event.data === 'CLEAR_RUNTIME_CACHE') {
    event.waitUntil(caches.delete(RUNTIME_CACHE));
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (NEVER_CACHE_PREFIXES.some((p) => url.pathname.startsWith(p))) return;

  // Hashed build assets — cache-first
  if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/_next/image')) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        if (response.ok) cache.put(request, response.clone());
        return response;
      })
    );
    return;
  }

  // Pages and everything else — network-first, cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (request.mode === 'navigate') {
          const offline = await caches.match(OFFLINE_URL);
          if (offline) return offline;
        }
        return Response.error();
      })
  );
});
