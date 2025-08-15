document.addEventListener('DOMContentLoaded', () => {

    // 1. Animación de rebote para el botón "Credencial Independiente"
    const independentButton = document.querySelector('.indep-btn');
    if (independentButton) {
        // La animación se activa cada 5 segundos y dura 2 segundos.
        // Se hace menos intrusiva que en el código original.
        setInterval(() => {
            independentButton.classList.add('bounce-animation');
            setTimeout(() => {
                independentButton.classList.remove('bounce-animation');
            }, 2000);
        }, 5000);

        // Activación inicial con un retraso
        setTimeout(() => {
            independentButton.classList.add('bounce-animation');
             setTimeout(() => {
                independentButton.classList.remove('bounce-animation');
            }, 2000);
        }, 3000);
    }
    
    // 2. Animación de pulso para el botón de "Volver" al cargar la página
    const backButton = document.querySelector('.back-btn');
    if (backButton) {
        // Se activa 1.5s después de cargar la página para llamar la atención
        setTimeout(() => {
            backButton.classList.add('pulse-animation');
            // La animación dura 1s, se remueve la clase después
            setTimeout(() => {
                backButton.classList.remove('pulse-animation');
            }, 1000);
        }, 1500);
    }

    // 3. Descarga automática del PDF al hacer clic en la imagen "valores.png"
    const valoresImageLink = document.getElementById('valoresImageLink');
    if (valoresImageLink) {
        valoresImageLink.addEventListener('click', (event) => {
            // Evitar la acción por defecto del enlace (que podría abrir el PDF en una nueva pestaña)
            event.preventDefault(); 
            
            const pdfUrl = valoresImageLink.href; // Obtener la URL del PDF del atributo href
            const fileName = valoresImageLink.download || 'documento.pdf'; // Obtener el nombre de archivo o usar uno por defecto

            // Crear un elemento de enlace temporal
            const a = document.createElement('a');
            a.href = pdfUrl;
            a.download = fileName; // Esto fuerza la descarga con el nombre especificado
            document.body.appendChild(a); // Añadir el enlace al DOM
            a.click(); // Simular un clic en el enlace
            document.body.removeChild(a); // Eliminar el enlace después de la descarga
            
            console.log(`Intentando descargar: ${fileName} desde ${pdfUrl}`);
        });
    }
});
