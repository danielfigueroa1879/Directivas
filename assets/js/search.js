/**
 * Sistema de Búsqueda Global - OS10 Coquimbo
 * Versión 1.3 - CORREGIDA Y COMPLETA
 */

class GlobalSearch {
    constructor() {
        this.searchIndex = [];
        this.isOpen = false;
        this.currentResults = [];
        this.currentResultIndex = -1;
        this.init();
    }

    init() {
        this.createSearchElements();
        this.buildSearchIndex();
        this.setupEventListeners();
        console.log('🔍 Sistema de búsqueda global inicializado');
    }

    createSearchElements() {
        // Botón de búsqueda en el banner
        const searchButton = document.createElement('button');
        searchButton.id = 'global-search-button';
        searchButton.className = 'banner-search-button';
        searchButton.setAttribute('aria-label', 'Buscar en el sitio');
        searchButton.setAttribute('title', 'Buscar (Ctrl+K)');
        searchButton.innerHTML = `
            <svg class="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
            </svg>
        `;

        // Insertar en el contenedor correcto
        const searchCenterContainer = document.getElementById('search-center-container');
        
        if (searchCenterContainer) {
            searchCenterContainer.innerHTML = '';
            searchCenterContainer.appendChild(searchButton);
            console.log('✅ Botón de búsqueda agregado correctamente');
        } else {
            console.error('❌ No se encontró #search-center-container');
        }
        
        // Modal de búsqueda
        const searchModal = document.createElement('div');
        searchModal.id = 'global-search-modal';
        searchModal.className = 'search-modal-hidden';
        searchModal.innerHTML = `
            <div class="search-modal-overlay"></div>
            <div class="search-modal-content">
                <div class="search-header">
                    <div class="search-input-wrapper">
                        <svg class="search-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <input type="text" id="global-search-input" placeholder="Buscar en OS10 Coquimbo..." autocomplete="off">
                        <div class="search-shortcuts">
                            <span class="shortcut-badge">ESC para cerrar</span>
                            <span class="shortcut-badge">↑↓ para navegar</span>
                            <span class="shortcut-badge">Enter para ir</span>
                        </div>
                    </div>
                </div>
                <div class="search-results-container">
                    <div id="search-results"></div>
                    <div id="search-no-results" class="hidden">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                            <path d="M8 11h6"></path>
                        </svg>
                        <p>No se encontraron resultados</p>
                        <small>Intenta con otros términos de búsqueda</small>
                    </div>
                    <div id="search-help" class="search-help">
                        <h4>Sugerencias de búsqueda:</h4>
                        <div class="search-suggestions">
                            <button class="suggestion-pill" data-search="directiva">Directivas</button>
                            <button class="suggestion-pill" data-search="credencial">Credenciales</button>
                            <button class="suggestion-pill" data-search="21659">Ley 21.659</button>
                            <button class="suggestion-pill" data-search="209">Decreto 209</button>
                            <button class="suggestion-pill" data-search="208">Decreto 208</button>
                            <button class="suggestion-pill" data-search="2310">Decreto 2310</button>
                            <button class="suggestion-pill" data-search="2424">Decreto 2424</button>
                            <button class="suggestion-pill" data-search="2100">Decreto 2100</button>                           
                            <button class="suggestion-pill" data-search="guardia">Guardias</button>
                            <button class="suggestion-pill" data-search="vigilante">Vigilante</button>
                            <button class="suggestion-pill" data-search="jefe">Jefe Seguridad</button>
                            <button class="suggestion-pill" data-search="asesor">Asesor</button>
                            <button class="suggestion-pill" data-search="empresa">Empresas</button>
                            <button class="suggestion-pill" data-search="capacitación">Capacitación</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(searchModal);
    }

    buildSearchIndex() {
        this.searchIndex = [
            // SECCIÓN: Trámites Principales
            {
                title: 'Cerofila',
                content: 'Trámite online sistema cerofila',
                section: 'Trámites Principales',
                action: () => window.open('https://dal5.short.gy/CFil', '_blank'),
                keywords: ['cerofila', 'cerofilas', 'pensiones', 'p4']
            },
            {
                title: 'Directivas de Funcionamiento',
                content: 'Accede y gestiona los requerimientos para instalaciones, eventos y más. Vigencia 03 años en instalación.',
                section: 'Trámites Principales',
                action: () => window.showDirectiva && window.showDirectiva(),
                keywords: ['directiva', 'funcionamiento', 'instalación', 'evento', 'partido', 'fútbol']
            },
            {
                title: 'Credenciales',
                content: 'Encuentra todos los formularios y requisitos para la acreditación de personal. Credencial empresa e independiente.',
                section: 'Trámites Principales',
                action: () => window.showCredenciales && window.showCredenciales(),
                keywords: ['credencial', 'acreditación', 'empresa', 'independiente', 'personal', 'requisitos']
            },
            {
                title: 'Reclamos de Seguridad Privada',
                content: 'Requerimiento de fiscalización (Reclamos de seguridad privada)',
                section: 'Trámites Principales',
                action: () => window.open('https://dal5.short.gy/R3', '_blank'),
                keywords: ['reclamo', 'fiscalización', 'denuncia', 'seguridad', 'privada']
            },

            // SECCIÓN: Leyes
            {
                title: 'Constitución Política',
                content: 'Fundamento constitucional de la seguridad privada',
                section: 'Leyes y Normativa',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=242302', '_blank'),
                keywords: ['constitución', 'política', 'fundamento', 'ley']
            },
            {
                title: 'Ley 18.961 - Org. Constitucional',
                content: 'Ley Orgánica Constitucional de Carabineros de Chile',
                section: 'Leyes y Normativa',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=30329', '_blank'),
                keywords: ['ley', '18961', '18.961', 'orgánica', 'constitucional', 'carabineros']
            },
            {
                title: 'Ley 19.303',
                content: 'Normativa complementaria de seguridad privada',
                section: 'Leyes y Normativa',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=30670', '_blank'),
                keywords: ['ley', '19303', '19.303', 'normativa', 'complementaria']
            },
            {
                title: 'D.L. 3.607 (1981)',
                content: 'Decreto Ley 3607 del año 1981 histórico sobre seguridad privada',
                section: 'Leyes y Normativa',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=7193', '_blank'),
                keywords: ['decreto', 'ley', '3607', '3.607', 'dl', 'd.l.', '1981', 'histórico']
            },
            {
                title: 'Ley 21.659 - Seguridad Privada (VIGENTE)',
                content: 'Nueva Ley de Seguridad Privada vigente desde 2024. Marco legal actualizado para servicios de seguridad privada en Chile',
                section: 'Leyes y Normativa',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1202067&tipoVersion=0', '_blank'),
                keywords: ['ley', '21659', '21.659', 'seguridad', 'privada', 'actualizada', 'vigente', 'nueva', '2024']
            },
            {
                title: 'Decreto 209 - Reglamento Ley 21.659',
                content: 'Reglamento de la Ley 21.659 sobre Seguridad Privada. Normativa reglamentaria vigente 2024',
                section: 'Leyes y Normativa',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1213672', '_blank'),
                keywords: ['decreto', 'reglamento', '209', 'vigente', 'ley', '21659', '21.659', '2024']
            },
            {
                title: 'Decreto 208 - Reglamento Complementario',
                content: 'Decreto 208 - Reglamento complementario de la Ley 21.659 de Seguridad Privada',
                section: 'Leyes y Normativa',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1211115', '_blank'),
                keywords: ['decreto', 'reglamento', '208', 'complementario', 'ley', '21659', '21.659', '2024']
            },
             {
                title: 'Decreto 2310 - Instucciones Generales sobre Transitoriedad',
                content: 'Decreto 2310- Instucciones Generales sobre Transitoriedad de la Ley 21.659 de Seguridad Privada',
                section: 'Leyes y Normativa',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1218921', '_blank'),
                keywords: ['decreto', 'reglamento', '2310', 'complementario', 'ley', '21659', '21.659', '2024']
            },
             {
                title: 'Decreto 2424 - Modifica Resolución 2310 exenta, sobre transitoriedad',
                content: 'Decreto 2424- Modifica Resolución 2310 exentade la Ley 21.659 de Seguridad Privada',
                section: 'Leyes y Normativa',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1219417'),
                keywords: ['decreto', 'reglamento', '2424', 'complementario', 'ley', '21659', '21.659', '2024']
            },
            {
                title: 'Decreto 2100 - Aprueba Formulario de solicitud y Acta Descrptiva',
                content: 'Decreto 2100- APRUEBA FORMULARIO DE SOLICITUD Y ACTA DESCRIPTIVA PARA LA AUTORIZACIÓN DE EVENTOS MASIVOS EN EL MARCO DE LA LEY N° 21.659',
                section: 'Leyes y Normativa',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1218338', '_blank'),
                keywords: ['decreto', 'reglamento', '2100', 'complementario', 'ley', '21659', '21.659', '2024']
            },

            // SECCIÓN: Decretos (CORREGIDOS)
            {
                title: 'D.E. 261 (2020)',
                content: 'Decreto Exento 261 del año 2020',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/Decreto-261.pdf', '_blank'),
                keywords: ['decreto', 'exento', '261', 'de', 'd.e.', 'de261', 'd.e.261', '2020']
            },
            {
                title: 'D.E. 32 (2024)',
                content: 'Decreto Exento 32 del año 2024 - Uniformes',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1200633', '_blank'),
                keywords: ['decreto', 'exento', '32', 'de', 'd.e.', 'de32', 'd.e.32', '2024', 'uniforme', 'uniformes']
            },
            {
                title: 'D. 298 (2019)',
                content: 'Decreto 298 del año 2019',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1136545', '_blank'),
                keywords: ['decreto', '298', 'd.298', 'd298', '2019']
            },
            {
                title: 'D. 123 (2019)',
                content: 'Decreto 123 del año 2019',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1130300', '_blank'),
                keywords: ['decreto', '123', 'd.123', 'd123', '2019']
            },
            {
                title: 'D. 1045 (2018)',
                content: 'Decreto 1045 del año 2018',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1122982', '_blank'),
                keywords: ['decreto', '1045', 'd.1045', 'd1045', '2018']
            },
            {
                title: 'D. 867 (2017)',
                content: 'Decreto 867 del año 2017',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1116274', '_blank'),
                keywords: ['decreto', '867', 'd.867', 'd867', '2017']
            },
            {
                title: 'D. 1814 (2014)',
                content: 'Decreto 1814 del año 2014',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1069299', '_blank'),
                keywords: ['decreto', '1814', 'd.1814', 'd1814', '2014']
            },
            {
                title: 'D.S. 222 (2014)',
                content: 'Decreto Supremo 222 del año 2014',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1055580', '_blank'),
                keywords: ['decreto', 'supremo', '222', 'ds', 'd.s.', 'ds222', 'd.s.222', '2014']
            },
            {
                title: 'D.E. 1122 (1994)',
                content: 'Decreto Exento 1122 del año 1994',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1072929', '_blank'),
                keywords: ['decreto', 'exento', '1122', 'de', 'd.e.', 'de1122', 'd.e.1122', '1994']
            },
            {
                title: 'D.S. 41 (1996)',
                content: 'Decreto Supremo 41 del año 1996',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=19870', '_blank'),
                keywords: ['decreto', 'supremo', '41', 'ds', 'd.s.', 'ds41', 'd.s.41', '1996']
            },
            {
                title: 'D.S. 1772 (1995)',
                content: 'Decreto Supremo 1772 del año 1995',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=18592', '_blank'),
                keywords: ['decreto', 'supremo', '1772', 'ds', 'd.s.', 'ds1772', 'd.s.1772', '1995']
            },
            {
                title: 'D.S. 1773 (1994)',
                content: 'Decreto Supremo 1773 del año 1994',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=18594', '_blank'),
                keywords: ['decreto', 'supremo', '1773', 'ds', 'd.s.', 'ds1773', 'd.s.1773', '1994']
            },
            {
                title: 'D.S. 93 (1985)',
                content: 'Decreto Supremo 93 del año 1985',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=9081', '_blank'),
                keywords: ['decreto', 'supremo', '93', 'ds', 'd.s.', 'ds93', 'd.s.93', '1985']
            },

            // SECCIÓN: Resoluciones
            {
                title: 'Resolución 111 - Conexión Alpha II',
                content: 'Res. Exenta N° 111 del 18-06-2010 sobre Conexión sistema Alpha II',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_111.pdf', '_blank'),
                keywords: ['resolución', '111', 'exenta', 'conexión', 'alpha', 'ii', '2010']
            },
            {
                title: 'Resolución 112 - Delega conexión Alpha II',
                content: 'Res. Exenta N° 112 del 18-06-2010 que Delega conexión Alpha II',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_112.pdf', '_blank'),
                keywords: ['resolución', '112', 'exenta', 'delega', 'conexión', 'alpha', 'ii', '2010']
            },
            {
                title: 'Resolución 253 - Capacitación independientes',
                content: 'Res. Exenta N° 253 del 29-10-2013 sobre Capacitación independientes',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_253.pdf', '_blank'),
                keywords: ['resolución', '253', 'exenta', 'capacitación', 'independientes', '2013']
            },
            {
                title: 'Resolución 59 - Conserjes y mayordomos',
                content: 'Res. Exenta N° 59 del 30-09-2014 sobre Conserjes y mayordomos',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_59.pdf', '_blank'),
                keywords: ['resolución', '59', 'exenta', 'conserjes', 'mayordomos', '2014']
            },
            {
                title: 'Resolución 281 - Operador cajeros automáticos',
                content: 'Res. Exenta N° 281 del 13-11-2015 sobre Operador cajeros automáticos',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_281.pdf', '_blank'),
                keywords: ['resolución', '281', 'exenta', 'operador', 'cajeros', 'automáticos', 'atm', '2015']
            },
            {
                title: 'Resolución 50 - Medidas COVID-19',
                content: 'Res. Exenta N° 50 del 22-05-2020 sobre Medidas COVID-19',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/RESOLUCION%20EXENTA%20NRO.50.pdf', '_blank'),
                keywords: ['resolución', '50', 'exenta', 'medidas', 'covid-19', 'covid', '2020']
            },
            {
                title: 'Resolución 23 - Extiende medidas COVID-19',
                content: 'Res. Exenta N° 23 del 05-03-2021 que Extiende medidas COVID-19',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_23.pdf', '_blank'),
                keywords: ['resolución', '23', 'exenta', 'extiende', 'medidas', 'covid-19', 'covid', '2021']
            },
            {
                title: 'Resolución 133 - Amplía medidas COVID-19',
                content: 'Res. Exenta N° 133 del 26-05-2021 que Amplía medidas COVID-19',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_133.pdf', '_blank'),
                keywords: ['resolución', '133', 'exenta', 'amplía', 'medidas', 'covid-19', 'covid', '2021']
            },
            {
                title: 'Resolución 2432 - Declaraciones juradas',
                content: 'Res. N° 2432 del 05-07-2021 sobre Declaraciones juradas',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_2432.pdf', '_blank'),
                keywords: ['resolución', '2432', 'declaraciones', 'juradas', '2021']
            },
            {
                title: 'Resolución 4070 - Requisitos Asesores',
                content: 'Res. N° 4070 del 20-10-2021 sobre Requisitos para Asesores',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_4070.pdf', '_blank'),
                keywords: ['resolución', '4070', '4.070', 'requisitos', 'asesores', '2021']
            },
            {
                title: 'Resolución 20 - Amplía vigencia credenciales',
                content: 'Res. N° 20 del 14-02-2022 que Amplía vigencia credenciales',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_20.pdf', '_blank'),
                keywords: ['resolución', '20', 'amplía', 'vigencia', 'credenciales', '2022']
            },
            {
                title: 'Resolución 2660 - Amplía Res. 4070 Asesores',
                content: 'Res. N° 2660 del 20-07-2022 que Amplía Res. 4070 sobre Asesores',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_2660.pdf', '_blank'),
                keywords: ['resolución', '2660', '2.660', 'amplía', '4070', 'asesores', '2022']
            },
            {
                title: 'Resolución 123 - Amplía vigencia credenciales',
                content: 'Res. Exenta N° 123 del 09-08-2022 que Amplía vigencia credenciales',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_123.pdf', '_blank'),
                keywords: ['resolución', '123', 'exenta', 'amplía', 'vigencia', 'credenciales', '2022']
            },
            {
                title: 'Resolución 4651 - Toma de exámenes',
                content: 'Res. Exenta N° 4651 del 27-12-2022 sobre Toma de exámenes',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resol_4651.pdf', '_blank'),
                keywords: ['resolución', '4651', '4.651', 'exenta', 'toma', 'exámenes', '2022']
            },
            {
                title: 'Resolución 2095 - Exime autorización vigente',
                content: 'Res. N° 2095 del 01-08-2023 que Exime autorización vigente',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_2095.pdf', '_blank'),
                keywords: ['resolución', '2095', 'exime', 'autorización', 'vigente', '2023']
            },
            {
                title: 'Resolución 2114 - Aclara Res. 2095',
                content: 'Res. N° 2114 del 03-08-2023 que Aclara Res. 2095',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_2114.pdf', '_blank'),
                keywords: ['resolución', '2114', 'aclara', '2095', '2023']
            },
            {
                title: 'Resolución 2340 - Suspende tramitación credenciales',
                content: 'Res. N° 2340 del 22-08-2023 que Suspende tramitación credenciales',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_2340.pdf', '_blank'),
                keywords: ['resolución', '2340', 'suspende', 'tramitación', 'credenciales', '2023']
            },
            {
                title: 'Resolución 1763 - Amplía carrera IPLACEX',
                content: 'Res. N° 1763 del 10-06-2023 que Amplía carrera IPLACEX',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_1763.pdf', '_blank'),
                keywords: ['resolución', '1763', 'amplía', 'carrera', 'iplacex', '2023']
            },
            {
                title: 'Resolución 3632 - Certificado acreditación',
                content: 'Res. N° 3632 del 21-12-2022 sobre Certificado acreditación',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/Resol_3632.pdf', '_blank'),
                keywords: ['resolución', '3632', 'certificado', 'acreditación', '2022']
            },
            {
                title: 'Resolución 370 - Tarjetas identificación',
                content: 'Res. N° 370 del 13-02-2024 sobre Tarjetas identificación',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_370.pdf', '_blank'),
                keywords: ['resolución', '370', 'tarjetas', 'identificación', '2024']
            },
            {
                title: 'Resolución 80 - Cursos modalidad telemática',
                content: 'Res. Exenta N° 80 del 20-03-2024 sobre Cursos modalidad telemática',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_80.pdf', '_blank'),
                keywords: ['resolución', '80', 'exenta', 'cursos', 'modalidad', 'telemática', 'online', '2024']
            },
            {
                title: 'Resolución 2522 - Regulariza tramitación credenciales',
                content: 'Res. N° 2522 del 26-08-2024 que Regulariza tramitación credenciales',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_2522.pdf', '_blank'),
                keywords: ['resolución', '2522', '2.522', 'regulariza', 'tramitación', 'credenciales', '2024']
            },

            // SECCIÓN: Componentes del Sistema (ACTUALIZADO SEGÚN LEY 21.659 Y DECRETO 209)
            {
                title: 'Asesor en Seguridad Privada',
                content: 'Títulos afines para asesores. Resolución 4070/2021 y 2660/2023. Ingeniería en Gestión de Seguridad, con o sin diplomado.',
                section: 'Componentes del Sistema',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('asesor'),
                keywords: ['asesor', 'títulos', 'requisitos', 'resolución', '4070', '2660', 'diplomado', 'ingeniero', 'gestión']
            },
            {
                title: 'Jefe de Seguridad',
                content: 'Actas, credenciales y requisitos para jefes de seguridad civil y ex fuerzas armadas. Certificación de experiencia laboral.',
                section: 'Componentes del Sistema',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('jefe'),
                keywords: ['jefe', 'seguridad', 'actas', 'credenciales', 'ffaa', 'civil', 'experiencia', 'oficial']
            },
            {
                title: 'Encargado de Seguridad',
                content: 'Requisitos para encargados de seguridad. Supervisión directa de operaciones de seguridad privada.',
                section: 'Componentes del Sistema',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('encargado'),
                keywords: ['encargado', 'seguridad', 'documentación', 'supervisión', 'operaciones']
            },
            {
                title: 'Supervisor de Seguridad',
                content: 'Documentación para supervisores. Coordinación de equipos y control operacional de seguridad.',
                section: 'Componentes del Sistema',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('supervisor'),
                keywords: ['supervisor', 'seguridad', 'coordinación', 'equipos', 'control', 'operacional']
            },
            {
                title: 'Vigilante Privado',
                content: 'Acreditación de vigilantes privados. Curso OS10 y requisitos para vigilancia en propiedades privadas.',
                section: 'Componentes del Sistema',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('vigilante'),
                keywords: ['vigilante', 'privado', 'acreditación', 'requisitos', 'propiedad', 'curso', 'os10']
            },
            {
                title: 'Guardia de Seguridad',
                content: 'Guardia de seguridad privada. Curso de formación OS10 obligatorio. Protección de personas y bienes.',
                section: 'Componentes del Sistema',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('guardia'),
                keywords: ['guardia', 'seguridad', 'trámite', 'requisitos', 'curso', 'formación', 'protección']
            },
            {
                title: 'Portero / Nochero / Rondín',
                content: 'Requisitos para porteros, nocheros y rondines. Vigilancia en edificios, condominios y conjuntos habitacionales.',
                section: 'Componentes del Sistema',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('portero'),
                keywords: ['portero', 'nochero', 'rondín', 'rondin', 'edificio', 'condominio', 'vigilancia', 'nocturna', 'conserje']
            },
            {
                title: 'Encargado de Armas y Municiones',
                content: 'Requisitos para encargados de custodia de armas y municiones. Control de armería en empresas de seguridad.',
                section: 'Componentes del Sistema',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('encargadoArmas'),
                keywords: ['encargado', 'armas', 'municiones', 'custodia', 'armería', 'control', 'arsenal']
            },
            {
                title: 'Operador de Cámaras / CCTV',
                content: 'Operador de sistemas de circuito cerrado de televisión. Monitoreo y vigilancia electrónica con cámaras de seguridad.',
                section: 'Componentes del Sistema',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('operador'),
                keywords: ['operador', 'cámaras', 'cctv', 'circuito', 'cerrado', 'monitoreo', 'vigilancia', 'video', 'electrónica']
            },
            {
                title: 'Técnico en Seguridad',
                content: 'Técnico en seguridad electrónica. Mantenimiento, reparación y operación de sistemas de seguridad.',
                section: 'Componentes del Sistema',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('tecnico'),
                keywords: ['técnico', 'seguridad', 'requisitos', 'mantenimiento', 'sistemas', 'electrónica', 'reparación']
            },
            {
                title: 'Instalador Técnico',
                content: 'Certificación de instaladores técnicos. Instalación de sistemas electrónicos de seguridad y alarmas.',
                section: 'Componentes del Sistema',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('instalador'),
                keywords: ['instalador', 'técnico', 'certificación', 'sistemas', 'electrónica', 'alarmas', 'instalación']
            },
            {
                title: 'Capacitador en Seguridad Privada',
                content: 'Acreditación de capacitadores. Formación e instrucción de personal en seguridad privada. Requisitos docentes.',
                section: 'Componentes del Sistema',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('capacitador'),
                keywords: ['capacitador', 'acreditación', 'formación', 'instructor', 'curso', 'docente', 'enseñanza']
            },
            {
                title: 'Empresas de Seguridad Privada',
                content: 'Requisitos para empresas de seguridad privada. Recursos Humanos, Capacitadoras, Asesoras y Recursos Técnicos. Ley 21.659 y Decreto 209.',
                section: 'Componentes del Sistema',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('empresa'),
                keywords: ['empresa', 'empresas', 'seguridad', 'privada', 'recursos', 'humanos', 'capacitadora', 'asesora', 'técnicos', 'ley', '21659', 'decreto', '209']
            },

            // SECCIÓN: Documentos Editables
            {
                title: 'Estudio de Seguridad',
                content: 'Plantilla editable para estudios de seguridad',
                section: 'Documentos Editables',
                action: () => window.open('https://dal5.short.gy/3st', '_blank'),
                keywords: ['estudio', 'seguridad', 'plantilla', 'editable']
            },
            {
                title: 'Planes de Seguridad',
                content: 'Plantillas editables para planes de seguridad',
                section: 'Documentos Editables',
                action: () => window.open('https://d6.short.gy/Pl4n', '_blank'),
                keywords: ['plan', 'seguridad', 'plantilla', 'editable']
            },
            {
                title: 'Medidas de Seguridad',
                content: 'Documentos para medidas de seguridad',
                section: 'Documentos Editables',
                action: () => window.open('https://dal5.short.gy/M3', '_blank'),
                keywords: ['medidas', 'seguridad', 'documento']
            },
            {
                title: 'Solicitud Simple',
                content: 'Formato de solicitud simple editable',
                section: 'Documentos Editables',
                action: () => window.open('https://dal5.short.gy/H23wIF', '_blank'),
                keywords: ['solicitud', 'simple', 'formato', 'carta']
            },

            // SECCIÓN: Modelos de Solicitud
            {
                title: 'Declaración Jurada Persona Natural',
                content: 'Modelo de declaración jurada para personas naturales',
                section: 'Modelos de Solicitud',
                action: () => window.open('https://drive.google.com/file/d/1ObrdQqk_PPVTTRUKOzVmVDIxxlcZXRY6/view?usp=sharing', '_blank'),
                keywords: ['declaración', 'jurada', 'persona', 'natural', 'modelo']
            },
            {
                title: 'Declaración Jurada Empresas',
                content: 'Modelo de declaración jurada para empresas',
                section: 'Modelos de Solicitud',
                action: () => window.open('https://drive.google.com/file/d/1X32qrNC0KeyR9bW2AVZ7VzZW6JZTSjl0/view?usp=sharing', '_blank'),
                keywords: ['declaración', 'jurada', 'empresa', 'modelo']
            },
            // SECCIÓN: Manuales
            {
                title: 'Manual de Funcionamiento',
                content: 'Manual completo de funcionamiento del sistema',
                section: 'Manuales',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/manual_funcionamiento.pdf', '_blank'),
                keywords: ['manual', 'funcionamiento', 'sistema']
            },
            {
                title: 'Manual de Capacitación',
                content: 'Manual de capacitación para personal de seguridad',
                section: 'Manuales',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/manual_capacitacion.pdf', '_blank'),
                keywords: ['manual', 'capacitación', 'formación', 'personal']
            },
            {
                title: 'Manual de Organización',
                content: 'Manual de organización empresarial',
                section: 'Manuales',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/manual_organizacion.pdf', '_blank'),
                keywords: ['manual', 'organización', 'empresarial']
            },

            // SECCIÓN: Capacitación

            {
                title: 'Asesores',
                content: 'Información de Asesores en la Región',
                section: 'Personal Autorizado',
                action: () => window.open('https://dal5.short.gy/4S3', '_blank'),
                keywords: ['asesores', 'capacitador', 'personal', 'autorizado']
            },
            {
                title: 'Empresas de Capacitación',
                content: 'Listado actualizado de empresas autorizadas para capacitación',
                section: 'Capacitación y Formación',
                action: () => window.open('https://drive.google.com/file/d/1RsYHWNpeNAmhTIO1kXOscZbia7Yepktp/view', '_blank'),
                keywords: ['empresa', 'capacitación', 'listado', 'autorizada']
            },
            {
                title: 'Capacitadores',
                content: 'Personal autorizado para capacitación',
                section: 'Capacitación y Formación',
                action: () => window.open('https://drive.google.com/file/d/1hpZrzhXCnGyLkFLRhj0FOY_zDwTEUIaN/view', '_blank'),
                keywords: ['capacitador', 'personal', 'autorizado']
            },
            {
                title: 'Valor Curso Formación',
                content: 'Valores vigentes para cursos de formación',
                section: 'Capacitación y Formación',
                action: () => window.open('https://drive.google.com/file/d/1swqlfBX5-7Ko-3u_H95pnGzbLkhUnrwy/view', '_blank'),
                keywords: ['valor', 'curso', 'formación', 'precio', 'costo']
            },
            {
                title: 'Valor Curso Perfeccionamiento',
                content: 'Valores actualizados para cursos de perfeccionamiento',
                section: 'Capacitación y Formación',
                action: () => window.open('https://drive.google.com/file/d/1q2qS2AQUgoma8TmOppO9IOV1LX4PJS9Z/view', '_blank'),
                keywords: ['valor', 'curso', 'perfeccionamiento', 'precio', 'costo']
            },

            // SECCIÓN: Servicios Adicionales
            {
                title: 'Consultar Curso',
                content: 'Verificar estado de certificaciones y cursos',
                section: 'Servicios Adicionales',
                action: () => window.open('https://www.zosepcar.cl/OS10.php#buscador', '_blank'),
                keywords: ['consultar', 'curso', 'certificación', 'verificar', 'estado', 'buscador']
            },
            {
                title: 'Valores y Aranceles',
                content: 'Tabla de valores y aranceles vigentes. Vale vista $5.890',
                section: 'Servicios Adicionales',
                action: () => window.handleValores && window.handleValores(),
                keywords: ['valores', 'aranceles', 'tabla', 'precio', 'vale', 'vista', '5890']
            },
            {
                title: 'Ubicación OS10',
                content: 'Calle Cienfuegos 180, La Serena, Región de Coquimbo',
                section: 'Servicios Adicionales',
                action: () => window.open('https://maps.app.goo.gl/QUhujWbTF1FjDA7E6', '_blank'),
                keywords: ['ubicación', 'dirección', 'cienfuegos', '180', 'serena', 'mapa']
            },

            // ===== NUEVOS ITEMS DE LA SECCIÓN DIRECTIVAS =====
            {
                title: 'Solicitud Simple (Directiva)',
                content: 'Formato de solicitud simple para presentar Directiva de Funcionamiento (DD.FF.)',
                section: 'Directivas',
                action: () => window.open('https://dal5.short.gy/Solic', '_blank'),
                keywords: ['solicitud', 'simple', 'directiva', 'ddff', 'formato', 'carta']
            },
            {
                title: 'Plantilla Directiva DD.FF. (Editable)',
                content: 'Documento Word editable para completar la Directiva de Funcionamiento (DD.FF.)',
                section: 'Directivas',
                action: () => window.open('https://dal5.short.gy/D', '_blank'),
                keywords: ['plantilla', 'directiva', 'ddff', 'editable', 'word', 'completa']
            },
            {
                title: 'Requisitos Directiva (Según Tipo)',
                content: 'Documento con los requisitos para presentar una Directiva de Funcionamiento según el tipo (instalación, evento, etc.)',
                section: 'Directivas',
                action: () => window.open('https://dal5.short.gy/Re24', '_blank'),
                keywords: ['requisitos', 'directiva', 'tipo', 'documento', 'ddff']
            },
            {
                title: 'Ejemplo Uniforme (Decreto 32/2024)',
                content: 'Ejemplo visual del uniforme reglamentario según el Decreto 32/2024',
                section: 'Directivas',
                action: () => window.open('https://dal5.short.gy/0u', '_blank'),
                keywords: ['uniforme', 'ejemplo', 'decreto 32', 'ddff', 'vestimenta']
            },
            {
                title: 'Análisis de Vulnerabilidades (Editable)',
                content: 'Plantilla editable para realizar el Análisis de Vulnerabilidades de una Directiva de Funcionamiento',
                section: 'Directivas',
                action: () => window.open('https://dal5.short.gy/6ydn', '_blank'),
                keywords: ['analisis', 'vulnerabilidades', 'editable', 'plantilla', 'directiva', 'ddff']
            },
            {
                title: 'Solicitud Uniforme Distinto (Editable)',
                content: 'Documento Word editable para solicitar el uso de un uniforme distinto al reglamentario',
                section: 'Directivas',
                action: () => window.open('https://d6.short.gy/G8', '_blank'),
                keywords: ['solicitud', 'uniforme', 'distinto', 'editable', 'word', 'directiva']
            },
            {
                title: 'Herramienta para unir PDF',
                content: 'Utilidad online para escanear y unir múltiples documentos en un solo archivo PDF',
                section: 'Directivas',
                action: () => window.open('https://dal5.short.gy/I', '_blank'),
                keywords: ['pdf', 'unir', 'escanear', 'herramienta', 'digital', 'directiva']
            },
            {
                title: 'Resolución 1480 (10.04.2025)',
                content: 'Resolución asociada a la tramitación de credenciales y directivas',
                section: 'Directivas',
                action: () => window.open('https://d6.short.gy/dsds', '_blank'),
                keywords: ['resolucion', '1480', '2025', 'credenciales', 'directiva']
            },

            // ===== NUEVOS ITEMS DE LA SECCIÓN CREDENCIALES =====
            {
                title: 'Solicitud Simple (Credencial Empresa/Independiente)',
                content: 'Carta conductora o solicitud simple para tramitar credencial de empresa o independiente',
                section: 'Credenciales',
                action: () => window.open('https://d6.short.gy/bv', '_blank'),
                keywords: ['solicitud', 'simple', 'credencial', 'empresa', 'independiente', 'carta']
            },
            {
                title: 'Listado GG.SS. (Word Empresa)',
                content: 'Plantilla Word para que las empresas completen el listado de Guardias de Seguridad (GG.SS.)',
                section: 'Credenciales',
                action: () => window.open('https://docs.google.com/document/d/14mzX_kderPmSKiui__WIqVKiRSKgFe7x/edit?usp=drive_link&ouid=106863493232977056654&rtpof=true&sd=true', '_blank'),
                keywords: ['listado', 'ggss', 'guardias', 'empresa', 'word', 'plantilla', 'credencial']
            },
            {
                title: 'Guía Credencial Independiente',
                content: 'Documento con todos los requisitos para tramitar la credencial de Guardia de Seguridad Independiente',
                section: 'Credenciales',
                action: () => window.open('https://drive.google.com/uc?export=download&id=1cP51FJEqrndm3RDNLuDUFCR8zlGIBrwb', '_blank'),
                keywords: ['guia', 'credencial', 'independiente', 'requisitos', 'documento']
            },
            {
                title: 'Tabla de Valores (Credenciales)',
                content: 'Imagen con la tabla de valores y aranceles para el pago de credenciales ($5.890)',
                section: 'Credenciales',
                action: () => window.open('https://drive.google.com/uc?export=download&id=1CO9egHu6DydS51hKyDnxkg2BdDPj-vZZ', '_blank'),
                keywords: ['valores', 'tabla', 'pago', 'vale vista', '5890', 'arancel', 'credencial']
            },
            {
                title: 'Requisitos Fotografía (Credencial)',
                content: 'Ejemplo de la fotografía digital requerida: Formato JPG, 260x320 píxeles, fondo blanco, camisa negra',
                section: 'Credenciales',
                action: () => window.showCredenciales && window.showCredenciales(), // Abre la sección de credenciales
                keywords: ['foto', 'fotografia', 'requisitos', 'jpg', '260x320', 'camisa negra', 'credencial']
            },
            // SECCIÓN: Leyes nuevas (faltantes)
            {
                title: 'Resolución 2183',
                content: 'Resolución 2183 publicada en el Diario Oficial 2025. Normativa seguridad privada.',
                section: 'Leyes y Normativa',
                action: () => window.open('https://www.diariooficial.interior.gob.cl/publicaciones/2025/11/10/44295-B/01/2724844.pdf', '_blank'),
                keywords: ['resolución', '2183', '2025', 'diario oficial', 'normativa']
            },
            {
                title: 'Resolución 772',
                content: 'Resolución 772 publicada en el Diario Oficial 2026. Normativa seguridad privada.',
                section: 'Leyes y Normativa',
                action: () => window.open('https://www.diariooficial.interior.gob.cl/publicaciones/2026/03/03/44390/01/2777672.pdf', '_blank'),
                keywords: ['resolución', '772', '2026', 'diario oficial', 'normativa']
            },
            {
                title: 'Ley 21.806',
                content: 'Ley 21.806 sobre seguridad privada. Normativa complementaria.',
                section: 'Leyes y Normativa',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1221118', '_blank'),
                keywords: ['ley', '21806', '21.806', 'seguridad', 'privada', 'normativa']
            },
            {
                title: 'Resolución 830',
                content: 'Resolución 830 de seguridad privada.',
                section: 'Leyes y Normativa',
                action: () => window.open('https://os10.short.gy/830', '_blank'),
                keywords: ['resolución', '830', 'normativa', 'seguridad']
            },
            {
                title: 'Resolución 831',
                content: 'Resolución 831 de seguridad privada.',
                section: 'Leyes y Normativa',
                action: () => window.open('https://os10.short.gy/831', '_blank'),
                keywords: ['resolución', '831', 'normativa', 'seguridad']
            },

            // SECCIÓN: Entidades Obligadas
            {
                title: 'Entidades Obligadas',
                content: 'Documentos requeridos para entidades obligadas: Venta de Combustible, Empresas de Turismo, Bancos y Financieras, Apoyo Giro Bancario.',
                section: 'Entidades Obligadas',
                action: () => window.open('https://segprivada-docs.minsegpublica.gob.cl/01_Documentos_Requeridos_Entidades_Obligadas.pdf', '_blank'),
                keywords: ['entidades', 'obligadas', 'combustible', 'turismo', 'banco', 'financiera', 'giro bancario', 'spd']
            },

            // SECCIÓN: Tipos de Empresas
            {
                title: 'Empresas de Capacitación',
                content: 'Requisitos para empresas de capacitación en seguridad privada.',
                section: 'Empresas',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('empresasCapacitacion'),
                keywords: ['empresa', 'capacitación', 'requisitos', 'seguridad', 'spd']
            },
            {
                title: 'Empresas de Seguridad Electrónica',
                content: 'Requisitos para empresas de seguridad electrónica.',
                section: 'Empresas',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('empresasSeguridad'),
                keywords: ['empresa', 'seguridad', 'electrónica', 'cámaras', 'alarmas', 'requisitos', 'spd']
            },
            {
                title: 'Empresas de Asesoría en Seguridad Privada',
                content: 'Requisitos para empresas de asesoría en seguridad privada.',
                section: 'Empresas',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('empresasAsesoria'),
                keywords: ['empresa', 'asesoría', 'asesoria', 'seguridad', 'privada', 'requisitos', 'spd']
            },
            {
                title: 'Empresas de Recursos Humanos',
                content: 'Requisitos para empresas de recursos humanos en seguridad privada.',
                section: 'Empresas',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('empresasRecursosHumanos'),
                keywords: ['empresa', 'recursos', 'humanos', 'seguridad', 'requisitos', 'spd']
            },
            {
                title: 'Empresas de Externalización de Vigilantes Privados',
                content: 'Requisitos para empresas de externalización de vigilantes privados.',
                section: 'Empresas',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('empresasExternalizacion'),
                keywords: ['empresa', 'externalización', 'externalizacion', 'vigilantes', 'privados', 'vvpp', 'requisitos', 'spd']
            },
            {
                title: 'Empresa Custodia Transporte Carga Sobredimensionada',
                content: 'Requisitos para empresa de custodia y transporte de carga sobredimensionada.',
                section: 'Empresas',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('empresasCustodia'),
                keywords: ['empresa', 'custodia', 'transporte', 'carga', 'sobredimensionada', 'requisitos', 'spd']
            },
            {
                title: 'Empresa Transporte de Valores',
                content: 'Requisitos para empresa de transporte de valores.',
                section: 'Empresas',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('empresasTransporte'),
                keywords: ['empresa', 'transporte', 'valores', 'dinero', 'requisitos']
            },

            // SECCIÓN: Componentes faltantes
            {
                title: 'Supervisor de Vigilantes Privados',
                content: 'Requisitos para supervisor de vigilantes privados.',
                section: 'Componentes del Sistema',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('supervisorVigilantes'),
                keywords: ['supervisor', 'vigilantes', 'privados', 'requisitos', 'spd']
            },
            {
                title: 'Conserje',
                content: 'Requisitos para conserjes en edificios y condominios. Similar a portero y nochero.',
                section: 'Componentes del Sistema',
                action: () => window.mostrarRequisitos && window.mostrarRequisitos('portero'),
                keywords: ['conserje', 'edificio', 'condominio', 'portero', 'nochero', 'requisitos', 'spd']
            },

            // SECCIÓN: Documentos Editables faltantes
            {
                title: 'Directiva de Funcionamiento (Editable)',
                content: 'Documento Word editable para Directiva de Funcionamiento DD.FF.',
                section: 'Documentos Editables',
                action: () => window.open('https://docs.google.com/document/d/1MgInvryuu2EaxHMG_Zuy_1ZiuOTHr6jA/edit', '_blank'),
                keywords: ['directiva', 'funcionamiento', 'editable', 'word', 'ddff', 'documento']
            },
            {
                title: 'Solicitud Jefe de Seguridad',
                content: 'Documento de solicitud editable para trámite de Jefe de Seguridad.',
                section: 'Documentos Editables',
                action: () => window.open('https://os10.short.gy/SoliJef', '_blank'),
                keywords: ['solicitud', 'jefe', 'seguridad', 'editable', 'trámite', 'documento']
            },
            {
                title: 'Solicitud Capacitador',
                content: 'Documento de solicitud editable para trámite de Capacitador.',
                section: 'Documentos Editables',
                action: () => window.open('https://os10.short.gy/SolCap', '_blank'),
                keywords: ['solicitud', 'capacitador', 'editable', 'trámite', 'documento']
            },
            {
                title: 'Formato Declarar Dueños y Socios (SPD)',
                content: 'Formato SPD para declarar dueños y socios de empresa. Entidades con medidas de seguridad.',
                section: 'Documentos Editables',
                action: () => window.open('https://segprivada.minsegpublica.gob.cl/descargables', '_blank'),
                keywords: ['formato', 'declarar', 'dueños', 'socios', 'empresa', 'spd', 'medidas']
            },
            {
                title: 'Formato Estudio de Seguridad (SPD)',
                content: 'Formato oficial SPD para estudio de seguridad de entidades obligadas.',
                section: 'Documentos Editables',
                action: () => window.open('https://segprivada.minsegpublica.gob.cl/descargables', '_blank'),
                keywords: ['formato', 'estudio', 'seguridad', 'spd', 'entidad', 'obligada']
            },
            {
                title: 'Formato Planes de Seguridad Sucursal (SPD)',
                content: 'Formato oficial SPD para planes de seguridad de sucursal.',
                section: 'Documentos Editables',
                action: () => window.open('https://segprivada.minsegpublica.gob.cl/descargables', '_blank'),
                keywords: ['formato', 'plan', 'seguridad', 'sucursal', 'spd', 'entidad']
            },

            // SECCIÓN: Capacitación - Planes y Programas SPD
            {
                title: 'Plantilla Informar Inicio de Curso (SPD)',
                content: 'Plantilla oficial SPD para informar inicio de curso de capacitación.',
                section: 'Capacitación y Formación',
                action: () => window.open('https://segprivada.minsegpublica.gob.cl/descargables-autorizaciones', '_blank'),
                keywords: ['plantilla', 'informar', 'inicio', 'curso', 'capacitación', 'spd', 'autorización']
            },
            {
                title: 'Plantilla Informar Término de Curso (SPD)',
                content: 'Plantilla oficial SPD para informar término de curso de capacitación.',
                section: 'Capacitación y Formación',
                action: () => window.open('https://segprivada.minsegpublica.gob.cl/descargables-autorizaciones', '_blank'),
                keywords: ['plantilla', 'informar', 'término', 'termino', 'curso', 'capacitación', 'spd', 'autorización']
            },
            {
                title: 'Plantilla Informar Servicio Custodia (SPD)',
                content: 'Plantilla oficial SPD para informar servicio de custodia.',
                section: 'Capacitación y Formación',
                action: () => window.open('https://segprivada.minsegpublica.gob.cl/descargables-autorizaciones', '_blank'),
                keywords: ['plantilla', 'informar', 'servicio', 'custodia', 'spd', 'autorización']
            },

            // SECCIÓN: Valores faltantes
            {
                title: 'Valor Plan',
                content: 'Tabla de valores para planes de seguridad.',
                section: 'Valores',
                action: () => window.open('https://drive.google.com/file/d/12mg35jowBvw1zX8z-jU2gZg_ALjBCIBD/view', '_blank'),
                keywords: ['valor', 'plan', 'precio', 'costo', 'seguridad', 'arancel']
            },
            {
                title: 'Alarma 1er Semestre 2026',
                content: 'Valor de alarma para el primer semestre 2026.',
                section: 'Valores',
                action: () => window.open('https://os10.short.gy/Renta', '_blank'),
                keywords: ['alarma', '2026', 'semestre', 'valor', 'precio', 'costo', 'renta']
            },

            // SECCIÓN: Links de Interés
            {
                title: 'Zosepcar',
                content: 'Portal Zosepcar - consulta de cursos y certificaciones OS10.',
                section: 'Links de Interés',
                action: () => window.open('https://www.zosepcar.cl/OS10.php', '_blank'),
                keywords: ['zosepcar', 'portal', 'consultar', 'curso', 'certificación', 'os10']
            },
            {
                title: 'Directemar - Seguridad Marítimo Portuaria',
                content: 'Dirección General del Territorio Marítimo. Seguridad privada marítimo portuaria.',
                section: 'Links de Interés',
                action: () => window.open('https://www.directemar.cl/directemar/seguridad-maritima/seguridad-privada-maritimo-portuaria', '_blank'),
                keywords: ['directemar', 'marítimo', 'portuario', 'seguridad', 'naval']
            },
            {
                title: 'DGAC - Seguridad Aeroportuaria',
                content: 'Dirección General de Aeronáutica Civil. Acreditación DAN 1702.',
                section: 'Links de Interés',
                action: () => window.open('https://www.dgac.gob.cl/aeropuertos/seguridad-aeroportuaria/acreditacion-dan-1702/', '_blank'),
                keywords: ['dgac', 'aeropuerto', 'aeronáutica', 'seguridad', 'acreditación', 'dan', '1702']
            },
            {
                title: 'DGMN - Ley de Armas',
                content: 'Dirección General de Movilización Nacional. Ley de armas.',
                section: 'Links de Interés',
                action: () => window.open('https://www.dgmn.cl/leydearmas/', '_blank'),
                keywords: ['dgmn', 'armas', 'ley', 'movilización', 'nacional']
            },
            {
                title: 'SPD - Subsecretaría de Prevención del Delito',
                content: 'Portal oficial de la Subsecretaría de Prevención del Delito. Seguridad privada SPD.',
                section: 'Links de Interés',
                action: () => window.handleSPD && window.handleSPD(),
                keywords: ['spd', 'subsecretaría', 'prevención', 'delito', 'seguridad', 'privada', 'ministerio']
            },
            {
                title: 'GG.SS. x Evento',
                content: 'Herramienta para gestión de guardias de seguridad por evento.',
                section: 'Links de Interés',
                action: () => window.open('https://guardiaevento.netlify.app/', '_blank'),
                keywords: ['guardias', 'evento', 'ggss', 'gestión', 'seguridad']
            },
            {
                title: 'Descargables SPD',
                content: 'Documentos descargables del portal SPD - Subsecretaría de Prevención del Delito.',
                section: 'Links de Interés',
                action: () => window.open('https://segprivada.minsegpublica.gob.cl/descargables', '_blank'),
                keywords: ['descargables', 'spd', 'documentos', 'subsecretaría', 'formularios']
            },

            // SECCIÓN: Información de contacto
            {
                title: 'Teléfono OS10',
                content: 'Teléfono de contacto: +56 51 265 1024',
                section: 'Contacto',
                action: () => window.open('tel:+56512651024', '_self'),
                keywords: ['teléfono', 'contacto', '512651024', 'llamar']
            },
            {
                title: 'Correo Electrónico',
                content: 'Email: os10.coquimbo@carabineros.cl',
                section: 'Contacto',
                action: () => window.open('mailto:os10.coquimbo@carabineros.cl', '_self'),
                keywords: ['correo', 'email', 'contacto', 'os10.coquimbo']
            }
        ];

        console.log(`📚 Índice de búsqueda construido con ${this.searchIndex.length} elementos`);
    }

    setupEventListeners() {
        const searchButton = document.getElementById('global-search-button');
        const searchModal = document.getElementById('global-search-modal');
        const searchInput = document.getElementById('global-search-input');
        const overlay = document.querySelector('.search-modal-overlay');

        if (searchButton) {
            searchButton.addEventListener('click', () => this.openSearch());
        }

        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
            }
            if (e.key === 'Escape' && this.isOpen) {
                this.closeSearch();
            }
            if (this.isOpen && this.currentResults.length > 0) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.navigateResults(1);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.navigateResults(-1);
                } else if (e.key === 'Enter' && this.currentResultIndex >= 0) {
                    e.preventDefault();
                    this.selectResult(this.currentResultIndex);
                }
            }
        });

        if (overlay) {
            overlay.addEventListener('click', () => this.closeSearch());
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
        }

        document.querySelectorAll('.suggestion-pill').forEach(pill => {
            pill.addEventListener('click', (e) => {
                const searchTerm = e.target.dataset.search;
                if (searchInput) {
                    searchInput.value = searchTerm;
                    this.performSearch(searchTerm);
                }
            });
        });
    }

    openSearch() {
        const modal = document.getElementById('global-search-modal');
        const input = document.getElementById('global-search-input');
        
        if (modal) {
            modal.classList.remove('search-modal-hidden');
            modal.classList.add('search-modal-visible');
            this.isOpen = true;
            
            setTimeout(() => {
                if (input) input.focus();
            }, 100);
        }
    }

    closeSearch() {
        const modal = document.getElementById('global-search-modal');
        const input = document.getElementById('global-search-input');
        
        if (modal) {
            modal.classList.remove('search-modal-visible');
            modal.classList.add('search-modal-hidden');
            this.isOpen = false;
            
            if (input) {
                input.value = '';
            }
            this.clearResults();
        }
    }

    normalizeText(text) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\./g, '')
            .replace(/[^a-z0-9\s]/g, ' ')
            .trim();
    }

    performSearch(query) {
        if (!query || query.length < 2) {
            this.clearResults();
            return;
        }

        const normalizedQuery = this.normalizeText(query);
        const queryWords = normalizedQuery.split(/\s+/);
        
        const results = this.searchIndex.map(item => {
            const normalizedTitle = this.normalizeText(item.title);
            const normalizedContent = this.normalizeText(item.content);
            const normalizedKeywords = item.keywords.map(k => this.normalizeText(k)).join(' ');
            const searchableText = `${normalizedTitle} ${normalizedContent} ${normalizedKeywords}`;
            
            let score = 0;
            let matches = [];
            
            queryWords.forEach(word => {
                if (normalizedTitle.includes(word)) {
                    score += 10;
                    matches.push('title');
                }
                if (normalizedKeywords.includes(word)) {
                    score += 8;
                    matches.push('keyword');
                }
                if (normalizedContent.includes(word)) {
                    score += 5;
                    matches.push('content');
                }
                if (searchableText.includes(word)) {
                    score += 2;
                }
            });
            
            return {
                ...item,
                score,
                matches: [...new Set(matches)]
            };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
        
        this.displayResults(results, query);
    }

    displayResults(results, query) {
        const resultsContainer = document.getElementById('search-results');
        const noResultsContainer = document.getElementById('search-no-results');
        const helpContainer = document.getElementById('search-help');
        
        if (!resultsContainer) return;
        
        this.currentResults = results;
        this.currentResultIndex = -1;
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '';
            resultsContainer.classList.add('hidden');
            if (noResultsContainer) noResultsContainer.classList.remove('hidden');
            if (helpContainer) helpContainer.classList.add('hidden');
        } else {
            if (noResultsContainer) noResultsContainer.classList.add('hidden');
            if (helpContainer) helpContainer.classList.add('hidden');
            resultsContainer.classList.remove('hidden');
            
            resultsContainer.innerHTML = results.map((item, index) => {
                const highlightedTitle = this.highlightText(item.title, query);
                const highlightedContent = this.highlightText(item.content, query);
                
                return `
                    <div class="search-result-item" data-index="${index}">
                        <div class="result-section-badge">${item.section}</div>
                        <div class="result-content">
                            <h4 class="result-title">${highlightedTitle}</h4>
                            <p class="result-description">${highlightedContent}</p>
                        </div>
                        <svg class="result-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M7 7h10v10"></path>
                            <path d="M7 17L17 7"></path>
                        </svg>
                    </div>
                `;
            }).join('');
            
            document.querySelectorAll('.search-result-item').forEach((item, index) => {
                item.addEventListener('click', () => this.selectResult(index));
                item.addEventListener('mouseenter', () => {
                    this.currentResultIndex = index;
                    this.updateResultSelection();
                });
            });
        }
    }

    highlightText(text, query) {
        if (!query) return text;
        
        const words = query.split(/\s+/).filter(w => w.length > 1);
        let highlightedText = text;
        
        words.forEach(word => {
            const regex = new RegExp(`(${word})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
        });
        
        return highlightedText;
    }

    navigateResults(direction) {
        if (this.currentResults.length === 0) return;
        
        this.currentResultIndex += direction;
        
        if (this.currentResultIndex < 0) {
            this.currentResultIndex = this.currentResults.length - 1;
        } else if (this.currentResultIndex >= this.currentResults.length) {
            this.currentResultIndex = 0;
        }
        
        this.updateResultSelection();
    }

    updateResultSelection() {
        document.querySelectorAll('.search-result-item').forEach((item, index) => {
            if (index === this.currentResultIndex) {
                item.classList.add('selected');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.classList.remove('selected');
            }
        });
    }

    selectResult(index) {
        const result = this.currentResults[index];
        if (result && result.action) {
            this.closeSearch();
            setTimeout(() => {
                result.action();
            }, 200);
        }
    }

    clearResults() {
        const resultsContainer = document.getElementById('search-results');
        const noResultsContainer = document.getElementById('search-no-results');
        const helpContainer = document.getElementById('search-help');
        
        if (resultsContainer) {
            resultsContainer.innerHTML = '';
            resultsContainer.classList.add('hidden');
        }
        
        if (noResultsContainer) noResultsContainer.classList.add('hidden');
        if (helpContainer) helpContainer.classList.remove('hidden');
        
        this.currentResults = [];
        this.currentResultIndex = -1;
    }
}

// Inicializar el sistema de búsqueda cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.globalSearch = new GlobalSearch();
    });
} else {
    window.globalSearch = new GlobalSearch();
}
