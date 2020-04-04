
const cacheName = 'cache-v1';
const precacheResources = [
  '/',
  'index.html',
  'manifest.json',
  'css/index.css',
  'images/alternates/food.jpg',
  'images/alternates/solar.jpg',
  'images/alternates/weather.jpg',
  'js/elecCharging.js',
  'js/installApp.js'
];

/*

*/


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
});

self.addEventListener('activate', event => {
  console.log(' e This is the service worker activate event!');
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
