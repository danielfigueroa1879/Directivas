// Background rotation for homepage
let backgroundImages = [
    'assets/images/foto (1).webp',
    'assets/images/foto (2).webp',
    'assets/images/foto (3).webp',
    'assets/images/foto (4).webp',
    'assets/images/foto (5).webp',
    'assets/images/foto (6).webp',
    'assets/images/foto (7).webp',
    'assets/images/foto (8).webp',
    'assets/images/foto (9).webp',
    'assets/images/foto (10).webp',
    'assets/images/foto (11).webp',
    'assets/images/foto (12).webp',
    'assets/images/foto (13).webp',
    'assets/images/foto (14).webp',
    'assets/images/foto (15).webp',
    'assets/images/foto (16).webp',
    'assets/images/foto (17).webp',
    'assets/images/foto (18).webp',
    'assets/images/foto (19).webp',
    'assets/images/foto (20).webp',
    'assets/images/foto (21).webp',
    'assets/images/foto (223).webp', /* Se reemplaza foto (22).webp por una existente */
    'assets/images/foto (224).webp', /* Se reemplaza foto (23).webp por una existente */
    'assets/images/foto (226).webp', /* Se reemplaza foto (24).webp por una existente */
    'assets/images/foto (2333).webp' /* Se reemplaza foto (25).webp por una existente */
];

let currentImageIndex = 0;

function rotateBackground() {
    const homepageSection = document.getElementById('homepage-section');
    if (homepageSection && document.body.classList.contains('homepage')) {
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
        homepageSection.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
    }
}

// Start background rotation every 12 seconds for homepage
setInterval(rotateBackground, 12000);

// Functions to switch between sections (called by main.js or HTML)
function showHomepage() {
    document.getElementById('homepage-section').style.display = 'flex';
    document.getElementById('homepage-content-wrapper').style.display = 'block';
    document.getElementById('main-footer').style.display = 'block';
    document.getElementById('contenido').style.display = 'none';
    document.body.className = 'homepage background-transition';
    const homepageSection = document.getElementById('homepage-section');
    if (homepageSection) {
        homepageSection.style.backgroundImage = `url('${backgroundImages[0]}')`;
    }
    currentImageIndex = 0;
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

// These handle... functions are called by onclick attributes in the HTML.
// The menu closing is handled by the logic in main.js.
function handleCerofilas() { window.open('https://dal5.short.gy/CFil', '_blank'); }
function handleDirectiva() { showDirectiva(); }
function handleCredenciales() { showCredenciales(); }
function handleCredencialIndependiente() {
    const link = document.querySelector('.indep-btn');
    if (link) window.open(link.href, '_blank');
}
function handleValores() {
    const link = document.getElementById('valoresImageLink');
    if (link) window.open(link.href, '_blank');
}
function handleValorPlan() { window.open('https://os10.short.gy/Pl4n', '_blank'); }
function handleCursoFormacion() { window.open('https://dal5.short.gy/Form', '_blank'); }

document.addEventListener('DOMContentLoaded', () => {
    // Non-menu related listeners and initializers
    document.getElementById('os10-home-btn')?.addEventListener('click', showHomepage);

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

    showHomepage();
});
