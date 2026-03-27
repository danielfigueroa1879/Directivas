/**
 * assets/js/carousel.js
 * Contiene la lógica reutilizable para inicializar carruseles horizontales.
 *
 * OPTIMIZACIÓN ANTI-REFLOW:
 * Las propiedades geométricas (offsetWidth, offsetLeft, scrollWidth, clientWidth)
 * se leen una sola vez en refreshCache() y se actualizan solo en resize.
 * Esto evita "forced synchronous layouts" en el scroll handler y otras funciones.
 */
function initializeCarousel({
    containerSelector,
    cardSelector,
    dotsSelector,
    autoScroll = 'mobile', // 'none', 'mobile', 'always'
    scrollSpeed = 4000
}) {
    const scrollContainer = document.querySelector(containerSelector);
    const dotsContainer = document.querySelector(dotsSelector);

    if (!scrollContainer) {
        return;
    }

    const cards = scrollContainer.querySelectorAll(cardSelector);
    const cardCount = cards.length;
    let autoScrollInterval;
    let currentIndex = 0;

    if (cardCount <= 1) {
        if (dotsContainer) dotsContainer.style.display = 'none';
        return;
    }

    // --- CACHÉ DE VALORES GEOMÉTRICOS ---
    // Se leen en bloque una sola vez y se actualizan solo en resize,
    // evitando reflows forzados en cada evento de scroll.
    let cachedContainerWidth = 0;
    let cachedCardRects = [];  // { offsetLeft, offsetWidth } de cada tarjeta
    let cachedIsActive = false;

    const refreshCache = () => {
        // Todas las lecturas geométricas agrupadas aquí → un solo reflow
        cachedContainerWidth = scrollContainer.offsetWidth;
        cachedIsActive = scrollContainer.scrollWidth > scrollContainer.clientWidth;
        cachedCardRects = Array.from(cards).map(card => ({
            offsetLeft: card.offsetLeft,
            offsetWidth: card.offsetWidth
        }));
    };

    // Sin reflow: usa valor cacheado
    const isCarouselActive = () => cachedIsActive;

    // 1. Crear los puntos de paginación (DOM modification DESPUÉS de leer geometría)
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < cardCount; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoScroll();
            });
            dotsContainer.appendChild(dot);
        }
    }

    const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
    if (dots.length > 0) {
        dots[0].classList.add('active');
    }

    // 2. Función para ir a un slide específico
    function goToSlide(index) {
        if (!isCarouselActive()) return;
        if (index >= 0 && index < cardCount) {
            const cached = cachedCardRects[index]; // sin reflow
            const scrollLeft = cached.offsetLeft - (cachedContainerWidth - cached.offsetWidth) / 2;
            scrollContainer.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
            currentIndex = index;
            updateDots();
        }
    }

    // 3. Actualizar el punto activo
    function updateDots() {
        if (!dotsContainer || !isCarouselActive()) return;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // 4. Detectar el slide actual mientras se hace scroll
    const handleScroll = () => {
        // Leer propiedades geométricas ANTES de cualquier modificación CSS (evita reflow forzado)
        const scrollLeft = scrollContainer.scrollLeft;
        const containerWidth = cachedContainerWidth;

        if (!isCarouselActive()) {
            if (dotsContainer) dotsContainer.style.display = 'none';
            return;
        }
        if (dotsContainer) dotsContainer.style.display = 'flex';

        let closestCardIndex = 0;
        let minDistance = Infinity;

        cachedCardRects.forEach(({ offsetLeft, offsetWidth }, i) => { // sin reflow
            const cardCenter = offsetLeft + offsetWidth / 2;
            const scrollCenter = scrollLeft + containerWidth / 2;
            const distance = Math.abs(cardCenter - scrollCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestCardIndex = i;
            }
        });

        if (currentIndex !== closestCardIndex) {
            currentIndex = closestCardIndex;
            updateDots();
        }
    };

    scrollContainer.addEventListener('scroll', handleScroll);

    // 5. Auto-scroll
    function startAutoScroll() {
        if (autoScrollInterval) clearInterval(autoScrollInterval);

        autoScrollInterval = setInterval(() => {
            if (!isCarouselActive()) return;
            let nextIndex = (currentIndex + 1) % cardCount;
            goToSlide(nextIndex);
        }, scrollSpeed);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    function resetAutoScroll() {
        stopAutoScroll();
        manageAutoScroll();
    }

    const manageAutoScroll = () => {
        // matchMedia no fuerza reflow (usa caché interna del browser)
        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        if (autoScroll === 'always' || (autoScroll === 'mobile' && isMobile)) {
            startAutoScroll();
        } else {
            stopAutoScroll();
        }
    };

    // Listeners de interacción del usuario
    scrollContainer.addEventListener('touchstart', stopAutoScroll, { passive: true });
    scrollContainer.addEventListener('touchend', resetAutoScroll);
    scrollContainer.addEventListener('mouseenter', stopAutoScroll);
    scrollContainer.addEventListener('mouseleave', resetAutoScroll);

    // Listener para cambios de tamaño de ventana
    window.addEventListener('resize', () => {
        refreshCache();     // Actualiza caché primero (un solo reflow en lote)
        handleScroll();     // Usa valores cacheados
        manageAutoScroll(); // Usa matchMedia
    });

    // Iniciar por primera vez.
    // rAF garantiza que las lecturas (scrollLeft, etc.) ocurren DESPUÉS de que el
    // navegador procesa las escrituras DOM anteriores (creación de dots), evitando
    // el "forced synchronous layout" reportado por Lighthouse.
    // refreshCache() aquí: todas las escrituras DOM (dots) ya ocurrieron →
    // leer geometría en frame limpio evita el forced synchronous layout.
    requestAnimationFrame(() => {
        refreshCache();
        handleScroll();
        manageAutoScroll();
    });
}
