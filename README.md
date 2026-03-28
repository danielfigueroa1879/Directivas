# Directivas de Funcionamiento OS10 - PWA

Esta es una Aplicación Web Progresiva (PWA) que proporciona información y recursos sobre los requisitos para la directiva de funcionamiento de OS10 de Carabineros de Chile.

## Descripción

La aplicación ofrece acceso rápido a:
- Requisitos para presentar directivas de funcionamiento.
- Documentos descargables (solicitudes, plantillas, etc.).
- Requisitos para tramitar credenciales de empresa e independientes.
- Enlaces a normativas y decretos relevantes.

## Características

- **Diseño Responsivo:** Adaptado para una correcta visualización en computadoras, tablets y dispositivos móviles.
- **Capacidad Offline:** Gracias al uso de un Service Worker, la aplicación puede funcionar sin conexión a internet una vez que ha sido visitada por primera vez.
- **Instalable (PWA):** Se puede "instalar" en el escritorio o en la pantalla de inicio de un dispositivo móvil para un acceso rápido, como si fuera una aplicación nativa.
- **Modo Oscuro:** La interfaz se adapta automáticamente al tema claro u oscuro del sistema operativo del usuario.

## Estructura del Proyecto

El código ha sido refactorizado para mejorar su mantenibilidad y rendimiento, separando la estructura (HTML), los estilos (CSS) y la lógica (JavaScript).

/├── index.html              # Página principal├── credenciales.html       # Página de requisitos para credenciales├── manifest.json           # Manifiesto de la PWA├── sw.js                   # Service Worker para funcionalidad offline├── README.md               # Este archivo└── assets/├── css/│   ├── style.css       # Estilos para index.html│   └── credenciales.css# Estilos para credenciales.html├── js/│   ├── main.js         # Scripts para index.html│   └── credenciales.js # Scripts para credenciales.html└── images/└── (Imágenes y logos de la aplicación)
## Despliegue

Este proyecto está desplegado usando GitHub Pages y es accesible a través del enlace proporcionado.
