/**
 * PLATAFORMA OS10 COQUIMBO - Main JavaScript
 * Versión Optimizada 3.0
 * 
 * Módulo principal para gestión de UI, PWA y navegación
 */

'use strict';

// ===== MÓDULO PWA =====
const PWAManager = {
    deferredPrompt: null,
    bannerShown: false,
    
    init() {
        this.registerServiceWorker();
        this.setupInstallPrompt();
        this.setupEventListeners();
        this.detectCapabilities();
    },
    
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(reg => console.log('✅ Service Worker registrado:', reg.scope))
                    .catch(err => console.error('❌ Error al registrar Service Worker:', err));
            });
        }
    },
    
    setupInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('🎯 PWA: beforeinstallprompt capturado');
            e.preventDefault();
            this.deferredPrompt = e;
            
            const isMobile = this.isMobileDevice();
            const isStandalone = this.isStandaloneMode();
            
            if (isMobile && !isStandalone && !this.bannerShown) {
                this.showInstallBanner();
            }
        });
        
        window.addEventListener('appinstalled', () => {
            console.log('🎉 PWA: Aplicación instalada exitosamente');
            this.deferredPrompt = null;
            this.bannerShown = false;
        });
    },
    
    setupEventListeners() {
        const installButton = document.getElementById('install-button');
        const closeButton = document.getElementById('close-install-banner');
        
        if (installButton) {
            installButton.addEventListener('click', () => this.install());
        }
        
        if (closeButton) {
            closeButton.addEventListener('click', () => this.hideInstallBanner());
        }
    },
    
    showInstallBanner() {
        const banner = document.getElementById('pwa-install-banner');
        if (!banner || this.bannerShown) return;
        
        console.log('📱 PWA: Mostrando banner de instalación');
        this.bannerShown = true;
        banner.classList.add('show');
        
        // Auto-ocultar después de 10 segundos
        setTimeout(() => {
            if (banner.classList.contains('show')) {
                banner.classList.remove('show');
            }
        }, 10000);
    },
    
    hideInstallBanner() {
        const banner = document.getElementById('pwa-install-banner');
        if (banner) {
            banner.classList.remove('show');
        }
        console.log('❌ PWA: Banner cerrado por el usuario');
    },
    
    async install() {
        console.log('🔽 PWA: Botón de instalación clickeado');
        this.hideInstallBanner();
        
        if (!this.deferredPrompt) {
            console.log('⚠️ PWA: No hay prompt disponible');
            return;
        }
        
        try {
            await this.deferredPrompt.prompt();
            const choiceResult = await this.deferredPrompt.userChoice;
            
            console.log(`🎯 PWA: Elección del usuario: ${choiceResult.outcome}`);
            
            if (choiceResult.outcome === 'accepted') {
                console.log('✅ PWA: Instalación aceptada');
            } else {
                console.log('❌ PWA: Instalación rechazada');
            }
            
            this.deferredPrompt = null;
        } catch (error) {
            console.error('💥 PWA: Error durante la instalación:', error);
        }
    },
    
    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    isStandaloneMode() {
        return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    },
    
    detectCapabilities() {
        const userAgent = navigator.userAgent;
        const isIOS = /iPad|iPhone|iPod/.test(userAgent);
        const isAndroid = /Android/.test(userAgent);
        const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);
        
        console.log('🔧 PWA Environment:', {
            userAgent: userAgent,
            standalone: this.isStandaloneMode(),
            serviceWorker: 'serviceWorker' in navigator,
            isIOS,
            isAndroid,
            isChrome
        });
    }
};

// ===== MÓDULO DE MENÚ =====
const MenuManager = {
    isOpen: false,
    hideTimeout: null,
    
    init() {
        this.setupEventListeners();
        this.setupKeyboardNavigation();
    },
    
    setupEventListeners() {
        const menuBtn = document.getElementById('tramites-menu-btn');
        const dropdown = document.getElementById('tramites-dropdown');
        
        if (!menuBtn || !dropdown) return;
        
        // Desktop: hover
        if (window.innerWidth >= 768) {
            menuBtn.addEventListener('mouseenter', () => this.show());
            menuBtn.addEventListener('mouseleave', () => this.scheduleHide());
            dropdown.addEventListener('mouseenter', () => this.cancelHide());
            dropdown.addEventListener('mouseleave', () => this.scheduleHide());
        }
        
        // Mobile: click
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });
        
        // Cerrar al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && e.target !== menuBtn) {
                this.hide();
            }
        });
        
        // Submenús
        this.setupSubmenus();
    },
    
    setupSubmenus() {
        const submenus = document.querySelectorAll('.has-submenu');
        
        submenus.forEach(item => {
            const button = item.querySelector('button');
            const submenu = item.querySelector('.submenu');
            
            if (!button || !submenu) return;
            
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = item.classList.contains('submenu-open');
                
                // Cerrar otros submenús
                submenus.forEach(other => {
                    if (other !== item) {
                        other.classList.remove('submenu-open');
                        const otherSubmenu = other.querySelector('.submenu');
                        if (otherSubmenu) {
                            otherSubmenu.classList.remove('show');
                        }
                    }
                });
                
                // Toggle este submenú
                if (isOpen) {
                    item.classList.remove('submenu-open');
                    submenu.classList.remove('show');
                } else {
                    item.classList.add('submenu-open');
                    submenu.classList.add('show');
                }
            });
        });
    },
    
    setupKeyboardNavigation() {
        const menuBtn = document.getElementById('tramites-menu-btn');
        
        if (!menuBtn) return;
        
        menuBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hide();
                menuBtn.focus();
            } else if (e.key === 'ArrowDown' || e.key === 'Enter') {
                e.preventDefault();
                this.show();
                this.focusFirstItem();
            }
        });
    },
    
    show() {
        clearTimeout(this.hideTimeout);
        
        if (this.isOpen) return;
        
        const dropdown = document.getElementById('tramites-dropdown');
        const arrow = document.getElementById('tramites-arrow');
        const menuBtn = document.getElementById('tramites-menu-btn');
        
        if (!dropdown) return;
        
        this.isOpen = true;
        dropdown.classList.remove('hidden');
        menuBtn.setAttribute('aria-expanded', 'true');
        
        setTimeout(() => {
            dropdown.classList.add('show');
            arrow?.classList.add('rotate-180');
        }, 10);
    },
    
    hide() {
        if (!this.isOpen) return;
        
        const dropdown = document.getElementById('tramites-dropdown');
        const arrow = document.getElementById('tramites-arrow');
        const menuBtn = document.getElementById('tramites-menu-btn');
        
        if (!dropdown) return;
        
        this.isOpen = false;
        dropdown.classList.remove('show');
        arrow?.classList.remove('rotate-180');
        menuBtn.setAttribute('aria-expanded', 'false');
        
        // Cerrar submenús
        const submenus = document.querySelectorAll('.has-submenu');
        submenus.forEach(item => {
            item.classList.remove('submenu-open');
            const submenu = item.querySelector('.submenu');
            if (submenu) {
                submenu.classList.remove('show');
            }
        });
        
        setTimeout(() => {
            dropdown.classList.add('hidden');
        }, 300);
    },
    
    toggle() {
        if (this.isOpen) {
            this.hide();
        } else {
            this.show();
        }
    },
    
    scheduleHide() {
        this.hideTimeout = setTimeout(() => this.hide(), 200);
    },
    
    cancelHide() {
        clearTimeout(this.hideTimeout);
    },
    
    focusFirstItem() {
        const dropdown = document.getElementById('tramites-dropdown');
        const firstButton = dropdown?.querySelector('button');
        firstButton?.focus();
    }
};

// ===== MÓDULO DE NAVEGACIÓN =====
const NavigationManager = {
    init() {
        this.setupPageTransitions();
        this.setupBackgroundRotation();
        this.setupTooltip();
    },
    
    setupPageTransitions() {
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    },
    
    setupBackgroundRotation() {
        const homepageSection = document.getElementById('homepage-section');
        if (!homepageSection) return;
        
        const images = [
            'assets/images/foto (1).webp',
            'assets/images/foto (2).webp',
            'assets/images/foto (3).webp',
            'assets/images/foto (4).webp',
            'assets/images/foto (5).webp'
        ];
        
        let currentIndex = 0;
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            homepageSection.style.backgroundImage = `url('${images[currentIndex]}')`;
        }, 8000);
    },
    
    setupTooltip() {
        const chatToggleButton = document.getElementById('chat-toggle-button');
        const chatbotTooltip = document.getElementById('chatbot-tooltip');
        
        if (!chatToggleButton || !chatbotTooltip) return;
        
        // Mostrar tooltip por 15 segundos
        chatbotTooltip.classList.remove('hidden');
        chatbotTooltip.classList.add('show');
        
        setTimeout(() => {
            chatbotTooltip.classList.remove('show');
            setTimeout(() => {
                chatbotTooltip.classList.add('hidden');
            }, 500);
        }, 15000);
    }
};

// ===== UTILIDADES =====
const Utils = {
    /**
     * Abre un enlace en una nueva pestaña
     */
    openNewLink(url) {
        if (!url) return;
        window.open(url, '_blank', 'noopener,noreferrer');
    },
    
    /**
     * Detecta soporte para WebP
     */
    detectWebPSupport() {
        const elem = document.createElement('canvas');
        
        if (elem.getContext && elem.getContext('2d')) {
            // was able or not to get WebP representation
            return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        }
        
        return false;
    },
    
    /**
     * Añade clase si no soporta WebP
     */
    addWebPClass() {
        if (!this.detectWebPSupport()) {
            document.documentElement.classList.add('no-webp');
        }
    }
};

// ===== FUNCIONES GLOBALES (para compatibilidad con HTML inline) =====
window.showDirectiva = function() {
    const directivaSection = document.querySelector('.directiva-section');
    const homepageSection = document.getElementById('homepage-section');
    const homepageContentWrapper = document.getElementById('homepage-content-wrapper');
    
    if (directivaSection) {
        directivaSection.classList.add('active');
        homepageSection?.classList.add('hidden');
        homepageContentWrapper?.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

window.showCredenciales = function() {
    const credencialesSection = document.querySelector('.credenciales-section');
    const homepageSection = document.getElementById('homepage-section');
    const homepageContentWrapper = document.getElementById('homepage-content-wrapper');
    
    if (credencialesSection) {
        credencialesSection.classList.add('active');
        homepageSection?.classList.add('hidden');
        homepageContentWrapper?.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

window.openNewLink = function(url) {
    Utils.openNewLink(url);
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando Plataforma OS10 Coquimbo v3.0');
    
    // Detectar soporte WebP
    Utils.addWebPClass();
    
    // Inicializar módulos
    PWAManager.init();
    MenuManager.init();
    NavigationManager.init();
    
    console.log('✅ Todos los módulos inicializados correctamente');
});

// ===== MANEJO DE ERRORES GLOBAL =====
window.addEventListener('error', (e) => {
    console.error('💥 Error global:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('💥 Promise rechazada:', e.reason);
});

// ===== PERFORMANCE MONITORING =====
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('📊 Métricas de rendimiento:', {
                'DOM Content Loaded': `${perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart}ms`,
                'Load Complete': `${perfData.loadEventEnd - perfData.loadEventStart}ms`,
                'Total Time': `${perfData.loadEventEnd - perfData.fetchStart}ms`
            });
        }, 0);
    });
}
