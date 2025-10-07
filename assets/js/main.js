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
        const delay = immediate ? 0 : 300;
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
    
    // Lógica para submenús 
    const submenuParentBtns = document.querySelectorAll('#mobile-dropdown .submenu-parent-btn');
    submenuParentBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const parent = btn.closest('.has-submenu');
            const siblings = [...parent.parentElement.children].filter(child => child !== parent && child.classList.contains('has-submenu'));
            siblings.forEach(sibling => sibling.classList.remove('submenu-open'));
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

    // --- LÓGICA CHATBOT (RESTAURADA) ---
    const chatToggleButton = document.getElementById('chat-toggle-button');
    const chatbotTooltip = document.getElementById('chatbot-tooltip');
    const chatPopup = document.getElementById('chat-popup');
    const chatBackdrop = document.getElementById('chat-backdrop');
    const chatCloseBtn = document.getElementById('chat-close-btn-internal');

    const toggleChat = () => {
        chatPopup.classList.toggle('hidden');
        chatBackdrop.classList.toggle('hidden');
        chatToggleButton.classList.toggle('hidden');
    };

    if (chatToggleButton) {
        chatToggleButton.addEventListener('click', toggleChat);
    }
    if (chatCloseBtn) {
        chatCloseBtn.addEventListener('click', toggleChat);
    }
    if(chatBackdrop) {
        chatBackdrop.addEventListener('click', toggleChat);
    }


    if (chatToggleButton && chatbotTooltip) {
        // Mostrar el tooltip por 15 segundos
        chatbotTooltip.classList.remove('hidden');
        chatbotTooltip.classList.add('show');
        
        setTimeout(() => {
            chatbotTooltip.classList.remove('show');
            setTimeout(() => {
                chatbotTooltip.classList.add('hidden');
            }, 500); // Duración de la transición de opacidad
        }, 15000); // 15 segundos
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
