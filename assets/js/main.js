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
        if (!mobileDropdown.classList.contains('show')) {
            mobileDropdown.classList.add('show');
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
                 if (window.innerWidth < 1024) {
                    mobileMenuOverlay.classList.add('hidden');
                }
            }
        }, delay);
    };

    const toggleMenu = () => {
        if (mobileDropdown.classList.contains('show')) {
            closeMenu(true);
        } else {
            openMenu();
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
            mobileMenuBtn.closest('#menu-container').addEventListener('mouseenter', openMenu);
            mobileMenuBtn.closest('#menu-container').addEventListener('mouseleave', () => closeMenu());
        }
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', () => closeMenu(true));
    }
    
    // --- LÓGICA DE SUBMENÚS (MODIFICADA) ---
    const submenuContainers = document.querySelectorAll('#mobile-dropdown .has-submenu');
    submenuContainers.forEach(parent => {
        const btn = parent.querySelector('.submenu-parent-btn');
        if (!btn) return;

        btn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            document.querySelectorAll('#mobile-dropdown .has-submenu.submenu-open').forEach(other => {
                if (other !== parent) {
                    other.classList.remove('submenu-open');
                }
            });
            parent.classList.toggle('submenu-open');
        });
    });

    // --- LÓGICA PARA SUBMENÚ A LA IZQUIERDA (Evitar clipping) ---
    document.querySelectorAll('.has-submenu-left').forEach(item => {
        // No se necesita JS, el hover se maneja por CSS
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

    // --- LÓGICA ASESOR PANEL ---
    const asesorPanel = document.getElementById('asesor-panel');
    const asesorCloseBtn = document.getElementById('asesor-close-btn');

    if(asesorPanel && asesorCloseBtn) {
        asesorCloseBtn.addEventListener('click', closeAsesorPanel);
    }
    
    // Background rotation and other initializations
    const backgroundImages = [
        'assets/images/foto (1).webp', 'assets/images/foto (2).webp', 'assets/images/foto (3).webp', 
        'assets/images/foto (4).webp', 'assets/images/foto (5).webp', 'assets/images/foto (6).webp',
        'assets/images/foto (7).webp', 'assets/images/foto (8).webp', 'assets/images/foto (9).webp'
    ];
    let currentImageIndex = 0;
    const homepageSection = document.getElementById('homepage-section');

    if (homepageSection) {
        setInterval(() => {
            if (document.body.classList.contains('homepage')) {
                currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
                homepageSection.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
            }
        }, 12000);
    }

    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                backToTopButton.classList.remove('hidden');
            } else {
                backToTopButton.classList.add('hidden');
            }
        };
        backToTopButton.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
    }


    showHomepage(); // Show homepage on initial load

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
        if (mobileMenuOverlay) mobileMenuOverlay.classList.add('hidden');
    }
}

// --- Handlers de navegación (globales) ---
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

// --- Page switching functions ---
function showHomepage() {
    document.getElementById('homepage-section').style.display = 'flex';
    document.getElementById('homepage-content-wrapper').style.display = 'block';
    document.getElementById('main-footer').style.display = 'block';
    document.getElementById('contenido').style.display = 'none';
    document.body.className = 'homepage background-transition';
    document.getElementById('credenciales-arrow-back-btn')?.classList.add('hidden');
    window.scrollTo(0, 0);
}

function showDirectiva() {
    document.getElementById('homepage-section').style.display = 'none';
    document.getElementById('homepage-content-wrapper').style.display = 'none';
    document.getElementById('main-footer').style.display = 'none';
    document.getElementById('contenido').style.display = 'block';
    document.getElementById('main-section').style.display = 'block';
    document.getElementById('credenciales-section')?.classList.remove('active');
    document.body.className = '';
    document.getElementById('credenciales-arrow-back-btn')?.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function showCredenciales() {
    document.getElementById('homepage-section').style.display = 'none';
    document.getElementById('homepage-content-wrapper').style.display = 'none';
    document.getElementById('main-footer').style.display = 'none';
    document.getElementById('contenido').style.display = 'block';
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('credenciales-section')?.classList.add('active');
    document.body.className = '';
    document.getElementById('credenciales-arrow-back-btn')?.classList.remove('hidden');
    window.scrollTo(0, 0);
}

// Handlers for Asesor Panel
window.showAsesorPanel = function() {
    const asesorPanel = document.getElementById('asesor-panel');
    if (asesorPanel) {
        asesorPanel.classList.add('show');
    }
    closeActiveMenu(); // Cierra el menú principal si está abierto
}

window.closeAsesorPanel = function() {
    const asesorPanel = document.getElementById('asesor-panel');
    if (asesorPanel) {
        asesorPanel.classList.remove('show');
    }
}
