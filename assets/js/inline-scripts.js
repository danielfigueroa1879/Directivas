/* ============================================================
   BLOQUE 1: Manejar submenús de la barra verde (desktop navbar)
   (extraído desde index.html, línea 1948)
============================================================ */
// Manejar submenús de la barra verde
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.desktop-nav-item');
    let closeTimeout;
    let currentOpenSubmenu = null;
    
    // Función para cerrar todos los submenús
    function closeAllSubmenus() {
        navItems.forEach(item => {
            const submenu = item.querySelector('.desktop-submenu');
            if (submenu) {
                submenu.style.opacity = '0';
                submenu.style.visibility = 'hidden';
                submenu.style.pointerEvents = 'none';
            }
        });
        currentOpenSubmenu = null;
    }
    
    navItems.forEach(item => {
        const submenu = item.querySelector('.desktop-submenu');
        if (!submenu) return;
        
        // Posicionar el submenú
        function positionSubmenu() {
            const rect = item.getBoundingClientRect();
            const submenuWidth = submenu.offsetWidth;
            const left = rect.left + (rect.width / 2) - (submenuWidth / 2);
            
            submenu.style.left = left + 'px';
            submenu.style.top = '93px'; // POSICIÓN FIJA
        }
        
        // Abrir submenú
        function openSubmenu() {
            clearTimeout(closeTimeout);
            // Leer geometría ANTES de cualquier escritura para evitar reflow forzado
            positionSubmenu();
            // Cerrar otros submenús después de las lecturas
            if (currentOpenSubmenu && currentOpenSubmenu !== submenu) {
                currentOpenSubmenu.style.opacity = '0';
                currentOpenSubmenu.style.visibility = 'hidden';
                currentOpenSubmenu.style.pointerEvents = 'none';
                currentOpenSubmenu.style.transform = 'translateY(-6px)';
            }
            submenu.style.visibility = 'visible';
            submenu.style.transition = 'opacity 0.16s cubic-bezier(0.16,1,0.3,1), transform 0.18s cubic-bezier(0.16,1,0.3,1), visibility 0s linear 0s';
            requestAnimationFrame(() => {
                submenu.style.opacity = '1';
                submenu.style.transform = 'translateY(0)';
                submenu.style.pointerEvents = 'auto';
            });
            currentOpenSubmenu = submenu;
        }
        
        // Cerrar submenú SOLO si sales completamente
        function closeSubmenu() {
            // Cancelar cualquier timeout existente primero
            clearTimeout(closeTimeout);
            closeTimeout = setTimeout(() => {
                submenu.style.opacity = '0';
                submenu.style.transform = 'translateY(-6px)';
                submenu.style.pointerEvents = 'none';
                setTimeout(() => { submenu.style.visibility = 'hidden'; }, 160);
                if (currentOpenSubmenu === submenu) {
                    currentOpenSubmenu = null;
                }
            }, 120); // Delay reducido — se cancela si vuelves al menú
        }
        
        // Cancelar cierre - función clave
        function keepOpen() {
            clearTimeout(closeTimeout);
        }
        
        // Eventos para el item del menú
        item.addEventListener('mouseenter', openSubmenu);
        item.addEventListener('mouseleave', closeSubmenu);
        
        // Eventos para el submenú - mantener abierto SIEMPRE que estés dentro
        submenu.addEventListener('mouseenter', keepOpen);
        submenu.addEventListener('mouseleave', (e) => {
            // CRÍTICO: Solo cerrar si NO vas a:
            // 1. Un hijo del submenu
            // 2. Un submenu lateral
            // 3. El item del menú padre
            const relatedTarget = e.relatedTarget;
            
            // Si vas a un elemento dentro del submenu o sus hijos, NO cerrar
            if (submenu.contains(relatedTarget)) {
                keepOpen();
                return;
            }
            
            // Si vas al item padre del menú, NO cerrar
            if (item.contains(relatedTarget)) {
                keepOpen();
                return;
            }
            
            // Si vas a un submenu lateral, NO cerrar
            const allSideMenus = submenu.querySelectorAll('.desktop-submenu-side');
            for (let sideMenu of allSideMenus) {
                if (sideMenu.contains(relatedTarget)) {
                    keepOpen();
                    return;
                }
            }
            
            // Solo si realmente sales de TODAS las áreas, entonces cerrar
            closeSubmenu();
        });
        submenu.addEventListener('scroll', keepOpen);  // Mantener abierto al hacer scroll
        
        // CRÍTICO: Prevenir cierre al hacer click DENTRO del submenu
        submenu.addEventListener('click', (e) => {
            keepOpen();
            // No hacer stopPropagation para permitir que los onclick funcionen
        });
        
        // Eventos para TODOS los items dentro del submenú - SOLO keepOpen
        const allSubmenuItems = submenu.querySelectorAll('.desktop-submenu-item, .desktop-submenu-item-with-side, .desktop-submenu-title, .desktop-submenu-divider');
        allSubmenuItems.forEach(subItem => {
            subItem.addEventListener('mouseenter', keepOpen);
            
            // CRÍTICO: Prevenir cierre al hacer click en items
            if (subItem.classList.contains('desktop-submenu-item')) {
                subItem.addEventListener('click', (e) => {
                    keepOpen();  // Cancelar cualquier timeout de cierre
                    // El menú permanecerá abierto después del click
                });
            }
            // NO agregar mouseleave aquí - dejamos que el submenu padre lo maneje
        });
        
        // Eventos específicos para items con submenú lateral
        const submenuItemsWithSide = submenu.querySelectorAll('.desktop-submenu-item-with-side');
        submenuItemsWithSide.forEach(subItem => {
            const sideMenu = subItem.querySelector('.desktop-submenu-side');
            if (sideMenu) {
                // Mantener abierto cuando entras al menú lateral
                sideMenu.addEventListener('mouseenter', keepOpen);
                sideMenu.addEventListener('mouseleave', (e) => {
                    // CRÍTICO: Solo cerrar si NO vas a:
                    // 1. Un hijo del sideMenu
                    // 2. El item padre que abre este sideMenu
                    // 3. El submenu principal
                    const relatedTarget = e.relatedTarget;
                    
                    // Si vas a un elemento dentro del sideMenu, NO cerrar
                    if (sideMenu.contains(relatedTarget)) {
                        keepOpen();
                        return;
                    }
                    
                    // Si vas al item padre o al submenu principal, NO cerrar
                    if (subItem.contains(relatedTarget) || submenu.contains(relatedTarget)) {
                        keepOpen();
                        return;
                    }
                    
                    // Solo si realmente sales, entonces cerrar
                    closeSubmenu();
                });
                
                // CRÍTICO: Prevenir cierre al hacer click DENTRO del side menu
                sideMenu.addEventListener('click', (e) => {
                    keepOpen();
                    e.stopPropagation(); // No propagar el click al contenedor padre
                });
                
                // CRÍTICO: Prevenir cierre al hacer scroll en el side menu
                sideMenu.addEventListener('scroll', keepOpen);
                
                // Eventos para items dentro del menú lateral
                const sideMenuItems = sideMenu.querySelectorAll('.desktop-submenu-item');
                sideMenuItems.forEach(sideItem => {
                    // MANTENER ABIERTO al hacer hover
                    sideItem.addEventListener('mouseenter', keepOpen);
                    
                    // CRÍTICO: Prevenir cierre al hacer click
                    sideItem.addEventListener('click', (e) => {
                        keepOpen();  // Cancelar cualquier timeout de cierre
                        // El menú se quedará abierto hasta que el mouse salga
                    });
                    
                    // NO agregar mouseleave aquí - dejamos que el sideMenu padre lo maneje
                });
            }
        });
    });
    
    // Cerrar todos los submenús si el mouse sale de la barra de navegación
    const navbar = document.querySelector('.desktop-navbar');
    if (navbar) {
        navbar.addEventListener('mouseleave', (e) => {
            const relatedTarget = e.relatedTarget;
            
            // CRÍTICO: Si el mouse va a un submenu abierto, NO cerrar
            if (currentOpenSubmenu) {
                // Verificar si vas al submenu principal
                if (currentOpenSubmenu.contains(relatedTarget)) {
                    clearTimeout(closeTimeout);
                    return;
                }
                
                // Verificar si vas a algún submenu lateral dentro del submenu abierto
                const sidemenus = currentOpenSubmenu.querySelectorAll('.desktop-submenu-side');
                for (let sidemenu of sidemenus) {
                    if (sidemenu.contains(relatedTarget)) {
                        clearTimeout(closeTimeout);
                        return;
                    }
                }
            }
            
            // Solo si sales a un área completamente diferente, iniciar timeout
            clearTimeout(closeTimeout);
            closeTimeout = setTimeout(closeAllSubmenus, 500);
        });
        
        // Cancelar cierre si vuelves al navbar
        navbar.addEventListener('mouseenter', () => {
            clearTimeout(closeTimeout);
        });
    }
});


/* ============================================================
   BLOQUE 2: Contador de visitas REST API Firestore
   (extraído desde index.html, línea 3459)
============================================================ */
// Contador de visitas: REST API directa → elimina 34 KiB de Firebase SDK.
        // Espera al evento load + 3s para no competir con LCP/FCP.
        window.addEventListener('load', () => setTimeout(async () => {
            const counterSpan = document.getElementById('visit-counter');
            const PROJECT = 'cuenta-946e2';
            const KEY = 'AIzaSyBB2AegLOQ-b6ZGI_cuPycSFJFuRsUlu5U';
            const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;
            const DOC_PATH = `page-visits/${PROJECT}/visits/counter`;
            const DOC_NAME = `projects/${PROJECT}/databases/(default)/documents/${DOC_PATH}`;
            try {
                // GET (valor actual) + commit increment atómico en paralelo
                const [getRes] = await Promise.all([
                    fetch(`${BASE}/${DOC_PATH}?key=${KEY}`),
                    fetch(`${BASE}:commit?key=${KEY}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            writes: [{
                                transform: {
                                    document: DOC_NAME,
                                    fieldTransforms: [{ fieldPath: 'count', increment: { integerValue: '1' } }]
                                }
                            }]
                        })
                    })
                ]);
                if (getRes.ok) {
                    const snap = await getRes.json();
                    const count = parseInt(snap.fields?.count?.integerValue ?? '0') + 1;
                    if (counterSpan) counterSpan.textContent = count.toLocaleString('es-CL');
                } else {
                    if (counterSpan) counterSpan.textContent = '1';
                }
            } catch {
                if (counterSpan) counterSpan.textContent = '—';
            }
        }, 3000)); // 3s después de load → fuera de la ventana LCP


/* ============================================================
   BLOQUE 3: Service Worker registration
   (extraído desde index.html, línea 3504)
============================================================ */
if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
            });
        }


/* ============================================================
   BLOQUE 4: Menú hamburguesa móvil, banner PWA, mobile dropdown drill-down
   (extraído desde index.html, línea 3512)
============================================================ */
document.addEventListener('DOMContentLoaded', function() {
        
        // ===== MANEJO DEL BANNER PWA =====
        const pwaBanner = document.getElementById('pwa-install-banner');
        const closeInstallBtn = document.getElementById('close-install-banner');
        const installBtn = document.getElementById('install-button');
        
        // Función para ocultar completamente el banner PWA
        function hidePWABanner() {
            if (pwaBanner) {
                pwaBanner.classList.remove('show');
                pwaBanner.style.display = 'none'; // Ocultar completamente del DOM
                pwaBanner.style.pointerEvents = 'none';
            }
        }
        
        // Evento para cerrar el banner PWA
        if (closeInstallBtn) {
            closeInstallBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                hidePWABanner();
            });
        }
        
        // Evento para instalar PWA
        if (installBtn) {
            installBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                // main.js maneja la instalación
                if (typeof installPWA === 'function') {
                    installPWA();
                }
                hidePWABanner();
            });
        }
        
        // Auto-ocultar el banner PWA después de 10 segundos
        setTimeout(function() {
            if (pwaBanner && pwaBanner.classList.contains('show')) {
                hidePWABanner();
            }
        }, 13000);
        
        // ===== MANEJO DEL MENÚ HAMBURGUESA =====
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileDropdown = document.getElementById('mobile-dropdown');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        
        
        if (!mobileMenuBtn || !mobileDropdown || !mobileMenuOverlay) {
            return;
        }
        
        const menuIconHamburger = document.getElementById('menu-icon-hamburger');
        const menuIconClose = document.getElementById('menu-icon-close');

        function setMenuIcon(open) {
            if (menuIconHamburger) menuIconHamburger.classList.toggle('hidden', open);
            if (menuIconClose) menuIconClose.classList.toggle('hidden', !open);
        }

        const bannerEl = document.getElementById('banner');

        // Función para abrir el menú
        function openMobileMenu() {
            // Cerrar el menú derecho si está abierto (sin tocar overlay)
            if (mobileDropdownRight && !mobileDropdownRight.classList.contains('hidden')) {
                mobileDropdownRight.classList.remove('show');
                setMenuIconRight(false);
                setTimeout(() => { mobileDropdownRight.classList.add('hidden'); }, 240);
            }
            mobileDropdown.classList.remove('hidden');
            mobileMenuOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            setMenuIcon(true);
            if (bannerEl) bannerEl.classList.add('menu-open');
            mobileDropdown.scrollTop = 0; // Siempre mostrar desde arriba al abrir
            setTimeout(() => {
                mobileDropdown.classList.add('show');
            }, 10);
        }

        // Función para cerrar el menú
        function closeMobileMenu() {
            // Resetear drill-down si está abierto
            const dd = document.getElementById('drill-detail-panel');
            const dm = document.getElementById('drill-main-panel');
            if (dd) dd.classList.remove('active');
            if (dm) dm.classList.remove('pushed');
            mobileDropdown.classList.remove('show');
            setMenuIcon(false);
            if (bannerEl) bannerEl.classList.remove('menu-open');
            setTimeout(() => {
                mobileDropdown.classList.add('hidden');
                var rightMenu = document.getElementById('mobile-dropdown-right');
                if (!rightMenu || rightMenu.classList.contains('hidden')) {
                    mobileMenuOverlay.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            }, 240);
        }

        // Evento del botón hamburguesa (ahora también cierra como X)
        let leftToggleBusy = false;
        let lastLeftToggleTs = 0;
        function toggleLeftMenu(e) {
            if (e) { e.preventDefault(); e.stopPropagation(); }
            const now = Date.now();
            if (leftToggleBusy || now - lastLeftToggleTs < 300) return;
            lastLeftToggleTs = now;
            leftToggleBusy = true;
            const isOpen = !mobileDropdown.classList.contains('hidden');
            if (isOpen) closeMobileMenu();
            else openMobileMenu();
            setTimeout(() => { leftToggleBusy = false; }, 260);
        }
        mobileMenuBtn.addEventListener('click', toggleLeftMenu);
        mobileMenuBtn.addEventListener('pointerup', function(e) {
            if (e.pointerType === 'touch') toggleLeftMenu(e);
        });

        // Cerrar al hacer click en el overlay
        mobileMenuOverlay.addEventListener('click', function() {
            closeMobileMenu();
            if (window._closeMobileMenuRight) window._closeMobileMenuRight();
        });

        // ===== MANEJO DEL SEGUNDO MENÚ HAMBURGUESA (DERECHO) =====
        const mobileMenuBtnRight = document.getElementById('mobile-menu-btn-right');
        const mobileDropdownRight = document.getElementById('mobile-dropdown-right');
        const menuIconHamburgerRight = document.getElementById('menu-icon-hamburger-right');
        const menuIconCloseRight = document.getElementById('menu-icon-close-right');

        function setMenuIconRight(open) {
            if (menuIconHamburgerRight) menuIconHamburgerRight.classList.toggle('hidden', open);
            if (menuIconCloseRight) menuIconCloseRight.classList.toggle('hidden', !open);
        }

        function openMobileMenuRight() {
            // Cerrar el menú izquierdo si está abierto (sin tocar overlay)
            if (!mobileDropdown.classList.contains('hidden')) {
                mobileDropdown.classList.remove('show');
                setMenuIcon(false);
                setTimeout(() => { mobileDropdown.classList.add('hidden'); }, 240);
            }
            mobileDropdownRight.classList.remove('hidden');
            mobileMenuOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            setMenuIconRight(true);
            if (bannerEl) bannerEl.classList.add('menu-open');
            mobileDropdownRight.scrollTop = 0;
            setTimeout(() => {
                mobileDropdownRight.classList.add('show');
            }, 10);
        }

        function closeMobileMenuRight() {
            if (!mobileDropdownRight) return;
            mobileDropdownRight.classList.remove('show');
            setMenuIconRight(false);
            if (bannerEl && !mobileDropdown.classList.contains('show')) bannerEl.classList.remove('menu-open');
            setTimeout(() => {
                mobileDropdownRight.classList.add('hidden');
                if (mobileDropdown.classList.contains('hidden')) {
                    mobileMenuOverlay.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            }, 240);
        }
        window._closeMobileMenuRight = closeMobileMenuRight;

        if (mobileMenuBtnRight && mobileDropdownRight) {
            let rightToggleBusy = false;
            let lastRightToggleTs = 0;
            function toggleRightMenu(e) {
                if (e) { e.preventDefault(); e.stopPropagation(); }
                const now = Date.now();
                // Guarda contra doble disparo (pointer + click sintetizado) y re-entrada durante animación
                if (rightToggleBusy || now - lastRightToggleTs < 300) return;
                lastRightToggleTs = now;
                rightToggleBusy = true;
                const isOpen = !mobileDropdownRight.classList.contains('hidden');
                if (isOpen) closeMobileMenuRight();
                else openMobileMenuRight();
                setTimeout(() => { rightToggleBusy = false; }, 260);
            }
            mobileMenuBtnRight.addEventListener('click', toggleRightMenu);
            // Respaldo para devices donde el 'click' no se sintetiza tras touchend
            mobileMenuBtnRight.addEventListener('pointerup', function(e) {
                if (e.pointerType === 'touch') toggleRightMenu(e);
            });
        }

        // ── DRILL-DOWN NAVIGATION (reemplaza acordeones en mobile) ──
        const submenuButtons = document.querySelectorAll('#mobile-dropdown .submenu-parent-btn');

        // Estructura drill-down: creada SIEMPRE (no solo si window.innerWidth < 1024)
        // para que al simular móvil desde DevTools en PC también se aplique el layout
        // correcto (spacer + panel scrollable) y "Leyes y Normativa" no quede detrás del pill.
        {
            // 1. Envolver contenido existente en panel principal
            // Máscara sticky — tapa el scroll detrás del pill sin añadir capa extra de blur
            const scrollMask = document.createElement('div');
            scrollMask.id = 'scroll-mask-top';
            mobileDropdown.appendChild(scrollMask);

            const drillMain = document.createElement('div');
            drillMain.id = 'drill-main-panel';
            Array.from(mobileDropdown.children).forEach(c => {
                if (c !== scrollMask) drillMain.appendChild(c);
            });
            mobileDropdown.appendChild(drillMain);

            // 2. Crear panel de detalle — en body para que position:fixed funcione
            //    (transform en mobileDropdown rompería fixed si estuviera dentro)
            const drillDetail = document.createElement('div');
            drillDetail.id = 'drill-detail-panel';
            drillDetail.innerHTML = `
                <div id="drill-header">
                    <button id="drill-back-btn" aria-label="Volver al menú">
                        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 18l-6-6 6-6"/></svg>
                        Menú
                    </button>
                    <span id="drill-title"></span>
                </div>
                <div id="drill-content"></div>
            `;
            // Overlay oscuro
            const drillOverlay = document.createElement('div');
            drillOverlay.id = 'drill-overlay';
            document.body.appendChild(drillOverlay);
            document.body.appendChild(drillDetail);

            let activeSubmenu = null;
            let activeParent = null;
            const drillContent = document.getElementById('drill-content');
            const drillTitleEl = document.getElementById('drill-title');

            const chevronSVG = `<svg class="drill-chevron" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>`;

            function initCollapsibleColumns(submenu) {
                submenu.querySelectorAll('.submenu-column').forEach(col => {
                    if (col.classList.contains('drill-collapsible')) return; // ya iniciado
                    col.classList.add('drill-collapsible');
                    const title = col.querySelector('.submenu-title');
                    if (title && !title.querySelector('.drill-chevron')) {
                        title.insertAdjacentHTML('beforeend', chevronSVG);
                    }
                });
            }

            function openDrillPanel(submenu, title, parentEl) {
                drillContent.innerHTML = '';
                drillContent.appendChild(submenu);
                submenu.classList.add('show');
                // Forzar visibilidad (override del max-height del acordeón)
                submenu.style.maxHeight = 'none';
                submenu.style.overflow = 'visible';
                submenu.style.height = 'auto';
                // Inicializar secciones colapsables si aplica
                if (submenu.classList.contains('leyes-compactas')) {
                    initCollapsibleColumns(submenu);
                }
                drillTitleEl.textContent = title;
                activeSubmenu = submenu;
                activeParent = parentEl;
                drillMain.classList.add('pushed');
                drillDetail.classList.add('active');
                drillOverlay.classList.add('active');
                drillDetail.scrollTop = 0;
            }

            function closeDrillPanel() {
                drillMain.classList.remove('pushed');
                drillDetail.classList.remove('active');
                drillOverlay.classList.remove('active');
                const sub = activeSubmenu;
                const par = activeParent;
                activeSubmenu = null;
                activeParent = null;
                setTimeout(() => {
                    if (sub && par) {
                        sub.style.maxHeight = '';
                        sub.style.overflow = '';
                        sub.style.height = '';
                        par.appendChild(sub);
                        sub.classList.remove('show');
                    }
                    drillContent.innerHTML = '';
                }, 280);
            }

            window._closeDrillPanel = closeDrillPanel;
            window._drillIsOpen = () => drillDetail.classList.contains('active');

            // Tap en categoría → abrir panel de detalle
            submenuButtons.forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const parent = this.closest('.has-submenu');
                    const submenu = parent.querySelector('.submenu');
                    if (!submenu) return;
                    const title = Array.from(this.childNodes)
                        .filter(n => n.nodeType === 3)
                        .map(n => n.textContent.trim())
                        .filter(Boolean)
                        .join(' ');
                    openDrillPanel(submenu, title, parent);
                });
            });

            // Botón volver y tap en overlay
            document.getElementById('drill-back-btn').addEventListener('click', closeDrillPanel);
            drillOverlay.addEventListener('click', closeDrillPanel);

            // Secciones colapsables (Leyes / Decretos / Resoluciones)
            drillContent.addEventListener('click', function(e) {
                const title = e.target.closest('.drill-collapsible .submenu-title');
                if (!title) return;
                e.stopPropagation();
                const col = title.closest('.drill-collapsible');
                col.classList.toggle('open');
            });

            // Nested buttons: delegación de eventos sobre drill-content
            drillContent.addEventListener('click', function(e) {
                const btn = e.target.closest('.nested-btn');
                if (!btn) return;
                e.stopPropagation();
                const parent = btn.closest('.has-nested');
                const menu = parent.querySelector('.nested-menu');
                const arrow = btn.querySelector('.nested-arrow');
                const isOpen = parent.classList.contains('nested-open');
                if (isOpen) {
                    parent.classList.remove('nested-open');
                    if (menu) menu.classList.remove('show');
                    if (arrow) arrow.style.transform = '';
                } else {
                    parent.classList.add('nested-open');
                    if (menu) menu.classList.add('show');
                    if (arrow) arrow.style.transform = 'rotate(90deg)';
                }
            });

        }

        // ── DRILL-DOWN NAVIGATION para MENÚ DERECHO ──
        if (mobileDropdownRight) {
            const submenuButtonsRight = mobileDropdownRight.querySelectorAll('.submenu-parent-btn');

            const scrollMaskR = document.createElement('div');
            scrollMaskR.id = 'scroll-mask-top-right';
            scrollMaskR.className = 'scroll-mask-top';
            mobileDropdownRight.appendChild(scrollMaskR);

            const drillMainR = document.createElement('div');
            drillMainR.id = 'drill-main-panel-right';
            drillMainR.className = 'drill-main-panel';
            Array.from(mobileDropdownRight.children).forEach(c => {
                if (c !== scrollMaskR) drillMainR.appendChild(c);
            });
            mobileDropdownRight.appendChild(drillMainR);

            const drillDetailR = document.createElement('div');
            drillDetailR.id = 'drill-detail-panel-right';
            drillDetailR.className = 'drill-detail-panel';
            drillDetailR.innerHTML = `
                <div class="drill-header">
                    <button class="drill-back-btn" aria-label="Volver al menú">
                        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 18l-6-6 6-6"/></svg>
                        Menú
                    </button>
                    <span class="drill-title-right"></span>
                </div>
                <div class="drill-content-right"></div>
            `;
            const drillOverlayR = document.createElement('div');
            drillOverlayR.id = 'drill-overlay-right';
            drillOverlayR.className = 'drill-overlay';
            document.body.appendChild(drillOverlayR);
            document.body.appendChild(drillDetailR);

            let activeSubmenuR = null;
            let activeParentR = null;
            const drillContentR = drillDetailR.querySelector('.drill-content-right');
            const drillTitleR = drillDetailR.querySelector('.drill-title-right');

            const chevronSVG2 = `<svg class="drill-chevron" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>`;

            function openDrillPanelR(submenu, title, parentEl) {
                drillContentR.innerHTML = '';
                drillContentR.appendChild(submenu);
                submenu.classList.add('show');
                submenu.style.maxHeight = 'none';
                submenu.style.overflow = 'visible';
                submenu.style.height = 'auto';
                drillTitleR.textContent = title;
                activeSubmenuR = submenu;
                activeParentR = parentEl;
                drillMainR.classList.add('pushed');
                drillDetailR.classList.add('active');
                drillOverlayR.classList.add('active');
                drillDetailR.scrollTop = 0;
            }

            function closeDrillPanelR() {
                drillMainR.classList.remove('pushed');
                drillDetailR.classList.remove('active');
                drillOverlayR.classList.remove('active');
                const sub = activeSubmenuR;
                const par = activeParentR;
                activeSubmenuR = null;
                activeParentR = null;
                setTimeout(() => {
                    if (sub && par) {
                        sub.style.maxHeight = '';
                        sub.style.overflow = '';
                        sub.style.height = '';
                        par.appendChild(sub);
                        sub.classList.remove('show');
                    }
                    drillContentR.innerHTML = '';
                }, 280);
            }

            submenuButtonsRight.forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const parent = this.closest('.has-submenu');
                    const submenu = parent.querySelector('.submenu');
                    if (!submenu) return;
                    const title = Array.from(this.childNodes)
                        .filter(n => n.nodeType === 3)
                        .map(n => n.textContent.trim())
                        .filter(Boolean)
                        .join(' ');
                    openDrillPanelR(submenu, title, parent);
                });
            });

            drillDetailR.querySelector('.drill-back-btn').addEventListener('click', closeDrillPanelR);
            drillOverlayR.addEventListener('click', closeDrillPanelR);

            // Nested buttons en menú derecho
            drillContentR.addEventListener('click', function(e) {
                const btn = e.target.closest('.nested-btn');
                if (!btn) return;
                e.stopPropagation();
                const parent = btn.closest('.has-nested');
                const menu = parent.querySelector('.nested-menu');
                const arrow = btn.querySelector('.nested-arrow');
                const isOpen = parent.classList.contains('nested-open');
                if (isOpen) {
                    parent.classList.remove('nested-open');
                    if (menu) menu.classList.remove('show');
                    if (arrow) arrow.style.transform = '';
                } else {
                    parent.classList.add('nested-open');
                    if (menu) menu.classList.add('show');
                    if (arrow) arrow.style.transform = 'rotate(90deg)';
                }
            });
        }

        // Nota: la rama else (acordeón escritorio para mobile-dropdown) se eliminó
        // porque en escritorio #mobile-menu-btn está oculto y el mobile-dropdown
        // no se abre — los handlers drill-down ya no interfieren en PC.
        
        
        // ===== EVITAR CIERRE AUTOMÁTICO DEL MENÚ EN MÓVIL =====
        setTimeout(function() {
            // Sobrescribir closeActiveMenu
            const originalClose = window.closeActiveMenu;
            window.closeActiveMenu = function() {
                // Si es móvil (< 1024px), NO cerrar el menú móvil ni sus submenús
                if (window.innerWidth < 1024) {
                    // SOLO cerrar megamenús de ESCRITORIO (no los del menú móvil)
                    document.querySelectorAll('.desktop-navbar .asesor-megamenu').forEach(m => m.classList.remove('show'));
                    document.querySelectorAll('.desktop-navbar .has-submenu').forEach(i => i.classList.remove('megamenu-open'));
                    // Cerrar panel lateral de escritorio si existe
                    const desktopPanel = document.getElementById('desktop-submenu-panel');
                    if (desktopPanel && desktopPanel.classList.contains('is-open')) {
                        desktopPanel.classList.remove('is-open');
                    }
                } else if (typeof originalClose === 'function') {
                    // En PC, usar comportamiento normal
                    originalClose();
                }
            };
        }, 300);
        
        // ===== PREVENIR CONFLICTOS CON SEARCH.JS =====
        // Esperar a que search.js agregue el botón de búsqueda
        setTimeout(function() {
            const searchButton = document.getElementById('global-search-button');
            if (searchButton) {
            }
        }, 500);
    });


/* ============================================================
   BLOQUE 5: Acordeón - secciones colapsables normativa
   (extraído desde index.html, línea 3839)
============================================================ */
document.addEventListener('DOMContentLoaded', function() {
            // Función reutilizable para configurar cada sección colapsable
            function setupAccordion(toggleId, contentId, arrowId) {
                const toggleButton = document.getElementById(toggleId);
                const contentElement = document.getElementById(contentId);
                const arrowElement = document.getElementById(arrowId);
                // Nos aseguramos que todos los elementos existan antes de agregar el evento
                if (toggleButton && contentElement && arrowElement) {
                    toggleButton.addEventListener('click', function() {
                        // Muestra u oculta el contenido
                        contentElement.classList.toggle('hidden');
                        // Gira la flecha
                        arrowElement.classList.toggle('rotate-90');
                    });
                }
            }
            // Configurar las tres secciones
            setupAccordion('leyes-toggle', 'leyes-content', 'leyes-arrow');
            setupAccordion('decretos-toggle', 'decretos-content', 'decretos-arrow');
            setupAccordion('resoluciones-toggle', 'resoluciones-content', 'resoluciones-arrow');
            // Similar para la sección de Documentos (si se quisiera)
            setupAccordion('docs-editables-toggle', 'docs-editables-content', 'docs-editables-arrow');
            setupAccordion('modelos-solicitud-toggle', 'modelos-solicitud-content', 'modelos-solicitud-arrow');
            setupAccordion('manuales-toggle', 'manuales-content', 'manuales-arrow');
        });


/* ============================================================
   BLOQUE 6: Animación texto SPD alternante
   (extraído desde index.html, línea 3868)
============================================================ */
(function() {
            // Función para animar un elemento SPD
            function animarTextoSPD(elementoId) {
                const textoElement = document.getElementById(elementoId);
                if (!textoElement) {
                    return;
                }
                
                const textos = ['SPD', 'SUBSECRETARÍA PREV. DELITO'];
                let indiceActual = 0;
                
                function alternarTexto() {
                    // Fade out
                    textoElement.classList.add('fade-out');
                    
                    // Después de 600ms cambiar el texto
                    setTimeout(function() {
                        indiceActual = (indiceActual + 1) % textos.length;
                        textoElement.textContent = textos[indiceActual];
                        
                        // Fade in
                        textoElement.classList.remove('fade-out');
                    }, 600);
                }
                
                // Alternar cada 3 segundos
                setInterval(alternarTexto, 3000);
            }
            
            // Iniciar animación cuando el DOM esté listo
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                    animarTextoSPD('texto-spd-mobile');
                    animarTextoSPD('texto-spd-desktop');
                });
            } else {
                animarTextoSPD('texto-spd-mobile');
                animarTextoSPD('texto-spd-desktop');
            }
        })();


/* ============================================================
   BLOQUE 7: handleSPD - redirigir a subsecretaría
   (extraído desde index.html, línea 3911)
============================================================ */
// Función para manejar el clic en SPD y redirigir a spd.html
        function handleSPD() {
            window.open('https://segprivada.minsegpublica.gob.cl/', '_blank');
        }


/* ============================================================
   BLOQUE 8: Carga diferida spd-componentes.js
   (extraído desde index.html, línea 3921)
============================================================ */
(window.requestIdleCallback || ((cb) => setTimeout(cb, 2000)))(function() {
            var s = document.createElement('script');
            s.src = 'assets/js/spd-componentes.js?v=2';
            document.body.appendChild(s);
        }, { timeout: 5000 });


/* ============================================================
   BLOQUE 9: Carga lazy html2pdf y función descargarModalPDF
   (extraído desde index.html, línea 3930)
============================================================ */
// Carga lazy de html2pdf: se descarga solo cuando el usuario genera un PDF.
        // Ahorra 16 KiB en cada visita donde no se usa esta función.
        // Si ya fue cargado antes, resuelve inmediatamente (sin re-descarga).
        function loadHtml2Pdf() {
            return new Promise((resolve, reject) => {
                if (window.html2pdf) { resolve(); return; }
                const s = document.createElement('script');
                s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
                s.onload = resolve;
                s.onerror = () => reject(new Error('No se pudo cargar html2pdf'));
                document.head.appendChild(s);
            });
        }

        // Función async: carga html2pdf y espera la animación EN PARALELO
        // → el usuario no nota demora adicional (html2pdf ~16 KiB carga en <500ms)
        async function descargarModalPDF(tipo) {
            const titulo = document.getElementById('modalTitulo').textContent;
            const contenido = document.getElementById('modalContenido');

            // Mostrar animación PRIMERO
            const animacion = document.getElementById('pdfDownloadAnimation');
            if (animacion) {
                animacion.classList.add('active');
                setTimeout(() => animacion.classList.remove('active'), 5500);
            }

            // Cargar librería + esperar animación EN PARALELO (Promise.all)
            // Ambas tareas corren al mismo tiempo → tiempo total = 3s (sin demora extra)
            try {
                await Promise.all([
                    loadHtml2Pdf(),
                    new Promise(resolve => setTimeout(resolve, 3000))
                ]);
            } catch (e) {
                alert('Error al cargar la biblioteca PDF. Por favor, intenta nuevamente.');
                return;
            }

            // Crear un contenedor temporal con el contenido
            const contenedorTemp = document.createElement('div');
            contenedorTemp.style.cssText = 'padding: 5px; background-color: white; margin: 0; width: 100%;';

            // Agregar título
            const tituloElement = document.createElement('h1');
            tituloElement.textContent = titulo;
            tituloElement.style.cssText = 'font-size: 20px; font-weight: bold; margin: 0 0 10px 0; padding: 0; color: #1f2937;';
            contenedorTemp.appendChild(tituloElement);

            // Clonar el contenido del modal
            const contenidoClone = contenido.cloneNode(true);

            // Ocultar botón de descarga en el clon
            const botonPDF = contenidoClone.querySelector('.btn-pdf-modal');
            if (botonPDF) botonPDF.remove();

            // CRÍTICO: Eliminar TODOS los espacios y márgenes grandes
            contenidoClone.style.cssText = 'margin: 0; padding: 0;';

            // Aplicar estilos a TODOS los elementos para flujo continuo
            contenidoClone.querySelectorAll('*').forEach(elemento => {
                if (elemento.style.marginTop)    elemento.style.marginTop    = '0';
                if (elemento.style.marginBottom) elemento.style.marginBottom = '0';
                if (elemento.style.paddingTop)   elemento.style.paddingTop   = '0';
                if (elemento.style.paddingBottom)elemento.style.paddingBottom= '0';

                if (elemento.classList.contains('requisito-section-componentes')) {
                    elemento.style.cssText += 'margin: 5px 0 !important; padding: 8px !important; page-break-inside: avoid; break-inside: avoid;';
                }
                if (elemento.classList.contains('requisito-item-componentes')) {
                    elemento.style.cssText += 'margin: 3px 0 !important; padding: 6px !important; page-break-inside: avoid; break-inside: avoid;';
                }
                if (elemento.className && typeof elemento.className === 'string') {
                    if (elemento.className.includes('mt-'))      elemento.style.marginTop    = '5px';
                    if (elemento.className.includes('mb-'))      elemento.style.marginBottom = '5px';
                    if (elemento.className.includes('space-y-')) elemento.style.cssText     += 'gap: 5px;';
                }
            });

            contenedorTemp.appendChild(contenidoClone);

            const nombreArchivo = `OS10-Requisitos-${titulo.replace(/\s+/g, '-')}.pdf`;

            const opciones = {
                margin: [8, 25, 8, 8],
                filename: nombreArchivo,
                image: { type: 'jpeg', quality: 0.96 },
                html2canvas: {
                    scale: 1.5,
                    useCORS: true,
                    logging: false,
                    letterRendering: true,
                    backgroundColor: '#ffffff',
                    scrollY: 0,
                    scrollX: 0,
                    windowHeight: document.documentElement.scrollHeight,
                    onclone: function(clonedDoc) {
                        var style = clonedDoc.createElement('style');
                        style.textContent = [
                            '.requisito-item-componentes {',
                            '  page-break-inside: avoid !important;',
                            '  break-inside: avoid !important;',
                            '  display: block !important;',
                            '}',
                            '.requisito-section-componentes {',
                            '  page-break-inside: avoid !important;',
                            '  break-inside: avoid !important;',
                            '  display: block !important;',
                            '}'
                        ].join('\n');
                        clonedDoc.head.appendChild(style);
                        clonedDoc.querySelectorAll('.requisito-item-componentes, .requisito-section-componentes').forEach(function(el) {
                            el.style.pageBreakInside = 'avoid';
                            el.style.breakInside = 'avoid';
                        });
                    }
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true },
                pagebreak: { mode: 'css' }
            };

            html2pdf().set(opciones).from(contenedorTemp).save().catch(() => {
                alert('Error al generar el PDF. Por favor, intenta nuevamente.');
            });
        }


/* ============================================================
   BLOQUE 10: Ocultar banner verde cuando modal está activo (MutationObserver)
   (extraído desde index.html, línea 4059)
============================================================ */
(function() {
            'use strict';
            
            // Función para ocultar/mostrar el banner
            function toggleBanner() {
                const modal = document.getElementById('modalRequisitos');
                const desktopNavbar = document.querySelector('.desktop-navbar');
                
                if (!modal || !desktopNavbar) {
                    return;
                }
                
                const isActive = modal.classList.contains('active');
                
                if (isActive) {
                    // Ocultar banner cuando modal está activo
                    desktopNavbar.classList.add('hide-on-modal');
                    desktopNavbar.style.display = 'none';
                    desktopNavbar.style.visibility = 'hidden';
                    desktopNavbar.style.opacity = '0';
                } else {
                    // Mostrar banner cuando modal está cerrado
                    desktopNavbar.classList.remove('hide-on-modal');
                    desktopNavbar.style.display = 'block';
                    desktopNavbar.style.visibility = 'visible';
                    desktopNavbar.style.opacity = '1';
                }
            }
            
            // Ejecutar cuando el DOM esté listo
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', init);
            } else {
                init();
            }
            
            function init() {
                const modal = document.getElementById('modalRequisitos');
                
                if (!modal) {
                    return;
                }
                
                // Observador de mutaciones: detecta cambios de clase en el modal
                const observer = new MutationObserver(function(mutations) {
                    toggleBanner();
                });

                observer.observe(modal, {
                    attributes: true,
                    attributeFilter: ['class']
                });
                
            }
        })();


/* ============================================================
   BLOQUE 11: Chevron scroll-up
   (extraído desde index.html, línea 4117)
============================================================ */
document.addEventListener('DOMContentLoaded', function() {
            const chevronButton = document.getElementById('scroll-up-chevron');
            let scrollTimeout;

            if (!chevronButton) return;
            // Mostrar/ocultar chevron según scroll
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    chevronButton.classList.add('visible');
                    
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(() => {
                        chevronButton.classList.remove('visible');
                    }, 4000);
                    
                } else {
                   chevronButton.classList.remove('visible');
                }
            });
            // Click en chevron para subir
             chevronButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });


/* ============================================================
   BLOQUE 12: Indicador de estado de oficina
   (extraído desde index.html, línea 4148)
============================================================ */
function updateOfficeStatus() {
            const statusElement = document.getElementById('office-status');
            if (!statusElement) return;
            
            const now = new Date();
            
            // Obtener hora en Chile (UTC-3)
            const chileTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Santiago' }));
            const day = chileTime.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
            const hours = chileTime.getHours();
            const minutes = chileTime.getMinutes();
            const currentTime = hours * 60 + minutes; // Tiempo en minutos desde medianoche
            
            const openTime = 9 * 60; // 09:00 en minutos
            const closeTime = 13 * 60; // 13:00 en minutos
            
            const statusDot = statusElement.querySelector('.status-dot');
            const statusText = statusElement.querySelector('.status-text');
            
            // Lunes a Jueves = 1, 2, 3, 4
            if (day >= 1 && day <= 4) {
                if (currentTime >= openTime && currentTime < closeTime) {
                    // ABIERTO
                    statusElement.className = 'mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/20 text-white border border-green-500/30';
                    statusDot.className = 'status-dot w-2 h-2 rounded-full mr-1.5 bg-green-400 animate-pulse';
                    statusText.textContent = 'Abierto ahora';
                } else if (currentTime < openTime) {
                    // ABRE PRONTO (antes de las 09:00)
                    const minutesUntilOpen = openTime - currentTime;
                    const hoursUntilOpen = Math.floor(minutesUntilOpen / 60);
                    const minsUntilOpen = minutesUntilOpen % 60;
                    
                    if (minutesUntilOpen <= 60) {
                        statusElement.className = 'mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-white border border-yellow-500/30';
                        statusDot.className = 'status-dot w-2 h-2 rounded-full mr-1.5 bg-yellow-400';
                        if (hoursUntilOpen > 0) {
                            statusText.textContent = `Abre en ${hoursUntilOpen}h ${minsUntilOpen}min`;
                        } else {
                            statusText.textContent = `Abre en ${minsUntilOpen} minutos`;
                        }
                    } else {
                        statusElement.className = 'mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/20 text-white border border-red-500/30';
                        statusDot.className = 'status-dot w-2 h-2 rounded-full mr-1.5 bg-red-400';
                        statusText.textContent = 'Cerrado - Abre 09:00';
                    }
                } else {
                    // CERRADO (después de las 13:00)
                    statusElement.className = 'mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/20 text-white border border-red-500/30';
                    statusDot.className = 'status-dot w-2 h-2 rounded-full mr-1.5 bg-red-400';
                    statusText.textContent = 'Cerrado';
                }
            } else {
                // Viernes, Sábado, Domingo
                statusElement.className = 'mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/20 text-white border border-red-500/30';
                statusDot.className = 'status-dot w-2 h-2 rounded-full mr-1.5 bg-red-400';
                if (day === 5) {
                    statusText.textContent = 'Cerrado - Abre el Lunes';
                } else if (day === 6) {
                    statusText.textContent = 'Cerrado - Abre el Lunes';
                } else {
                    statusText.textContent = 'Cerrado - Abre el Lunes';
                }
            }
        }
        
        // Actualizar estado al cargar la página
        document.addEventListener('DOMContentLoaded', function() {
            updateOfficeStatus();
            // Actualizar cada minuto
            setInterval(updateOfficeStatus, 60000);
        });


/* ============================================================
   BLOQUE 13: Ken Burns carousel de fondo - carga diferida de imágenes
   (extraído desde index.html, línea 4227)
============================================================ */
document.addEventListener('DOMContentLoaded', function() {
(function() {
    var container = document.getElementById('kb-container');
    if (!container) return;

    // Cache busting — añade ?v=N a cada URL para forzar redescarga cuando se
    // actualicen las fotos. window.PHOTO_VERSION se define en index.html <head>.
    var ver = window.PHOTO_VERSION ? ('?v=' + window.PHOTO_VERSION) : '';

    // Solo las primeras 2 imágenes para carga inicial inmediata
    var priority = [
        'assets/images/foto%20(1a).webp' + ver,
        'assets/images/foto%20(1).webp' + ver
    ];

    // El resto se carga de forma diferida
    var deferred = [];
    for (var i = 2; i <= 20; i++) {
        deferred.push('assets/images/foto%20(' + i + ').webp' + ver);
    }

    var slides = [];
    var current = 0;
    var altToggle = false;
    var intervalId = null;
    var firstVideoEnded = false;

    // Cortar el primer video a los 20 s exactos y transicionar a foto (1).webp.
    // No esperamos al evento 'ended' del video (~21 s) — forzamos el corte a 20 s.
    var FIRST_VIDEO_CUT_MS = 20000;
    var firstVideoEl = container.querySelector('video');
    if (firstVideoEl) {
        firstVideoEl.loop = false;
        var onFirstVideoEnded = function() {
            if (firstVideoEnded) return;
            firstVideoEnded = true;
            try { firstVideoEl.pause(); } catch (e) {}
            // Limpiar el poster para que el navegador NO muestre foto (1a).webp
            // si por cualquier motivo el video se rebobina o pierde su último frame
            // durante el fade-out hacia foto (1).webp.
            try { firstVideoEl.removeAttribute('poster'); } catch (e) {}
            // Si el carrusel ya arrancó y hay al menos una foto cargada, avanzar ya.
            if (intervalId && slides.length >= 2) advanceSlide();
        };
        // Corte forzado a los 20 s desde el arranque del script.
        setTimeout(onFirstVideoEnded, FIRST_VIDEO_CUT_MS);
        // Backup: si el video natural terminara antes (ej. cambia a uno más corto),
        // que también dispare la transición.
        firstVideoEl.addEventListener('ended', onFirstVideoEnded);
    }

    function createSlide(src, hidden) {
        var div = document.createElement('div');
        div.className = 'kb-slide';
        div.style.backgroundImage = "url('" + src + "')";
        container.appendChild(div);
        return div;
    }

    function createVideoSlide(src) {
        var div = document.createElement('div');
        div.className = 'kb-slide';
        var video = document.createElement('video');
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';
        video.src = src;
        video.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 40%;';
        video.className = 'kb-hero-video';
        div.appendChild(video);
        container.appendChild(div);
        return div;
    }

    function advanceSlide() {
        var prev = slides[current];
        // Avanzar al próximo slot con slide cargado; omite huecos (null/false)
        var nextIdx = current;
        var attempts = 0;
        do {
            nextIdx = (nextIdx + 1) % slides.length;
            attempts++;
            if (attempts > slides.length) return;
        } while (!slides[nextIdx]);
        if (nextIdx === current) return;
        current = nextIdx;
        var next = slides[current];

        altToggle = !altToggle;
        next.classList.toggle('alt', altToggle);
        next.classList.add('active');

        var prevVideo = prev.querySelector('video');
        // Solo pausar — NO rebobinar a 0. Si rebobinamos, el navegador muestra el
        // primer frame (o el poster, si lo tiene) durante el fade-out de 1.8 s,
        // lo que produce un destello de "otra foto" entre video y foto (1).webp.
        // El reset a 0 lo hace el bloque nextVideo cuando el carrusel cicla de
        // vuelta al video y lo va a reproducir de nuevo desde el inicio.
        if (prevVideo) { prevVideo.pause(); }

        var nextVideo = next.querySelector('video');
        if (nextVideo) { nextVideo.currentTime = 0; nextVideo.play(); }

        setTimeout(function() {
            prev.classList.remove('active', 'alt');
            prev.style.animation = 'none';
            requestAnimationFrame(function() {
                prev.style.animation = '';
            });
        }, 1900);

        scheduleNext();
    }

    function scheduleNext() {
        // Si la slide actual tiene un video, esperar a que termine
        var slide = slides[current];
        if (slide) {
            var video = slide.querySelector('video');
            if (video) {
                // Primera reproducción del primer video: el listener global
                // ya está enganchado y llamará a advanceSlide() al terminar.
                // En replays (firstVideoEnded === true) usamos el flujo normal.
                if (video === firstVideoEl && !firstVideoEnded) {
                    if (video.ended) setTimeout(advanceSlide, 50);
                    return;
                }
                if (!video.ended) {
                    video.onended = function() {
                        video.onended = null;
                        advanceSlide();
                    };
                    return;
                }
                // Video ya terminó (caso raro en replay)
                setTimeout(advanceSlide, 50);
                return;
            }
        }
        setTimeout(advanceSlide, 9000);
    }

    function startCarousel() {
        if (slides.length < 2 || intervalId) return;
        intervalId = true; // marcar como iniciado
        slides[0].classList.add('active');
        // Si el primer video ya terminó antes de que cargara la primera foto,
        // transicionar de inmediato en lugar de quedarnos en el último frame.
        if (firstVideoEnded) {
            advanceSlide();
        } else {
            scheduleNext();
        }
    }

    function loadImage(src, callback) {
        var img = new Image();
        img.onload = function() { callback(true); };
        img.onerror = function() { callback(false); };
        img.src = src;
    }

    // Recoger el primer slide ya existente en el HTML (para LCP)
    var existing = container.querySelector('.kb-slide');
    if (existing) slides.push(existing);

    // Cargar primeras 2 imágenes prioritarias
    var priorityLoaded = 0;
    priority.forEach(function(src, idx) {
        // La primera imagen ya está en el HTML, no crear duplicado
        if (idx === 0 && existing) { priorityLoaded++; if (priorityLoaded === priority.length) { startCarousel(); loadDeferredImages(); } return; }
        loadImage(src, function(ok) {
            if (ok) {
                slides.push(createSlide(src));
            }
            priorityLoaded++;
            if (priorityLoaded === priority.length) {
                // Iniciar carrusel con las 2 primeras
                startCarousel();
                // Cargar el resto de forma diferida usando requestIdleCallback
                loadDeferredImages();
            }
        });
    });

    function loadDeferredImages() {
        // Garantizar que la carga arranque en máx. 800 ms aunque el browser
        // no entre en estado idle (frecuente en móvil con scripts pesados).
        var loadFn = (typeof requestIdleCallback !== 'undefined')
            ? function(cb) { requestIdleCallback(cb, { timeout: 800 }); }
            : function(cb) { setTimeout(cb, 500); };

        loadFn(function() {
            var startIndex = slides.length;

            // Intercalar videos entre las fotos diferidas.
            // camioneta3 lleva su propia versión (recompresión liviana 2.8 MB) para
            // forzar re-descarga sin afectar al cache de fotos via PHOTO_VERSION.
            var heroVideos = [
                'assets/images/camioneta2.mp4' + ver,
                'assets/images/camioneta3.mp4?v=3'
            ];
            var videoInsertAfter = [4, 12];

            var allItems = [];
            var videoIdx = 0;
            deferred.forEach(function(src, idx) {
                allItems.push({ type: 'image', src: src });
                if (videoIdx < videoInsertAfter.length && idx === videoInsertAfter[videoIdx]) {
                    allItems.push({ type: 'video', src: heroVideos[videoIdx] });
                    videoIdx++;
                }
            });

            allItems.forEach(function(item, idx) {
                var pos = startIndex + idx;
                if (item.type === 'video') {
                    slides[pos] = createVideoSlide(item.src);
                } else {
                    slides[pos] = null;
                    loadImage(item.src, function(ok) {
                        slides[pos] = ok ? createSlide(item.src) : false;
                    });
                }
            });
        });
    }
})();
}); // DOMContentLoaded - Bloque 13


/* ============================================================
   BLOQUE 14: YouTube facade - carga iframe al hacer click
   (extraído desde index.html, línea 4333)
============================================================ */
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.yt-facade').forEach(function(el) {
        el.addEventListener('click', function() {
            var vid = this.dataset.vid;
            var iframe = document.createElement('iframe');
            iframe.width = '560'; iframe.height = '315';
            iframe.src = 'https://www.youtube.com/embed/' + vid + '?autoplay=1';
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
            this.innerHTML = '';
            this.appendChild(iframe);
        });
    });
});




