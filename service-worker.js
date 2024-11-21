const CACHE_NAME = 'meu-pwa-cache-v1';
const urlsToCache = [
  '/elton/',               // Página inicial, apontando para a subpasta
  '/elton/index.html',     // Caminho correto para index.html
  '/elton/manifest.json',  // Caminho correto para manifest.json
  '/elton/icone192.png',   // Caminho correto para o ícone de 192x192
  '/elton/icone512.png',   // Caminho correto para o ícone de 512x512
  '/elton/service-worker.js',  // Caminho correto para o service worker
];

self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');

  // Cache os arquivos durante a instalação
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Arquivos em cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker ativado');
  const cacheWhitelist = [CACHE_NAME];

  // Limpar caches antigos, se existirem
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Cache removido: ', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Tente buscar da rede ou, se não disponível, retorne do cache
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Se encontrado no cache, retorne a resposta cacheada
        if (cachedResponse) {
          console.log('Retornando do cache:', event.request.url);
          return cachedResponse;
        }
        // Caso contrário, busque na rede
        console.log('Buscando da rede:', event.request.url);
        return fetch(event.request);
      })
  );
});

