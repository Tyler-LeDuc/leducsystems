// PUB File Opener service worker: keeps the app shell available offline.
// Pages: network first, cached copy when offline. Built assets (hashed names) and
// icons: cache first. Nothing from the conversion server (another origin) is cached,
// so uploaded files and previews never land in this cache.
const CACHE = 'pub-opener-v1';
const SHELL = ['/tools/pub-opener/', '/tools/pub-opener/manifest.webmanifest', '/tools/pub-opener/icons/icon-192.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k.startsWith('pub-opener-') && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((res) => {
      if (res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put('/tools/pub-opener/', copy));
      }
      return res;
    }).catch(() => caches.match('/tools/pub-opener/')));
    return;
  }
  if (url.pathname.startsWith('/tools/assets/') || url.pathname.startsWith('/tools/pub-opener/') || url.pathname.startsWith('/fonts/')
      || url.pathname === '/leduc-mark.svg' || url.pathname === '/leduc-logo.svg') {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      if (res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
      }
      return res;
    })));
  }
});
