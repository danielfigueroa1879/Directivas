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
    // --- MANEJO DEL MENÚ ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDropdown = document.getElementById('mobile-dropdown');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = mobileDropdown.classList.contains('hidden');
            if (isHidden) {
                mobileDropdown.classList.remove('hidden');
                setTimeout(() => mobileDropdown.classList.add('show'), 10);
                mobileMenuOverlay.classList.remove('hidden');
            } else {
                mobileDropdown.classList.remove('show');
                setTimeout(() => mobileDropdown.classList.add('hidden'), 300);
                mobileMenuOverlay.classList.add('hidden');
            }
        });
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', () => {
            mobileDropdown.classList.remove('show');
            setTimeout(() => mobileDropdown.classList.add('hidden'), 300);
            mobileMenuOverlay.classList.add('hidden');
        });
    }

    const submenuParentBtns = document.querySelectorAll('.submenu-parent-btn');
    submenuParentBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const parent = btn.closest('.has-submenu');
            parent.classList.toggle('submenu-open');
        });
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

// Handlers de navegación de secciones (Hacemos que sean globales)
window.openNewLink = function(url) {
    window.open(url, '_blank');
    const mobileDropdown = document.getElementById('mobile-dropdown');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    if (mobileDropdown && mobileMenuOverlay) {
        mobileDropdown.classList.remove('show');
        setTimeout(() => mobileDropdown.classList.add('hidden'), 300);
        mobileMenuOverlay.classList.add('hidden');
    }
};

window.handleCerofilas = function() { window.openNewLink('https://dal5.short.gy/CFil'); }
window.handleDirectiva = function() { showDirectiva(); }
window.handleCredenciales = function() { showCredenciales(); }
window.handleCredencialIndependiente = function() {
    const link = document.querySelector('.indep-btn');
    if (link) window.openNewLink(link.href);
}
window.handleValores = function() {
    const link = document.getElementById('valoresImageLink');
    if (link) window.openNewLink(link.href);
}
window.handleValorPlan = function() { window.openNewLink('https://os10.short.gy/Pl4n'); }
window.handleCursoFormacion = function() { window.openNewLink('https://dal5.short.gy/Form'); }
window.handleBuscarCurso = function(url) { window.openNewLink(url); }
