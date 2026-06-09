// sw.js - Service Worker
// PHOTO_VERSION sincronizado con window.PHOTO_VERSION en index.html.
// IMPORTANTE: cuando reemplaces fotos, sube PHOTO_VERSION en los 3 lugares
// (index.html <script>, este archivo, y bumpear el sufijo de CACHE_NAME).
const PHOTO_VERSION = '11';
const CACHE_NAME = 'directivas-os10-cache-v23'; // Subir cuando cambien fotos para forzar limpieza de caché vieja

// Lista de archivos y recursos a cachear durante la instalación
const urlsToCache = [
  '/',
  './index.html',
  './manifest.json',
  './assets/css/styles.css?v=28',
  './assets/css/credenciales.css',
  './assets/js/main.js?v=4',
  './assets/js/inicio.js?v=5',
  './assets/js/credenciales.js',
  './assets/js/chatbot.min.js',
  './rules/chatbot-rules.js?v=4',
  // Iconos y logos
  './assets/images/icon-192x192.png',
  './assets/images/icon-512x512.png',
  './assets/images/logo-os10.webp',
  './assets/images/poli.webp',
  './assets/images/favicon.ico',
  // Imágenes críticas y del carrusel (versiones WebP)
  // El sufijo ?v=${PHOTO_VERSION} debe coincidir con el de index.html / inline-scripts.js
  // para que los hits del navegador y del SW apunten a la misma entrada de caché.
  './assets/images/foto (1).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (1a).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (1b).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (2).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (2a).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (3).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (3a).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (4).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (5).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (6).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (7).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (8).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (9).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (10).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (11).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (12).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (13).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (14).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (15).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (16).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (17).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (18).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (19).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (20).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (21).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (22).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (23).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (24).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (25).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (26).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (27).webp?v=' + PHOTO_VERSION,
  './assets/images/foto (28).webp?v=' + PHOTO_VERSION,
  './assets/images/valores.webp',
  './assets/images/qr.webp',
  './assets/images/qrcred.webp',
  './assets/images/foto.webp?v=' + PHOTO_VERSION,
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
  // Ignorar peticiones que no son GET, de extensiones, o de archivos de video.
  // Los videos usan range requests (HTTP 206) que el SW no puede manejar correctamente.
  if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension://') || event.request.url.startsWith('moz-extension://') || event.request.url.includes('netlify/functions/') || /\.(mp4|webm|mov|ogg)(\?|$)/i.test(event.request.url)) {
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
