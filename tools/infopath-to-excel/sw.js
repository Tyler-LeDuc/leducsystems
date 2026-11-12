// InfoPath to Excel service worker: keeps the app shell available offline.
// Pages: network first, cached copy when offline. Built assets (hashed names) and
// icons: cache first. Nothing from the conversion server (another origin) is cached,
// so uploaded files and results never land in this cache.
const CACHE = 'infopath-to-excel-v1';
const SHELL = ['/tools/infopath-to-excel/', '/tools/infopath-to-excel/manifest.webmanifest', '/tools/infopath-to-excel/icons/icon-192.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k.startsWith('infopath-to-excel-') && k !== CACHE).map((k) => caches.delete(k))))
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
        caches.open(CACHE).then((c) => c.put('/tools/infopath-to-excel/', copy));
      }
      return res;
    }).catch(() => caches.match('/tools/infopath-to-excel/')));
    return;
  }
  if (url.pathname.startsWith('/tools/assets/') || url.pathname.startsWith('/tools/infopath-to-excel/') || url.pathname.startsWith('/fonts/')
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
