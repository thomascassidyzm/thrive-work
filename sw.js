// THRIVE Service Worker - DEVELOPMENT MODE (NO CACHING!)
const CACHE_NAME = 'thrive-dev-no-cache-95df228'; // Force cache clear
const urlsToCache = []; // NO CACHING DURING DEVELOPMENT!

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - DEVELOPMENT MODE: NO CACHING, ALWAYS NETWORK!
self.addEventListener('fetch', event => {
  // DEVELOPMENT: Always fetch from network, never use cache
  event.respondWith(
    fetch(event.request).catch(() => {
      // Only fallback for navigation if network fails completely
      if (event.request.destination === 'document') {
        return new Response('Network error - refresh to try again', {
          status: 503,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
      throw error;
    })
  );
});