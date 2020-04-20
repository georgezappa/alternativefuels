
const cacheName = 'cache-v1';
const precacheResources = [
  '/',
  'index.html',
  'manifest.json',
  'css/index.css',
  'images/food.jpg',
  'images/solar.jpg',
  'images/weather.jpg',
  'js/elecCharging.js',
  'js/installApp.js'
];

/*

*/


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log(' This is the service worker open cache event!');
        return cache.addAll(precacheResources);
      })
      .catch(() => {
        console.error('Caught failed install cache.addAll event!!!!!');
      })
  );
});

self.addEventListener('activate', event => {
  console.log(' This is the service worker activate event!', event);
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
      console.log(' This is the service worker fetch event!');
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
    .catch(() => {
      console.error('Caught failed fetch', event);
    })
  );
});
