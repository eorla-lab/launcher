/* Service worker for the Launcher PWA.
 *
 * Goals:
 *  - Instant load: the app shell and data are served from cache immediately,
 *    so the window never sits on a blank screen waiting for the network.
 *  - Offline: the app keeps working with the last data it saw.
 *  - Fresh-ish data: every launch, cached files are re-fetched in the
 *    background ("stale-while-revalidate"). When data.json actually changes
 *    we tell the open page so it can update / notify the user.
 *
 */

const CACHE_VERSION = 'v1';
const CACHE_NAME = `launcher-${CACHE_VERSION}`;

// Everything needed to boot the app with no network at all.
const PRECACHE_URLS = [
  './',
  './index.html',
  './data.json',
  './Export.csv',
  './site.webmanifest',
  './favicon.svg',
  './favicon.ico',
  './favicon-96x96.png',
  './apple-touch-icon.png',
  './web-app-manifest-192x192.png',
  './web-app-manifest-512x512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      // Use {cache:'reload'} so the install always pulls fresh copies, never
      // the browser's own HTTP cache.
      .then(async (cache) => {
        await cache.addAll(PRECACHE_URLS.map((u) => new Request(u, { cache: 'reload' })));
        await recordDataSync(cache);
      })
  );
  // Note: we deliberately do NOT call skipWaiting() here. A freshly deployed
  // worker waits until the page prompts the user ("Update now"), so an update
  // never reloads the app out from under someone mid-use. A worker that's just
  // waiting will activate on its own the next time all tabs are closed.
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Marker URL (never actually requested over the network) that records the
// last time data.json was successfully fetched from the server. The page
// reads this via caches.match() to detect stale-data situations.
const DATA_SYNCED_MARKER = './__data_synced_at';

async function recordDataSync(cache) {
  await cache.put(DATA_SYNCED_MARKER, new Response(String(Date.now()), {
    headers: { 'Content-Type': 'text/plain' },
  }));
}

// Tell every open page that data.json was refreshed from the network.
async function broadcastDataUpdated() {
  const clients = await self.clients.matchAll({ includeUncontrolled: true });
  for (const client of clients) {
    client.postMessage({ type: 'data-updated', at: Date.now() });
  }
}

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only handle our own origin. GitHub API calls, external links, etc. go
  // straight to the network untouched.
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isMainData = url.pathname.endsWith('/data.json');

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req, { ignoreSearch: true });
    // Clone now, before `cached` is handed to respondWith() and its body is
    // consumed — otherwise the comparison clone below would throw.
    const cachedForCompare = cached ? cached.clone() : null;

    const fromNetwork = fetch(req).then(async (res) => {
      if (res && res.ok) {
        if (isMainData) {
          // Only notify the page if data.json's contents actually changed —
          // otherwise it would claim "updated data" on every single launch.
          let changed = true;
          if (cachedForCompare) {
            try {
              const [oldText, newText] = await Promise.all([cachedForCompare.text(), res.clone().text()]);
              changed = oldText !== newText;
            } catch (e) { changed = true; }
          }
          await cache.put(req, res.clone());
          event.waitUntil(recordDataSync(cache));
          if (cached && changed) event.waitUntil(broadcastDataUpdated());
        } else {
          await cache.put(req, res.clone());
        }
      }
      return res;
    }).catch(() => null);

    if (cached) {
      // Serve instantly; the network copy updates the cache for next time.
      event.waitUntil(fromNetwork.then(() => {}));
      return cached;
    }

    const res = await fromNetwork;
    if (res) return res;

    // Nothing cached and no network. For a page navigation, fall back to the
    // app shell so the user at least sees the UI (with fallback data).
    if (req.mode === 'navigate') {
      const shell = await cache.match('./index.html');
      if (shell) return shell;
    }
    return new Response('Offline and not cached.', { status: 504, statusText: 'Offline' });
  })());
});

// Lets the page trigger an immediate update if it wants to.
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

/* ── Note ───────────────────────────────────────────────────────────
 * If a future deploy of this worker ever misbehaves, replace the whole file
 * with the following and deploy. Every client will drop its cache, unregister
 * the worker, and reload clean:
 *
 *   self.addEventListener('install', () => self.skipWaiting());
 *   self.addEventListener('activate', (e) => e.waitUntil((async () => {
 *     for (const k of await caches.keys()) await caches.delete(k);
 *     await self.registration.unregister();
 *     for (const c of await self.clients.matchAll()) c.navigate(c.url);
 *   })()));
 *
 * After everyone has loaded it once, you can delete sw.js (and its
 * registration) entirely.
 * ─────────────────────────────────────────────────────────────────────────*/
