const PREFIX = 'dream-signal-static:' + encodeURIComponent("/dream-signal-pages/") + ':';
const CACHE = PREFIX + 'd28f24d70cc1a77b';
const STATIC = ["/dream-signal-pages/index.html","/dream-signal-pages/manifest.webmanifest","/dream-signal-pages/icon.svg","/dream-signal-pages/icon-192.png","/dream-signal-pages/icon-512.png","/dream-signal-pages/assets/index-B8LZ8gdA.js","/dream-signal-pages/assets/index-kr2Er35L.css","/dream-signal-pages/"];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(STATIC)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil((async () => {
  for (const key of await caches.keys()) if (key.startsWith(PREFIX) && key !== CACHE) await caches.delete(key);
  await self.clients.claim();
})()));
self.addEventListener('fetch', event => {
  const request = event.request, url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || url.search || request.headers.has('Authorization') || !STATIC.includes(url.pathname)) return;
  event.respondWith(caches.open(CACHE).then(async cache => (await cache.match(url.pathname)) || fetch(request)));
});
