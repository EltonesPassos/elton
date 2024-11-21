// service-worker.js
self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker ativado');
});

self.addEventListener('fetch', (event) => {
  // Vamos apenas responder com a rede por enquanto
  event.respondWith(fetch(event.request));
});
