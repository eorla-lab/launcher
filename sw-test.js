// Minimal service worker for persistence testing
// Its mere registration helps keep the Cache API alive on some browsers

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});
