// ============================================
// ARCHIVO DE VERIFICACIÓN
// ============================================
// Este archivo verifica que todo está cargado correctamente

console.log('🧪 INICIANDO VERIFICACIÓN...');

// Verificar que el archivo JS se cargó
console.log('✅ Este mensaje confirma que los archivos JS se están cargando correctamente');

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('====================================');
    console.log('🧪 VERIFICACIÓN DE FUNCIONES:');
    console.log('====================================');
    
    // Verificar funciones principales
    const funciones = [
        'mostrarRequisitos',
        'cerrarModal',
        'generarContenidoVigilante',
        'generarContenidoGuardia',
        'generarContenidoPortero',
        'generarContenidoEncargado',
        'generarContenidoEncargadoArmas',
        'generarContenidoTecnico',
        'generarContenidoOperador',
        'generarContenidoInstalador',
        'generarContenidoSupervisor',
        'generarContenidoJefe',
        'generarContenidoAsesor',
        'generarContenidoCapacitador'
    ];
    
    let todasCargas = true;
    
    funciones.forEach(funcion => {
        const existe = typeof window[funcion] === 'function';
        const estado = existe ? '✅' : '❌';
        console.log(`${estado} ${funcion}`);
        if (!existe) todasCargas = false;
    });
    
    console.log('====================================');
    
    if (todasCargas) {
        console.log('✅✅✅ TODAS LAS FUNCIONES CARGADAS CORRECTAMENTE ✅✅✅');
        console.log('Los botones deberían funcionar!');
    } else {
        console.log('❌ ALGUNAS FUNCIONES NO SE CARGARON');
        console.log('Verifica que assets/js/spd-componentes.js existe en la ubicación correcta');
    }
    
    // Verificar elementos del DOM
    console.log('====================================');
    console.log('🧪 VERIFICACIÓN DE ELEMENTOS DOM:');
    console.log('====================================');
    
    const elementos = [
        'modalRequisitos',
        'modalTitulo',
        'modalContenido',
        'vistaPrincipal',
        'vistaComponentes'
    ];
    
    elementos.forEach(elemento => {
        const existe = document.getElementById(elemento);
        const estado = existe ? '✅' : '❌';
        console.log(`${estado} Elemento #${elemento}`);
    });
    
    console.log('====================================');
    
    // Crear función de prueba
    window.pruebaBoton = function(tipo) {
        console.log('🧪 PRUEBA DE BOTÓN:', tipo);
        console.log('Llamando a mostrarRequisitos("' + tipo + '")');
        mostrarRequisitos(tipo);
    };
    
    console.log('💡 Puedes probar manualmente en la consola escribiendo:');
    console.log('   pruebaBoton("vigilante")');
    console.log('   pruebaBoton("guardia")');
    console.log('   etc...');
    
});
