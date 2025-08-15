/**
 * assets/js/main.js
 * Este archivo solo debe contener la lógica para la interfaz de usuario,
 * como animaciones y el banner para instalar la PWA.
 * * TODA LA LÓGICA DE FIREBASE DEBE ESTAR EN EL ARCHIVO index.html
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA PARA EL BANNER DE INSTALACIÓN DE LA PWA ---
    let deferredPrompt;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Solo mostrar el banner en dispositivos móviles y si no está instalada
    if (isMobile() && window.matchMedia('(display-mode: browser)').matches) {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;

            const installBanner = document.createElement('div');
            installBanner.className = 'install-banner-custom'; 
            installBanner.innerHTML = `
                <span>Instala esta app para un acceso fácil.</span>
                <button id="install-button-custom" style="background-color: white; color: #0a73c3; font-weight: bold; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; margin-left: 15px;">Instalar</button>
            `;
            document.body.appendChild(installBanner);

            installBanner.querySelector('#install-button-custom').addEventListener('click', () => {
                installBanner.remove();
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then(() => {
                        deferredPrompt = null;
                    });
                }
            });
        });
    }

    // --- ANIMACIONES Y EFECTOS DE LA INTERFAZ ---

    // 1. Animación de rebote para el botón de "Tramitar Credenciales"
    const tramitarBtn = document.getElementById('tramitarCredencialesBtn');
    if (tramitarBtn) {
        setInterval(() => {
            tramitarBtn.classList.add('bounce-animation');
            setTimeout(() => {
                tramitarBtn.classList.remove('bounce-animation');
            }, 2000);
        }, 5000);
    }
    
    // 2. Efecto de "clic" para resaltar la sección activa
    const sections = document.querySelectorAll('.section-card');
    sections.forEach(section => {
        section.addEventListener('click', () => {
            sections.forEach(s => s.classList.remove('clicked'));
            section.classList.add('clicked');
        });
    });
});
