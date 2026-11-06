const CACHE_NAME = 'forbidden-bite-offline-v40';
const SHELL = [
  '/projects/restaurant.html',
  '/projects/restaurant-arcade.html',
  '/projects/restaurant-dumpling-game.html',
  '/projects/restaurant-gallery.html',
  '/projects/restaurant-full-menu.html',
  '/projects/restaurant-rooms.html'
];
const OFFLINE_ASSETS = [
  '/assets/forbidden_bite/avatar-arcade.css',
  '/assets/forbidden_bite/game-collection.js',
  '/assets/forbidden_bite/game-collection.css',
  '/assets/forbidden_bite/avatar-arcade.js',
  '/assets/forbidden_bite/order.css',
  '/assets/forbidden_bite/order.js',
  '/assets/forbidden_bite/fun.js',
  '/assets/forbidden_bite/fun.css',
  '/assets/forbidden_bite/professional.css',
  '/assets/forbidden_bite/dish-info.js',
  '/assets/forbidden_bite/recipe-school.js',
  '/assets/forbidden_bite/recipe-school.css',
  '/assets/forbidden_bite/monthly-menu.js',
  '/assets/forbidden_bite/arcade-lantern-snake-ai.webp',
  '/assets/forbidden_bite/arcade-wok-flyer-ai.webp',
  '/assets/forbidden_bite/arcade-tea-breaker-ai.webp',
  '/assets/forbidden_bite/arcade-lantern-snake-present.jpg',
  '/assets/forbidden_bite/arcade-wok-flyer-present.jpg',
  '/assets/forbidden_bite/arcade-tea-breaker-present.jpg',
  '/assets/forbidden_bite/restaurant-music.css',
  '/assets/forbidden_bite/arcade-boss-atlas-ai-lite.webp',
  '/assets/forbidden_bite/arcade-noodle-mountain.webp',
  '/assets/forbidden_bite/arcade-dish-garden.webp',
  '/assets/forbidden_bite/arcade-roadster-mountains.webp',
  '/assets/forbidden_bite/arcade-trail-garden.webp',
  '/assets/forbidden_bite/arcade-ace-festival.webp',
  '/assets/forbidden_bite/arcade-wok-day.jpg',
  '/assets/forbidden_bite/arcade-wok-night.jpg',
  '/assets/forbidden_bite/arcade-lantern-day.jpg',
  '/assets/forbidden_bite/arcade-lantern-night.jpg',
  '/assets/forbidden_bite/arcade-tea-day.jpg',
  '/assets/forbidden_bite/arcade-tea-night.jpg',
  '/assets/forbidden_bite/arcade-food-noodles.webp',
  '/assets/forbidden_bite/arcade-food-bok-choy.webp',
  '/assets/forbidden_bite/arcade-food-chicken.webp',
  '/assets/forbidden_bite/arcade-food-carrot.webp',
  '/assets/forbidden_bite/arcade-food-mushroom.webp',
  '/assets/forbidden_bite/arcade-food-chili.webp',
  '/assets/forbidden_bite/arcade-racer-jade-lite.webp',
  '/assets/forbidden_bite/arcade-racer-red-lite.webp',
  '/assets/forbidden_bite/arcade-truck-gold-lite.webp',
  '/assets/forbidden_bite/arcade-truck-cream-lite.webp',
  '/assets/forbidden_bite/arcade-flavor-star.webp',
  ...Array.from({length:16},(_,index)=>`/assets/forbidden_bite/arcade-dish-${String(index+1).padStart(2,'0')}.webp`),
  '/assets/forbidden_bite/menu.json',
  '/assets/forbidden_bite/dish-info.js',
  '/assets/forbidden_bite/menu-lite.webp',
  '/assets/forbidden_bite/full-menu-lite.webp'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all([...SHELL, ...OFFLINE_ASSETS].map(async url => {
      try {
        const response = await fetch(url, {cache: 'reload', signal: AbortSignal.timeout(8000)});
        if (response.ok) await cache.put(url, response);
      } catch {}
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith('forbidden-bite-offline-') && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    const network = fetch(request).then(async response => {
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    });
    event.waitUntil(network.then(() => undefined).catch(() => undefined));
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request, {ignoreSearch: true});
      if (cached) return cached;
      try { return await network; }
      catch { return await cache.match('/projects/restaurant.html') || Response.error(); }
    })());
    return;
  }
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request, {ignoreSearch: true});
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    } catch { return Response.error(); }
  })());
});
