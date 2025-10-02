// Background rotation for homepage
let backgroundImages = [
    'assets/images/foto (1).jpeg',
    'assets/images/foto (2).jpeg',
    'assets/images/foto (3).jpeg',
    'assets/images/foto (4).jpeg',
    'assets/images/foto (5).jpeg',
    'assets/images/foto (6).jpeg',
    'assets/images/foto (7).jpeg',
    'assets/images/foto (8).jpeg',
    'assets/images/foto (9).jpeg',
    'assets/images/foto (10).jpeg',
    'assets/images/foto (11).jpeg',
    'assets/images/foto (12).jpeg',
    'assets/images/foto (13).jpeg',
    'assets/images/foto (14).jpeg',
    'assets/images/foto (15).jpeg',
    'assets/images/foto (16).jpeg',
    'assets/images/foto (17).jpeg',
    'assets/images/foto (18).jpeg',
    'assets/images/foto (19).jpeg'
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

// --- Funciones para el Modal de Plantilla ---
function showSolicitudTemplate() {
    const modal = document.getElementById('solicitud-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function hideSolicitudTemplate() {
    const modal = document.getElementById('solicitud-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function copySolicitud() {
    const contentEl = document.getElementById('solicitud-content');
    if (!contentEl) return;
    const content = contentEl.innerText;
    const successMsg = document.getElementById('copy-success-msg');
    
    // Usar el API de portapapeles si está disponible (más moderno)
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(content).then(() => {
            if (successMsg) {
                successMsg.classList.remove('hidden');
                setTimeout(() => {
                    successMsg.classList.add('hidden');
                }, 2000);
            }
        }).catch(err => {
            console.error('Error al copiar con API de portapapeles:', err);
            copyFallback(content, successMsg); // Usar fallback si falla
        });
    } else {
        copyFallback(content, successMsg); // Usar fallback si el API no está
    }
}

// Fallback para navegadores antiguos o entornos sin acceso al clipboard API
function copyFallback(text, successMsg) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            if (successMsg) {
                successMsg.classList.remove('hidden');
                setTimeout(() => {
                    successMsg.classList.add('hidden');
                }, 2000);
            }
        } else {
            console.error('Fallback: No se pudo copiar el texto');
            alert('No se pudo copiar el texto. Por favor, selecciónelo y cópielo manualmente.');
        }
    } catch (err) {
        console.error('Fallback: Error al intentar copiar', err);
        alert('No se pudo copiar el texto. Por favor, selecciónelo y cópielo manualmente.');
    }
    document.body.removeChild(textArea);
}


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
