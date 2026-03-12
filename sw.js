// sw.js - Service Worker
const CACHE_NAME = 'directivas-os10-cache-v1.9'; // Versión incrementada para forzar la actualización

// Lista de archivos y recursos a cachear durante la instalación
const urlsToCache = [
  '/',
  './index.html',
  './manifest.json',
  './assets/css/styles.css?v=25',
  './assets/css/credenciales.css',
  './assets/js/main.js?v=2',
  './assets/js/inicio.js?v=5',
  './assets/js/credenciales.js',
  './assets/js/chatbot.js?v=2',
  './rules/chatbot-rules.js?v=2',
  // Iconos y logos
  './assets/images/icon-192x192.png',
  './assets/images/icon-512x512.png',
  './assets/images/logo-os10.png',
  './assets/images/poli.png',
  './assets/images/favicon.ico',
  // Imágenes críticas y del carrusel (versiones WebP)
  './assets/images/foto (1).webp',
  './assets/images/foto (1a).webp',
  './assets/images/foto (2).webp',
  './assets/images/foto (2a).webp',
  './assets/images/foto (3).webp',
  './assets/images/foto (3a).webp',
  './assets/images/foto (4).webp',
  './assets/images/foto (5).webp',
  './assets/images/foto (6).webp',
  './assets/images/foto (7).webp',
  './assets/images/foto (8).webp',
  './assets/images/foto (9).webp',
  './assets/images/foto (10).webp',
  './assets/images/foto (11).webp',
  './assets/images/foto (12).webp',
  './assets/images/foto (13).webp',
  './assets/images/foto (14).webp',
  './assets/images/foto (15).webp',
  './assets/images/foto (16).webp',
  './assets/images/foto (17).webp',
  './assets/images/foto (18).webp',
  './assets/images/foto (19).webp',
  './assets/images/foto (20).webp',
  './assets/images/foto (21).webp',
  './assets/images/foto (22).webp',
  './assets/images/foto (23).webp',
  './assets/images/foto (24).webp',
  './assets/images/foto (25).webp',
  './assets/images/foto (26).webp',
  './assets/images/foto (27).webp',
  './assets/images/foto (28).webp',
  './assets/images/valores.webp',
  './assets/images/qr.webp',
  './assets/images/qrcred.webp',
  './assets/images/foto.webp',
  // Fonts
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap'
];

// Evento 'install': Se dispara cuando el Service Worker se instala.
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker: Cache abierta, añadiendo recursos principales.');
        return Promise.allSettled(
          urlsToCache.map(url => 
            cache.add(url).catch(err => {
              console.warn(`⚠️ No se pudo cachear: ${url}`, err);
              return null;
            })
          )
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Recursos principales cacheados. Instalación completa.');
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('❌ Error durante instalación SW:', err);
      })
  );
});

// Evento 'activate': Se dispara cuando el Service Worker se activa para limpiar cachés viejos.
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`🗑️ Service Worker: Eliminando caché antigua: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
        console.log('✅ Service Worker: Activado y listo para controlar la página.');
        return self.clients.claim();
    })
  );
});

// Evento 'fetch': Implementa una estrategia "Network first, then cache".
self.addEventListener('fetch', (event) => {
  // Ignorar peticiones que no son GET o son de extensiones.
  if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension://') || event.request.url.startsWith('moz-extension://') || event.request.url.includes('netlify/functions/')) {
    return;
  }

  event.respondWith(
    // 1. Intentar ir a la red primero.
    fetch(event.request).then(networkResponse => {
      // Si la petición a la red es exitosa...
      return caches.open(CACHE_NAME).then(cache => {
        // ...guardamos una copia en el caché para uso futuro (offline).
        // Solo cacheamos respuestas 'basic' para evitar errores.
        if (networkResponse.type === 'basic') {
          cache.put(event.request, networkResponse.clone());
        }
        // Y devolvemos la respuesta de la red al navegador.
        return networkResponse;
      });
    }).catch(() => {
      // 2. Si la petición a la red falla (ej. sin conexión)...
      // ...buscamos el recurso en el caché.
      console.log(`🔌 Sin red, buscando en caché: ${event.request.url}`);
      return caches.match(event.request);
    })
  );
});
