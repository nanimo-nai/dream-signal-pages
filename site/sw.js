const PREFIX = 'dream-signal-static:' + encodeURIComponent("/dream-signal-pages/") + ':';
const CACHE = PREFIX + '261b128b72f26f8e';
const STATIC = ["/dream-signal-pages/fonts/NotoSansSC.ttf","/dream-signal-pages/fonts/OFL.txt","/dream-signal-pages/index.html","/dream-signal-pages/manifest.webmanifest","/dream-signal-pages/icon.svg","/dream-signal-pages/icon-192.png","/dream-signal-pages/icon-512.png","/dream-signal-pages/assets/index-9Mo__6A_.css","/dream-signal-pages/assets/index-DC_45FAb.js","/dream-signal-pages/assets/shareCanvas-vv3ThuRH.js","/dream-signal-pages/"];
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
