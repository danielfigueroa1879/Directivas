/**
 * assets/js/main.js
 * Este archivo contiene la lógica para la interfaz de usuario,
 * animaciones y el banner para instalar la PWA.
 */

// Variables globales para PWA
let deferredPrompt = null;
let bannerShown = false;

// Registrar el evento beforeinstallprompt INMEDIATAMENTE
window.addEventListener('beforeinstallprompt', (e) => {
    console.log('🎯 PWA: beforeinstallprompt event captured');
    e.preventDefault();
    deferredPrompt = e;
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    
    if (isMobile && !isStandalone && !bannerShown) {
        showPWABanner();
    }
});

function showPWABanner() {
    const pwaBanner = document.getElementById('pwa-install-banner');
    if (!pwaBanner || bannerShown) return;
    
    console.log('📱 PWA: Showing install banner');
    bannerShown = true;
    pwaBanner.classList.add('show');
    
    setTimeout(() => {
        if (pwaBanner.classList.contains('show')) {
            pwaBanner.classList.remove('show');
        }
    }, 10000);
}

async function installPWA() {
    console.log('🔽 PWA: Install button clicked');
    const pwaBanner = document.getElementById('pwa-install-banner');
    if (pwaBanner) pwaBanner.classList.remove('show');
    
    if (deferredPrompt) {
        try {
            await deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`🎯 PWA: User choice: ${outcome}`);
            if (outcome === 'accepted') {
                console.log('✅ PWA: Installation accepted');
            } else {
                console.log('❌ PWA: Installation dismissed');
            }
            deferredPrompt = null;
        } catch (error) {
            console.error('💥 PWA: Error during installation:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // --- MANEJO DEL MENÚ (MÓVIL Y ESCRITORIO) ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDropdown = document.getElementById('mobile-dropdown');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    let menuTimeout;

    const openMenu = () => {
        clearTimeout(menuTimeout);
        if (mobileDropdown.classList.contains('hidden')) {
            mobileDropdown.classList.remove('hidden');
            setTimeout(() => mobileDropdown.classList.add('show'), 10);
            if (window.innerWidth < 1024) { // Solo mostrar overlay en móvil
                mobileMenuOverlay.classList.remove('hidden');
            }
        }
    };

    const closeMenu = (immediate = false) => {
        const delay = immediate ? 0 : 200;
        menuTimeout = setTimeout(() => {
            if (mobileDropdown.classList.contains('show')) {
                mobileDropdown.classList.remove('show');
                setTimeout(() => mobileDropdown.classList.add('hidden'), 300);
                 if (window.innerWidth < 1024) {
                    mobileMenuOverlay.classList.add('hidden');
                }
            }
        }, delay);
    };

    const toggleMenu = () => {
        if (mobileDropdown.classList.contains('hidden')) {
            openMenu();
        } else {
            closeMenu(true);
        }
    };

    if (mobileMenuBtn && mobileDropdown) {
        // Detener la propagación de clics dentro del menú para evitar que se cierre
        mobileDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Comportamiento de clic para todos los dispositivos
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Comportamiento de hover solo para escritorio (PC)
        if (window.innerWidth >= 1024) {
            mobileMenuBtn.addEventListener('mouseenter', openMenu);
            mobileMenuBtn.addEventListener('mouseleave', () => closeMenu());
            mobileDropdown.addEventListener('mouseenter', () => clearTimeout(menuTimeout));
            mobileDropdown.addEventListener('mouseleave', () => closeMenu());
        }
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', () => closeMenu(true));
    }
    
    // --- LÓGICA DE SUBMENÚS (MODIFICADA) ---
    const submenuContainers = document.querySelectorAll('#mobile-dropdown .has-submenu');
    submenuContainers.forEach(parent => {
        const btn = parent.querySelector('.submenu-parent-btn');
        const arrow = parent.querySelector('.submenu-arrow');
        if (!btn) return;

        // Lógica de CLIC para TODO el botón (abre o cierra el submenú)
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Previene que el menú principal se cierre
            
            // Cierra otros submenús abiertos
            document.querySelectorAll('#mobile-dropdown .has-submenu.submenu-open').forEach(other => {
                if (other !== parent) {
                    other.classList.remove('submenu-open');
                }
            });
            
            // Alterna el estado del submenú actual
            parent.classList.toggle('submenu-open');
        });

        // Lógica de HOVER solo para la FLECHA en ESCRITORIO
        if (window.innerWidth >= 1024 && arrow) {
            let submenuTimeout;

            // Abre el submenú cuando el cursor entra en la flecha
            arrow.addEventListener('mouseenter', (e) => {
                e.stopPropagation();
                clearTimeout(submenuTimeout);
                 // Cierra otros submenús abiertos
                document.querySelectorAll('#mobile-dropdown .has-submenu.submenu-open').forEach(other => {
                    if (other !== parent) {
                        other.classList.remove('submenu-open');
                    }
                });
                parent.classList.add('submenu-open');
            });
            
            // Programa el cierre cuando el cursor sale del elemento padre completo
            parent.addEventListener('mouseleave', () => {
                submenuTimeout = setTimeout(() => {
                    parent.classList.remove('submenu-open');
                }, 300);
            });

            // Cancela el cierre si el cursor entra de nuevo en el elemento padre (para poder navegar al submenú)
            parent.addEventListener('mouseenter', () => {
                 clearTimeout(submenuTimeout);
            });
        }
    });


    // --- LÓGICA PWA ---
    const installButton = document.getElementById('install-button');
    if (installButton) installButton.addEventListener('click', installPWA);

    const closeButton = document.getElementById('close-install-banner');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            const pwaBanner = document.getElementById('pwa-install-banner');
            if (pwaBanner) pwaBanner.classList.remove('show');
        });
    }

    console.log('✅ All components initialized successfully');
});

window.addEventListener('appinstalled', (e) => {
    console.log('🎉 PWA: App was installed successfully');
    deferredPrompt = null;
    bannerShown = false;
});

// Función global para cerrar el menú desde los enlaces
function closeActiveMenu() {
    const mobileDropdown = document.getElementById('mobile-dropdown');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    if (mobileDropdown && mobileDropdown.classList.contains('show')) {
        mobileDropdown.classList.remove('show');
        setTimeout(() => mobileDropdown.classList.add('hidden'), 300);
        if (mobileMenuOverlay) mobileMenuOverlay.classList.add('hidden');
    }
}

// Handlers de navegación (globales)
window.openNewLink = function(url) {
    window.open(url, '_blank');
    closeActiveMenu();
};
window.handleCerofilas = function() { openNewLink('https://dal5.short.gy/CFil'); }
window.handleDirectiva = function() { showDirectiva(); closeActiveMenu(); }
window.handleCredenciales = function() { showCredenciales(); closeActiveMenu(); }
window.handleCredencialIndependiente = function() { openNewLink('https://drive.google.com/uc?export=download&id=1nTEa4dzI1K-v0xf_nCjzUFEaRWnWnXYS'); }
window.handleValores = function() { openNewLink('https://dal5.short.gy/val'); }
window.handleValorPlan = function() { openNewLink('https://os10.short.gy/Pl4n'); }
window.handleBuscarCurso = function(url) { openNewLink(url); }
