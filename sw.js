// sw.js - Service Worker
const CACHE_NAME = 'directivas-os10-cache-v1.4'; // Increment version for updates

// Lista de archivos y recursos a cachear durante la instalación
const urlsToCache = [
  '/',
  './index.html',
  './manifest.json',
  './assets/css/styles.css', // CORREGIDO: era style.css
  './assets/css/credenciales.css',
  './assets/js/main.js',
  './assets/js/inicio.js', // AGREGADO: archivo que existe
  './assets/js/credenciales.js',
  './assets/js/chatbot.js', // AGREGADO: archivo que existe
  './rules/chatbot-rules.js', // AGREGADO: archivo que existe
  './assets/images/icon-192x192.png',
  './assets/images/icon-512x512.png',
  './assets/images/logo-os10.png',
  './assets/images/101.jpg',
  './assets/images/qr.png',
  './assets/images/qrcred.png',
  './assets/images/foto.jpg',
  './assets/images/valores.png',
  './assets/images/poli.png', // AGREGADO: imagen del chatbot
  './assets/images/favicon.ico', // AGREGADO
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
          console.log(`📦 Desde caché: ${event.request.url}`);
          return cachedResponse;
        }

        // Si no está en la caché, vamos a la red.
        console.log(`🌐 Desde red: ${event.request.url}`);
        return fetch(event.request).then((networkResponse) => {
            // Solo cachear respuestas exitosas
            if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
              return caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
              });
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
