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
        mobileDropdown.classList.add('show');
        if (window.innerWidth < 1024) {
            mobileMenuOverlay.classList.remove('hidden');
        }
    };

    const closeMenu = (immediate = false) => {
        const delay = immediate ? 0 : 300;
        menuTimeout = setTimeout(() => {
            mobileDropdown.classList.remove('show');
            if (window.innerWidth < 1024) {
                mobileMenuOverlay.classList.add('hidden');
            }
            document.querySelectorAll('.has-submenu.submenu-open').forEach(openSubmenu => {
                openSubmenu.classList.remove('submenu-open');
            });
        }, delay);
    };

    const toggleMenu = () => {
        if (mobileDropdown.classList.contains('show')) {
            closeMenu(true);
        } else {
            openMenu();
        }
    };

    // --- Event Listeners ---
    if (mobileMenuBtn && mobileDropdown) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        if (window.innerWidth >= 1024) {
            const menuContainer = document.getElementById('menu-container');
            menuContainer.addEventListener('mouseenter', openMenu);
            menuContainer.addEventListener('mouseleave', () => closeMenu());
        }
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', () => closeMenu(true));
    }
    
    document.addEventListener('click', (e) => {
         if (mobileDropdown && !mobileDropdown.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
             closeMenu(true);
         }
    });

    document.querySelectorAll('.submenu-parent-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const parent = btn.closest('.has-submenu');
            const wasOpen = parent.classList.contains('submenu-open');
            
            document.querySelectorAll('.has-submenu').forEach(other => {
                other.classList.remove('submenu-open');
            });

            if (!wasOpen) {
                parent.classList.add('submenu-open');
            }
        });
    });
    
    // --- LÓGICA DEL PANEL DE ASESOR ---
    const showAsesorBtn = document.getElementById('show-asesor-btn');
    const asesorPanel = document.getElementById('asesor-panel');
    const asesorCloseBtn = document.getElementById('asesor-close-btn');

    if (showAsesorBtn && asesorPanel && asesorCloseBtn) {
        showAsesorBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            asesorPanel.classList.add('show');
            closeMenu(true); // Cierra el menú principal
        });

        asesorCloseBtn.addEventListener('click', () => {
            asesorPanel.classList.remove('show');
        });
    }


    // --- LÓGICA PWA ---
    const installButton = document.getElementById('install-button');
    if (installButton) installButton.addEventListener('click', installPWA);

    const closeButton = document.getElementById('close-install-banner');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            document.getElementById('pwa-install-banner')?.classList.remove('show');
        });
    }

    console.log('✅ All components initialized successfully');
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

// Handlers de navegación (globales)
window.openNewLink = function(url) {
    window.open(url, '_blank');
    closeActiveMenu();
};

window.showHomepage = function() {
    document.getElementById('homepage-section').style.display = 'flex';
    document.getElementById('homepage-content-wrapper').style.display = 'block';
    document.getElementById('main-footer').style.display = 'block';
    document.getElementById('contenido').style.display = 'none';
    document.body.className = 'homepage background-transition';
    document.getElementById('credenciales-arrow-back-btn')?.classList.add('hidden');
    window.scrollTo(0, 0);
};

window.showDirectiva = function() {
    document.getElementById('homepage-section').style.display = 'none';
    document.getElementById('homepage-content-wrapper').style.display = 'none';
    document.getElementById('main-footer').style.display = 'none';
    document.getElementById('contenido').style.display = 'block';
    document.getElementById('main-section').style.display = 'block';
    document.getElementById('credenciales-section')?.classList.remove('active');
    document.body.className = '';
    document.getElementById('credenciales-arrow-back-btn')?.classList.remove('hidden');
    window.scrollTo(0, 0);
    closeActiveMenu();
};

window.showCredenciales = function() {
    document.getElementById('homepage-section').style.display = 'none';
    document.getElementById('homepage-content-wrapper').style.display = 'none';
    document.getElementById('main-footer').style.display = 'none';
    document.getElementById('contenido').style.display = 'block';
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('credenciales-section')?.classList.add('active');
    document.body.className = '';
    document.getElementById('credenciales-arrow-back-btn')?.classList.remove('hidden');
    window.scrollTo(0, 0);
    closeActiveMenu();
};

window.showAsesorPanel = function() {
    const asesorPanel = document.getElementById('asesor-panel');
    if (asesorPanel) {
        asesorPanel.classList.add('show');
        closeActiveMenu();
    }
};

window.handleCerofilas = function() { openNewLink('https://dal5.short.gy/CFil'); };
window.handleValores = function() { openNewLink('https://dal5.short.gy/val'); };
window.handleValorPlan = function() { openNewLink('https://os10.short.gy/Pl4n'); };
window.handleBuscarCurso = function(url) { openNewLink(url); };
