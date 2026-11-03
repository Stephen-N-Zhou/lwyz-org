const CACHE_NAME = 'forbidden-bite-offline-v2';
const SHELL = [
  '/projects/restaurant.html',
  '/projects/restaurant-arcade.html'
];
const CORE_ASSETS = [
  '/assets/forbidden_bite/avatar-arcade.css?v=11',
  '/assets/forbidden_bite/avatar-arcade.js?v=11',
  '/assets/forbidden_bite/order.css?v=checkout-6',
  '/assets/forbidden_bite/order.js?v=checkout-6',
  '/assets/forbidden_bite/fun.css?v=fun-11',
  '/assets/forbidden_bite/fun.js?v=fun-3',
  '/assets/forbidden_bite/profile.js?v=profile-5',
  '/assets/forbidden_bite/chefs.js?v=7',
  '/assets/forbidden_bite/restaurant-music.js?v=1',
  '/assets/forbidden_bite/restaurant-music.css?v=1',
  '/assets/forbidden_bite/kids-menu.js?v=2',
  '/assets/forbidden_bite/recipe-school.css?v=7',
  '/assets/forbidden_bite/recipe-school.js?v=7',
  '/assets/forbidden_bite/dish-vote.js?v=1',
  '/assets/forbidden_bite/menu-language.js?v=1',
  '/assets/forbidden_bite/menu.json',
  '/assets/forbidden_bite/recipe-book-cover-ai.webp',
  '/assets/forbidden_bite/flavor-map-ai.webp',
  '/assets/forbidden_bite/arcade-noodle-mountain.webp',
  '/assets/forbidden_bite/arcade-dish-garden.webp',
  '/assets/forbidden_bite/arcade-roadster-mountains.webp',
  '/assets/forbidden_bite/arcade-trail-garden.webp',
  '/assets/forbidden_bite/arcade-ace-festival.webp',
  '/assets/forbidden_bite/arcade-racer-jade.png',
  '/assets/forbidden_bite/arcade-racer-red.png',
  '/assets/forbidden_bite/arcade-truck-gold.png',
  '/assets/forbidden_bite/arcade-truck-cream.png',
  '/assets/forbidden_bite/arcade-flavor-star.webp',
  ...Array.from({length:16},(_,i)=>`/assets/forbidden_bite/arcade-dish-${String(i+1).padStart(2,'0')}.webp`),
  '/assets/forbidden_bite/arcade-food-noodles.webp',
  '/assets/forbidden_bite/arcade-food-bok-choy.webp',
  '/assets/forbidden_bite/arcade-food-chicken.webp',
  '/assets/forbidden_bite/arcade-food-carrot.webp',
  '/assets/forbidden_bite/arcade-food-mushroom.webp',
  '/assets/forbidden_bite/arcade-food-chili.webp'
];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    for (const url of [...SHELL,...CORE_ASSETS]) {
      try {
        const response = await fetch(url,{cache:'reload'});
        if (response.ok) await cache.put(url,response.clone());
      } catch {}
    }
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('forbidden-bite-offline-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(request,response.clone());
        return response;
      } catch {
        return await cache.match(request,{ignoreSearch:true}) || await cache.match('/projects/restaurant-arcade.html') || Response.error();
      }
    })());
    return;
  }
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request,{ignoreSearch:true});
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok) await cache.put(request,response.clone());
      return response;
    } catch { return Response.error(); }
  })());
});
