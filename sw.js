// sw.js - Service Worker
const CACHE_NAME = 'directivas-os10-cache-v1.5'; // Increment version for updates

// Lista de archivos y recursos a cachear durante la instalación
const urlsToCache = [
  '/',
  './index.html',
  './manifest.json',
  './assets/css/styles.css',
  './assets/css/credenciales.css',
  './assets/js/main.js',
  './assets/js/inicio.js',
  './assets/js/credenciales.js',
  './assets/js/chatbot.js',
  './rules/chatbot-rules.js',
  // Iconos y logos
  './assets/images/icon-192x192.png',
  './assets/images/icon-512x512.png',
  './assets/images/logo-os10.png',
  './assets/images/poli.png',
  './assets/images/favicon.ico',
  // Imágenes críticas y del carrusel (versiones WebP)
  './assets/images/foto (1).webp',
  './assets/images/foto (2).webp',
  './assets/images/foto (3).webp',
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
        // Cachear recursos uno por uno para mejor manejo de errores
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

// Evento 'activate': Se dispara cuando el Service Worker se activa.
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

// Evento 'fetch': Implementa una estrategia "Cache first, then network".
self.addEventListener('fetch', (event) => {
  // Solo procesar peticiones GET
  if (event.request.method !== 'GET') return;
  
  // Ignorar extensiones del navegador y peticiones especiales
  if (event.request.url.startsWith('chrome-extension://') || 
      event.request.url.startsWith('moz-extension://') ||
      event.request.url.includes('netlify/functions/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Si el recurso está en la caché, lo devolvemos desde ahí.
        if (cachedResponse) {
          // No logueamos cada hit de caché para no saturar la consola
          // console.log(`📦 Desde caché: ${event.request.url}`);
          return cachedResponse;
        }

        // Si no está en la caché, vamos a la red.
        return fetch(event.request).then((networkResponse) => {
            // Solo cachear respuestas exitosas
            if (networkResponse && networkResponse.status === 200) {
              // No clonamos para recursos no 'basic' para evitar errores
              if (networkResponse.type === 'basic' || event.request.url.startsWith('https://fonts.')) {
                  return caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, networkResponse.clone());
                  return networkResponse;
                });
              }
            }
            return networkResponse;
          }
        ).catch((err) => {
            console.warn(`⚠️ Service Worker: Falló la obtención desde red: ${event.request.url}`, err);
            
            // Página de fallback para navegación
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
            
            throw err;
        });
      })
  );
});
