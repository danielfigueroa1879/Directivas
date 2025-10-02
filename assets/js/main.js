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
    const pwaModal = document.getElementById('pwa-install-modal');
    
    if (pwaBanner) {
        pwaBanner.classList.remove('show');
    }
    
    if (deferredPrompt) {
        console.log('✅ PWA: Triggering installation prompt');
        try {
            await deferredPrompt.prompt();
            const choiceResult = await deferredPrompt.userChoice;
            
            console.log(`🎯 PWA: User choice: ${choiceResult.outcome}`);
            
            if (choiceResult.outcome === 'accepted') {
                console.log('✅ PWA: Installation accepted');
            } else {
                console.log('❌ PWA: Installation dismissed');
            }
            
            deferredPrompt = null;
        } catch (error) {
            console.error('💥 PWA: Error during installation:', error);
            if (pwaModal) {
                pwaModal.classList.add('show');
            }
        }
    } else {
        console.log('⚠️ PWA: No deferred prompt available, showing manual instructions');
        if (pwaModal) {
            pwaModal.classList.add('show');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM loaded, initializing PWA and UI components');
    
    const pwaBanner = document.getElementById('pwa-install-banner');
    const installButton = document.getElementById('install-button');
    const closeButton = document.getElementById('close-install-banner');
    const pwaModal = document.getElementById('pwa-install-modal');
    const closeInstallModalButton = document.getElementById('close-install-modal');

    const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;

    console.log(`📱 Device: Mobile=${isMobile()}, Standalone=${isStandalone()}, DeferredPrompt=${!!deferredPrompt}`);

    if (isMobile() && !isStandalone() && !bannerShown) {
        if (deferredPrompt) {
            showPWABanner();
        } else {
            setTimeout(() => {
                if (!bannerShown) {
                    showPWABanner();
                }
            }, 2000);
        }
    }

    if (installButton) {
        installButton.addEventListener('click', installPWA);
    }

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            console.log('❌ PWA: Banner closed by user');
            if (pwaBanner) {
                pwaBanner.classList.remove('show');
            }
        });
    }

    if (closeInstallModalButton) {
        closeInstallModalButton.addEventListener('click', () => {
            console.log('❌ PWA: Modal closed by user');
            if (pwaModal) {
                pwaModal.classList.remove('show');
            }
        });
    }

    // ANIMACIONES Y EFECTOS DE LA INTERFAZ
    const tramitarBtn = document.getElementById('tramitarCredencialesBtn');
    if (tramitarBtn) {
        setInterval(() => {
            tramitarBtn.classList.add('bounce-animation');
            setTimeout(() => {
                tramitarBtn.classList.remove('bounce-animation');
            }, 2000);
        }, 5000);
    }
    
    const sections = document.querySelectorAll('.section-card');
    sections.forEach(section => {
        section.addEventListener('click', () => {
            sections.forEach(s => s.classList.remove('clicked'));
            section.classList.add('clicked');
        });
    });

    const chatToggleButton = document.getElementById('chat-toggle-button');
    const chatbotTooltip = document.getElementById('chatbot-tooltip');

    if (chatToggleButton && chatbotTooltip) {
        chatbotTooltip.classList.remove('hidden');
        chatbotTooltip.classList.add('show');
        
        setTimeout(() => {
            chatbotTooltip.classList.remove('show');
            setTimeout(() => {
                chatbotTooltip.classList.add('hidden');
            }, 500);
        }, 15000);
    }

    console.log('✅ All components initialized successfully');
});

window.addEventListener('appinstalled', (e) => {
    console.log('🎉 PWA: App was installed successfully');
    deferredPrompt = null;
    bannerShown = false;
});

console.log('🔧 PWA Environment:', {
    userAgent: navigator.userAgent,
    standalone: window.matchMedia('(display-mode: standalone)').matches,
    navigatorStandalone: navigator.standalone,
    serviceWorker: 'serviceWorker' in navigator
});

// ===== FUNCIONES DEL MENÚ DE TRÁMITES =====

let tramitesDropdownOpen = false;
let hideMainMenuTimeout;
let hideSubmenuTimeout;

function showTramitesDropdown() {
    const tramitesDropdown = document.getElementById('tramites-dropdown');
    const tramitesArrow = document.getElementById('tramites-arrow');
    const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
    
    clearTimeout(hideMainMenuTimeout);
    if (!tramitesDropdownOpen) {
        tramitesDropdownOpen = true;
        tramitesDropdown.classList.remove('hidden');
        tramitesMenuBtn.classList.add('panel-active');
        setTimeout(() => {
            tramitesDropdown.classList.add('show');
            tramitesArrow.classList.add('rotate-180');
        }, 10);
    }
}

function hideTramitesDropdown() {
    const tramitesDropdown = document.getElementById('tramites-dropdown');
    const tramitesArrow = document.getElementById('tramites-arrow');
    const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
    const hasSubmenus = document.querySelectorAll('.has-submenu');

    hideMainMenuTimeout = setTimeout(() => {
        if (tramitesDropdownOpen) {
            tramitesDropdownOpen = false;
            tramitesDropdown.classList.remove('show');
            tramitesArrow.classList.remove('rotate-180');
            tramitesMenuBtn.classList.remove('panel-active');
            
            hasSubmenus.forEach(item => {
                const submenu = item.querySelector('.submenu');
                if (submenu && submenu.classList.contains('show')) {
                    submenu.classList.remove('show');
                    item.classList.remove('submenu-open');
                }
            });
            setTimeout(() => {
                tramitesDropdown.classList.add('hidden');
            }, 300);
        }
    }, 200);
}

function toggleTramitesDropdown() {
    if (tramitesDropdownOpen) {
        hideTramitesDropdown();
        clearTimeout(hideMainMenuTimeout);
        tramitesDropdownOpen = false;
        document.getElementById('tramites-dropdown').classList.remove('show');
        document.getElementById('tramites-arrow').classList.remove('rotate-180');
        document.getElementById('tramites-menu-btn').classList.remove('panel-active');
        document.querySelectorAll('.has-submenu').forEach(item => {
            const submenu = item.querySelector('.submenu');
            if (submenu && submenu.classList.contains('show')) {
                submenu.classList.remove('show');
                item.classList.remove('submenu-open');
            }
        });
        setTimeout(() => {
            document.getElementById('tramites-dropdown').classList.add('hidden');
        }, 300);
    } else {
        showTramitesDropdown();
    }
}

// CONFIGURACIÓN PRINCIPAL DEL MENÚ TRÁMITES
document.addEventListener('DOMContentLoaded', () => {
    const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
    const tramitesDropdown = document.getElementById('tramites-dropdown');
    const tramitesContainer = tramitesMenuBtn.parentElement;
    const hasSubmenus = document.querySelectorAll('.has-submenu');
    
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isDesktop = window.innerWidth > 1024;
    
    if (tramitesMenuBtn) {
        if (isDesktop && !isTouchDevice) {
            tramitesContainer.addEventListener('mouseenter', showTramitesDropdown);
            tramitesContainer.addEventListener('mouseleave', hideTramitesDropdown);
            
            tramitesDropdown.addEventListener('mouseenter', () => {
                clearTimeout(hideMainMenuTimeout);
            });
            tramitesDropdown.addEventListener('mouseleave', hideTramitesDropdown);
        } else {
            tramitesMenuBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                toggleTramitesDropdown();
            });
        }
    }

    // Event listeners para los submenús (incluye nivel 2)
    hasSubmenus.forEach(item => {
        const submenuButton = item.querySelector('.submenu-parent-btn') || item.querySelector('button');
        const submenu = item.querySelector('.submenu');
        const isNestedSubmenu = item.classList.contains('nested-submenu');

        if (submenuButton && submenu) {
            const showSubmenu = (event) => {
                clearTimeout(hideSubmenuTimeout);
                
                const parentSubmenu = item.closest('.submenu');
                if (parentSubmenu) {
                    const siblings = parentSubmenu.querySelectorAll(':scope > .has-submenu');
                    siblings.forEach(sibling => {
                        if (sibling !== item) {
                            const siblingSubmenu = sibling.querySelector('.submenu');
                            if (siblingSubmenu) {
                                siblingSubmenu.classList.remove('show');
                                sibling.classList.remove('submenu-open');
                            }
                        }
                    });
                } else {
                    hasSubmenus.forEach(otherItem => {
                        if (otherItem !== item && !otherItem.classList.contains('nested-submenu')) {
                            const otherSubmenu = otherItem.querySelector('.submenu');
                            if (otherSubmenu) {
                                otherSubmenu.classList.remove('show');
                                otherItem.classList.remove('submenu-open');
                            }
                        }
                    });
                }
                
                item.classList.add('submenu-open');
                
                const rect = submenuButton.getBoundingClientRect();
                
                if (window.innerWidth > 1024) {
                    if (isNestedSubmenu) {
                        submenu.style.left = `${rect.right + 15}px`;
                        submenu.style.top = `${rect.top - 10}px`;
                    } else {
                        submenu.style.left = `${rect.right + 1}px`;
                        submenu.style.top = `${rect.top}px`;
                    }
                    submenu.style.right = '';
                } else {
                    submenu.style.right = '20px';
                    submenu.style.left = '';
                    submenu.style.top = `${rect.bottom + 5}px`;
                }
                
                submenu.classList.add('show');
            };

            const hideSubmenu = () => {
                hideSubmenuTimeout = setTimeout(() => {
                    submenu.classList.remove('show');
                    item.classList.remove('submenu-open');
                }, 200);
            };

            if (isDesktop && !isTouchDevice) {
                item.addEventListener('mouseenter', showSubmenu);
                submenu.addEventListener('mouseenter', () => clearTimeout(hideSubmenuTimeout));
                item.addEventListener('mouseleave', hideSubmenu);
                submenu.addEventListener('mouseleave', hideSubmenu);
            } else {
                submenuButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    const isVisible = submenu.classList.contains('show');

                    const parentSubmenu = item.closest('.submenu');
                    if (parentSubmenu) {
                        const siblings = parentSubmenu.querySelectorAll(':scope > .has-submenu');
                        siblings.forEach(sibling => {
                            if (sibling !== item) {
                                const siblingSubmenu = sibling.querySelector('.submenu');
                                if (siblingSubmenu) {
                                    siblingSubmenu.classList.remove('show');
                                    sibling.classList.remove('submenu-open');
                                }
                            }
                        });
                    } else {
                        hasSubmenus.forEach(otherItem => {
                            if (otherItem !== item && !otherItem.classList.contains('nested-submenu')) {
                                const otherSubmenu = otherItem.querySelector('.submenu');
                                if (otherSubmenu) {
                                    otherSubmenu.classList.remove('show');
                                    otherItem.classList.remove('submenu-open');
                                }
                            }
                        });
                    }

                    if (!isVisible) {
                        showSubmenu(event);
                    } else {
                        submenu.classList.remove('show');
                        item.classList.remove('submenu-open');
                    }
                });
            }
        }
    });

    document.addEventListener('click', (event) => {
        if (tramitesDropdownOpen && !tramitesDropdown.contains(event.target) && !tramitesMenuBtn.contains(event.target)) {
            toggleTramitesDropdown();
        }
    });

    if (tramitesDropdown) {
         tramitesDropdown.classList.add('hidden');
    }
});

// Handlers de navegación de secciones
window.openNewLink = function(url) {
    window.open(url, '_blank');
    const tramitesDropdown = document.getElementById('tramites-dropdown');
    const tramitesArrow = document.getElementById('tramites-arrow');
    const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
    const hasSubmenus = document.querySelectorAll('.has-submenu');

    if (tramitesDropdown && !tramitesDropdown.classList.contains('hidden')) {
        tramitesDropdown.classList.remove('show');
        tramitesArrow.classList.remove('rotate-180');
        tramitesMenuBtn.classList.remove('panel-active');

        hasSubmenus.forEach(item => {
            const submenu = item.querySelector('.submenu');
            if (submenu && submenu.classList.contains('show')) {
                submenu.classList.remove('show');
            }
            item.classList.remove('submenu-open');
        });
        setTimeout(() => {
            tramitesDropdown.classList.add('hidden');
        }, 300);
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
window.handleMarcoLegal = function() { window.openNewLink('https://www.zosepcar.cl/OS10.php#leyes'); }
