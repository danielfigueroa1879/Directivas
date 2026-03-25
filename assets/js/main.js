/**
 * assets/js/main.js
 * Este archivo contiene la lógica para la interfaz de usuario,
 * animaciones y el banner para instalar la PWA.
 */

// Variables globales para PWA
let deferredPrompt = null;
let bannerShown = false;

window.addEventListener('beforeinstallprompt', (e) => {
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
    bannerShown = true;
    pwaBanner.classList.add('show');
    setTimeout(() => {
        if (pwaBanner.classList.contains('show')) {
            pwaBanner.classList.remove('show');
        }
    }, 10000);
}

async function installPWA() {
    const pwaBanner = document.getElementById('pwa-install-banner');
    if (pwaBanner) pwaBanner.classList.remove('show');
    if (deferredPrompt) {
        try {
            await deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            deferredPrompt = null;
        } catch (error) {
            console.error('Error during PWA installation:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDropdown = document.getElementById('mobile-dropdown');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const desktopSubmenuPanel = document.getElementById('desktop-submenu-panel');
    let menuTimeout;
    let panelTimeout;

    // --- LÓGICA UNIFICADA DE MENÚ Y PANEL PARA ESCRITORIO ---

    const openMenu = () => {
        clearTimeout(menuTimeout);
        if (mobileDropdown.classList.contains('hidden')) {
            mobileDropdown.classList.remove('hidden');
            setTimeout(() => mobileDropdown.classList.add('show'), 10);
        }
    };

    const closeMenu = (immediate = false) => {
        const delay = immediate ? 0 : 300;
        menuTimeout = setTimeout(() => {
            if (mobileDropdown.classList.contains('show')) {
                mobileDropdown.classList.remove('show');
                setTimeout(() => mobileDropdown.classList.add('hidden'), 300);
            }
        }, delay);
    };
    
    const openPanel = (parentMenuItem) => {
        if (!window.matchMedia('(min-width: 1024px)').matches || !desktopSubmenuPanel) return;
        if (parentMenuItem.classList.contains('asesor-item') || parentMenuItem.classList.contains('jefe-item')) {
            if (desktopSubmenuPanel.classList.contains('is-open')) {
                desktopSubmenuPanel.classList.remove('is-open');
            }
            return;
        }
        clearTimeout(panelTimeout);
        const parentButton = parentMenuItem.querySelector('.submenu-parent-btn');
        const submenu = parentMenuItem.querySelector('.submenu');
        if (!parentButton || !submenu) return;

        const title = parentButton.firstChild.textContent.trim();
        const items = submenu.querySelectorAll('button, .submenu-title');
        desktopSubmenuPanel.innerHTML = '';

        const titleEl = document.createElement('h3');
        titleEl.className = 'panel-title';
        titleEl.textContent = title;
        desktopSubmenuPanel.appendChild(titleEl);

        // Create a container for the columns
        const columnsContainer = document.createElement('div');
        columnsContainer.className = 'panel-columns';
        desktopSubmenuPanel.appendChild(columnsContainer);

        let currentColumn = document.createElement('div');
        columnsContainer.appendChild(currentColumn);

        items.forEach(item => {
            if (item.classList.contains('submenu-title')) {
                // If there's already content in the current column, create a new one
                if (currentColumn.children.length > 0) {
                    currentColumn = document.createElement('div');
                    columnsContainer.appendChild(currentColumn);
                }
                const subtitleEl = document.createElement('h4');
                subtitleEl.className = 'panel-submenu-title';
                subtitleEl.textContent = item.textContent;
                currentColumn.appendChild(subtitleEl);
            } else {
                const newButton = item.cloneNode(true);
                newButton.className = 'panel-button';
                const originalOnclick = item.getAttribute('onclick');
                if (originalOnclick) {
                    newButton.setAttribute('onclick', originalOnclick);
                }
                currentColumn.appendChild(newButton);
            }
        });
        desktopSubmenuPanel.classList.add('is-open');
    };

    const closePanel = (immediate = false) => {
        if (!desktopSubmenuPanel) return;
        const delay = immediate ? 0 : 300;
        panelTimeout = setTimeout(() => {
            desktopSubmenuPanel.classList.remove('is-open');
        }, delay);
    };

    const closeEverything = (immediate = false) => {
        closeMenu(immediate);
        closePanel(immediate);
    };

    // --- ASIGNACIÓN DE EVENTOS ---
    // NOTA: El menú hamburguesa y móvil es manejado exclusivamente por 
    // el script en index.html (líneas 2412-2596) para evitar conflictos.
    // main.js solo maneja el panel de submenús de escritorio.

    if (window.matchMedia('(min-width: 1024px)').matches) {
        // Solo eventos para el panel lateral de escritorio (NO el botón hamburguesa)
        if (desktopSubmenuPanel) {
            desktopSubmenuPanel.addEventListener('mouseenter', () => {
                clearTimeout(menuTimeout);
                clearTimeout(panelTimeout);
            });
            desktopSubmenuPanel.addEventListener('mouseleave', () => closePanel(true));
        }

        // Hover en items del dropdown abre el panel lateral
        const menuItemsWithSubmenu = document.querySelectorAll('#mobile-dropdown .has-submenu');
        menuItemsWithSubmenu.forEach(item => {
            item.addEventListener('mouseenter', () => openPanel(item));
        });

    } 
    // El bloque else para móvil está deshabilitado - manejado por index.html

    // --- LÓGICA DE SUBMENÚS (ACORDEÓN EN MÓVIL) ---
    // DESHABILITADO: Manejado por index.html (líneas 2530-2559) para evitar conflictos
    /* CÓDIGO ORIGINAL COMENTADO:
    const submenuContainers = document.querySelectorAll('#mobile-dropdown .has-submenu');
    submenuContainers.forEach(parent => {
        const btn = parent.querySelector('.submenu-parent-btn');
        if (!btn) return;
        btn.addEventListener('click', (e) => {
            if (window.innerWidth < 1024) { // Solo comportamiento de acordeón en móvil
                if (!e.currentTarget.closest('.asesor-item') && !e.currentTarget.closest('.jefe-item')) {
                    e.stopPropagation();
                }
                document.querySelectorAll('#mobile-dropdown .has-submenu.submenu-open').forEach(other => {
                    if (other !== parent && !other.classList.contains('asesor-item') && !other.classList.contains('jefe-item')) {
                        other.classList.remove('submenu-open');
                    }
                });
                if (!parent.classList.contains('asesor-item') && !parent.classList.contains('jefe-item')) {
                    parent.classList.toggle('submenu-open');
                }
            }
        });
    });
    */

    // --- LÓGICA PARA MEGAMENÚS (Asesor, Jefe, etc.) ---
    const setupMegamenu = (config) => {
        const item = document.querySelector(config.itemSelector);
        const megamenu = document.getElementById(config.megamenuId);
        const closeBtn = document.getElementById(config.closeBtnId);
        const triggerBtn = document.getElementById(config.triggerBtnId);

        const openMegamenu = () => {
            if (!item || !megamenu) return;
            closeAllMegamenus(config.megamenuId);
            // En móvil NO cerramos el menú principal para permitir navegación
            item.classList.add('megamenu-open');
            megamenu.classList.add('show');
        };

        const closeMegamenu = (immediate = true) => {
            if (!item || !megamenu) return;
            item.classList.remove('megamenu-open');
            megamenu.classList.remove('show');
        };

        if (item && megamenu && triggerBtn) {
            triggerBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = item.classList.contains('megamenu-open');
                if (isOpen) closeMegamenu();
                else openMegamenu();
            });
            if (closeBtn) closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeMegamenu();
            });
        }
    };

    const closeAllMegamenus = (excludeId = null) => {
        document.querySelectorAll('.asesor-megamenu').forEach(menu => {
            if (menu.id !== excludeId) {
                menu.classList.remove('show');
                const itemClass = menu.id.replace('-megamenu', '-item');
                document.querySelector(`.${itemClass}`)?.classList.remove('megamenu-open');
            }
        });
    };

    setupMegamenu({ itemSelector: '.asesor-item', megamenuId: 'asesor-megamenu', closeBtnId: 'asesor-close-btn', triggerBtnId: 'asesor-trigger-btn' });
    setupMegamenu({ itemSelector: '.jefe-item', megamenuId: 'jefe-megamenu', closeBtnId: 'jefe-close-btn', triggerBtnId: 'jefe-trigger-btn' });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.has-submenu') && !e.target.closest('.asesor-megamenu')) closeAllMegamenus();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllMegamenus(); });

    // --- LÓGICA PWA ---
    const installButton = document.getElementById('install-button');
    if (installButton) installButton.addEventListener('click', installPWA);
    const closeButton = document.getElementById('close-install-banner');
    if (closeButton) closeButton.addEventListener('click', () => {
        const pwaBanner = document.getElementById('pwa-install-banner');
        if (pwaBanner) pwaBanner.classList.remove('show');
    });

    // --- LÓGICA MODAL DE AVISO ---
    const avisoModal = document.getElementById('aviso-modal-overlay');
    const closeModalButton = document.getElementById('modal-close-button');
    const acceptModalButton = document.getElementById('modal-accept-button');

    const openAvisoModal = () => {
        if (avisoModal) avisoModal.classList.add('show');
    };

    const closeAvisoModal = () => {
        if (avisoModal) avisoModal.classList.remove('show');
    };

    // Mostrar la modal 2 segundos después de que la página cargue
    setTimeout(openAvisoModal, 2000);

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeAvisoModal);
    }

    if (acceptModalButton) {
        acceptModalButton.addEventListener('click', closeAvisoModal);
    }
    
    if (avisoModal) {
        avisoModal.addEventListener('click', (event) => {
            // Si el clic es en el overlay (el fondo) y no en el contenido
            if (event.target === avisoModal) {
                closeAvisoModal();
            }
        });
    }


    // --- INICIALIZACIÓN DE CARRUSELES ---
    // Defer con rAF para evitar reflows forzados durante el render inicial.
    // Los carruseles están debajo del fold → no afecta LCP ni FCP.
    if (typeof initializeCarousel === 'function') {
        requestAnimationFrame(() => {
            initializeCarousel({ containerSelector: '#tramites-principales .carousel-container', cardSelector: '.carousel-card', dotsSelector: '#tramites-principales .pagination-dots', autoScroll: 'mobile' });
            initializeCarousel({ containerSelector: '#componentes-seguridad .carousel-container', cardSelector: '.carousel-card', dotsSelector: '#componentes-seguridad .pagination-dots', autoScroll: 'mobile' });
            initializeCarousel({ containerSelector: '#capacitacion .carousel-container', cardSelector: '.carousel-card', dotsSelector: '#capacitacion .pagination-dots', autoScroll: 'mobile' });
            initializeCarousel({ containerSelector: '#servicios-adicionales .carousel-container', cardSelector: '.carousel-card', dotsSelector: '#servicios-adicionales .pagination-dots', autoScroll: 'mobile' });
        });
    }

    console.log('✅ All components initialized successfully');
});

window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    bannerShown = false;
});

function closeActiveMenu() {
    // NOTA: En móvil (< 1024px), el menú hamburguesa es controlado por index.html
    // Solo cerramos megamenús y panel de escritorio aquí
    
    // Cierra megamenús (tanto en móvil como escritorio)
    document.querySelectorAll('.asesor-megamenu').forEach(menu => menu.classList.remove('show'));
    document.querySelectorAll('.has-submenu').forEach(item => item.classList.remove('megamenu-open'));
    
    // Cierra panel lateral de escritorio
    const desktopPanel = document.getElementById('desktop-submenu-panel');
    if (desktopPanel && desktopPanel.classList.contains('is-open')) {
        desktopPanel.classList.remove('is-open');
    }
    
    // Solo cerrar menú móvil en escritorio (>= 1024px)
    // En móvil, el script de index.html maneja esto
    if (window.matchMedia('(min-width: 1024px)').matches) {
        const mobileDropdown = document.getElementById('mobile-dropdown');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        if (mobileDropdown && mobileDropdown.classList.contains('show')) {
            mobileDropdown.classList.remove('show');
            setTimeout(() => mobileDropdown.classList.add('hidden'), 300);
            if (mobileMenuOverlay) mobileMenuOverlay.classList.add('hidden');
        }
    }
}

// Handlers de navegación globales
window.openNewLink = function(url) { window.open(url, '_blank'); closeActiveMenu(); };
window.handleCerofilas = function() { openNewLink('https://dal5.short.gy/CFil'); };
window.handleDirectiva = function() { if(typeof showDirectiva === 'function') showDirectiva(); closeActiveMenu(); };
window.handleCredenciales = function() { if(typeof showCredenciales === 'function') showCredenciales(); closeActiveMenu(); };
window.handleCredencialIndependiente = function() { openNewLink('https://drive.google.com/uc?export=download&id=1cP51FJEqrndm3RDNLuDUFCR8zlGIBrwb'); };
window.handleValores = function() { openNewLink('https://dal5.short.gy/val'); };
window.handleValorPlan = function() { openNewLink('https://os10.short.gy/Pl4n'); };
window.handleBuscarCurso = function(url) { openNewLink(url); };
// FUNCIÓN PARA SPD - Abre portal externo
window.handleSPD = function() { window.open('https://segprivada.minsegpublica.gob.cl/', '_blank'); closeActiveMenu(); };
