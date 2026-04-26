// ===== ARCHIVO CORREGIDO: rules/chatbot-rules.js =====
console.log('🔄 Cargando base de datos de reglas OS10...');

const responses = {
    'rule_1': { keywords: ["*bots*","*tienes algun bots*","*bots de ciberseguridad*"], response: '🤖 *Bots con IA avanzada:* \n *1 Bot Seguridad Privada* \n dal5.short.gy/SePriv *2 Bot de Ciberseguridad 2024* \n dal5.short.gy/Cib *3 Bot Abogado Virtual GPT* \n dal5.short.gy/Ab0 *4 Bot Ley de Tránsito Chile* \n dal5.short.gy/LeyTto 5 Bot Ley Karin*\n dal5.short.gy/lkar'},
    'rule_2': { keywords: ["infracciones", "sanciones guardias", "multas guardias", "guardia sin curso", "guardia sin credencial", "guardia sin directiva", "guardia con arma", "infracciones ley 21659"], response: '🤖⚖️ **INFRACCIONES LEY 21.659 Y DECRETO 209** (Vigente desde 28-NOV-2025):\n\n**INFRACCIONES GRAVÍSIMAS - 3 a 20 UTM (Art. 94):**\n• Presentar antecedentes falsos ante SPD (Art. 94 N°1)\n• Usar uniformes que asimilen con FF.OO. (Art. 94 N°2)\n• Desempeñarse sin autorización de SPD (Art. 94 N°3)\n• Realizar investigaciones de delitos (Art. 94 N°3)\n• Intervenir en conflictos políticos/laborales (Art. 94 N°3)\n• Suministrar información sobre personas/bienes (Art. 94 N°3)\n• Poseer o portar armas sin autorización (Art. 94 N°3)\n• Vulnerar sitios de suceso del CPP (Art. 94 N°6)\n• Obstaculizar labores de fiscalizadores (Art. 94 N°7)\n\n**INFRACCIONES GRAVES - 1 a 3 UTM (Art. 96):**\n• Desempeñarse sin curso aprobado (Art. 96 N°4 + Art. 89 D.209)\n• Desempeñarse sin credencial vigente (Art. 96 N°4 + Art. 91 D.209)\n• No usar uniforme reglamentario (Art. 96 N°3 + Art. 90 D.209)\n• No cumplir directiva de funcionamiento (Art. 96 N°2 + Art. 92 D.209)\n• Incumplir requisitos generales Art. 46 (Art. 96 N°4)\n• Dos infracciones leves en 2 años (Art. 102 N°2)\n• Servicio de vigilancia sin directiva/curso/seguros (Art. 97 D.209)\n\n**INFRACCIONES LEVES - 0,5 a 1 UTM (Art. 98):**\n• No informar pérdida de credencial en 24 horas (Art. 98 N°3)\n• Otras contravenciones de obligaciones (Art. 98 N°3)\n\n**REINCIDENCIA:**\n• Leves reincidentes → se sancionan como graves\n• Graves reincidentes → se sancionan como gravísimas\n\n**OBSERVACIONES:**\n• Competencia: Juzgados de Policía Local (Art. 106)\n• Autodenuncia: reduce sanción hasta 80% (Art. 107)\n• Vigencia: 28 de noviembre 2025' },
    'rule_3': { keywords: ["tipos de empresas", "tipo de empresa"], response: '*EMPRESA DE RR.HH. CAPACITACION O ASESORIAS* https://www.zosepcar.cl/content/OS10/TRAM_empresas.pdf'},
    'rule_4': { keywords: ["guias","guia","componentes del sistema","componentes"], response: '🤖📂 **COMPONENTES DEL SISTEMA (Ley 21.659):**\nSeleccione para ver requisitos:\n' +
    '<button onclick="mostrarRequisitos(\'vigilante\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">👮 Vigilante Privado</button>' +
    '<button onclick="mostrarRequisitos(\'guardia\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">🛡️ Guardia de Seguridad</button>' +
    '<button onclick="mostrarRequisitos(\'jefe\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">👨‍✈️ Jefe de Seguridad</button>' +
    '<button onclick="mostrarRequisitos(\'encargado\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">🔧 Encargado de Seguridad</button>' +
    '<button onclick="mostrarRequisitos(\'supervisor\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">👀 Supervisor de Seguridad</button>' +
    '<button onclick="mostrarRequisitos(\'asesor\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">💼 Asesor de Seguridad</button>' +
    '<button onclick="mostrarRequisitos(\'capacitador\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">👨‍🏫 Capacitador</button>' +
    '<button onclick="mostrarRequisitos(\'tecnico\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">🛠️ Técnico en Seguridad</button>' +
    '<button onclick="mostrarRequisitos(\'instalador\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">🔌 Instalador Técnico</button>' +
    '<button onclick="mostrarRequisitos(\'operador\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">📹 Operador de Cámaras</button>' +
    '<button onclick="mostrarRequisitos(\'portero\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">🚪 Portero/Nochero/Rondín</button>' +
    '<button onclick="mostrarRequisitos(\'encargadoArmas\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">🔫 Encargado de Armas</button>' },
    'rule_5': { 
        keywords: ["guardia de seguridad", "guardia"], 
        requiresKeywords: ["requisitos", "guia", "guía", "acreditación", "como", "necesito", "requisito"],
        response: '🤖🛡️ **GUARDIA DE SEGURIDAD - LEY 21.659 Y DECRETO 209**\n\n**REQUISITOS GENERALES (Art. 46 Ley 21.659):**\n✓ Mayor de edad\n✓ Condiciones físicas y psíquicas compatibles\n✓ Educación media completa o equivalente\n✓ Sin condenas por crimen o delito\n✓ Sin violencia intrafamiliar\n✓ Sin acusaciones por delitos específicos\n✓ No sancionado en últimos 5 años\n✓ No inhabilitado para seguridad privada\n\n**REQUISITOS ESPECÍFICOS (Decreto 209):**\n✓ Curso: 90 horas pedagógicas mínimo (Art. 89)\n✓ Credencial: Vigente, emitida por SPD (Art. 91)\n✓ Uniforme: Negro con leyenda "SEGURIDAD PRIVADA" (Art. 90)\n✓ Directiva: Aprobada por SPD (Art. 92)\n✓ Seguro de vida: Mínimo 132 UF (Art. 88)\n✓ Chaleco anticorte: Elemento mínimo obligatorio\n\n**PERÍODO DE VALIDACIÓN:**\n• Credencial: 2 años\n• Curso: Renovación anual recomendada\n\n**PROHIBICIONES:**\n✗ Trabajar sin curso aprobado\n✗ Trabajar sin credencial vigente\n✗ Portar armas no autorizadas\n✗ Intervenir en conflictos políticos/laborales\n\n🔵 **TRÁMITE ANTE LA SPD** (No en OS10)\n👉 https://segprivada.minsegpublica.gob.cl/\n📞 Consultas OS10: 512651024 / 512651023' 
    },
    
    'rule_5a': { 
        keywords: ["el guardia debe usar chaleco anticorte","uso de chaleco anticorte", "chaleco anticorte"],
        response: '🤖🛡️ **GUARDIA DE SEGURIDAD Decreto 209 Art. 93 Inc. 2do.**\nDecreto 209 Art. 93 Inc. 2do. Los guardias de seguridad deberan contar como elemento minimo con un chaleco anticorte:\n<button>'
    },
    
    'rule_5b': { 
        keywords: ["vigilante privado", "vigilante"], 
        requiresKeywords: ["requisitos", "guia", "guía", "acreditación", "como", "necesito", "requisito"],
        response: '🤖👮 **VIGILANTE PRIVADO - LEY 21.659 Y DECRETO 209**\n\n**REQUISITOS GENERALES (Art. 46 Ley 21.659):**\n✓ Mayor de edad\n✓ Condiciones físicas y psíquicas compatibles\n✓ Educación media completa o equivalente\n✓ Sin condenas por crimen o delito\n✓ Sin violencia intrafamiliar\n✓ Sin acusaciones por delitos específicos\n✓ No sancionado en últimos 5 años\n✓ No inhabilitado para seguridad privada\n\n**REQUISITOS ESPECÍFICOS (Decreto 209):**\n✓ Curso: 60 horas pedagógicas mínimo\n✓ Credencial: Vigente, emitida por SPD\n✓ Uniforme: Identificatorio de la empresa\n✓ Seguro: Según normativa\n\n**DIFERENCIAS CON GUARDIA:**\n• NO puede portar armas\n• NO puede realizar detenciones\n• Función: Control y vigilancia\n• Reporta incidentes a autoridades\n\n**PROHIBICIONES:**\n✗ Portar armas de ningún tipo\n✗ Realizar investigaciones\n✗ Intervenir en conflictos\n\n🔵 **TRÁMITE ANTE LA SPD** (No en OS10)\n👉 https://segprivada.minsegpublica.gob.cl/\n📞 Consultas OS10: 512651024 / 512651023' 
    },
    
    'rule_6': { 
        keywords: ["jefe de seguridad", "jefe seguridad"], 
        requiresKeywords: ["requisitos", "guia", "guía", "acreditación", "como", "necesito", "requisito"],
        response: '🤖👨‍✈️ **JEFE DE SEGURIDAD - LEY 21.659**\n\n**REQUISITOS MÍNIMOS:**\n✓ Todos los requisitos generales (Art. 46)\n✓ Experiencia en seguridad privada\n✓ Conocimiento de Ley 21.659 y Decreto 209\n✓ Capacidad de gestión y supervisión\n✓ Responsabilidad legal de operaciones\n\n**FORMACIÓN REQUERIDA:**\n✓ Diplomado: 400 horas académicas mínimo\n✓ Si requiere vigilante privado: Certificación adicional (2 años)\n✓ Actualización anual en cambios normativos\n\n**RESPONSABILIDADES:**\n✓ Supervisar directivas de funcionamiento\n✓ Garantizar cumplimiento de requisitos\n✓ Mantener registros y documentación\n✓ Coordinar con autoridades fiscalizadoras\n✓ Reportar infracciones a SPD\n\n**AUTORIDAD:**\n✓ Autorizar cursos de capacitación\n✓ Emitir directivas de funcionamiento\n✓ Supervisar personal a su cargo\n\nℹ️ Contacta OS10: 512651024 / 512651023' 
    },
    
    'rule_7': { 
        keywords: ["supervisor", "supervisor seguridad"], 
        requiresKeywords: ["requisitos", "guia", "guía", "acreditación", "como", "necesito", "requisito"],
        response: '🤖👀 **SUPERVISOR DE SEGURIDAD - LEY 21.659**\n\n**REQUISITOS GENERALES:**\n✓ Todos los requisitos del Art. 46 Ley 21.659\n✓ Experiencia supervisiva en seguridad\n✓ Conocimiento de Ley 21.659 y Decreto 209\n✓ Competencias en liderazgo y gestión\n\n**FORMACIÓN:**\n✓ Curso de supervisión: Mínimo 120 horas\n✓ Certificación en supervisión de seguridad\n✓ Actualización anual recomendada\n\n**RESPONSABILIDADES:**\n✓ Supervisar cumplimiento de directivas\n✓ Verificar requisitos de personal\n✓ Inspeccionar equipamiento y uniformes\n✓ Documentar infracciones\n✓ Reportar a Jefe de Seguridad\n✓ Coordinar con fiscalizadores\n\n**AUTORIDAD:**\n✓ Verificar credenciales\n✓ Supervisar jornadas\n✓ Reportar irregularidades\n\n🔵 **TRÁMITE ANTE LA SPD** (No en OS10)\n👉 https://segprivada.minsegpublica.gob.cl/\n📞 Consultas OS10: 512651024 / 512651023' 
    },
    
    'rule_8': { 
        keywords: ["encargado de seguridad", "encargado"], 
        requiresKeywords: ["requisitos", "guia", "guía", "acreditación", "como", "necesito", "requisito"],
        response: '🤖🔧 **ENCARGADO DE SEGURIDAD**\nRequisitos actualizados (Ley 21.659):\n<button onclick="mostrarRequisitos(\'encargado\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">🔧 Ver Requisitos Encargado</button>' 
    },
    
    'rule_9': {
        keywords: ["capacitador"],
        requiresKeywords: ["requisitos", "guia", "guía", "acreditación", "como", "necesito", "requisito"],
        response: '🤖👨‍🏫 **CAPACITADOR**\nRequisitos actualizados (Ley 21.659):\n<button onclick="mostrarRequisitos(\'capacitador\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">👨‍🏫 Ver Requisitos Capacitador</button>\n🔵 **TRÁMITE ANTE LA SPD** (No en OS10)\n👉 https://segprivada.minsegpublica.gob.cl/'
    },
    
    'rule_10': { 
        keywords: ["tecnico", "tecnico seguridad"], 
        requiresKeywords: ["requisitos", "guia", "guía", "acreditación", "como", "necesito", "requisito"],
        response: '🤖🛠️ **TÉCNICO EN SEGURIDAD**\nRequisitos actualizados (Ley 21.659):\n<button onclick="mostrarRequisitos(\'tecnico\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">🛠️ Ver Requisitos Técnico</button>' 
    },
    
    'rule_11': { 
        keywords: ["asesor", "asesor de seguridad"], 
        requiresKeywords: ["requisitos", "guia", "guía", "acreditación", "como", "necesito", "requisito"],
        response: '🤖💼 **ASESOR DE SEGURIDAD**\nRequisitos actualizados (Ley 21.659):\n<button onclick="mostrarRequisitos(\'asesor\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">💼 Ver Requisitos Asesor</button>' 
    },
    
    'rule_12': { 
        keywords: ["instalador tecnico", "instalador"], 
        requiresKeywords: ["requisitos", "guia", "guía", "acreditación", "como", "necesito", "requisito"],
        response: '🤖🔌 **INSTALADOR TÉCNICO**\nRequisitos actualizados (Ley 21.659):\n<button onclick="mostrarRequisitos(\'instalador\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">🔌 Ver Requisitos Instalador</button>' 
    },
    
    'rule_13': {
        keywords: ["empresa de seguridad", "empresas de seguridad", "crear empresa seguridad"],
        response: '🤖🏢 **EMPRESAS DE SEGURIDAD**\nRequisitos actualizados (Ley 21.659):\n<button onclick="mostrarRequisitos(\'empresa\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">Ver Requisitos Empresa</button>\n🔵 **TRÁMITE ANTE LA SPD** (No en OS10)\n👉 https://segprivada.minsegpublica.gob.cl/'
    },
    
    'rule_14': { 
        keywords: ["operador cctv", "cctv", "operador de camaras", "operador camaras"], 
        requiresKeywords: ["requisitos", "guia", "guía", "acreditación", "como", "necesito", "requisito"],
        response: '🤖📹 **OPERADOR DE CÁMARAS (CCTV)**\nRequisitos actualizados (Ley 21.659):\n<button onclick="mostrarRequisitos(\'operador\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">📹 Ver Requisitos Operador</button>' 
    },
    
    'rule_15': { 
        keywords: ["manuales"], 
        response: '🤖 ⬇️ *ESCRIBE UNA OPCIÓN* 👮🏻‍♂️🚦\n*1M.-* MANUAL DE FUNCIONAMIENTO\n*2M.-* MANUAL DE CAPACITACIÓN \n*3M.-* MANUAL DE ORGANIZACIÓN' 
    },




    'rule_17': { keywords: ["1m"], response: '*MANUAL DE FUNCIONAMIENTO* https://www.zosepcar.cl/content/OS10/manual_funcionamiento.pdf' },
    'rule_18': { keywords: ["3m"], response: '*MANUAL DE ORGANIZACIÓN*\nhttps://www.zosepcar.cl/content/OS10/manual_organizacion.pdf' },
    'rule_19': { keywords: ["2m"], response: '*MANUAL DE CAPACITACIÓN*\nhttps://www.zosepcar.cl/content/OS10/manual_capacitacion.pdf' },
    'rule_20': { keywords: ["leyes", "*leyes de seguridad privada*"], response: '*ESCRIBE UN NUMERO LEY O DECRETO*.\n 🚦. ⬇️ \n \nDECTO. *261* DEL 31.0 un7.2020\nDECTO. *298* DEL 17.09.2019\n DECTO. *123* DEL 05.04.2019\nDECTO. *1045* DEL 12.09.2018\nDECTO. *867* DEL 12.09.2017\nDECTO. *1814* DEL 10.11.2014\nDECTO. *222* DEL 30.10.2014\nDECTO. *1122* DEL 19.10.1994\nDECTO. *41* DEL 05.03.1996\nDECTO. *1772* DEL 26.01.1995\nDECTO. *1773* DEL 14.11.1994\nDECTO. *93* DEL 21.10.1985\nD. LEY. *3607* DEL 08.01.1981\nLEY *19303* DEL 13.04.1994\nResol. *253* DEL 29.10.2013\nResol. *59* DEL 30.09.2014\nResol. *32* DEL 31.01.2024\nResol. *80* DEL 20.03.2024\nLEY. *21659* DEL 21.03.2024' },
    'rule_21': { keywords: ["261"], response: '*DECRETO NRO 261*. \n\n\nhttps://www.zosepcar.cl/content/OS10/Decreto-261.pdf' },
    'rule_22': { keywords: ["298"], response: '*DECRETO 298*. https://www.bcn.cl/leychile/navegar?idNorma=1136545&idParte=10054790&idVersion=2019-09-17' },
    'rule_23': { keywords: ["123"], response: '*DECRETO 123*. https://www.bcn.cl/leychile/navegar?idNorma=1130300' },
    'rule_24': { keywords: ["1045"], response: '*DECRETO 1045*. https://www.bcn.cl/leychile/navegar?idNorma=1122982&idParte=9948603&idVersion=2018-09-12' },
    'rule_25': { keywords: ["867"], response: '*DECRETO 867*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=1116274' },
    'rule_26': { keywords: ["1814"], response: '*DECRETO 1814* DISPONE MEDIDAS QUE REGULEN EL TRANSPORTE DE VALORES. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=1069299' },
    'rule_27': { keywords: ["222"], response: '*DECRETO 222*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=1055580' },
    'rule_28': { keywords: ["1122"], response: '*DECRETO 1122*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=1072929' },
    'rule_29': { keywords: ["41"], response: '*DECRETO 41*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=19870' },
    'rule_30': { keywords: ["1772"], response: '*DECRETO 1772*. \nhttps://www.bcn.cl/leychile/navegar?idNorma=18592' },
    'rule_31': { keywords: ["1773"], response: '*DECRETO 1773*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=18594' },
    'rule_32': { keywords: ["93"], response: '*DECRETO 93*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=9081' },
    'rule_33': { keywords: ["3607"], response: '*D. LEY 3607*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=7193' },
    'rule_34': { keywords: ["19303"], response: '*LEY 19303*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=30670' },
    'rule_35': { keywords: ["253"], response: '*Resol. 253*. https://www.zosepcar.cl/content/OS10/resolucion_253.pdf' },
    'rule_36': { keywords: ["59"], response: '*Resol. 59*. https://www.zosepcar.cl/content/OS10/resolucion_59.pdf' },
    'rule_37': { keywords: ["32"], response: '*Decreto. 32 DECRETO 32 EXENTO MODIFICA EN TÉRMINOS QUE INDICA DECRETO N°261 EXENTO, DE 2020, DEL MINISTERIO DEL INTERIOR Y SEGURIDAD PÚBLICA, QUE APRUEBA MANUAL OPERATIVO EN MATERIAS DE SEGURIDAD PRIVADA Y FIJA SU TEXTO ACTUALIZADO*. https://www.bcn.cl/leychile/navegar?idNorma=1200633' },
    'rule_38': { keywords: ["80"], response: '*Resol. 80*. https://www.zosepcar.cl/content/OS10/resolucion_80.pdf' },
    'rule_39': { keywords: ["*21659*", "*nueva ley de seguridad*"], response: '🤖📚 **LEY 21.659 VIGENTE**\nLa Ley de Seguridad Privada y sus reglamentos (Decreto 209 y 208) están vigentes. Establece nuevas categorías de riesgo, infracciones y procedimientos.\nVer ley: https://dal5.short.gy/LeySeg' },
    'rule_65': { keywords: ["*fono*", "*telefono*","*numero*","*ubicados*","*dirección*","*atención*","*horario*","*horarios*","*ubicación*","*direccion oficina*","*cual es la dirección del os10*","*horario atención publico*", "*donde estan ubicados*", "*donde esta el os10 coquimbo*", "*donde esta el os10*","*donde*", "*direccion*"], response: '🤖 👉🏼 *O.S.10 COQUIMBO*\nDe lunes a jueves de 09:00 horas a 13:00 horas. Dirección en calle Cienfuegos 180, La Serena.\nFonos: 512651024-512651022-512651023\n https://maps.app.goo.gl/QUhujWbTF1FjDA7E6' },
    'rule_66': { keywords: ["Otro Menú"], response: '**ESCRIBA LO QUE ESTA CON NEGRILLAS:**\n **registro: **Consultar guardia \n**OS10:** menú OS10 \n**comisaria:** Comisaria cuadrantes\n**ciberseguridad:** Ciberseguridad \n**Dgac: **DGAC Seg. Priv. \n**32:** Modifica 261 \n**Directiva:** Directiva\n**Bots:** Seguridad privada, Ciberseguridad, tránsito, Ley Karyn' },
    'rule_68': { keywords: ["imc"], response: '*CALCULAR IMC*\nhttps://nutricionistavirtual.cl/calculadora/' },
    'rule_70': { keywords: ["4651"], response: '*RESOLUCIÓN 4651 INASISTENCIA*\n\nhttps://zosepcar.cl/content/OS10/resol_4651.pdf' },
    'rule_72': { keywords: ["empresa en un dia"], response: '*\"CREA TU EMPRESA EN UN DIA\"* \n https://www.registrodeempresasysociedades.cl/' },
    'rule_73': { keywords: ["insignia digital"], response: '*INSIGNIA DIPLOMADO CIBERSEGURIDAD*\n\nhttps://bit.ly/3DSuD46' },
    'rule_74': { keywords: ["capacitadores"], response: '🤖 *CAPACITADORES*\n https://drive.google.com/file/d/1hpZrzhXCnGyLkFLRhj0FOY_zDwTEUIaN/view?usp=drivesdk' },
    'rule_78': { keywords: ["*votaciones*","*votar*","*excusarme*","*lugar de votación*"], response: '*LUGAR DE VOTACIÓN - VOCAL DE MESA*☝🏼👍🏽\nhttps://consulta.servel.cl/\n*PUEDE LLAMAR AL* 600 600 0166 desde su teléfono\n🤖 *CONSULTAS Y RECLAMOS SERVEL LINK- EXCUSA*: \nhttps://www.servel.cl/contacto/' },
    'rule_80': { keywords: ["comisaria","cuadrante","cuadrantes","comisarías"], response: '🤖👮🏻‍♂️ TEL. CUADRANTES\n- https://www.comisariavirtual.cl\n- https://www.stop.carabineros.cl/\n- BUSCA TU CUADRANTE:\nhttps://www.bit.ly/3Yna7AP\n- CUAD. LA SERENA\nhttps://www.dal5.short.gy/C\n- CUAD. LAS COMPAÑIAS\nhttps://www.dal5.short.gy/C1\n- CUAD. COQUIMBO\nhttps://www.dal5.short.gy/Co\n- MAPA CUAD LA SERENA\nhttps://www.d6.short.gy/LS\n- MAPA CUAD COQUIMBO\nhttps://www.d6.short.gy/CQ\n- CEROFILAS\nhttps://www.dal5.short.gy/CFil' },
    'rule_82': { keywords: ["rut","ver un rut"], response: '🤖 🧙🏻‍♂️ *Consultar R.U.T.* 👇?\nhttps://www.elrutificador.com/\nhttps://www.nombrerutyfirma.com\nhttps://www.rutynombre.com/\nhttps://www.rutificador.co/rut/' },
    'rule_83': { keywords: ["aaff"], response: '*AA.FF. A NIVEL NACIONAL* 🤖Busque la comuna que necesita en el mapa. \nhttps://www.zosepcar.cl/OS10.php#autoridad' },
    'rule_85': { keywords: ["reclamo","fiscalizacion","fiscalizar"], response: '*REQUERIMIENTO* \n https://dal5.short.gy/R3' },
    'rule_86': { keywords: ["*cuál es la pagina del os10*","*zosepcar*"], response: '*🤖 Está es la página del os10*\nhttps://www.zosepcar.cl/OS10.php' },
    'rule_87': { keywords: ["reglamento"], response: '*Reglamento 11*\nhttps://drive.google.com/file/d/0By_MScWZi3fRLVlIN2dJby1hekU/view?usp=drivesdk&resourcekey=0-3OB6XmcfWnIf9KZU1J65Yw' },
    'rule_88': { keywords: ["ciberseguridad"], response: '🤖 🧙🏻‍♂️ *\"CIBERSEGURIDAD\"*\n➢ *1.-¿Que Hacer?*:\nhttps://www.dal5.short.gy/SIyeI3\n➢ *2.,-¿Cómo notificar?*:\nhttps://www.dal5.short.gy/GFxMgX' },
    'rule_89': { keywords: ["menu os10", "MENÚ OS10","menú os10"], response: '*De acuerdo OS10*🧙🏻‍♂️👮🏻‍♂️☝️*Escriba lo que está con negrillas:* \n \n ⬇️ **ESCRIBA El QUE NECESITE:**\n➢ **Bots:** recibirá un listado de bots con Inteligencia Avanzada.\n➢ **Componentes:** Obtendrá las guías\n➢ **Manuales:** Se desplega menú\n➢ **Leyes:** Se desplega menú\n➢ **Editable:** Documentos en Word.\n➢ **Directiva:** Requisitos presentar\n➢ **Valores:** Cursos y planes.\n➢ **Menu credencial:** Menú credenciales\n➢ **Nueva Ley:** Nueva ley seguridad privada y reglamento.' },
    'rule_90': { keywords: ["*directiva*","*directiva de funcionamiento*","*directivas*","directiva de funcionamiento instalacion","funcionamiento","formulario directiva"], response: '🤖📋 **DIRECTIVA DE FUNCIONAMIENTO**\n(Instalación - Evento - Partidos de Fútbol Profesional)\n\n📥 **Descargar Formato Editable:**\nhttps://docs.google.com/document/d/1MgInvryuu2EaxHMG_Zuy_1ZiuOTHr6jA/edit' },
    'rule_91': { keywords: ["mantra"], response: '*Mantra*\n\nOm: Om es la sílaba semilla que sintoniza cualquier mantra que se recita en su vibración' },
    'rule_92': { keywords: ["usuario diploma"], response: '*PAGINA DIPLOMADO* https://centropyc.carabineros.cl/acipol/login/index.php Usuario: 982083a Contraseña: Flor9820&' },
    'rule_93': { keywords: ["auditorias empresa de capacitacion","auditorias empresas de capacitacion","auditoria empresa de capacitacion","auditoria empresas de capacitacion"], response: ',👮🏼*AUDITORIAS EMPRESA CAPACITACIÓN 2024*\n\nhttps://dal5.short.gy/AuCap' },
    'rule_95': { keywords: ["*independiente*","*credencial independiente*","*credencial independientes*"], response: '🤖🚫 **Credencial Independiente (Eliminada)**\nCon la nueva Ley 21.659, la figura del guardia independiente que tramita su propia credencial ya no existe. Todo el personal de seguridad debe estar contratado y acreditado a través de una empresa de seguridad autorizada o una entidad obligada.' },
    'rule_96': { keywords: ["medidas"], response: '🤖🧙🏻‍♂️ *MEDIDAS DE SEGURIDAD*\n➢ *MED.EDITABLE:* https://dal5.short.gy/M3' },
    'rule_98': { keywords: ["Valores","cuanto cuesta","cual es el valor","valor plan","valores planes","valores plan","*valor*","*cuesta*","precio credencial","valor credencial"], response: '🤖💰 **VALORES 1° SEMESTRE 2026** _(vigentes hasta el 30.06.2026)_\n\nTodas las credenciales de personal cuestan **5.960 pesos** — mismo valor para todos los componentes:\n\n⬜ **Guardia de Seguridad** — fondo foto: **blanco**\n🟥 **Vigilante Privado** — fondo foto: **rojo**\n🟦 **Supervisor de Seguridad** — fondo foto: **azul**\n🟦 **Asesor en Seguridad** — fondo foto: **azul**\n🟦 **Capacitador** — fondo foto: **azul**\n🟦 **Jefe de Seguridad** — fondo foto: **azul**\n🟦 **Encargado de Armas / Operador de Cámaras / Técnico** — fondo foto: **azul**\n\n**CREDENCIAL EMPRESA:** 5.960 pesos\n**PLAN DE SEGURIDAD:** 39.732 pesos\n\n**CURSOS:** Se gestionan directamente con la **SPD** por la empresa de capacitación — O.S.10 no tramita cursos.\n\n<button onclick="showCredenciales()" class="response-button block w-full text-left bg-yellow-500 hover:bg-yellow-600 border border-yellow-600 text-white text-sm py-1.5 px-3 rounded-lg transition-all font-medium">📋 Ir a sección Credenciales</button>' },
    'rule_102': { keywords: ["no hay sistema"], response: '🤖 *NO HAY SISTEMA CENTRAL ACTUALMENTE*\nLa resolución 3632 del 30 de Noviembre de 2023 establece que actualmente no existe un sistema central de registro.' },
    'rule_103': { keywords: ["infraccion","infracciones"], response: '🤖 *INFRACCIONES TRANSITO*\nhttps://bit.ly/3HFKLaH\nhttps://bit.ly/3ilvbrN\nhttps://bit.ly/3ZcOzb9' },
    'rule_104': { keywords: ["infraccion os10"], response: '🤖 *INFRACCIONES OS10*\nSegún decreto 867 y sus modificaciones' },
    'rule_105': { keywords: ["infracción alcoholes"], response: '🤖 *INFRACCIONES ALCOHOLES*\nLey 19.925 sobre expendio y consumo de bebidas alcohólicas' },
    'rule_106': { keywords: ["estadio"], response: '🤖 *ESTADIO*\nRequisitos especiales para eventos deportivos según circular 28' },
    'rule_108': { keywords: ["dgac"], response: '🤖 *DGAC SEGURIDAD PRIVADA*\nDirección General de Aeronáutica Civil - Requisitos especiales' },
    'rule_109': { keywords: ["decreto 32"], response: '*DECRETO 32/2024*\nModifica decreto 261\nhttps://www.zosepcar.cl/content/OS10/Resol_32.pdf' },
    'rule_110': { keywords: ["*editable*","*documentos word*"], response: '🤖 *DOCUMENTOS EDITABLES EN WORD*\n✅ Estudio\n✅ Plan\n✅ Medidas\n✅ Directiva\n✅ Todos@ ' },
    'rule_111': { keywords: ["nueva ley"], response: '🤖 *NUEVA LEY SEGURIDAD PRIVADA*\nLey 21.659 del 21 de marzo de 2024\nhttps://dal5.short.gy/LeySeg **Decreto 209**\n https://os10.short.gy/J88sfJ **APRUEBA REGLAMENTO DE SEGURIDAD PRIVADA** https://os10.short.gy/209 ' },
    'rule_112': { keywords: ["menu credencial"], response: '🤖 *MENÚ CREDENCIALES*\n- Guardia\n- Jefe Seguridad\n- Supervisor\n- Asesor' },
    'rule_113': { keywords: ["vigilante privado"], response: '🤖👮‍♂️ **VIGILANTE PRIVADO**\nRequisitos actualizados (Ley 21.659):\n<button onclick="mostrarRequisitos(\'vigilante\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">Ver Requisitos Vigilante</button>' },
    'rule_114': { keywords: ["portero", "nochero", "rondin", "guia portero"], response: '🤖🌙 **PORTERO / NOCHERO / RONDÍN**\nRequisitos actualizados (Ley 21.659):\n<button onclick="mostrarRequisitos(\'portero\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">Ver Requisitos Portero</button>\n🔵 **TRÁMITE ANTE LA SPD** (No en OS10)\n👉 https://segprivada.minsegpublica.gob.cl/' },
    'rule_115': { keywords: ["encargado de armas", "guia encargado armas"], response: '🤖🔫 **ENCARGADO DE ARMAS**\nRequisitos actualizados (Ley 21.659):\n<button onclick="mostrarRequisitos(\'encargadoArmas\')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium my-1">Ver Requisitos Encargado Armas</button>' },
    'rule_116': { keywords: ["malla", "malla curricular", "malla curso", "materias curso", "que entra en el curso", "asignaturas de capacitacion", "asignaturas de capacitación", "malla de capacitacion", "malla de capacitación", "asignaturas"], response: '🤖📚 **MALLAS CURRICULARES**\nDescarga los contenidos de los cursos:\n\n👮 **Guardia de Seguridad (90 hrs):**\nhttps://www.zosepcar.cl/content/OS10/malla_guardia.pdf\n\n🔫 **Vigilante Privado (100 hrs):**\nhttps://www.zosepcar.cl/content/OS10/malla_vigilante.pdf\n\n🌙 **Portero/Nochero:**\nhttps://www.zosepcar.cl/content/OS10/malla_portero.pdf' },
    'rule_149': { keywords: ["empresas recursos humanos"], response: '🤖 *EMPRESAS DE RECURSOS HUMANOS*\nAutorización especial para intermediación laboral\nRequisitos específicos' },
    'rule_150': { keywords: ["*supermercados*","*sobre 500 uf*","*requisitos sobre 500 uf*"], response: '🤖 *REQUISITOS SOBRE 500 UF.*\n\nhttps://dal5.short.gy/S500' },
    'rule_152': { keywords: ["linkedin"], response: '🧙🏻‍♂️.*LinkedIn* \nhttps://dal5.short.gy/Lin' },
    'rule_153': { keywords: ["pdf"], response: '🤖 *PDF sh4nge 3dit0r 3d1t0r Plus*\n\n*https://dal5.short.gy/PDF2*' },
    'rule_154': { keywords: ["*facultades*","*fiscalizar vigilante*"], response: '🧙🏻‍♂️👮🏻‍♂️🏦☝️ LAS FACULTADES CONFERIDAS A CARABINEROS DE CHILE CONFORME LO SIGUIENTE PARA *VIGILANTES PRIVADOS Y ENTIDAD OBLIGADAS* SEGÚN EL ARTICULO 3 DEL DECRETO 3.607' },
    'rule_155': { keywords: ["circular","eventos"], response: '🤖 *CIRCULAR 28*\n\n*https://www.bcn.cl/leychile/navegar?i=1083082*' },
    'rule_156': { keywords: ["*cursos online*","*modalidad telematica*"], response: '🤖 *CURSOS MODALIDAD TELEMATICA* (online)\n\nhttps://www.zosepcar.cl/content/OS10/resolucion_80.pdf' },
    'rule_157': { keywords: ["*guía de perro*","*perro*"], response: '🤖 D/E 164678609OS10 del 28/07/2022.\n👮🐕🐕‍🦺 *INSTRUCCIONES SOBRE ACREDITACIÓN DE GUÍAS DE PERROS ADIESTRADOS Y CERTIFICACIÓN DE LOS EJEMPLARES*' },
    'rule_161': { keywords: ["*como presentar una ddff*","*presentar directiva*","*presentar una directiva de funcionamiento*","*presentar ddff*","*presentar dd.ff.*"], response: '🤖👉🏼 *COMO SE DEBE PRESENTAR UNA DIRECTIVA DE FUNCIONAMIENTO EN PDF*\nNota- Hipervínculos en el pdf\nhttps://dal5.short.gy/PdDdff' },
    'rule_162': { keywords: ["*por qué no puede en la vía*","*guardia en la via publica*"], response: '☝🏼👮🏻‍♂️🚦\n*EL GUARDIA DE SEGURIDAD SOLO DEBE REALIZAR SUS LABORES DENTRO DE UN RECINTO O ÁREA DELIMITADA.*' },
    'rule_163': { keywords: ["tiempo"], response: '😃👉🏼*TIEMPO*\n*Windy*\nhttps://www.windy.com\n*Meteored*\nhttps://www.meteored.cl/mapas-meteorologicos/' },
    'rule_164': { keywords: ["radios"], response: '*RADIOS LA SERENA*\nhttps://onlineradiobox.com/cl/La_Serena' },
    'rule_165': { keywords: ["grupos"], response: 'Grupo trabajos\nhttps://dal5.short.gy/Grup' },
    'rule_166': { keywords: ["*manual cs55*"], response: '🤖👽👉🏼🚙 MANUAL CS55 2021\n\nhttps://drive.google.com/file/d/1NrPRmy9ag2pLtd2E5OX0sHfI-x9rCblo/view?usp=drivesdk' },
    'rule_167': { keywords: ["*crear imagen*","*ia imagen*","*imagen ia*"], response: '👽🤖👌🏼*IA CREA IMAGEN Y VIDEO*\nhttps://huggingface.co/spaces' },
    'rule_168': { keywords: ["criptografia"], response: 'Estás invitado a una reunión de Teams.\n\nClases de Criptografía\n\nhttps://teams.microsoft.com/l/meetup-join' },
    'rule_169': { keywords: ["diplomado"], response: '🤖👉🏼 *DIPLOMADO*\n\nhttps://dal5.short.gy/Diplo' },
    'rule_170': { keywords: ["*ley de control de armas*","*armas*"], response: '🤖👉🏼LEY DE CONTROL DE ARMAS\n\nhttps://www.bcn.cl/leychile/navegar?i=29291&f=1972-10-21' },
    'rule_172': { keywords: ["209"], response: '🤖 *REGLAMENTO LEY DE SEGURIDAD PRIVADA* https://dal5.short.gy/Regl' },
    'rule_173': { keywords: ["auditorias","instructivo auditorias","auditoría"], response: '👮🏼☝🏼 *INSTRUCTIVO AUDITORIAS D/E 142623956*\n1.- Empresas de RR.HH.\n2.- Empresas de TT.VV.\n3.- Empresas de Capacitación' },
    'rule_174': { keywords: ["binance","recibir criptomonedas"], response: '🤖🪙💰🪙👉🏼 💸*RECIBIR CRIPTO EN BINANCE*\n*Recibir:*\n 0x78b349586f9de0ad692549b20e0efba58df1ff79' },
    'rule_175': { keywords: ["partido","futbol","copa américa","donde ver futbol"], response: '👽👉🏼 *VER FUTBOL ONLINE O DESCARGAR APP*\n\n👉🏼 *VER ONLINE*: LINK : https://futbollibrehd.cl/' },
    'rule_177': { keywords: ["doodieman"], response: '*Doodieman*\nhttps://www.1001juegos.com/juego/doodieman-voodoo' },
    'rule_178': { keywords: ["usek","anexos"], response: '🤖 *ANEXOS* \nLink: https://anexos.usek.cl/\nPdf: https://www.dal5.short.gy/Kj2AUu' },
    'rule_179': { keywords: ["calendario clases"], response: '🤖👮🏼👉🏼 *CALENDARIO CLASES* https://www.dal5.short.gy/ie1DxQ' },
    'rule_180': { keywords: ["prompts","pront","prom","pron","promt","promtsp","promstp"], response: '🤖👉🏼 *PROMPTS*\n\nCrear App\nhttps://dal5.short.gy/CreaApp' },
    'rule_181': { keywords: ["estudios"], response: '🤖👉🏼 *TECNICO DE NIVEL SUPERIOR EN TRABAJO SOCIAL*\nhttps://www.dal5.short.gy/SU' },
    'rule_182': { keywords: ["currículum"], response: '🤖👍🏼 *CURRÍCULUM VITAE* \nhttps://dal5.short.gy/CV' },
    'rule_185': { keywords: ["foto ia","ia foto","agrandar foto","ampliar foto","herramientas de inteligencia artificial","inteligencia","cambiar fondo"], response: '🤖☝🏼 *HERREMIENTAS DE INTELIGENCIA ARTIFICIAL*\n\n1.- *Laboratorio de Google IA*\nlabs.google/fx/es' },
    'rule_188': { keywords: ["trabajo"], response: '*Seguridad IOT*\nTRABAJO 3 INDIVIDUAL \n\nhttps://docs.google.com/document/d/1gDgNpIwkqmGK2GTJ_sTP1O1Dx1ZDnmR9/edit' },
    'rule_192': { keywords: ["que significa atm","significado atm"], response: '🤖 ATM (Automated Teller Machine)' },
    'rule_193': { keywords: ["tejidos","tejido","tejer","tejidos luna"], response: '🤖 *TEJIDOS LUNA*👇🏽🦴🐕\n\nhttps://dal5.short.gy/Tej3' },
    'rule_194': { keywords: ["14 puntos cajeros"], response: '🤖 *14 PUNTOS CAJEROS*\n\nMi XXXXXXX se informa el siguiente procedimiento' },
    'rule_195': { keywords: ["*¿los días de votación serán feriados?"], response: '*¿Los días de votación serán feriados?*\n\nSí. El sábado 26 de octubre será feriado normal, por lo que el comercio podrá abrir. Mientras que el domingo 27 de octubre será feriado irrenunciable.' },
    'rule_197': { keywords: ["colores"], response: '🤖 *Colores votaciones* \nhttps://drive.google.com/file/d/1qAQoR_DRaXl8Cgzfueyx2ggh2LL_caBh/view?usp=drivesdk' },
    'rule_198': { keywords: ["*para tramitar una credencial de guardia*","tipos de credencial","cuanto tipos de credenciales"], response: '👮🏽‍♂️👉🏼 Bajo la nueva Ley 21.659, solo existe un tipo de credencial para guardias, la cual se tramita siempre a través de una **Empresa de Seguridad** autorizada. La figura del guardia independiente fue eliminada.' },
    'rule_201': { keywords: ["y tiene los valores","y tiene los valores del plan","credenciales empresa","los valores","valores credencial","valor","cual es el valor","cuanto cuesta","plan"], response: 'Si, claro: 🤖🧙🏻‍♂️ *AQUI ESTAN LOS VALORES 2DO. SEMESTRE 2024*\n\n1.- *CREDENCIAL*\nhttps://bit.ly/3vmqEvz' },
    'rule_202': { keywords: ["registro ingreso biometrico"], response: '🤖👉🏼 *Registro ingreso Biométrico*\n\nhttps://dal5.short.gy/Reg' },
    'rule_203': { keywords: ["sacar cantidad de guardias por evento","guardia por evento","cantidad de guardias","cuantos guardias","guardias por evento"], response: '🤖👮🏼‍♂️👉🏼 *CANTIDAD DE GUARDIA POR EVENTO:* \n \n*Link:*\n*https://dal5.short.gy/GGSS*' },
    'rule_204': { keywords: ["hora dipreca","para sacar hora en dipreca","sacar hora dipreca","dipreca"], response: 'Gracias por contactarse con DIPRECA. \n*Informamos que desde el 13 de Junio este whatsapp dejó de funcionar*' },
    'rule_206': { keywords: ["os11","arma","inscripción de un arma","trámites os11","tramites os11"], response: '🧙🏼‍♂️🤖👉🏼 *Portal de consultas de armas*\n https://www.portalarmaschile.gob.cl/' },
    'rule_207': { keywords: ["certificado","certificados","como sacar certificado os10","cerofilas","cero filas","0 filas"], response: '👮🏽‍♂️ 👉🏼 *TRÁMITES CEROFILAS*:\n\nLink: https://dal5.short.gy/CFil' },
    'rule_208': { keywords: ["dpi"], response: '*LOS DPI AFECTAN ÚNICAMENTE LA RESOLUCIÓN DE IMPRESIÓN, NO EL TAMAÑO FÍSICO DE LA IMAGEN EN PÍXELES.*' },
    'rule_209': { keywords: ["7 puntos"], response: '*1. TIPIFICACIÓN:* ROBO VEHÍCULO AFECTA CONSEJAL COMUNA VITACURA.' },
    'rule_213': { keywords: ["fotografía","fotito"], response: '*1.- FOTOSTORE:* Calle Prat 629, La Serena.\nUbicación: *https://dal5.short.gy/629*' },
    'rule_215': { keywords: ["sacar hora dental","dentista","sacar hora"], response: '🤖 *SACAR HORA DENTISTA CARABINEROS LA SERENA O SANTIAGO.*\n*https://www.hoscar.cl/v2.0/horasdentales/login.php*' },
    'rule_216': { keywords: ["valor infracciones","valores infracciones","cuanto cuesta una infracción de seguridad privada"], response: ',🤖☝🏼 Dado que las multas establecidas en la Ley 21.659 se expresan en UTM' },
    'rule_220': { keywords: ["pagina"], response: '🧙🏼‍♂️ *PAGINA CIBERSEGURIDAD*\n*https://dal5.short.gy/C25*' },
    'rule_223': { keywords: ["cédula","cédula de identidad"], response: '*CÉDULA DE IDENTIDAD 2025*\nhttps://dal5.short.gy/Ce' },
    'rule_238': { keywords: ["pensiones","calculo pensión","jubilación","retiro","pensión","retirarme","retirarse"], response: '🧙🏼‍♂️ *Calculo Pensiones*\ndal5.short.gy/Pens' },
    'rule_239': { keywords: ["directiva","directiva de funcionamiento","directivas","directiva de funcionamiento instalacion","funcionamiento","formulario directiva"], response: '🤖 *PAGINA PARA:*\n*1.- PRESENTAR DIRECTIVA.*\n*2.- CREDENCIAL EMPRESA.*' },
    'rule_240': { keywords: ["*credencial empresa*","credencial empleador","cred empresa","*credenciales empresas*","credencial","credencial independiente","independiente","credencial independientes","tramitar credencial"], response: '🤖 **ACREDITACIÓN DE PERSONAL**\nBajo la nueva Ley 21.659, toda credencial debe ser tramitada por una **Empresa de Seguridad** autorizada o una entidad obligada. La credencial de "independiente" ya no existe. El personal siempre debe estar vinculado a un empleador.\n\n📞 Consultas: 512651024' },
    'rule_242': { keywords: ["sin directiva funcionamiento","empresa sin directiva","falta directiva"], response: '🤖📋 Una empresa NO puede operar sin Directiva de Funcionamiento aprobada. Es requisito obligatorio según DL 3607 art. 2°. La autorización se otorga por Decreto del Ministerio del Interior previo informe favorable de Carabineros.' },
    'rule_243': { keywords: ["realizaron examen","los que realizaron el examen","enviar el resultado examen","enviar resultado","enviar resultados"], response: '🤖 👮🏼‍♂️\n1.- Los que están con rojo sacaron bajo el 60% y están reprobados' },
    'rule_244': { keywords: ["usuario portal","portal usuario","portal de usuario","usuario"], response: '🧙🏼‍♂️\nhttps://dal5.short.gy/U53' },
    'rule_245': { keywords: ["presentación con ia","presentaciónes"], response: '🤖🧙🏼‍♂️ \n\n1.- https://gamma.app/' },
    'rule_246': { keywords: ["plano oficina"], response: '🤖 Plano Oficina \nhttps://os10.short.gy/Pl40' },
    'rule_247': { keywords: ["requerimiento de desarrollo web","requerimiento página","página","requisitos página","crear página web","desarrollo web"], response: '🤖🧙🏼‍♂️ 💡🥇 *Para saber que es lo que necesita, responder lo siguiente*\n\n*1.- Requerimiento de desarrollo*\nhttps://dal5.short.gy/D3sa' },
    'rule_248': { keywords: ["servidor","servidores","alojar página","alojar"], response: '🧙🏼‍♂️*Alojar páginas web*\n1.- https://app.netlify.com/\n2.- https://github.com/' },
    'rule_253': { keywords: ["valores infracciones ciberseguridad","infracciones de ciberseguridad","infracciones ciberseguridad"], response: '🤖🧙🏼‍♂️*VALORES INFRACCIONES DE CIBERSEGURIDAD*\nhttps://dal5.short.gy/Vc' },
    'rule_254': { keywords: ["*examen os10*","examen"], response: '🧙🏼‍♂️🤖👮🏼‍♂️ *Practicar examen*\nhttps://dal5.short.gy/SeSec' },
    'rule_255': { keywords: ["*examen moto*","examen para moto","moto"], response: '🤖🧙🏼‍♂️ *Examen moto*\nhttps://dal5.short.gy/ExMoto' },
    'rule_257': { keywords: ["gestudio","estudiar","gestor académico","gestor"], response: '🤖🧙🏼‍♂️✅\n\nhttps://gestudios.netlify.app/' },
    'rule_258': { keywords: ["modelos de solicitud","modelo","punto 6","punto 7"], response: '🤖🧙🏼‍♂️✅\n\nhttps://www.zosepcar.cl/OS10.php#Modelo' },
    'rule_259': { keywords: ["*Hola*", "como estamos","que tal","como va", "de que ta las das", ], response: 'Hola que tal, cuenteme en que lo puedo ayudar' },
    'rule_260': { keywords: ["*como estas*"], response: 'Bien aqui trabajando para variar y tu ¿como estas?' },
    // Reglas conversacionales para el chatbot OS10 Coquimbo - Interacciones iniciales y análisis inteligente
// Reglas conversacionales para el chatbot OS10 Coquimbo - Interacciones iniciales y análisis inteligente
// El bot analiza las consultas y extrae respuestas de la base de conocimiento de la Nueva Ley de Seguridad Privada

// Reglas conversacionales para el chatbot OS10 Coquimbo - Interacciones iniciales y análisis inteligente
// El bot analiza las consultas y extrae respuestas de la base de conocimiento de la Nueva Ley de Seguridad Privada

'rule_261': { keywords: ["hola","saludos"], response: '🤖👮🏻‍♂️ ¡Hola! Bienvenido/a a la Oficina de Seguridad Privada O.S.10 Coquimbo. Estoy aquí para ayudarle con sus consultas. ¿En qué puedo asistirle hoy?' },
'rule_261a': { keywords: ["buenos días","buen día"], response: '🤖👮🏻‍♂️ ¡Buenos días! Bienvenido/a a la Oficina de Seguridad Privada O.S.10 Coquimbo. Estoy aquí para ayudarle con sus consultas. ¿En qué puedo asistirle hoy?' },
'rule_261b': { keywords: ["buenas tardes","buena tarde"], response: '🤖👮🏻‍♂️ ¡Buenas tardes! Bienvenido/a a la Oficina de Seguridad Privada O.S.10 Coquimbo. Estoy aquí para ayudarle con sus consultas. ¿En qué puedo asistirle hoy?' },
'rule_261c': { keywords: ["buenas noches","buena noche"], response: '🤖👮🏻‍♂️ ¡Buenas noches! Bienvenido/a a la Oficina de Seguridad Privada O.S.10 Coquimbo. Estoy aquí para ayudarle con sus consultas. ¿En qué puedo asistirle hoy?' },
'rule_262': { keywords: ["gracias","muchas gracias","te agradezco","agradezco"], response: '🤖😊 ¡Es un placer ayudarle! Para eso estamos aquí en O.S.10 Coquimbo. Si tiene alguna otra consulta, no dude en escribirme. ¡Que tenga un excelente día!' },
'rule_263': { keywords: ["chao","adiós","nos vemos","hasta luego","me voy"], response: '🤖👋 ¡Hasta luego! Gracias por contactar a O.S.10 Coquimbo. Recuerde que estamos de lunes a jueves de 09:00 a 13:00 horas en Cienfuegos 180, La Serena. ¡Que tenga un buen día!' },
'rule_264': { keywords: ["ayuda","no entiendo","estoy perdido","no sé qué hacer"], response: '🤖🆘 ¡Tranquilo/a! Entiendo que puede ser confuso. Estoy aquí para guiarle paso a paso. Por favor, cuénteme específicamente qué necesita y con mucho gusto le ayudo a encontrar la solución. ¿Se trata de una credencial, curso, o algún trámite específico?' },
'rule_265': { keywords: ["información","qué hacen","qué es os10","oficina seguridad"], response: '🤖🏢 O.S.10 Coquimbo es la Oficina de Seguridad Privada que regula y supervisa todo lo relacionado con seguridad privada en la región. Nos encargamos de credenciales, cursos, empresas de seguridad, y cumplimiento normativo. ¿En qué área específica necesita información?' },
'rule_266': { keywords: ["problema","error","no funciona","dificultad"], response: '🤖⚠️ Lamento escuchar que está teniendo dificultades. Por favor, descríbame detalladamente cuál es el problema y haré todo lo posible por ayudarle a solucionarlo. Si es algo técnico, también puede contactarnos directamente al 512651024.' },
'rule_267': { keywords: ["urgente","apurado","rápido","prisa"], response: '🤖🚨 Entiendo que su consulta es urgente. Permítame ayudarle de la manera más eficiente posible. Por favor, indíqueme exactamente qué necesita y le proporcionaré la información de forma directa y clara.' },
'rule_268': { keywords: ["confundido","no encuentro","perdido","desorientado"], response: '🤖🧭 ¡No se preocupe! Es normal sentirse un poco desorientado con tantos procedimientos. Estoy aquí para guiarle correctamente. Cuénteme qué está buscando y le ayudo a encontrar el camino correcto paso a paso.' },
'rule_269': { keywords: ["primera vez","soy nuevo","no conozco","principiante"], response: '🤖🌟 ¡Bienvenido/a al mundo de la seguridad privada! Es un gusto ayudar a personas que recién comienzan. No se preocupe, todos empezamos desde cero. Cuénteme qué le interesa y le explico todo desde el principio de manera sencilla.' },
'rule_270': { keywords: ["recomendación","qué me recomienda","consejo","sugerencia"], response: '🤖💡 ¡Excelente pregunta! Para darle la mejor recomendación, necesito conocer un poco más sobre su situación. ¿Busca trabajar en seguridad privada, tiene una empresa, o necesita contratar servicios? Con esa información podré orientarle perfectamente.' },
'rule_271': { keywords: ["no sé","no estoy seguro","duda","indeciso"], response: '🤖🤔 ¡Perfecto! Las dudas son normales y es mejor aclararlas antes de proceder. No hay problema en no estar seguro, para eso estoy aquí. Cuénteme qué opciones está considerando y juntos encontraremos la mejor alternativa para usted.' },
'rule_272': { keywords: ["complicado","difícil","enredado","complejo"], response: '🤖⚡ ¡Entiendo perfectamente! Los procedimientos pueden parecer complicados al principio, pero no se preocupe. Mi trabajo es simplificar todo para usted. Vamos paso a paso y verá que no es tan difícil como parece. ¿Por dónde empezamos?' },
'rule_273': { keywords: ["reclamo","queja","molesto","disconforme","requerimiento"], response: '🤖📋 Lamento escuchar que tiene una situación que le molesta. Su satisfacción es importante para nosotros. Para formalizar su reclamo o requerimiento, por favor utilice nuestro formulario oficial: 📋 *REQUERIMIENTO:* https://dal5.short.gy/R3' },
'rule_274': { keywords: ["felicitaciones","excelente","muy bueno","genial"], response: '🤖😊 ¡Muchas gracias por sus palabras! Es muy gratificante saber que nuestro servicio le parece bueno. Seguiremos trabajando para brindarle la mejor atención. ¿En qué más puedo ayudarle hoy?' },
'rule_275': { keywords: ["bot","robot","artificial","automático"], response: '🤖🤖 ¡Así es! Soy un asistente virtual inteligente creado especialmente para ayudarle con sus consultas de seguridad privada. Aunque soy un bot, estoy programado con toda la información actualizada de OS10 Coquimbo para brindarle respuestas precisas y útiles.' },
'rule_276': { keywords: ["qué dice la ley","según la ley","ley dice","normativa"], response: '🤖📚 Permítame analizar la Nueva Ley de Seguridad Privada 21.659 y su reglamento para responder su consulta específica. Por favor, sea más específico sobre qué aspecto de la ley necesita conocer y le proporcionaré la información exacta.' },
'rule_277': { keywords: ["multa","sanción","infracción","castigo"], response: '🤖⚖️ Analizando la normativa vigente... Las sanciones están detalladas en la Ley 21.659. Para darle información precisa sobre multas, necesito saber qué tipo de infracción consulta. ¿Se refiere a empresas, guardias, o alguna situación específica?' },
'rule_278': { keywords: ["artículo","según el artículo","art","art."], response: '🤖📖 Perfecto, veo que necesita información específica de un artículo. Por favor indíqueme el número del artículo de la Ley 21.659 o del Reglamento 209 que necesita consultar, y le proporcionaré el contenido exacto y su interpretación.' },
'rule_279': { keywords: ["cambios","modificaciones","diferencias","nuevo"], response: '🤖🔄 Excelente consulta. La Nueva Ley 21.659 introduce importantes cambios. Basándome en mi análisis de la normativa, puedo explicarle las modificaciones específicas. ¿Se refiere a cambios en requisitos, procedimientos, o algún aspecto particular?' },
'rule_280': { keywords: ["obligación","deber","debe","obligatorio"], response: '🤖📋 Analizando las obligaciones según la normativa vigente... Para darle información precisa sobre deberes y obligaciones, necesito saber si consulta por empresas de seguridad, guardias, o algún actor específico del sistema.' },
'rule_281': { keywords: ["prohibido","no se puede","está prohibido","prohibición"], response: '🤖🚫 Revisando las prohibiciones establecidas en la Ley 21.659... Hay varias prohibiciones específicas según el tipo de actor. ¿Su consulta se refiere a guardias, empresas, o alguna actividad en particular?' },
'rule_282': { keywords: ["plazo","tiempo","días","vigencia"], response: '🤖⏰ Consultando los plazos establecidos en la normativa... Los plazos varían según el trámite o procedimiento. Para darle información exacta, ¿a qué tipo de plazo se refiere? ¿Credenciales, cursos, o algún procedimiento específico?' },
'rule_283': { keywords: ["requisito","condición","necesito","exigencia"], response: '🤖✅ Analizando los requisitos según la Nueva Ley de Seguridad Privada... Los requisitos varían según lo que necesite tramitar. ¿Consulta por requisitos para credenciales, empresas, cursos, o algún trámite específico?' },
'rule_284': { keywords: ["fiscalización","inspección","control","supervisión"], response: '🤖🔍 Revisando las disposiciones sobre fiscalización en la normativa... La ley establece claras facultades de fiscalización. ¿Su consulta se refiere a inspecciones a empresas, controles a guardias, o algún aspecto específico del proceso?' },
'rule_285': { keywords: ["capacitación","formación","entrenamiento","curso obligatorio"], response: '🤖🎓 Analizando los requisitos de capacitación según la Ley 21.659... La normativa establece obligaciones específicas de formación. ¿Necesita información sobre cursos obligatorios, empresas capacitadoras, o algún aspecto particular?' },

// El bot analiza las consultas y extrae respuestas de la base de conocimiento de la Nueva Ley de Seguridad Privada 2

'rule_286': { keywords: ["guardia sin curso","vigilante sin capacitación","sin formación","no tengo curso","no tiene curso","falta curso","sin curso","no hice curso","no ha hecho curso","capacitación pendiente","curso vencido","certificado vencido"], response: '🤖⚠️ **GUARDIA SIN CURSO (Ley 21.659)**\nUn guardia sin curso de capacitación vigente comete una **INFRACCIÓN GRAVÍSIMA** (Art. 94). \nSanción: Multa de 3 a 20 UTM y posible inhabilitación. La empresa contratante también es sancionada.' },
'rule_287': { keywords: ["guardia sin credencial","vigilante sin autorización","sin credencial","no tengo credencial","no tiene credencial","falta credencial","credencial vencida","sin licencia","no tengo licencia","no tiene licencia","autorización vencida","permiso vencido"], response: '🤖❌ **GUARDIA SIN CREDENCIAL (Ley 21.659)**\nTrabajar sin credencial vigente es una **INFRACCIÓN GRAVÍSIMA** (Art. 94). \nSanción: Multa de 3 a 20 UTM. La credencial es intransferible y obligatoria durante el servicio.' },
'rule_288': { keywords: ["sin directiva funcionamiento","empresa sin directiva","falta directiva","no tengo directiva","no tiene directiva","directiva vencida","sin autorización empresa","empresa no autorizada","sin resolución","no tenemos directiva"], response: '🤖📋 **SIN DIRECTIVA (Ley 21.659)**\nOperar sin Directiva de Funcionamiento aprobada es una **INFRACCIÓN GRAVÍSIMA** para la empresa (Art. 100). \nSanción: Multa de 650 a 13.500 UTM (Entidades Obligadas) o 50 a 650 UTM (Empresas Seguridad), más medidas administrativas.' },
'rule_289': { keywords: ["guardia sin uniforme","vigilante sin uniforme","uniforme obligatorio"], response: '🤖👕 Los vigilantes DEBEN usar uniforme reglamentario según DL 3607 art. 1°. El uniforme debe ser diferente al de FF.AA. y Carabineros, y de uso exclusivo para vigilantes autorizados. No usarlo constituye infracción.' },
'rule_290': { keywords: ["vigilante sin arma","guardia desarmado","arma obligatoria"], response: '🤖🔫 Los vigilantes DEBEN portar armas según DL 3607 art. 1°. El porte y control de armas se rige por Ley 17.798. Solo pueden portar armas autorizadas y registradas según normativa vigente.' },
'rule_291': { keywords: ["empresa sin registro","compañía no autorizada","registro empresa"], response: '🤖🏢 Las empresas de seguridad DEBEN estar registradas y autorizadas. Operar sin registro constituye ejercicio ilegal de actividad regulada. Sanción: multa de 25 a 125 ingresos mínimos mensuales, más clausura.' },
'rule_292': { keywords: ["vigilante fuera recinto","guardia fuera instalaciones","límites funciones"], response: '🤖🚫 Los vigilantes SOLO pueden actuar dentro del recinto autorizado según DL 3607 art. 1°. NO pueden ejercer funciones fuera del área específica designada en su autorización.' },
'rule_293': { keywords: ["credencial vencida","vigencia credencial","renovación credencial"], response: '🤖📅 Las credenciales tienen vigencia limitada y DEBEN renovarse antes del vencimiento. Trabajar con credencial vencida equivale a no tener credencial. Renovación debe solicitarse con anticipación.' },
'rule_294': { keywords: ["curso vencido","capacitación vencida","actualización curso"], response: '🤖📚 Los cursos de capacitación tienen vigencia según Decreto 93. DEBE mantenerse capacitación actualizada. Trabajar con curso vencido constituye falta de requisito esencial para ejercer.' },
'rule_295': { keywords: ["antecedentes penales","inhabilidad","requisitos morales"], response: '🤖⚖️ Los vigilantes NO pueden tener antecedentes penales según DL 3607. Condenas por delitos simples, robos, hurtos o drogas inhabilitan para ejercer funciones de seguridad privada.' },
'rule_296': { keywords: ["menor edad guardia","vigilante menor","edad mínima"], response: '🤖🔞 Los vigilantes DEBEN ser mayores de 18 años según normativa. Menores de edad NO pueden ejercer funciones de seguridad privada bajo ninguna circunstancia.' },
'rule_297': { keywords: ["examen médico","aptitud física","certificado médico"], response: '🤖🏥 Los vigilantes DEBEN acreditar aptitud física y mental mediante examen médico según reglamento. El certificado debe estar vigente y emitido por profesional autorizado.' },
'rule_298': { keywords: ["libro registro","registro vigilantes","control personal"], response: '🤖📖 Las empresas DEBEN mantener libro de registro actualizado con datos de todos los vigilantes según Decreto 93. Debe incluir: datos personales, credenciales, capacitación y destinos.' },
'rule_299': { keywords: ["estudio seguridad","plan seguridad","medidas mínimas"], response: '🤖📊 Las entidades obligadas DEBEN presentar Estudio de Seguridad según DL 3607 art. 3°. Debe incluir: análisis de riesgos, medidas propuestas, organización del servicio y recursos necesarios.' },
'rule_300': { keywords: ["jefe seguridad","encargado seguridad","responsable interno"], response: '🤖👨‍💼 Las entidades obligadas DEBEN designar Jefe de Seguridad según Decreto 1122. Debe tener capacitación específica y conocimiento de la normativa de seguridad privada.' },
'rule_301': { keywords: ["conexión alarmas","central monitoreo","sistema alarmas"], response: '🤖📡 Las conexiones a centrales de alarmas requieren autorización según Decreto 41. Deben cumplir especificaciones técnicas y protocolos de comunicación con Carabineros.' },
'rule_302': { keywords: ["transporte valores","blindados","carga valiosa"], response: '🤖🚛 El transporte de valores se rige por el Decreto 1814. Requiere: vehículos blindados, personal especializado, rutas autorizadas y medidas de seguridad específicas.' },
'rule_303': { keywords: ["vigilancia nocturna","turno noche","horario nocturno"], response: '🤖🌙 La vigilancia nocturna requiere medidas especiales según normativa. Debe considerar: iluminación adecuada, comunicaciones, rondas programadas y protocolos de emergencia.' },
'rule_304': { keywords: ["fiscalización carabineros","inspección","control autoridad"], response: '🤖👮‍♂️ Carabineros puede fiscalizar en cualquier momento según DL 3607. Las empresas y vigilantes DEBEN facilitar información, mostrar credenciales y permitir inspecciones.' },
'rule_305': { keywords: ["denuncia infracción","reportar irregularidad","violación normativa"], response: '🤖📞 Las infracciones deben denunciarse a la Prefectura de Carabineros competente. Incluya: fecha, lugar, descripción detallada y evidencias disponibles de la irregularidad observada.' },
'rule_306': { keywords: ["capacitación continua","cursos actualización","perfeccionamiento"], response: '🤖📖 Los vigilantes DEBEN mantener capacitación continua según nuevas normativas. Incluye: actualización legal, técnicas de seguridad, primeros auxilios y manejo de situaciones.' },
'rule_307': { keywords: ["seguro responsabilidad","póliza seguro","cobertura daños"], response: '🤖🛡️ Las empresas DEBEN mantener seguros de responsabilidad civil según reglamento. Debe cubrir: daños a terceros, errores profesionales y responsabilidad del personal.' },
'rule_308': { keywords: ["procedimiento emergencia","protocolo crisis","plan contingencia"], response: '🤖🚨 Las empresas DEBEN tener protocolos de emergencia definidos. Incluye: cadena de mando, comunicaciones, evacuación, primeros auxilios y coordinación con autoridades.' },
'rule_309': { keywords: ["documentación obligatoria","papeles requeridos","documentos vigentes"], response: '🤖📄 Documentación obligatoria: credencial vigente, certificado curso, carnet identidad, autorización porte armas (si aplica), certificado médico y contrato trabajo.' },
'rule_310': { keywords: ["horarios trabajo","jornada laboral","turnos vigilantes"], response: '🤖⏰ Los horarios deben cumplir Código del Trabajo. Jornada máxima, descansos obligatorios, horas extras reguladas. Turnos nocturnos tienen normativa especial de protección.' },
'rule_311': { keywords: ["equipo comunicación","radio transmisor","medios comunicación"], response: '🤖📻 Los vigilantes DEBEN contar con medios de comunicación efectivos según normativa. Equipos deben estar autorizados por SUBTEL y mantener protocolo de comunicaciones.' },
'rule_312': { keywords: ["material guerra","armas prohibidas","equipamiento restringido"], response: '🤖⛔ PROHIBIDO uso de material de guerra, armas automáticas o equipamiento militar según DL 3607. Solo armas autorizadas por normativa civil de control de armas.' },
'rule_313': { keywords: ["detención ciudadana","arrestar","facultades vigilante"], response: '🤖👮‍♂️ Los vigilantes NO tienen facultades de detención especiales. Solo pueden ejercer detención ciudadana en flagrancia según Código Procesal Penal, entregando inmediatamente a Carabineros.' },
'rule_314': { keywords: ["uso fuerza","agresión","violencia vigilante"], response: '🤖✋ El uso de fuerza debe ser: necesario, proporcional y último recurso según principios legales. PROHIBIDO uso excesivo, torturas o tratos inhumanos. Solo legítima defensa justifica fuerza.' },
'rule_315': { keywords: ["revisión personas","cacheo","registro corporal"], response: '🤖🔍 Los vigilantes NO pueden realizar registros corporales invasivos. Solo inspección visual de bultos/bolsos con consentimiento o cuando reglamento interno lo autorice expresamente.' },
'rule_316': { keywords: ["banco entidad financiera","institución bancaria","servicio financiero"], response: '🤖🏦 Bancos e instituciones financieras DEBEN contar con servicio propio de vigilancia según DL 3607 art. 3°. Además requieren organismo interno de seguridad y oficina especializada.' },
'rule_317': { keywords: ["empresa estratégica","servicio público","entidad obligada"], response: '🤖🏭 Empresas estratégicas y servicios públicos determinados DEBEN contar con vigilancia privada obligatoria según DL 3607 art. 3°. Listado se define por decreto supremo secreto.' },
'rule_318': { keywords: ["porte armas","licencia armas","autorización armamento"], response: '🤖🔫 El porte de armas requiere: licencia individual vigente, inscripción en Registro Nacional de Armas, capacitación específica y autorización del empleador según Ley 17.798.' },
'rule_319': { keywords: ["subcontratación","tercerización","empresa contratista"], response: '🤖🤝 La subcontratación de servicios de seguridad está permitida pero la empresa principal mantiene responsabilidad solidaria según normativa laboral y de seguridad privada.' },
'rule_320': { keywords: ["reclutamiento","selección personal","contratación vigilantes"], response: '🤖👥 El reclutamiento DEBE verificar: antecedentes, aptitud física/mental, capacitación previa, referencias laborales y cumplimiento de todos los requisitos legales vigentes.' },
'rule_321': { keywords: ["puedo trabajar sin curso","trabajo sin capacitación","me contratan sin curso","contrato sin formación","empiezo sin curso","inicio sin capacitación"], response: '🤖🚫 **TRABAJAR SIN CURSO (Ley 21.659)**\nNO puedes trabajar sin curso. Es una **INFRACCIÓN GRAVÍSIMA** (Art. 94). \nProceso: 1) Curso formación (90 hrs) 2) Aprobar examen 3) Obtener certificación 4) Solicitar credencial. Trabajar sin esto conlleva multas en UTM.' },
'rule_322': { keywords: ["él trabaja sin curso","ella trabaja sin curso","trabaja sin capacitación","empleado sin curso","personal sin formación","guardia nuevo sin curso"], response: '🤖⚠️ Esa persona NO puede trabajar sin curso. Según Decreto 93 art. 13° es obligatorio tener capacitación vigente. Si detectas esta situación, repórtala a Carabineros. La empresa también será sancionada por contratar personal no calificado.' },
'rule_323': { keywords: ["puedo trabajar sin credencial","trabajo sin licencia","me contratan sin credencial","empiezo sin autorización","inicio sin permiso","trabajo sin papeles"], response: '🤖❌ **TRABAJAR SIN CREDENCIAL (Ley 21.659)**\nNO puedes trabajar sin credencial. Es una **INFRACCIÓN GRAVÍSIMA** (Art. 94). \nLa credencial es tu autorización oficial. Sin ella, te expones a multas de 3 a 20 UTM e inhabilitación.' },
'rule_324': { keywords: ["él trabaja sin credencial","ella trabaja sin credencial","trabaja sin licencia","guardia sin papeles","empleado sin autorización","personal sin credencial"], response: '🤖🚨 Esa persona comete INFRACCIÓN GRAVE trabajando sin credencial. Según Decreto 93, solo pueden ejercer quienes tengan autorización vigente. Denuncia inmediatamente a Carabineros. Multa para guardia Y empresa.' },
'rule_325': { keywords: ["empresa puede operar sin directiva","trabajamos sin directiva","operamos sin autorización","empresa nueva sin papeles","negocio sin permisos","compañía sin resolución"], response: '🤖🛑 **EMPRESA SIN DIRECTIVA (Ley 21.659)**\nNO pueden operar sin Directiva de Funcionamiento. Es una **INFRACCIÓN GRAVÍSIMA** (Art. 100). \nSanción: Multas altas en UTM y posible revocación de autorización. Deben solicitarla con anticipación a la autoridad fiscalizadora.' },
'rule_326': { keywords: ["esa empresa opera sin directiva","empresa sin autorización","compañía ilegal","negocio sin permisos","operan sin papeles","funcionan sin directiva"], response: '🤖📢 Esa empresa opera ILEGALMENTE sin Directiva de Funcionamiento. Según Decreto 93 art. 15°, todas las empresas de seguridad DEBEN tener autorización vigente. Denuncia inmediatamente: pueden clausurarla y multar a directivos.' },
'rule_327': { keywords: ["si no tengo curso os10", "qué pasa si no tengo curso","qué pasa si trabajo sin curso","consecuencias sin capacitación","multa por no tener curso","sanción trabajar sin formación"], response: '🤖⚖️ **CONSECUENCIAS SIN CURSO (Ley 21.659)**\n1) Multa personal: 3-20 UTM (Gravísima)\n2) Multa empresa: 50-650 UTM (Grave/Gravísima)\n3) Inhabilitación temporal o definitiva\n4) Registro de sanción en sistema nacional.' },
'rule_328': { keywords: ["qué pasa si trabajo sin credencial","consecuencias sin licencia","multa por no tener credencial","sanción trabajar sin autorización"], response: '🤖⚖️ **CONSECUENCIAS SIN CREDENCIAL (Ley 21.659)**\n1) Multa personal: 3-20 UTM (Gravísima)\n2) Multa empresa: Sanciones graves en UTM\n3) Inhabilitación para ejercer seguridad privada\n4) Registro de infracción.' },
'rule_329': { keywords: ["qué pasa empresa sin directiva","consecuencias operar sin autorización","multa empresa sin directiva","sanción compañía ilegal"], response: '🤖⚖️ **CONSECUENCIAS EMPRESA SIN DIRECTIVA (Ley 21.659)**\n1) Multa: 50-650 UTM (Empresas Seguridad) o 650-13.500 UTM (Entidades Obligadas)\n2) Suspensión o revocación de autorización\n3) Clausura de servicios\n4) Responsabilidad civil y administrativa.' },

// Reglas conversacionales para el chatbot OS10 Coquimbo solo region de Coquimbo.
    
'rule_350': { keywords: ["*donde puedo hacer el curso*","*empresa capacitadora*","*empresa de capacitacion*","punto 7"], response: '🤖🧙🏼‍♂️✅ 🧙🏻‍♂️ Estas son algunas empresas de aqui de la region:\n*EMPRESAS DE CAPACITACIÓN 2025* https://d6.short.gy/Cap'},
'rule_351': { keywords: ["*quien es tu creador*","*quien te creo*"], response: '🤖🧙🏼‍♂️✅ Mi creador es el\n*Ingeniero en Informática y Ciberseguridad \nDaniel Elías Figueroa Chacama*' },
    // Nuevas reglas basadas en la Ley 21.659 y Reglamento 209 - Seguridad Privada Chile
// INFRACCIONES GRAVÍSIMAS - Artículos de base legal
'rule_400': { keywords: ["infracciones gravísimas guardias", "infracciones graves guardias", "sanciones graves guardias"], response: '🤖⚖️ **INFRACCIONES GRAVÍSIMAS GUARDIAS DE SEGURIDAD** (Art. 94-95 Ley 21.659):\n**1.** Usar armas de fuego en ejercicio de funciones - **PROHIBIDO TOTALMENTE**\n**2.** No adoptar medidas de seguridad según plan aprobado\n**3.** Trabajar sin credencial vigente\n**4.** Trabajar sin curso de capacitación aprobado\n**5.** Proporcionar información falsa a autoridades\n**SANCIONES:** Multa 3-20 UTM + posible inhabilitación' },
'rule_401': { keywords: ["infracciones gravísimas vigilantes", "infracciones graves vigilantes", "sanciones graves vigilantes"], response: '🤖⚖️ **INFRACCIONES GRAVÍSIMAS VIGILANTES PRIVADOS** (Art. 94-95 Ley 21.659):\n**1.** Ejercer sin autorización vigente\n**2.** No portar armas cuando es obligatorio\n**3.** Usar armas fuera del recinto autorizado\n**4.** No usar sistemas de registro audiovisual obligatorios\n**5.** Trabajar sin curso vigente (cada 2 años)\n**SANCIONES:** Multa 3-20 UTM + inhabilitación temporal o definitiva' },
// NUEVA LEY 21.659 - ASPECTOS GENERALES
'rule_402': { keywords: ["nueva ley seguridad privada", "ley 21659", "que cambió nueva ley"], response: '🤖📚 **NUEVA LEY 21.659 SEGURIDAD PRIVADA** (VIGENTE):\n**PRINCIPALES CAMBIOS:**\n**1.** Órgano rector: Subsecretaría Prevención Delito\n**2.** Clasificación entidades por RIESGO (Alto/Medio/Bajo)\n**3.** Estudios seguridad vigencia 4 años\n**4.** Cursos obligatorios diferenciados\n**5.** Nuevas figuras: Jefe seguridad, Encargado seguridad\n**6.** Registro Nacional digitalizado\n**7.** Regulación eventos masivos (Decreto 208)\n**DEROGA:** Decreto Ley 3.607 y Ley 19.303' },
// ENTIDADES OBLIGADAS - CLASIFICACIÓN POR RIESGO
'rule_403': { keywords: ["entidades obligadas", "clasificación riesgo", "riesgo alto medio bajo"], response: '🤖🏢 **ENTIDADES OBLIGADAS - CLASIFICACIÓN RIESGO** (Art. 7-9 Ley 21.659):\n**RIESGO ALTO:** Sistema vigilancia privada obligatorio\n- Bancos y financieras\n- Transporte valores\n- Apoyo giro bancario\n**RIESGO MEDIO:** Medidas seguridad adaptadas\n**RIESGO BAJO:** Medidas básicas\n**SIEMPRE OBLIGADAS:** Empresas venta combustible\n**CRITERIOS:** Actividad, localización, concurrencia público, valores, horarios, delitos previos' },
// VIGILANTES PRIVADOS - REQUISITOS NUEVOS
'rule_404': { keywords: ["requisitos vigilante privado", "como ser vigilante privado"], response: '🤖👮‍♂️ **REQUISITOS VIGILANTE PRIVADO** (Art. 25-26 Ley 21.659):\n**GENERALES:**\n- Mayor 18 años\n- Educación media\n- Aptitud física/psíquica\n- Sin antecedentes penales\n**ESPECÍFICOS:**\n- Curso formación 100 horas + perfeccionamiento cada 2 años\n- Autorización Subsecretaría Prevención Delito\n- Cumplir Decreto 83/2007 (control armas)\n- No invalidez 2ª o 3ª clase\n**OBLIGACIONES:** Portar armas, uniforme, credencial, sistemas audiovisuales' },
// GUARDIAS DE SEGURIDAD - NUEVA REGULACIÓN
'rule_405': { keywords: ["requisitos guardia seguridad", "como ser guardia seguridad"], response: '🤖🛡️ **REQUISITOS GUARDIA DE SEGURIDAD** (Art. 49-50 Ley 21.659):\n**REQUISITOS:**\n- Cumplir requisitos generales Art. 46\n- Curso capacitación 90 horas\n- Autorización vigencia 4 años\n- Credencial personal intransferible\n**PROHIBICIONES ABSOLUTAS:**\n- Portar armas de fuego\n- Elementos cortantes/punzantes\n- Trabajar sin directiva funcionamiento\n**ELEMENTOS PERMITIDOS:** Chaleco anticortes, bastón retráctil, esposas (según riesgo)' },
// ESTUDIOS DE SEGURIDAD
'rule_406': { keywords: ["estudio de seguridad", "como hacer estudio seguridad", "contenido estudio"], response: '🤖📋 **ESTUDIO DE SEGURIDAD** (Art. 15-17 Reglamento 209):\n**CONTENIDO OBLIGATORIO:**\n1. Datos entidad y representante legal\n2. Identificación riesgos/vulnerabilidades\n3. Personal seguridad contratado\n4. Medidas implementadas/propuestas\n5. Documentos fundantes\n**VIGENCIA:**\n- General: 4 años\n- Con vigilancia privada: 2 años\n- Transporte valores: 1 año\n**PLAZO PRESENTACIÓN:** 60 días desde notificación como entidad obligada' },
// CAPACITACIÓN Y CURSOS
'rule_407': { keywords: ["cursos seguridad privada", "capacitación obligatoria", "contenido cursos"], response: '🤖📚 **CURSOS SEGURIDAD PRIVADA** (Art. 27, 89, 107 Reglamento):\n**VIGILANTES PRIVADOS:**\n- Formación: 100 horas (una vez)\n- Perfeccionamiento: 40 horas (cada 2 años)\n**GUARDIAS SEGURIDAD:**\n- Formación: 90 horas (una vez)\n- Perfeccionamiento: 36 horas (cada 4 años)\n- Especialización: 36 horas (riesgo medio/alto)\n**MATERIAS OBLIGATORIAS:** Legislación, DDHH, datos personales, primeros auxilios, probidad, no discriminación, perspectiva género' },
// JEFE DE SEGURIDAD - NUEVA FIGURA
'rule_408': { keywords: ["jefe de seguridad", "requisitos jefe seguridad"], response: '🤖👨‍💼 **JEFE DE SEGURIDAD** (Art. 22-24 Reglamento 209):\n**REQUISITOS:**\n- Título profesional 8 semestres mínimo\n- Curso especialidad seguridad 400 horas\n- Cumplir requisitos generales Art. 46\n- No invalidez 2ª o 3ª clase\n**FUNCIONES:**\n- Dirigir sistema vigilancia privada\n- Ejecutar estudio seguridad\n- Coordinar con autoridades\n- Proponer sistemas seguridad\n- Supervisar recursos humanos/materiales\n**OBLIGATORIO:** Entidades con sistema vigilancia privada' },
// ENCARGADO DE SEGURIDAD
'rule_409': { keywords: ["encargado de seguridad", "requisitos encargado"], response: '🤖🔧 **ENCARGADO DE SEGURIDAD** (Art. 25 Reglamento 209):\n**FUNCIÓN:** Velar cumplimiento medidas seguridad en cada recinto/sucursal\n**REQUISITOS:**\n- Mismos que vigilantes privados\n- Curso seguridad 120 horas mínimo\n- Autorización Subsecretaría\n**UBICACIÓN:** Cada recinto/oficina/agencia/sucursal entidad obligada\n**COORDINACIÓN:** Con jefe seguridad y autoridad fiscalizadora' },
// EMPRESAS DE SEGURIDAD PRIVADA
'rule_410': { keywords: ["empresa seguridad privada", "requisitos empresa seguridad"], response: '🤖🏢 **EMPRESAS SEGURIDAD PRIVADA** (Art. 47-49 Reglamento):\n**REQUISITOS:**\n- Constitución legal como persona jurídica\n- Objeto social específico seguridad\n- Medios humanos/técnicos/financieros\n- Seguros obligatorios personal\n- Socios sin antecedentes penales\n- Autorización Subsecretaría (vigencia 4 años)\n**TIPOS:** Recursos humanos, electrónica, transporte valores, capacitación, asesoría\n**OBLIGACIONES:** Reserva información, informes bienales, seguros vida trabajadores' },
// TRANSPORTE DE VALORES
'rule_411': { keywords: ["transporte valores", "requisitos transporte valores"], response: '🤖🚛 **TRANSPORTE DE VALORES** (Art. 54-75 Reglamento):\n**OBLIGATORIO:**\n- Sistema vigilancia privada completo\n- Tripulación mínima 3 vigilantes (terrestre)\n- Vehículos blindados\n- Estudio seguridad anual\n**HORARIOS:** 07:00 a 23:00 hrs (salvo excepciones)\n**OPERACIONES ALTO RIESGO:** Fuera horario, zonas especiales (4 vigilantes mínimo)\n**VALORES:** Dinero, documentos bancarios, metales preciosos, obras arte' },
// SEGURIDAD ELECTRÓNICA
'rule_412': { keywords: ["seguridad electrónica", "empresas alarmas", "cctv"], response: '🤖📹 **SEGURIDAD ELECTRÓNICA** (Art. 76-81 Reglamento):\n**SERVICIOS:**\n- Instalación/mantenimiento sistemas\n- Operación centrales alarmas/CCTV\n- Certificación dispositivos\n**OBLIGACIONES:**\n- Verificar activaciones alarmas\n- Informar usuarios funcionamiento\n- Personal calificado\n- Certificados organismos sectoriales\n**RESPONSABILIDAD:** Falsas alarmas = infracción leve' },
// EVENTOS MASIVOS
'rule_413': { keywords: ["eventos masivos", "seguridad eventos"], response: '🤖🎪 **EVENTOS MASIVOS** (Título IV Ley 21.659):\n**DEFINICIÓN:** Más 3.000 personas o características especiales\n**OBLIGACIONES ORGANIZADOR:**\n- Plan seguridad\n- Autorización Delegación Presidencial\n- Seguro responsabilidad civil\n- Personal seguridad privada\n- Recursos tecnológicos\n- Responsable seguridad designado\n**SANCIONES:** Multa 501-1.000 UTM infracciones gravísimas' },
'rule_413a': { keywords: ["decreto 208", "reglamento eventos masivos", "seguridad eventos"], response: '🤖🏟️ **DECRETO 208 (EVENTOS MASIVOS)**:\nReglamento vigente que regula la seguridad en eventos de más de 3000 personas. Exige:\n- Directiva de Funcionamiento específica\n- Organizador responsable\n- Encargado de Seguridad de Eventos\n- Guardias capacitados\n- Medios tecnológicos (CCTV, control acceso)\n- Coordinación con Carabineros' },
// UNIFORMES REGLAMENTARIOS
'rule_414': { keywords: ["uniforme vigilante", "uniforme guardia", "colores uniformes"], response: '🤖👕 **UNIFORMES REGLAMENTARIOS** (Art. 33, 90 Reglamento):\n**VIGILANTES PRIVADOS:**\n- Gris perla azulado (camisa/pantalón)\n- Gorra militar gris perla azulado\n- Corbata negra\n- Calzado negro\n- Cinturón negro con cartuchera\n**GUARDIAS SEGURIDAD:**\n- Negro (camisa/pantalón/gorra)\n- Chaleco alta visibilidad rojo\n- "SEGURIDAD PRIVADA" en espalda\n- Chaquetón rojo impermeable\n**OBLIGATORIO:** Uso solo durante servicio' },
// SANCIONES ESPECÍFICAS
'rule_415': { keywords: ["multas seguridad privada", "sanciones utm", "valores multas"], response: '🤖💰 **SANCIONES LEY 21.659** (Art. 100-103):\n**ENTIDADES OBLIGADAS:**\n- Gravísimas: 650-13.500 UTM\n- Graves: 50-650 UTM\n- Leves: 15-50 UTM\n**EMPRESAS SEGURIDAD:**\n- Gravísimas: 50-650 UTM\n- Graves: 15-50 UTM\n- Leves: 1,5-15 UTM\n**PERSONAS NATURALES:**\n- Gravísimas: 3-20 UTM\n- Graves: 1-3 UTM\n- Leves: 0,5-1 UTM\n**ADICIONALES:** Suspensión, revocación, clausura' },
// REGISTRO NACIONAL
'rule_416': { keywords: ["registro seguridad privada", "subregistros"], response: '🤖📊 **REGISTRO SEGURIDAD PRIVADA** (Art. 84 Ley, 118-124 Reglamento):\n**SUBREGISTROS:**\n1. Entidades obligadas\n2. Entidades voluntarias\n3. Personas naturales\n4. Empresas seguridad privada\n5. Sanciones\n6. Eventos masivos\n**ADMINISTRA:** Subsecretaría Prevención Delito\n**ACCESO:** Secreto (excepciones para autoridades)\n**PLATAFORMA:** Digital interconectada' },
// DERECHOS Y OBLIGACIONES TRABAJADORES
'rule_417': { keywords: ["derechos trabajadores seguridad", "seguros obligatorios"], response: '🤖⚖️ **DERECHOS TRABAJADORES SEGURIDAD** (Art. 42, 88, 99 Reglamento):\n**SEGUROS VIDA OBLIGATORIOS:**\n- Vigilantes privados: 250 UF mínimo\n- Guardias en vigilancia privada: 250 UF\n- Guardias otros: 132 UF\n- Porteros/nocheros: 132 UF\n**ELEMENTOS GRATUITOS:**\n- Uniformes (empleador)\n- Elementos defensivos\n- Equipos protección\n**PROHIBIDO:** Trasladar costos al trabajador' },
// VIGENCIAS Y RENOVACIONES
'rule_418': { keywords: ["vigencias autorizaciones", "renovación credenciales"], response: '🤖📅 **VIGENCIAS Y RENOVACIONES** (Ley 21.659):\n**PERSONAS NATURALES:**\n- Vigilantes privados: 2 años\n- Guardias seguridad: 4 años\n- Demás personal: 4 años\n**EMPRESAS:** 4 años\n**ESTUDIOS SEGURIDAD:**\n- General: 4 años\n- Con vigilancia privada: 2 años\n- Transporte valores: 1 año\n**CURSOS:**\n- Vigilantes: Perfeccionamiento cada 2 años\n- Guardias: Perfeccionamiento cada 4 años' },
// AUTORIDADES COMPETENTES
'rule_419': { keywords: ["autoridades seguridad privada", "subsecretaría prevención"], response: '🤖🏛️ **AUTORIDADES SEGURIDAD PRIVADA** (Art. 81-86 Ley 21.659):\n**ÓRGANO RECTOR:**\nSubsecretaría Prevención del Delito\n- Autoriza, regula, controla\n- Determina entidades obligadas\n- Aprueba estudios seguridad\n- Mantiene registro nacional\n**AUTORIDAD FISCALIZADORA:**\nCarabineros de Chile (OS-10)\n- Supervisión cumplimiento\n- Informes técnicos\n- Denuncia infracciones\n**ESPECIALES:** DIRECTEMAR (puertos), DGAC (aeropuertos)' },
// TRANSICIÓN NUEVA LEY
'rule_420': { keywords: ["transición nueva ley", "entrada vigencia"], response: '🤖📅 **TRANSICIÓN NUEVA LEY** (Disposiciones Transitorias):\n**ENTRADA VIGENCIA:** 28 noviembre 2025\n**ENTIDADES CRÍTICAS** (6 meses para nuevo estudio):\n- Bancos y financieras\n- Transporte valores\n- Estaciones servicio\n**OTRAS ENTIDADES:** Hasta 2 años evaluación\n**AUTORIZACIONES VIGENTES:** Mantienen validez hasta vencimiento\n**PLATAFORMA DIGITAL:** Máximo 1 año implementación' },
// DIRECTIVA DE FUNCIONAMIENTO
'rule_421': { keywords: ["directiva funcionamiento", "como hacer directiva", "contenido directiva"], response: '🤖📝 **DIRECTIVA DE FUNCIONAMIENTO** (Art. 92 Reglamento):\n**CONTENIDO OBLIGATORIO:**\n1. Lugar donde se realizarán servicios\n2. Individualización personas que prestan servicio\n3. Análisis entorno instalación\n4. Medidas seguridad implementadas\n5. Forma comunicaciones con autoridades\n**VIGENCIA:** 3 años (servicios temporales según duración actividad)\n**PLAZO PRESENTACIÓN:** 15 días antes inicio servicios\n**APROBACIÓN:** Subsecretaría Prevención Delito previo informe autoridad fiscalizadora' },
// ELEMENTOS DEFENSIVOS ESPECÍFICOS
'rule_422': { keywords: ["chaleco antibalas", "chaleco anticortes", "elementos defensivos"], response: '🤖🛡️ **ELEMENTOS DEFENSIVOS REGLAMENTARIOS** (Art. 31, 93 Reglamento):\n**VIGILANTES PRIVADOS (mínimo):**\n- Chaleco antibalas (certificado NIJ 0101.04)\n- Bastón retráctil\n- Esposas\n**GUARDIAS SEGURIDAD (mínimo):**\n- Chaleco anticortes (certificado NIJ 0115.00)\n- Según riesgo: bastón retráctil, esposas\n**CERTIFICACIÓN:** Instituto Investigaciones Control Ejército (IDIC)\n**SEGURO:** Fabricante debe tener seguro 30 UF por falla producto\n**PROHIBIDO:** Guardia trasladar costos al trabajador' },
// SISTEMAS AUDIOVISUALES
'rule_423': { keywords: ["sistemas audiovisuales", "cámaras corporales", "registro audiovisual"], response: '🤖📹 **SISTEMAS REGISTRO AUDIOVISUAL** (Art. 36-41 Reglamento):\n**OBLIGATORIO PARA:**\n- Vigilantes privados (siempre)\n- Guardias riesgo alto\n- Vigilantes con dispositivos eléctricos\n**CARACTERÍSTICAS:**\n- Alta definición\n- Encriptación extremo a extremo\n- Autonomía jornada completa\n- Uso adosado a vestimenta\n**ALMACENAMIENTO:** Mínimo 120 días (2 años si no requerido por autoridades)\n**ACTIVACIÓN:** Delitos, detenciones, uso armas, emergencias' },
// PROHIBICIONES ESPECÍFICAS
'rule_424': { keywords: ["prohibiciones seguridad privada", "que no puede hacer guardia"], response: '🤖🚫 **PROHIBICIONES SEGURIDAD PRIVADA** (Art. 86 Reglamento):\n**PERSONAS NATURALES/EMPRESAS:**\n1. Servicios sin autorización\n2. Investigar hechos delictivos\n3. Intervenir conflictos políticos/laborales\n4. Suministrar información a terceros\n5. Poseer armas sin autorización\n6. Ofrecer servicios con armas (salvo transporte valores)\n**GUARDIAS ESPECÍFICAMENTE:**\n- Portar armas fuego (Art. 56 Ley)\n- Elementos cortantes/punzantes\n- Trabajar fuera recinto autorizado\n**SANCIÓN:** Presidio menor + multa + inhabilitación' },
// CAPACITADORES Y REQUISITOS
'rule_425': { keywords: ["capacitadores seguridad", "requisitos capacitador", "quien puede enseñar"], response: '🤖👨‍🏫 **CAPACITADORES SEGURIDAD PRIVADA** (Art. 104-105 Reglamento):\n**REQUISITOS GENERALES:**\n- Cumplir Art. 46 Ley 21.659\n- Título profesional/técnico superior\n- Diplomado seguridad privada/gestión seguridad empresarial\n**ESPECIALIZACIONES:**\n- Legislación: Abogado + 2 años experiencia\n- DDHH: Abogado\n- Primeros auxilios: Profesional/técnico salud\n- Arma y tiro: Instructor 5 años experiencia + examen práctico\n- Defensa personal: Oficiales FF.AA./Orden\n**AUTORIZACIÓN:** Subsecretaría Prevención Delito previo informe autoridad fiscalizadora' },
// INSTITUCIONES DE CAPACITACIÓN
'rule_426': { keywords: ["instituciones capacitación", "otec seguridad", "donde estudiar"], response: '🤖🏫 **INSTITUCIONES CAPACITACIÓN** (Art. 100-102 Reglamento):\n**PUEDEN SER:**\n- Organismos Técnicos Capacitación (OTEC)\n- Universidades acreditadas\n- Institutos profesionales\n- Centros formación técnica\n**REQUISITOS:**\n- Autorización Subsecretaría Prevención Delito\n- Instalaciones idóneas\n- Capacitadores autorizados\n- Programas aprobados\n**MODALIDADES:** Presencial/telemática (salvo arma y tiro, defensa personal, primeros auxilios: solo presencial)\n**EXÁMENES:** Ante Carabineros de Chile' },
// MEDIDAS ESPECIALES BANCOS
'rule_427': { keywords: ["medidas bancos", "seguridad bancaria", "requisitos bancos"], response: '🤖🏦 **MEDIDAS ESPECIALES BANCOS** (Art. 44-46 Reglamento):\n**OBLIGATORIAS:**\n1. Sistema registro personas\n2. Asientos espalda a cajas + monitor\n3. Barreras visuales protección privacidad\n4. Silenciamiento máquinas contadoras\n**RECURSOS TECNOLÓGICOS:**\n- Alarmas asalto conectadas Carabineros\n- Bóvedas con relojería\n- Cajas blindadas compartimentadas\n- Filmación alta resolución 120 días\n- Vidrios inastillables\n**DERECHO ADMISIÓN:** Pueden ejercerlo respetando ley antidiscriminación' },
// FALSAS ALARMAS Y COSTOS
'rule_428': { keywords: ["falsas alarmas", "costos conexión", "multas alarmas"], response: '🤖💸 **FALSAS ALARMAS Y COSTOS** (Art. 46 Reglamento):\n**COSTOS CONEXIÓN CARABINEROS:**\n- Conexión inicial: 2,0 UTM\n- Renta mensual: 0,5 UTM\n- Falsa alarma: 1,5 UTM cada una\n**FALSA ALARMA:** Activación sin emergencia real\n**MÁS 4 FALSAS/MES:** Notificación para subsanar en 1 mes\n**REINCIDENCIA:** Infracción leve\n**RESPONSABLE:** Entidad bancaria/financiera\n**COBRO:** Semestral (UTM enero y julio)' },
// REEMPLAZO DE VIGILANTES
'rule_429': { keywords: ["reemplazo vigilantes", "ausencias vigilantes", "suplencias"], response: '🤖🔄 **REEMPLAZO VIGILANTES** (Art. 43 Reglamento):\n**AUSENCIAS IMPREVISTAS:**\n- Reemplazar por vigilante de otra sucursal\n- Si no hay: contratar vigilante externo\n- Último recurso: guardia máximo 30 días\n**AUSENCIAS PREVISTAS (feriados):**\n- SIEMPRE reemplazar por vigilante privado\n- Calendarización anual obligatoria\n**COMUNICACIÓN:** 24 horas a Subsecretaría y autoridad fiscalizadora\n**EXENCIÓN ARMAS:** Puede reemplazar con guardia si está autorizado' },
// CANAL DENUNCIA ANÓNIMO
'rule_430': { keywords: ["denuncia anónima", "canal denuncia", "denunciar irregularidades"], response: '🤖📢 **CANAL DENUNCIA ANÓNIMO** (Art. 132-136 Reglamento):\n**FUNCIÓN:** Denunciar infracciones Ley 21.659\n**CARACTERÍSTICAS:**\n- Acceso libre sin autenticación\n- Garantiza anonimato\n- Formulario electrónico\n- Adjuntar evidencias\n**CONTENIDO DENUNCIA:**\n- Narración circunstanciada hechos\n- Individualización responsables\n- Antecedentes fundantes\n**SEGUIMIENTO:** Código único identificación\n**ARCHIVO:** Si carece fundamento plausible\n**ADMINISTRA:** Subsecretaría Prevención Delito' },

// REGLAS ADICIONALES CHATBOT SEGURIDAD PRIVADA - DECRETOS Y LEYES COMPLEMENTARIAS

// DECRETO 1773 - REGLAMENTO VIGILANTES PRIVADOS
'rule_431': {
  keywords: ["decreto 1773", "reglamento vigilantes", "autorización vigilancia"],
  response: '🤖📋 **DECRETO 1773 - REGLAMENTO VIGILANTES** (Arts. 1-25):\n**OBJETO:** Protección y seguridad interior edificios, oficinas, conjuntos habitacionales, instalaciones empresariales\n**AUTORIZACIÓN:** Presidente República vía decreto supremo firmado Ministro Interior\n**VIGENCIA:** Máximo 2 años renovables\n**SOLICITUD:** A través Intendencia/Gobernación con estudio seguridad\n**INFORME:** Prefectura Carabineros obligatorio\n**REVOCACIÓN:** Cualquier tiempo por infracciones'
},
'rule_432': {
  keywords: ["estudio seguridad", "secreto estudio", "implementación estudio"],
  response: '🤖🔒 **ESTUDIO DE SEGURIDAD** (Art. 9° bis Decreto 1773):\n**CARÁCTER:** Secreto obligatorio\n**EJEMPLARES:** 2 (uno Prefectura, uno interesado)\n**PLAZO IMPLEMENTACIÓN:** 60 días desde decreto aprobatorio\n**INCUMPLIMIENTO:** Pérdida aprobación de pleno derecho\n**CONTENIDO:** Estructura y funcionamiento servicio vigilantes\n**RESPONSABLE:** Elaboración por interesado con asesoría autorizada'
},
'rule_433': {
  keywords: ["entidades estratégicas", "decreto secreto", "empresas estratégicas"],
  response: '🤖🏭 **ENTIDADES ESTRATÉGICAS** (Art. 7° bis Decreto 1773):\n**DETERMINACIÓN:** Decreto supremo secreto\n**FIRMADO:** Ministros Interior y Defensa Nacional\n**NOTIFICACIÓN:** Conducto Intendencia respectiva\n**PERSONALIZADA:** Al representante legal entidad\n**CARÁCTER:** Clasificado y reservado\n**OBLIGACIÓN:** Servicio vigilancia privada obligatorio'
},
'rule_434': {
  keywords: ["transporte valores", "empresas valores", "traslado valores"],
  response: '🤖💰 **TRANSPORTE DE VALORES** (Art. 10 Decreto 1773):\n**DEFINICIÓN:** Traslado valores desde/hacia recintos determinados\n**VALORES:** Dinero efectivo, documentos bancarios/mercantiles, metales preciosos, obras arte\n**CRITERIO:** Cualquier objeto que requiera traslado bajo medidas especiales\n**AUTORIDAD:** Fiscalizadora determina según características\n**RÉGIMEN:** Normas generales + especiales por naturaleza actividad'
},
'rule_435': {
  keywords: ["credencial vigilante", "tarjeta identificación", "colores credencial"],
  response: '🤖🆔 **CREDENCIAL VIGILANTES** (Art. 13 Decreto 1773):\n**DIMENSIONES:** 5.5 x 8.5 cms plástico\n**COLORES:**\n- AZUL: Transporte valores\n- VERDE: Protección instalaciones fuera recintos\n- AMARILLO: Demás vigilantes\n**CONTENIDO:** Membrete Carabineros, número, entidad, nombre, RUN, vencimiento, fotografía\n**USO:** Obligatorio durante funciones únicamente\n**OTORGA:** Prefectura Carabineros correspondiente'
},
'rule_436': {
  keywords: ["uniforme vigilantes", "uniforme gris", "color uniforme"],
  response: '🤖👕 **UNIFORME VIGILANTES** (Art. 17 Decreto 1773):\n**TIPO:** "Slack" gris perla azulado\n**COMPONENTES:**\n- Gorra militar/casco/quepís gris perla azulado\n- Camisa gris perla azulado con cuello y palas\n- Corbata negra (manga larga obligatoria)\n- Pantalón mismo color y tela\n- Calzado y calcetines negros\n- Cinturón cuero negro con cartuchera\n- Bastón negro modelo Carabineros\n**USO:** Obligatorio durante funciones, prohibido fuera recinto'
},
'rule_437': {
  keywords: ["capacitación vigilantes", "cursos vigilantes", "formación vigilantes"],
  response: '🤖📚 **CAPACITACIÓN VIGILANTES** (Art. 18 bis Decreto 1773):\n**MATERIAS:** Conocimientos legales, primeros auxilios, emergencias, armas, alarmas, comunicaciones, educación física\n**PERIODICIDAD:** Según programa Dirección General Carabineros\n**NIVELES:** Distintos según especialización función\n**EXAMEN:** Ante autoridad fiscalizadora con certificado\n**PROHIBICIÓN:** No ejercer sin curso aprobado (incumplimiento grave)\n**VALIDEZ:** Certificado válido al cambiar entidad'
},
'rule_438': {
  keywords: ["armas vigilantes", "portación armas", "entrega armas"],
  response: '🤖🔫 **ARMAS VIGILANTES** (Art. 19-20 Decreto 1773):\n**HABILITADOS:** Armas cortas y bastón dentro recinto/área\n**ENTREGA:** Solo inicio funciones con registro libro especial\n**REGISTRO:** Individualización arma, munición, receptor, entregador, firmas\n**INSCRIPCIÓN:** Todas armas ante autoridad Ley 17.798\n**DEVOLUCIÓN:** Al término jornada a funcionario designado\n**ALMACENAMIENTO:** Lugar cerrado con garantías seguridad dentro recinto\n**USO:** Registro obligatorio con detalles munición y consecuencias'
},
'rule_439': {
  keywords: ["organismo seguridad interno", "oficina seguridad", "estructura seguridad"],
  response: '🤖🏢 **ORGANISMO SEGURIDAD INTERNO** (Art. 21 Decreto 1773):\n**OBLIGATORIO:** Todas entidades Art. 3° DL 3607\n**DEPENDENCIA:** Más alto nivel jerárquico\n**MISIÓN:** Proponer política general seguridad\n**ESTRUCTURA:** Según magnitud entidad\n**FUNCIONES:** Estudiar vulnerabilidades, detectar/impedir/neutralizar actividades contrarias\n**COORDINACIÓN:** Jerárquica entre niveles regional/provincial/central\n**VOLUNTARIO:** Entidades acogidas voluntariamente'
},
'rule_440': {
  keywords: ["fiscalización carabineros", "control carabineros", "inspecciones"],
  response: '🤖👮 **FISCALIZACIÓN CARABINEROS** (Art. 22-24 Decreto 1773):\n**AUTORIDAD:** Prefectura Carabineros respectiva\n**FACULTADES:** Instrucciones, inspecciones, cumplimiento normas y estudio\n**POLÍTICAS:** Ministerio Defensa vía Dirección General Carabineros\n**REGISTROS:** Entidades y vigilantes actualizados\n**REQUERIMIENTOS:** Prefecto puede solicitar antecedentes necesarios\n**VISITAS:** Todas las que estime conveniente\n**OBLIGACIÓN:** Entidad proporcionar información requerida'
},

// DECRETO LEY 3607 - NORMAS VIGILANTES PRIVADOS
'rule_441': {
  keywords: ["decreto ley 3607", "vigilantes privados", "autorización vigilantes"],
  response: '🤖📜 **DECRETO LEY 3607** (Arts. 1-11):\n**OBJETO:** Protección y seguridad interior edificios, habitaciones, oficinas, conjuntos habitacionales, plantas, establecimientos\n**AUTORIZACIÓN:** Decreto firmado Ministro Interior "Por orden Presidente"\n**INFORME:** Prefectura Carabineros favorable previo\n**ÁMBITO:** Dentro recinto/área empresa, uniforme obligatorio diferente FF.AA.\n**SOLICITUD:** Cualquier persona natural/jurídica\n**CONTROL:** Carabineros Chile sin perjuicio Ley 17.798'
},
'rule_442': {
  keywords: ["entidades obligadas", "instituciones bancarias", "servicios públicos"],
  response: '🤖🏛️ **ENTIDADES OBLIGADAS** (Art. 3° DL 3607):\n**OBLIGATORIAS:**\n- Instituciones bancarias/financieras\n- Entidades públicas\n- Empresas transporte valores\n- Empresas estratégicas\n- Servicios utilidad pública\n**REQUISITOS:** Servicio vigilantes privados + organismo seguridad interno\n**NOTIFICACIÓN:** Intendentes vía Prefecturas Carabineros\n**PLAZO:** 60 días presentar estudio seguridad\n**MULTAS:** 5-100 ingresos mínimos por incumplimiento'
},
'rule_443': {
  keywords: ["reclamos vigilancia", "recurso corte", "impugnación decreto"],
  response: '🤖⚖️ **RECLAMOS VIGILANCIA** (Art. 3° incisos 12-17 DL 3607):\n**COMPETENCIA:** Ministro Corte Apelaciones respectiva\n**PLAZO:** 10 días desde notificación\n**INSTANCIA:** Única\n**PROCEDIMIENTO:** Informe autoridad + sentencia 15 días\n**PRÓRROGA:** 10 días adicionales medidas mejor resolver\n**CASACIÓN:** No procede recurso forma\n**CARÁCTER:** Proceso secreto bajo custodia\n**ACCESO:** Solo partes y representantes'
},
'rule_444': {
  keywords: ["prohibición suministro", "delito vigilantes", "penas vigilancia"],
  response: '🤖🚫 **PROHIBICIÓN SUMINISTRO VIGILANTES** (Art. 5° bis DL 3607):\n**PROHIBIDO:** Proporcionar/ofrecer vigilantes privados bajo cualquier forma\n**DELITO:** Presidio menor grado mínimo a medio\n**MULTA:** 200-500 ingresos mínimos mensuales\n**INHABILITACIÓN:** Perpetua para labores requieren autorización\n**REINCIDENCIA:** Presidio menor grado medio a máximo + multa 500-1000\n**COMPETENCIA:** Justicia ordinaria\n**PERSONAS JURÍDICAS:** Aplican normas Art. 39 CPP'
},
'rule_445': {
  keywords: ["jornada vigilantes", "duración trabajo", "horas semanales"],
  response: '🤖⏰ **JORNADA VIGILANTES** (Art. 5° DL 3607):\n**CALIDAD:** Trabajadores dependientes\n**CÓDIGO:** Trabajo aplicable\n**DURACIÓN:** Máximo 48 horas semanales ordinarias\n**SEGURO:** Vida obligatorio empleador\n**RÉGIMEN:** Cualquier naturaleza jurídica organismo contratante\n**APLICACIÓN:** También nocheros, porteros, rondines función similar'
},
'rule_446': {
  keywords: ["asesoría seguridad", "empresas seguridad", "autorización prefectura"],
  response: '🤖🏢 **ASESORÍA Y SERVICIOS SEGURIDAD** (Art. 5° bis DL 3607):\n**AUTORIZACIÓN:** Prefectura Carabineros previa obligatoria\n**ACTIVIDADES:** Asesoría, prestación servicios, capacitación vigilantes\n**REQUISITOS:**\n- Idoneidad cívica, moral, profesional\n- Informar personal permanentemente\n- Contratar seguro vida personal\n- Instalaciones físicas/técnicas capacitación\n- Instrucciones Prefectura Carabineros\n**JORNADA:** Máximo 48 horas semanales\n**PROHIBICIÓN:** Portar armas fuego'
},
'rule_447': {
  keywords: ["control carabineros", "tuición carabineros", "revocación autorización"],
  response: '🤖👮‍♂️ **CONTROL CARABINEROS** (Art. 6° DL 3607):\n**TUICIÓN:** Todas actividades seguridad privada\n**SUSPENSIÓN:** Servicio vigilantes por anomalías\n**REVOCACIÓN:** Autorización actividades Art. 5° bis\n**AUTORIDAD:** Prefecturas Carabineros\n**APLICACIÓN:** Sin perjuicio Ley 17.798\n**FACULTADES:** Controlar oficinas seguridad y organismos internos\n**ALCANCE:** Vigilantes privados y empresas servicios'
},
'rule_448': {
  keywords: ["infracciones vigilancia", "multas vigilancia", "procedimiento multas"],
  response: '🤖💰 **INFRACCIONES Y MULTAS** (Art. 8° DL 3607):\n**COMPETENCIA:** Juzgado Policía Local\n**PROCEDIMIENTO:** Ley 18.287\n**REQUERIMIENTO:** Intendente directamente o vía Gobernador\n**INFORME:** Prefectura Carabineros fiscalizadora previo\n**MONTOS:**\n- Primera infracción: 25-125 ingresos mínimos\n- Reincidencia: 125-250 ingresos mínimos\n**ABSOLUCIÓN:** Si acredita cumplimiento durante proceso\n**EXCEPCIÓN:** Delito Art. 5° bis (justicia ordinaria)'
},
'rule_449': {
  keywords: ["empresas defensa", "excepción defensa", "ministerio defensa"],
  response: '🤖🛡️ **EMPRESAS DEFENSA** (Art. 10 DL 3607):\n**EXCEPCIÓN:** Empresas dependientes/relacionadas Ministerio Defensa\n**SISTEMAS:** Propios seguridad y vigilancia\n**NORMAS:** Impuestas por Ministerio Defensa\n**CARÁCTER:** Cualquiera que sea\n**LIBERTAD:** Establecer sistemas según criterio ministerial\n**AUTONOMÍA:** No aplicación normas generales vigilancia privada'
},

// DECRETO 93 - ASESORÍA Y SERVICIOS SEGURIDAD
'rule_450': {
  keywords: ["decreto 93", "asesoría seguridad", "prestación servicios"],
  response: '🤖📋 **DECRETO 93 - ASESORÍA Y SERVICIOS** (Arts. 1-18):\n**ASESORÍA:** Consejar/ilustrar para precaver buen funcionamiento instalación\n**SERVICIOS:** Proporcionar/instalar/mantener/reparar recursos materiales\n**CAPACITACIÓN:** Instruir vigilantes aspectos teóricos/prácticos\n**AUTORIZACIÓN:** Prefectura Carabineros previa obligatoria\n**RECURSOS HUMANOS:** Proporcionar personal terceros con propósitos seguridad'
},
'rule_451': {
  keywords: ["equipos seguridad", "libro existencias", "materiales seguridad"],
  response: '🤖📦 **EQUIPOS Y MATERIALES** (Art. 7° Decreto 93):\n**RELACIÓN:** Pormenorizada equipos/materiales/elementos a proporcionar\n**LIBRO:** Existencias actualizado permanente\n**EXHIBICIÓN:** Requerimiento Prefectura Carabineros\n**AUTORIZACIÓN:** Previa para actividades Art. 3°\n**CONTROL:** Fiscalización equipos en poder empresa\n**ACTUALIZACIÓN:** Permanente inventario'
},
'rule_452': {
  keywords: ["nocheros porteros", "guardias seguridad", "personal similar"],
  response: '🤖👥 **NOCHEROS, PORTEROS, RONDINES** (Arts. 12-16 Decreto 93):\n**DEFINICIÓN:** Sin calidad vigilantes, brindan seguridad bienes/personas\n**CALIDAD:** Trabajadores dependientes\n**CÓDIGO:** Trabajo aplicable\n**SEGURO:** Vida mínimo 75 UTM\n**INFORMACIÓN:** Lugares exactos servicio a Prefectura\n**CAPACITACIÓN:** Según determine Prefectura\n**PROHIBICIÓN:** Armas fuego bajo concepto alguno\n**CONTRATACIÓN:** Directa o través empresas autorizadas'
},
'rule_453': {
  keywords: ["prohibición armas", "implementos seguridad", "autorización implementos"],
  response: '🤖🚫 **PROHIBICIÓN ARMAS** (Art. 14 Decreto 93):\n**PROHIBIDO:** Armas fuego bajo concepto alguno\n**AUTORIZACIÓN:** Previa Prefectura para implementos no fuego\n**ESPECÍFICO:** Cada servicio particular\n**SANCIÓN:** DL 3607 + Ley 17.798 aplicables\n**INFRACCIÓN:** Denunciable Juzgado Policía Local\n**CONTROL:** Prefectura Carabineros competente'
},
'rule_454': {
  keywords: ["tarjeta identificación", "credencial guardias", "identificación personal"],
  response: '🤖🆔 **TARJETA IDENTIFICACIÓN** (Art. 18 Decreto 93):\n**OBLIGATORIO:** Guardias, nocheros, porteros, rondines\n**UBICACIÓN:** Extremo superior izquierdo tenida\n**DIMENSIONES:** 5.5 x 8.5 cms plástico\n**CONTENIDO:** Membrete Carabineros, número, leyenda identificación, entidad, funcionario, RUN, vencimiento, fotografía fondo blanco\n**REVERSO:** "ACREDITA IDENTIDAD SOLO DENTRO LÍMITES JURISDICCIÓN. PROHIBIDO OTRO USO. EXTRAVÍO DEVOLVER CARABINEROS"\n**COSTOS:** Cargo entidad interesada'
},
'rule_455': {
  keywords: ["control tuición", "revocación autorización", "anomalías funcionamiento"],
  response: '🤖🔍 **CONTROL Y TUICIÓN** (Arts. 16-17 Decreto 93):\n**AUTORIDAD:** Carabineros Chile\n**ALCANCE:** Todas actividades Art. 1°\n**LEY 17.798:** Sin perjuicio aplicación\n**REVOCACIÓN:** Cualquier tiempo por anomalías\n**CRITERIO:** Juicio autoridad obstaculice buen funcionamiento\n**DISCRECIONAL:** Facultad Prefectura Carabineros\n**INFORME:** Suficiente para determinar revocación'
},

// DECRETO 32 - MANUAL OPERATIVO
'rule_456': {
  keywords: ["manual operativo", "decreto 32", "actualización manual"],
  response: '🤖📖 **MANUAL OPERATIVO** (Decreto 32/2024):\n**FUNCIÓN:** Sistematizar normativa seguridad privada\n**ACTUALIZACIÓN:** Mínimo cada 2 años\n**CONTENIDO:** Procedimientos, requisitos, estándares\n**NOTIFICACIONES:** Correo electrónico domicilio válido\n**PAGOS:** Vale vista "Carabineros Chile - Seguridad Privada"\n**VIGENCIA:** Desde publicación Diario Oficial\n**RESPONSABLE:** Carabineros propone, Ministerio Interior aprueba'
},
'rule_457': {
  keywords: ["educación media", "guardias primera vez", "exigencia estudios"],
  response: '🤖🎓 **EDUCACIÓN MEDIA** (Decreto 32):\n**GENERAL:** Educación media completa o equivalente\n**EXCEPCIÓN:** Guardias, Conserjes, Nocheros, Porteros, Rondines\n**PRIMERA VEZ:** Solo exigible quienes soliciten acreditación primera vez\n**RENOVACIÓN:** No aplicable requisito letra c) apartado II\n**EXTRANJEROS:** Validación estudios obligatoria\n**CERTIFICACIÓN:** Ministerio Educación u oficinas OIRS'
},
'rule_458': {
  keywords: ["antecedentes comerciales", "autorización excepcional", "deudas comerciales"],
  response: '🤖💳 **ANTECEDENTES COMERCIALES** (Decreto 32):\n**EXIGENCIA:** Certificado código verificador vigencia 30 días\n**EXCEPCIÓN:** Autorización excepcional 1 año si presenta antecedentes\n**CONDICIÓN:** Acreditar gestiones solución deuda\n**PERSONAS JURÍDICAS:** Socios, administradores, representantes legales\n**EMPRESAS:** No excepción deudas laborales/previsionales\n**FINALIDAD:** Demostrar idoneidad moral'
},
'rule_459': {
  keywords: ["gorra negra", "uniforme guardias", "chaleco alta visibilidad"],
  response: '🤖👕 **UNIFORME GUARDIAS** (Decreto 32):\n**GORRA:** Negra militar/jockey/quepis con visera y barboquejo\n**CONJUNTO:** Camisa y pantalón negro\n**CALZADO:** Negro con calcetines negros\n**CINTURÓN:** Cuero negro con cartuchera bastón retráctil\n**CHALECO:** Alta visibilidad fluorescente rojo con bandas retrorreflectantes\n**IDENTIFICACIÓN:** "SEGURIDAD PRIVADA" parte trasera\n**INSIGNIAS:** Máximo 5x5 cms empresa y cliente'
},
'rule_460': {
  keywords: ["modalidad telemática", "cursos presenciales", "arma tiro presencial"],
  response: '🤖💻 **MODALIDAD ENSEÑANZA** (Decreto 32):\n**TELEMÁTICA:** Programas formativos y perfeccionamiento permitidos\n**PRESENCIAL OBLIGATORIO:**\n- Arma y tiro\n- Primeros auxilios\n**LUGARES:** Habilitados por autoridad fiscalizadora o sedes OTEC\n**PRÁCTICA:** Complemento en puestos trabajo\n**POLÍGONO:** 20 horas arma/tiro en polígono autorizado\n**EVALUACIÓN:** Responsabilidad exclusiva Autoridad Fiscalizadora'
},

'rule_461': {
  keywords: ["reemplazo vigilantes", "guardia sin autorización", "suplir ausencias"],
  response: '🤖🔄 **REEMPLAZO VIGILANTES** (Art. 1-3 Infracciones):\n**OBLIGATORIO:** Vigilantes privados en entidades bancarias/financieras\n**REEMPLAZO:** Solo con autorización escrita Prefectura Seguridad Privada\n**PROCEDIMIENTO:** Solicitud fundada dentro 24 horas\n**PLAZOS:** Máximo 15 días corridos renovables una vez\n**CALENDARIZACIÓN:** Feriados presentar anualmente\n**INFRACCIÓN:** Usar guardias sin autorización es ilegal'
},
'rule_462': {
  keywords: ["libro armas", "control armas", "visado prefectura"],
  response: '🤖📚 **LIBRO CONTROL ARMAS** (Art. 20 DS 1773):\n**OBLIGATORIO:** Sello y firma Prefecto Carabineros\n**FOLIADO:** Cada hoja timbrada por Prefectura\n**REGISTRO:** Individualización arma, munición, receptor, entregador, firmas\n**CONTROL:** Observaciones cada fiscalización\n**USO ARMA:** Constancia obligatoria con munición utilizada\n**PÉRDIDA:** Informar por escrito a Prefectura respectiva'
},
'rule_463': {
  keywords: ["recarga cajeros", "reposición dinero", "vista público"],
  response: '🤖💰 **OPERACIONES CAJEROS** (DS 1814 Art. 25):\n**PROHIBIDO:** Recarga/reposición dinero a vista público\n**LUGARES:** Solo en zonas aisladas especialmente habilitadas\n**VIGILANTES:** Mínimo 2 vigilantes privados presentes\n**RECUENTO:** Lugares aislados, nunca ante presencia público\n**SEGURIDAD:** Medidas adecuadas obligatorias\n**INFRACCIÓN:** Realizar operaciones vista público'
},
'rule_464': {
  keywords: ["cámaras filmación", "sistemas grabación", "alta resolución"],
  response: '🤖📹 **SISTEMAS FILMACIÓN** (Decreto 1122):\n**OBLIGATORIO:** Cámaras alta resolución bancos/financieras\n**FUNCIONAMIENTO:** Continuo entre 15 min antes apertura y 1 hora después cierre\n**ESTADO:** Mantener en buenas condiciones y bien instaladas\n**VERIFICACIÓN:** Monitor existente en entidad\n**GRABACIÓN:** Imágenes nítidas caso asalto\n**CONTROL:** Verificar operatividad permanente'
},
'rule_465': {
  keywords: ["vidrios inastillables", "visión exterior", "protección explosión"],
  response: '🤖🪟 **VIDRIOS SEGURIDAD** (Art. 16 Decreto 1122):\n**OBLIGATORIO:** Vidrios exteriores inastillables\n**VISIBILIDAD:** Permitir visión exterior hacia interior\n**PROTECCIÓN:** Evitar daños por expansión ante explosión\n**DEMOSTRACIÓN:** Cada entidad debe acreditar cumplimiento\n**FUNCIONALIDAD:** No impedir visión desde exterior\n**SEGURIDAD:** Resistentes a impactos'
},
'rule_466': {
  keywords: ["cajas compartimentadas", "cerraduras independientes", "seguridad cajas"],
  response: '🤖🗄️ **CAJAS RECEPTORAS** (Art. 15 Decreto 1122):\n**OBLIGATORIO:** Todas compartimentadas\n**CERRADURAS:** Seguridad independientes cada compartimento\n**BANCOS:** Todos deben cumplir requisito\n**FINANCIERAS:** Obligatorio también\n**SEGURIDAD:** Cada caja cerradura propia\n**CONTROL:** Verificar compartimentación adecuada'
},
'rule_467': {
  keywords: ["bóvedas alarmas", "sistemas relojería", "mecanismos apertura"],
  response: '🤖🏦 **BÓVEDAS SEGURIDAD** (Arts. 13-14 Decreto 1122):\n**RELOJERÍA:** Mecanismos apertura y cierre obligatorios\n**ALARMAS:** Sistemas distintos a alarmas asalto general\n**INDEPENDIENTES:** Alarmas propias bóvedas\n**DEMOSTRACIÓN:** Cada entidad probar funcionamiento\n**OFICINAS:** Todas agencias/sucursales deben tener\n**DIFERENCIACIÓN:** Alarmas específicas por sector'
},
'rule_468': {
  keywords: ["falsas alarmas", "4 falsas mes", "desconexión sistema"],
  response: '🤖🚨 **FALSAS ALARMAS** (Art. 12 Decreto 1122):\n**LÍMITE:** Máximo 4 falsas alarmas por mes\n**NOTIFICACIÓN:** Autoridad fiscalizadora subsanar en 1 mes\n**REINCIDENCIA:** Desconexión sistema + infracción\n**PROCEDIMIENTO:** Conformidad Art. 3 inciso 8° DL 3607\n**REPOSICIÓN:** Cuando acredite subsanación deficiencias\n**RESPONSABILIDAD:** Entidad corregir problemas técnicos/humanos'
},
'rule_469': {
  keywords: ["alarmas asalto", "conexión carabineros", "activación múltiple"],
  response: '🤖🚨 **ALARMAS ASALTO** (Art. 8 Decreto 1122):\n**CONEXIÓN:** Directa con Central Comunicaciones Carabineros/PDI\n**ACTIVACIÓN:** Desde distintos puntos oficina/sucursal\n**DISTANCIA:** También desde unidades vigilancia electrónica\n**INDEPENDIENTE:** Separada alarmas incendio/robo\n**OBLIGATORIO:** Entidades DL 3607\n**PRUEBA:** Verificar funcionamiento con vigilantes/encargados'
},
'rule_470': {
  keywords: ["encargado seguridad", "jefe seguridad", "personal autorizado"],
  response: '🤖👨‍💼 **PERSONAL SEGURIDAD** (Arts. 2-3 Decreto 1122):\n**JEFE SEGURIDAD:** Solo casas matrices\n**ENCARGADO:** Sucursales bancarias y financieras\n**ACREDITACIÓN:** Documento Autoridad Fiscalizadora o credencial\n**OBLIGATORIO:** Todas las sucursales deben tener\n**FUNCIONES:** Coordinación medidas seguridad\n**AUTORIZACIÓN:** Prefectura Carabineros respectiva'
},

// INFRACCIONES VIGILANTES PRIVADOS
'rule_471': {
  keywords: ["vigilante sin capacitación", "reentrenamiento vencido", "curso obligatorio"],
  response: '🤖🎓 **CAPACITACIÓN VIGILANTES** (Art. 7 DL 3607):\n**OBLIGATORIO:** Curso capacitación aprobado\n**REENTRENAMIENTO:** Vigente y actualizado\n**CREDENCIAL:** Solo se extiende con curso aprobado\n**VERIFICACIÓN:** Posesión credencial acredita capacitación\n**INFRACCIÓN:** Trabajar sin capacitación vigente\n**RENOVACIÓN:** Cursos periódicos según normativa'
},
'rule_472': {
  keywords: ["vigilante sin autorización", "contratación ilegal", "prefectura autorización"],
  response: '🤖✅ **AUTORIZACIÓN VIGILANTES** (Art. 12 DS 1773):\n**PREREQUISITO:** Autorización Prefectura antes contratación\n**CONTRATACIÓN:** Solo después fecha autorización\n**COPIA:** Remitir en 96 horas a Prefectura\n**VERIFICACIÓN:** Personal autorizado para funciones\n**REQUISITOS:** Cumplir Art. 11 DS 1773\n**INFRACCIÓN:** Contratar sin autorización previa'
},
'rule_473': {
  keywords: ["número vigilantes", "dotación autorizada", "inferior decreto"],
  response: '🤖👥 **DOTACIÓN VIGILANTES** (Art. 5 Decreto 1122):\n**AUTORIZADO:** Número según Decreto Exento\n**ESTUDIO:** Cantidad aprobada en Estudio Seguridad\n**MÍNIMO:** No inferior a autorizado\n**INFRACCIÓN:** Mantener menos vigilantes autorizados\n**CONTROL:** Verificar dotación completa\n**CUMPLIMIENTO:** Según Art. 5 letra c) DS 1173'
},
'rule_474': {
  keywords: ["vigilante civil", "uniforme obligatorio", "autorización no uniforme"],
  response: '🤖👔 **USO UNIFORME** (Art. 1 DL 3607):\n**OBLIGATORIO:** Uniforme durante funciones\n**EXCEPCIÓN:** Solo con autorización Prefectura\n**CIVIL:** Prohibido sin autorización escrita\n**MÁS DE UNO:** Al menos uno debe vestir civil\n**CONTROL:** Art. 4 DL 3607 autoriza excepción\n**INFRACCIÓN:** Vestir civil sin autorización'
},
'rule_475': {
  keywords: ["vigilante sin arma", "portación obligatoria", "autorización sin arma"],
  response: '🤖🔫 **PORTACIÓN ARMAS** (Art. 1 DL 3607):\n**OBLIGATORIO:** Todo vigilante debe portar arma fuego\n**EXCEPCIÓN:** Autorización Prefectura Carabineros\n**SERVICIO:** Durante desempeño funciones\n**AUTORIZACIÓN:** Art. 4 DL 3607 permite excepción\n**INFRACCIÓN:** No portar arma sin autorización\n**SEGURIDAD:** Arma parte esencial función'
},
'rule_476': {
  keywords: ["vigilante vía pública", "fuera recinto", "transporte valores"],
  response: '🤖🚶 **ÁMBITO VIGILANTES** (Art. 1 DL 3607):\n**LÍMITE:** Solo dentro recinto/área asignada\n**PROHIBIDO:** Vía pública con arma\n**EXCEPCIÓN:** Vigilantes transporte valores\n**DETENCIÓN:** Ley Control Armas si sorprendido\n**FUNCIONES:** Solo dominios empresa\n**INFRACCIÓN:** Salir área autorizada armado'
},
'rule_477': {
  keywords: ["seguro vida vigilante", "250 uf", "obligatorio empleador"],
  response: '🤖💰 **SEGURO VIDA** (Art. 5 DL 3607):\n**OBLIGATORIO:** Empleador contratar seguro\n**MONTO:** Mínimo 250 UF vigilantes privados\n**COBERTURA:** Durante desempeño funciones\n**VERIFICACIÓN:** Solo personal AA.FF. Prefectura\n**TRABAJADORES:** Calidad dependientes\n**INFRACCIÓN:** No mantener seguro vigente'
},
'rule_478': {
  keywords: ["renovación decreto", "3 meses anticipación", "vencimiento autorización"],
  response: '🤖📅 **RENOVACIÓN AUTORIZACIÓN** (Art. 7 DS 1773):\n**PLAZO:** Mínimo 3 meses antes vencimiento\n**ESCRITO:** Comunicar a Prefectura Carabineros\n**VIGENCIA:** Decreto autorización 2 años\n**CERTIFICADO:** Prefectura cumplimiento reglamento\n**INFRACCIÓN:** No solicitar renovación plazo\n**TRÁMITE:** Por intermedio Intendencia/Gobernación'
},
'rule_479': {
  keywords: ["credencial vencida", "tarjeta identificación", "fecha vencimiento"],
  response: '🤖🆔 **CREDENCIAL VIGILANTE** (Art. 13 DS 1773):\n**OBLIGATORIO:** Portar durante funciones\n**VIGENCIA:** Fecha vencimiento en anverso\n**COLORES:** Amarillo/verde/azul según función\n**DIMENSIONES:** 5.5 x 8.5 cms plástico\n**INFRACCIÓN:** Portar credencial vencida\n**RENOVACIÓN:** Antes fecha vencimiento'
},
'rule_480': {
  keywords: ["uniforme fuera recinto", "trayecto domicilio", "prohibido usar"],
  response: '🤖🚫 **USO UNIFORME** (Art. 17 DS 1773):\n**OBLIGATORIO:** Solo durante funciones\n**PROHIBIDO:** Fuera recinto/área trabajo\n**TRAYECTOS:** No usar ida/regreso domicilio\n**EXCLUSIVO:** Vigilantes autorizados únicamente\n**EMPRESA:** Debe proporcionar cantidad/calidad suficiente\n**INFRACCIÓN:** Usar uniforme fuera lugar trabajo'
},

// INFRACCIONES GUARDIAS SEGURIDAD
'rule_481': {
  keywords: ["guardias sin capacitación", "curso obligatorio", "carabineros capacitación"],
  response: '🤖📚 **CAPACITACIÓN GUARDIAS** (Art. 13 DS 93):\n**OBLIGATORIO:** Toda empresa capacitar personal\n**CURSO:** Dispuesto por Carabineros Chile\n**MATERIAS:** Seguridad según especialidad\n**EXAMEN:** Ante autoridad fiscalizadora\n**CERTIFICADO:** Aprobación curso requerido\n**INFRACCIÓN:** Mantener personal sin capacitar'
},
'rule_482': {
  keywords: ["implementos no autorizados", "bastón esposas", "autorización previa"],
  response: '🤖🛡️ **IMPLEMENTOS SEGURIDAD** (Art. 14 DS 93):\n**AUTORIZACIÓN:** Previa Prefectura Carabineros\n**ESPECÍFICO:** Cada servicio particular\n**PROHIBIDO:** Armas fuego bajo concepto alguno\n**IMPLEMENTOS:** Bastón, esposas, otros no fuego\n**INFRACCIÓN:** Usar implementos sin autorización\n**LEY 17.798:** Sin perjuicio aplicación'
},
'rule_483': {
  keywords: ["guardias armas fuego", "prohibición absoluta", "ley control armas"],
  response: '🤖🚫 **PROHIBICIÓN ARMAS** (Art. 14 DS 93):\n**PROHIBIDO:** Armas fuego bajo concepto alguno\n**GUARDIAS:** Nocheros, porteros, rondines similares\n**PROCEDIMIENTO:** Ley 17.798 aplicable\n**INFRACCIÓN:** Emplear armas fuego cumpliendo cometido\n**ABSOLUTA:** Sin excepciones para guardias\n**SANCIÓN:** Según normativa control armas'
},
'rule_484': {
  keywords: ["seguro guardias", "75 utm", "seguro obligatorio"],
  response: '🤖💼 **SEGURO GUARDIAS** (Art. 13 DS 93):\n**OBLIGATORIO:** Empleador contratar seguro vida\n**MONTO:** Mínimo 75 UTM\n**COBERTURA:** Cada persona función seguridad\n**NOTIFICACIÓN:** Infracción personas naturales/jurídicas\n**INFRACCIÓN:** No mantener seguro contratado\n**VERIFICACIÓN:** Autoridad fiscalizadora competente'
},
'rule_485': {
  keywords: ["directiva funcionamiento", "aprobación prefectura", "guardias seguridad"],
  response: '🤖📋 **DIRECTIVA FUNCIONAMIENTO** (Art. 15 DS 93):\n**OBLIGATORIO:** Presentar ante Prefectura\n**CONTENIDO:** Lugar, misión, uniformes, procedimientos\n**RESOLUCIÓN:** Aprobar, modificar o rechazar\n**EMPRESAS:** Ambas partes responsables si subcontratado\n**15 DÍAS:** Anticipación establecimiento servicio\n**INFRACCIÓN:** Operar sin directiva aprobada'
},
'rule_486': {
  keywords: ["credencial guardias", "extremo superior izquierdo", "tarjeta obligatoria"],
  response: '🤖🏷️ **CREDENCIAL GUARDIAS** (Art. 18 DS 93):\n**OBLIGATORIO:** Porte durante funciones\n**UBICACIÓN:** Extremo superior izquierdo tenida\n**DIMENSIONES:** 5.5 x 8.5 cms plástico\n**CONTENIDO:** Membrete, número, entidad, funcionario, RUN, vencimiento\n**FOTOGRAFÍA:** Colores fondo blanco 3.5 x 2.8 cms\n**COSTOS:** Cargo entidad interesada'
},

// LEY 19.303 ENTIDADES OBLIGADAS
'rule_487': {
  keywords: ["medidas seguridad", "60 días", "notificación carabineros"],
  response: '🤖⏰ **MEDIDAS SEGURIDAD** (Art. 4 Ley 19.303):\n**PLAZO:** 60 días después notificación Carabineros\n**OBLIGACIÓN:** Entidades designadas Ley 19.303\n**PRESENTAR:** Ante Autoridad Fiscalizadora\n**500 UF:** Umbral montos caja\n**COMBUSTIBLE:** Cualquier monto para bencineras\n**INFRACCIÓN:** No presentar medidas en plazo'
},
'rule_488': {
  keywords: ["armas medidas", "cantidad características", "inscripciones permisos"],
  response: '🤖🔫 **ARMAS EN MEDIDAS** (Art. 4 Ley 19.303):\n**ESPECIFICAR:** Cantidad y características armas\n**PRECISAR:** A nombre quién inscripciones/permisos\n**LEY 17.798:** Cumplir normativa control armas\n**MEDIDAS:** Incluir forma precisa y concreta\n**TENENCIA:** Detalle completo armamento\n**INFRACCIÓN:** No especificar datos armas'
},
'rule_489': {
  keywords: ["implementar medidas", "30 días aprobación", "entidad obligada"],
  response: '🤖✅ **IMPLEMENTACIÓN MEDIDAS** (Art. 7 Ley 19.303):\n**PLAZO:** 30 días siguientes aprobación\n**OBLIGACIÓN:** Dar cumplimiento medidas aprobadas\n**PREFECTURA:** Carabineros aprueba medidas\n**CONTROL:** Verificar implementación efectiva\n**INFRACCIÓN:** No implementar medidas aprobadas\n**SEGUIMIENTO:** Fiscalización posterior cumplimiento'
},
'rule_490': {
  keywords: ["información carabineros", "facilidades inspección", "fiscalización medidas"],
  response: '🤖🔍 **FACILIDADES FISCALIZACIÓN** (Art. 9 Ley 19.303):\n**INFORMACIÓN:** Proporcionar datos requeridos Carabineros\n**FACILIDADES:** Otorgar para inspeccionar recintos\n**MEDIDAS:** Donde implementadas medidas seguridad\n**OBLIGACIÓN:** Todas entidades obligadas\n**FISCALIZACIÓN:** Durante verificación cumplimiento\n**INFRACCIÓN:** No otorgar facilidades/información'
},
'rule_491': {
keywords: ["bóveda", "relojería", "apertura", "cierre", "alarmas"],
response: '🤖🏦 **BÓVEDAS BANCARIAS** (Art. 3° inc. 9° DL 3607):\n**REQUISITO:** Bóvedas con mecanismos relojería apertura/cierre\n**ALARMAS:** Sistema distinto al de asalto\n**OBLIGACIÓN:** Oficinas/agencias/sucursales sin bóveda equipada\n**SANCIÓN:** Requerimiento Prefecto Casa Matriz\n**NORMATIVA:** Decreto Exento 1122/1998 Art. 14°\n**INFRACCIÓN:** No contar con sistema relojería/alarmas'
},
'rule_492': {
keywords: ["cajas receptoras", "pagadoras", "compartimentadas", "cerraduras seguridad"],
response: '🤖💰 **CAJAS BANCARIAS** (Art. 3° inc. 7° DL 3607):\n**UBICACIÓN:** Todas juntas mismo recinto observable\n**REQUISITO:** Compartimentadas y aisladas del resto\n**CERRADURA:** Seguridad obligatoria\n**DISTANCIA:** Más distante posible del acceso\n**NORMATIVA:** Decreto Exento 1122/1998 Art. 15°\n**INFRACCIÓN:** No reunidas/compartimentadas/sin cerraduras'
},
'rule_493': {
keywords: ["alto riesgo", "cajas blindadas", "puertas blindadas", "detectores metales"],
response: '🤖🛡️ **OFICINAS ALTO RIESGO** (Art. 3° inc. 7° DL 3607):\n**DESDE 1999:** Cajas blindadas obligatorias\n**EXCEPCIÓN:** Puertas blindadas electrónicas + detectores metales\n**ACCESOS:** Todos exteriores con protección\n**APERTURA:** Dos o más hojas sucesivas independientes\n**CALIFICACIÓN:** Decreto Supremo Ministerios Interior/Defensa\n**INFRACCIÓN:** Sin cajas blindadas ni puertas/detectores'
},
'rule_494': {
keywords: ["vidrios exteriores", "inastillables", "transparencia", "visión exterior"],
response: '🤖🪟 **VIDRIOS BANCARIOS** (Art. 3° inc. 7° DL 3607):\n**MATERIAL:** Inastillables obligatorios\n**TRANSPARENCIA:** Permitir visión exterior hacia interior\n**APLICACIÓN:** Productos destinados ese objeto\n**OBLIGACIÓN:** Todos vidrios exteriores\n**NORMATIVA:** Decreto Exento 1122/1998 Art. 16°\n**INFRACCIÓN:** Vidrios no inastillables/impiden visión'
},
'rule_495': {
keywords: ["cámaras filmación", "alta resolución", "grabación nítida", "digitalización"],
response: '🤖📹 **FILMACIÓN BANCARIA** (Art. 3° inc. 7° DL 3607):\n**CALIDAD:** Alta resolución imágenes nítidas asalto\n**ALTO RIESGO:** Digitalización hora/día/mes/año\n**PROTECCIÓN:** Equipos ocultos o resguardados\n**COBERTURA:** Entrada/salida y llegada cajas\n**NORMATIVA:** Decreto Exento 1122/1998 Art. 17°\n**INFRACCIÓN:** Sin sistemas cámaras/filmación alta resolución'
},

'rule_496': {
keywords: ["mensajería electrónica", "encriptada", "transporte valores", "tesorero"],
response: '🤖📧 **COMUNICACIÓN BANCARIA** (Art. 3° inc. 7° DL 3607):\n**MEDIO:** Mensajería electrónica encriptada obligatoria\n**USO:** Envío/retiro/manipulación dineros con transportadoras\n**EXCEPCIÓN:** Escrita firmada tesorero en contingencias\n**ESTÁNDAR:** Sistema comunicaciones bancarias\n**NORMATIVA:** Decreto Exento 1122/1998 Art. 18°\n**INFRACCIÓN:** No comunicarse mediante mensajería encriptada'
},

'rule_497': {
keywords: ["cajeros automáticos", "estudio seguridad", "medidas mínimas", "DS 222"],
response: '🤖🏧 **CAJEROS - ESTUDIO SEGURIDAD** (Art. 3° inc. 1° DL 3607):\n**OBLIGACIÓN:** Incorporar medidas DS 222 en estudio\n**APLICACIÓN:** Cajeros propiedad entidades bancarias/financieras\n**REGULACIÓN:** DL 3607/1981 Art. 5°\n**DECRETO:** Supremo 222/2013 Art. 3°\n**SANCIÓN:** Requerimiento Prefecto Casa Matriz\n**INFRACCIÓN:** Medidas no incorporadas estudio seguridad'
},

'rule_498': {
keywords: ["listado cajeros", "ubicación", "medidas seguridad", "15 días"],
response: '🤖📋 **LISTADO CAJEROS** (Art. 3° inc. 1° DL 3607):\n**CONTENIDO:** Ubicación y medidas seguridad adoptadas\n**PLAZO:** 15 días desde habilitación operación\n**OBLIGACIÓN:** Nuevo/reinstalación/reemplazo cajero\n**INFORME:** Detalle ubicación y medidas aplicadas\n**DOCUMENTACIÓN:** Certificación correspondiente\n**INFRACCIÓN:** No incorporar listado estudios seguridad'
},

'rule_499': {
keywords: ["sistema alarma", "sensores movimiento", "inclinación", "corte cables"],
response: '🤖🚨 **ALARMA CAJEROS** (Art. 3° inc. 1° DL 3607):\n**MONITOREO:** Sistema línea central permanente\n**SENSORES:** Movimiento/inclinación/corte cables/eléctrica\n**ADICIONALES:** Temperatura/humo/apertura no autorizada\n**COMUNICACIÓN:** Carabineros/PDI más breve plazo\n**RESPALDO:** Energía eléctrica interrupciones\n**INFRACCIÓN:** Sin sistema alarma/sensores/mal funcionamiento'
},
'rule_500': {
keywords: ["grabación imágenes", "alta definición", "cámara externa", "cámara interna"],
response: '🤖📱 **GRABACIÓN CAJEROS** (Art. 3° inc. 1° DL 3607):\n**CALIDAD:** Alta definición\n**EXTERNA:** Actividad torno cajero operación\n**INTERNA:** Rostro y características físicas usuarios\n**MONITOREO:** Central línea acceso inmediato\n**ALMACENAMIENTO:** Mínimo 45 días / 24 meses ataques\n**INFRACCIÓN:** Sin sistema grabación/mal funcionamiento'
},
'rule_501': {
keywords: ["cajas fuertes", "bóvedas", "protección cortantes", "fundentes", "EN-1143-1"],
response: '🤖🔒 **PROTECCIÓN BÓVEDAS CAJEROS** (Art. 3° inc. 1° DL 3607):\n**PROTECCIÓN:** Contra elementos cortantes/fundentes\n**CERRADURAS:** Dispositivos seguridad\n**RETARDO:** Efectividad ataque herramientas\n**GRADO:** Seguridad IV superior norma EN-1143-1\n**CERTIFICACIÓN:** Fabricante o entidad certificadora\n**INFRACCIÓN:** Sin protección/cerraduras seguridad norma'
},
'rule_502': {
keywords: ["anclado", "empotramiento", "blindaje", "sistema entintado", "pilote frontal"],
response: '🤖⚓ **ANCLAJE CAJEROS** (Art. 3° inc. 1° DL 3607):\n**ANCLADO:** Suelo o estructura edificación obligatorio\n**GRADO:** Seguridad IV superior EN-1143-1\n**ADICIONALES:** Empotramiento/blindaje/entintado billetes\n**REPOSICIÓN:** Mínimo dos medidas vulneración\n**EXCEPCIÓN:** Pilote frontal lugares especiales\n**INFRACCIÓN:** No anclado/sin medidas adicionales'
},
'rule_503': {
keywords: ["pilote frontal", "estaciones subterráneas", "aeropuertos", "vigilantes privados"],
response: '🤖🏗️ **PILOTE FRONTAL CAJEROS** (Art. 3° inc. 1° DL 3607):\n**LUGARES:** Estaciones subterráneas/aeropuertos/impedimentos\n**REQUISITO:** Protección Vigilantes Privados\n**ESPECIFICACIONES:** Acero 100x100x850mm cubierto 150mm\n**CERRADURA:** Electromagnética conectada alarma\n**TERMINACIONES:** Acero inoxidable\n**INFRACCIÓN:** Lugares indicados sin pilote frontal'
},
'rule_504': {
keywords: ["plan revisiones", "clonación tarjetas", "skimmers", "cámaras ocultas"],
response: '🤖🔍 **PLAN REVISIONES CAJEROS** (Art. 3° inc. 1° DL 3607):\n**OBJETIVO:** Evitar clonación tarjetas/obtención claves\n**VERIFICACIÓN:** Dispositivos capturar información\n**DETECCIÓN:** Skimmers/cámaras ocultas/alteraciones\n**PERIODICIDAD:** Plan detalle frecuencia visitas\n**RESULTADO:** Disponible inmediato entidad\n**INFRACCIÓN:** No implementar plan revisión seguridad'
},
'rule_505': {
keywords: ["transporte valores", "funciones seguridad", "estudio seguridad", "vigilantes"],
response: '🤖🚛 **FUNCIONES VIGILANTES TRANSPORTE** (Art. 3° inc. 10° DL 3607):\n**LIMITACIÓN:** Solo funciones seguridad contempladas\n**DOCUMENTO:** Estudio seguridad respectivo\n**PROHIBICIÓN:** Actividades no contempladas\n**SANCIÓN:** Requerimiento Prefecto Casa Matriz\n**NORMATIVA:** DS 1814/2014 Art. 4°\n**INFRACCIÓN:** Actividades no contempladas estudio'
},
'rule_506': {
keywords: ["vehículos blindados", "tripulación tres", "uniformados", "armados", "chaleco antibalas"],
response: '🤖🚚 **TRANSPORTE TERRESTRE VALORES** (Art. 3° inc. 1° DL 3607):\n**VEHÍCULOS:** Blindados obligatorios\n**TRIPULACIÓN:** Mínimo tres vigilantes privados\n**CONDUCTOR:** No descender durante servicio\n**EQUIPAMIENTO:** Uniformados/armados/chaleco antibalas\n**NORMATIVA:** DS 1814/2014 Art. 6° inc. 1°\n**INFRACCIÓN:** Vehículos no blindados/tripulación inferior'
},
'rule_507': {
keywords: ["transporte infantería", "dos vigilantes", "uniformados", "armados", "antibalas"],
response: '🤖👥 **TRANSPORTE INFANTERÍA** (Art. 3° inc. 10° DL 3607):\n**TRIPULACIÓN:** Mínimo dos Vigilantes Privados\n**EQUIPAMIENTO:** Uniformados/armados/chaleco antibalas\n**MODALIDAD:** Transporte valores infantería\n**NORMATIVA:** DS 1814/2014 Art. 6° inc. 2°\n**SANCIÓN:** Requerimiento Prefecto Casa Matriz\n**INFRACCIÓN:** Menos dos vigilantes/sin equipamiento'
},
'rule_508': {
keywords: ["franja horaria", "07:00 23:00", "operaciones interregionales", "autorización carabineros"],
response: '🤖⏰ **HORARIO TRANSPORTE** (Art. 3° inc. 1° DL 3607):\n**FRANJA:** 07:00 a 23:00 horas obligatorio\n**EXCEPCIONES:** Operaciones interregionales\n**AUTORIZACIÓN:** Carabineros resolución fundada\n**NORMATIVA:** DS 1814/2014 Art. 6° inc. 5°\n**SANCIÓN:** Requerimiento Prefecto Casa Matriz\n**INFRACCIÓN:** Operaciones fuera horario sin autorización'
},
'rule_509': {
keywords: ["carga descarga", "estancos resguardados", "lugar próximo", "medidas seguridad"],
response: '🤖📦 **CARGA/DESCARGA VALORES** (Art. 3° inc. 1° DL 3607):\n**LUGAR:** Estancos debidamente resguardados\n**HABILITACIÓN:** Entidades emisoras/receptoras\n**ALTERNATIVA:** Lugar más próximo entidad\n**CONDICIÓN:** Sin medidas seguridad establecidas\n**NORMATIVA:** DS 1814/2014 Art. 8°\n**INFRACCIÓN:** Lugar sin medidas seguridad'
},
'rule_510': {
keywords: ["planificación horarios", "rutas viajes", "distribución operaciones", "método eficiente"],
response: '🤖🗺️ **PLANIFICACIÓN TRANSPORTE** (Art. 3° inc. 1° DL 3607):\n**OBLIGACIÓN:** Planificación horarios y rutas\n**MÉTODO:** Distribución operaciones efectiva\n**FRANJA:** Dentro 07:00 a 23:00 horas\n**EFICIENCIA:** Método distribución obligatorio\n**NORMATIVA:** DS 1814/2014 Art. 9°\n**INFRACCIÓN:** No planificación efectiva/eficiente'
},
'rule_511': {
keywords: ["círculo naranja", "reflectante", "techo exterior", "vehículo blindado"],
response: '🤖🟠 **IDENTIFICACIÓN VEHÍCULOS** (Art. 3° inc. 1° DL 3607):\n**MARCA:** Círculo color naranja reflectante\n**UBICACIÓN:** Techo exterior vehículo blindado\n**OBLIGACIÓN:** Todos vehículos transporte valores\n**VISIBILIDAD:** Reflectante a la luz\n**NORMATIVA:** DS 1814/2014 Art. 10° inc. 1°\n**INFRACCIÓN:** Sin círculo naranja reflectante techo'
},
'rule_512': {
keywords: ["estructura básica", "cabina conductor", "habitáculo tripulación", "bóveda custodia"],
response: '🤖🏗️ **ESTRUCTURA VEHÍCULOS BLINDADOS** (Art. 3° inc. 1° DL 3607):\n**CABINA:** Conductor separada\n**HABITÁCULO:** Tripulación específico\n**BÓVEDA:** Custodia valores independiente\n**OBLIGACIÓN:** Estructura básica completa\n**NORMATIVA:** DS 1814/2014 Art. 10° inc. 1°\n**INFRACCIÓN:** Sin estructura básica completa'
},
'rule_513': {
keywords: ["cerraduras randómicas", "apertura simultánea", "puertas habitáculo", "bóveda"],
response: '🤖🔐 **CERRADURAS VEHÍCULOS** (Art. 3° inc. 1° DL 3607):\n**TIPO:** Randómicas imposibilitan apertura simultánea\n**APLICACIÓN:** Habitáculo/bóveda/cabina conductor\n**SEGURIDAD:** No permitir apertura conjunta\n**PROTECCIÓN:** Sistema cerradura específico\n**NORMATIVA:** DS 1814/2014 Art. 10° inc. 1°\n**INFRACCIÓN:** Sin cerraduras randómicas'
},
'rule_514': {
keywords: ["transmisión radial", "sistema localización", "satelital", "central comunicaciones"],
response: '🤖📡 **COMUNICACIONES VEHÍCULOS** (Art. 3° inc. 1° DL 3607):\n**TRANSMISIÓN:** Radial o continua obligatoria\n**CONTACTO:** Permanente central comunicaciones\n**LOCALIZACIÓN:** Satelital o efectos similares\n**MONITOREO:** En línea permanente\n**NORMATIVA:** DS 1814/2014 Art. 10° inc. 1°\n**INFRACCIÓN:** Sin equipo transmisión/localización'
},
'rule_515': {
keywords: ["blindaje resistencia", "proyectil calibre", "7.62 x 39", "penetración mínima"],
response: '🤖🛡️ **BLINDAJE VEHÍCULOS** (Art. 3° inc. 1° DL 3607):\n**RESISTENCIA:** Mínima penetración proyectil\n**CALIBRE:** 7.62 x 39 mm obligatorio\n**APLICACIÓN:** Todos vehículos transporte valores\n**PROTECCIÓN:** Resistencia específica requerida\n**NORMATIVA:** DS 1814/2014 Art. 10° inc. 2°\n**INFRACCIÓN:** Sin blindaje resistencia señalada'
},
'rule_516': {
keywords: ["neumáticos resistentes", "pinchazos", "vehículos blindados", "transporte valores"],
response: '🤖🛞 **NEUMÁTICOS VEHÍCULOS** (Art. 3° inc. 1° DL 3607):\n**TIPO:** Resistentes pinchazos obligatorios\n**APLICACIÓN:** Todos vehículos transporte valores\n**PROTECCIÓN:** Contra pinchazos específica\n**SEGURIDAD:** Continuidad operacional\n**NORMATIVA:** DS 1814/2014 Art. 10° inc. 2°\n**INFRACCIÓN:** Sin neumáticos resistentes pinchazos'
},
'rule_517': {
keywords: ["tres cámaras", "televigilancia", "alta resolución", "interior exterior"],
response: '🤖📹 **CÁMARAS VEHÍCULOS** (Art. 3° inc. 1° DL 3607):\n**CANTIDAD:** Mínimo tres cámaras alta resolución\n**DISTRIBUCIÓN:** Dos interior/una exterior\n**UBICACIÓN:** Cabina conductor/habitáculo tripulación\n**CONEXIÓN:** Central monitoreo empresa\n**PROTECCIÓN:** Debidamente resguardadas\n**INFRACCIÓN:** Sin tres cámaras televigilancia'
},
'rule_518': {
keywords: ["central monitoreo", "funcionario", "diez camiones", "comunicación carabineros"],
response: '🤖🖥️ **CENTRAL MONITOREO** (Art. 3° inc. 1° DL 3607):\n**PERSONAL:** Mínimo un funcionario cada diez camiones\n**OPERACIÓN:** Funcionario entidad obligatorio\n**COMUNICACIÓN:** Directa centrales Carabineros\n**CONEXIÓN:** Sistema permanente\n**NORMATIVA:** DS 1814/2014 Art. 10° inc. 4°\n**INFRACCIÓN:** Central no funciona términos establecidos'
},
'rule_519': {
keywords: ["bolsas contenedores", "material resistente", "insignia corporativa", "precintos"],
response: '🤖👝 **BOLSAS/CONTENEDORES** (Art. 3° inc. 1° DL 3607):\n**MATERIAL:** Resistente roce/probable intrusión\n**IDENTIFICACIÓN:** Insignia corporativa/número\n**PRECINTOS:** Cierre identificados empresa\n**USO:** Dinero efectivo/documentos mercantiles\n**NORMATIVA:** DS 1814/2014 Art. 11°\n**INFRACCIÓN:** Bolsas no resistentes/sin identificación'
},
'rule_520': {
keywords: ["sistemas entintado", "billetes", "carabineros chile"],
response: '🤖🎨 **SISTEMAS ENTINTADO** (Art. 3° inc. 1° DL 3607):\n**DISPOSITIVOS:** Disuasivos seguridad entintado billetes\n**REGISTRO:** Inscripción Carabineros Chile\n**OBLIGACIÓN:** Solicitar inscripción previa\n**MANTENIMIENTO:** Registro específico\n**NORMATIVA:** DS 1814/2014 Art. 12°\n**INFRACCIÓN:** Operar sin inscripción registro'
},
'rule_521': {
keywords: ["operaciones alto riesgo", "cuatro vigilantes", "escolta apoyo", "zonas urbanas"],
response: '🤖⚠️ **OPERACIONES ALTO RIESGO** (Art. 3° inc. 1° DL 3607):\n**TRIPULACIÓN:** Cuatro vigilantes o escolta apoyo\n**DECLARACIÓN:** Propia entidad estudio seguridad\n**CARABINEROS:** Determina operaciones riesgo\n**HORARIO:** Fuera 7:00-23:00 hrs autorizadas\n**ZONAS:** Viña del Mar/Valparaíso/Concepción/Temuco/Rancagua/RM\n**INFRACCIÓN:** Sin tripulación/escolta requerida'
},
'rule_522': {
keywords: ["vigilantes apoyo", "uniforme", "armamento", "vehículo no blindado", "distintivos"],
response: '🤖👮 **VIGILANTES APOYO** (Art. 3° inc. 1° DL 3607):\n**AUTORIZACIÓN:** Carabineros casos calificados\n**EQUIPAMIENTO:** Uniforme/armamento/chaleco antibalas\n**VEHÍCULO:** No blindado con distintivos empresa\n**PROHIBICIÓN:** No transportar valores\n**NORMATIVA:** DS 1814/2014 Art. 14°\n**INFRACCIÓN:** Sin autorización/no implementar exigida'
},
'rule_523': {
keywords: ["bóvedas centros acopio", "protección cortantes", "cerraduras seguridad", "dispositivos electrónicos"],
response: '🤖🏛️ **BÓVEDAS CENTROS ACOPIO** (Art. 3° inc. 1° DL 3607):\n**ESTRUCTURA:** Muros/cielos/pisos/puertas protegidos\n**PROTECCIÓN:** Cortantes/fundentes/mecánicos\n**CERRADURAS:** Seguridad obligatorias\n**DISPOSITIVOS:** Electrónicos detectar/repeler/retardar\n**NORMATIVA:** DS 1814/2014 Art. 16°\n**INFRACCIÓN:** Estructura no cumple medidas mínimas'
},
'rule_524': {
keywords: ["seguridad electrónica", "sensores alarma", "controles acceso", "alpha ii"],
response: '🤖⚡ **SEGURIDAD ELECTRÓNICA BÓVEDAS** (Art. 3° inc. 1° DL 3607):\n**SISTEMAS:** Monitoreo/control electrónico\n**SENSORES:** Alarma/controles acceso\n**CERRADURAS:** Electrónicas retardo/bloqueo horario\n**PULSADORES:** Asalto conectados ALPHA II\n**DETECTORES:** Incendio/humo/calor/vibración\n**INFRACCIÓN:** Sin totalidad seguridad electrónica'
},
'rule_525': {
keywords: ["doble puerta", "ingreso vehículos", "vigilantes 24 horas", "acopio temporal"],
response: '🤖🚪 **OFICINAS ACOPIO TEMPORAL** (Art. 3° inc. 1° DL 3607):\n**ACCESO:** Zona doble puerta vehículos blindados\n**VIGILANCIA:** Privados 24 horas todos días\n**ACOPIO:** Dinero/valores temporalmente\n**PROTECCIÓN:** Sistema vigilantes permanente\n**NORMATIVA:** DS 1814/2014 Art. 18° inc. 1°\n**INFRACCIÓN:** Sin doble puerta/sin vigilantes 24hrs'
},
'rule_526': {
keywords: ["compartimentadas", "aisladas", "bóveda tesorería", "central monitoreo"],
response: '🤖🏢 **COMPARTIMENTACIÓN AGENCIAS** (Art. 3° inc. 1° DL 3607):\n**ÁREAS:** Bóveda/tesorería/central monitoreo\n**REQUISITO:** Compartimentadas y aisladas entre sí\n**SEPARACIÓN:** Respecto dependencias administrativas\n**OBLIGACIÓN:** Agencias/sucursales empresas\n**NORMATIVA:** DS 1814/2014 Art. 18° inc. 2°\n**INFRACCIÓN:** No compartimentadas/aisladas'
},
'rule_527': {
keywords: ["grabación alta resolución", "personas ingresan", "salen", "bóvedas acopio"],
response: '🤖📽️ **GRABACIÓN AGENCIAS** (Art. 3° inc. 1° DL 3607):\n**CALIDAD:** Alta resolución imágenes nítidas\n**COBERTURA:** Ingreso/salida/llegada bóvedas\n**CONEXIÓN:** Central monitoreo entidad\n**PROTECCIÓN:** Equipos resguardados intrusión\n**NORMATIVA:** DS 1814/2014 Art. 18° inc. 3°-4°\n**INFRACCIÓN:** Sin sistema grabación/mal resguardadas'
},
'rule_528': {
keywords: ["grabaciones 30 días", "un año delito", "resguardo", "antecedentes comisión"],
response: '🤖💾 **RESGUARDO GRABACIONES** (Art. 3° inc. 1° DL 3607):\n**MÍNIMO:** Treinta días hábiles\n**DELITO:** Un año antecedentes comisión\n**OBLIGACIÓN:** Resguardar grabaciones cámaras\n**PERÍODO:** Según corresponda situación\n**NORMATIVA:** DS 1814/2014 Art. 18° inc. 5°\n**INFRACCIÓN:** No mantener período dispuesto'
},
'rule_529': {
keywords: ["sistema alarmas", "empresa certificada", "alpha ii", "conexión carabineros"],
response: '🤖🚨 **ALARMAS AGENCIAS** (Art. 3° inc. 1° DL 3607):\n**INSTALACIÓN:** Empresa certificada Carabineros\n**CONEXIÓN:** Sistema ALPHA II Carabineros\n**OBLIGACIÓN:** Agencias/sucursales empresas\n**CERTIFICACIÓN:** Empresa autorizada\n**NORMATIVA:** DS 1814/2014 Art. 19°\n**INFRACCIÓN:** No conectada sistema ALPHA II'
},
'rule_530': {
keywords: ["operaciones cajeros", "apertura bóveda", "tres vigilantes", "recargas reposición"],
response: '🤖🏧 **OPERACIONES CAJEROS** (Art. 3° inc. 1° DL 3607):\n**TRIPULACIÓN:** Mínimo tres vigilantes privados\n**OCASIÓN:** Recargas/reposición dinero/asistencia técnica\n**APERTURA:** Bóveda cajeros automáticos\n**PRESENCIA:** Obligatoria tripulación completa\n**NORMATIVA:** DS 1814/2014 Art. 25° inc. 1°\n**INFRACCIÓN:** Sin tripulación vigilantes dispuesta'
},
'rule_531': {
keywords: ["asistencia técnica", "vehículo no blindado", "distintivo empresa", "dos vigilantes"],
response: '🤖🔧 **ASISTENCIA TÉCNICA CAJEROS** (Art. 3° inc. 1° DL 3607):\n**VEHÍCULO:** No blindado con distintivo empresa\n**TRIPULACIÓN:** Dos vigilantes privados mínimo\n**APERTURA:** Bóveda para fallas/asistencia\n**ESTUDIO:** Señalar expresamente actividad\n**NORMATIVA:** DS 1814/2014 Art. 25° inc. 2°\n**INFRACCIÓN:** Sin distintivo/tripulación inferior'
},
'rule_532': {
keywords: ["zona aislada", "recarga reposición", "barreras", "impedir acceso terceros"],
response: '🤖🚧 **ZONA AISLADA CAJEROS** (Art. 3° inc. 1° DL 3607):\n**AISLAMIENTO:** Zona aislada público obligatoria\n**OBJETIVO:** Impedir acceso terceras personas\n**MEDIOS:** Barreras u elemento similar\n**ACTIVIDAD:** Recarga/reposición dinero contenedores\n**NORMATIVA:** DS 1814/2014 Art. 25° inc. 3°\n**INFRACCIÓN:** Zona no aislada'
},
'rule_533': {
keywords: ["recuento valores", "lugares aislados", "camiones blindados", "no público"],
response: '🤖🔢 **RECUENTO VALORES CAJEROS** (Art. 3° inc. 1° DL 3607):\n**LUGARES:** Aislados especialmente habilitados\n**ALTERNATIVA:** Interior camiones blindados\n**PROHIBICIÓN:** Vista/presencia público\n**RECUENTO:** Solo valores cajeros automáticos\n**NORMATIVA:** DS 1814/2014 Art. 25° inc. 4°\n**INFRACCIÓN:** Recuento lugares no aislados'
},
'rule_534': {
keywords: ["operadores técnicos", "acreditados carabineros", "sin apertura bóvedas"],
response: '🤖👨‍🔧 **OPERADORES SIN APERTURA** (Art. 3° inc. 10° DL 3607):\n**PERSONAL:** Operadores/técnicos empresa\n**ACREDITACIÓN:** Carabineros Chile obligatoria\n**OPERACIONES:** Sin involucrar apertura bóvedas\n**REQUISITO:** Debidamente acreditados\n**NORMATIVA:** DS 1814/2014 Art. 26°\n**INFRACCIÓN:** Sin acreditación Carabineros'
},
'rule_535': {
keywords: ["pagos pensiones", "remuneraciones", "comunicación previa", "autorización prefectura"],
response: '🤖💰 **PAGOS PENSIONES/REMUNERACIONES** (Art. 3° inc. 1° DL 3607):\n**SERVICIOS:** Personal/materiales propios/subcontratados\n**COMUNICACIÓN:** Previa Prefecturas Carabineros\n**AUTORIZACIÓN:** Prefectura respectiva\n**LUGARES:** Días/horas previamente comunicadas\n**NORMATIVA:** DS 1814/2014 Art. 28°-30°\n**INFRACCIÓN:** Sin comunicación/autorización Prefectura'
},
'rule_536': {
keywords: ["centros recaudación", "vigilantes privados", "circuitos televisión", "cajas blindadas"],
response: '🤖🏪 **CENTROS RECAUDACIÓN/PAGOS** (Art. 3° inc. 1° DL 3607):\n**ADMINISTRACIÓN:** Por cuenta terceros\n**SEGURIDAD:** Vigilantes privados/controles acceso\n**EQUIPOS:** Circuitos TV/cajas blindadas/compartimentadas\n**SISTEMAS:** Alarma/cajas seguridad/recinto aislado\n**NORMATIVA:** DS 1814/2014 Art. 31°\n**INFRACCIÓN:** Sin implementar medidas seguridad'
},
'rule_537': {
keywords: ["autorización prefectura", "actividades seguridad privada", "recursos humanos", "capacitación"],
response: '🤖📋 **AUTORIZACIÓN ACTIVIDADES** (Art. 5° Bis DL 3607):\n**OBLIGACIÓN:** Autorización Prefectura Carabineros\n**ACTIVIDADES:** RR.HH./RR.TT./Asesorías/Capacitación\n**DOMICILIO:** Prefectura correspondiente comercial\n**REQUISITO:** Debidamente autorizadas\n**NORMATIVA:** DS 93/1985 Art. 1° y 5°\n**INFRACCIÓN:** No autorizada desarrollar actividades'
},
'rule_538': {
keywords: ["prohibición ofrecer", "vigilantes privados", "cualquier denominación", "delito"],
response: '🤖🚫 **PROHIBICIÓN OFRECER VIGILANTES** (Art. 5° Bis DL 3607):\n**PROHIBICIÓN:** Proporcionar/ofrecer Vigilantes Privados\n**FORMAS:** Cualquier forma/denominación\n**CONVENCIONES:** Destinadas proporcionar personal\n**INTERÉS:** Nacional prohíbe actividad\n**DELITO:** Transgresión constitutiva delito\n**INFRACCIÓN:** Ofrecer servicio Vigilantes Privados'
},
'rule_539': {
keywords: ["contrato trabajo", "guardias seguridad", "nochero", "portero", "rondín"],
response: '🤖📄 **CONTRATO TRABAJO GUARDIAS** (Art. 5° Bis DL 3607):\n**OBLIGACIÓN:** Suscribir contrato trabajo\n**PERSONAL:** Guardias/nocheros/porteros/rondines\n**SIMILAR:** Carácter análogo funciones\n**CÓDIGO:** Trabajo D.F.L. 1/1994\n**NORMATIVA:** DS 93/1985 Art. 13° inc. 1°\n**INFRACCIÓN:** Sin suscribir contrato trabajo'
},
'rule_540': {
keywords: ["seguro vida", "75 UTM", "guardias seguridad", "favor personal"],
response: '🤖💼 **SEGURO VIDA GUARDIAS** (Art. 5° Bis DL 3607):\n**OBLIGACIÓN:** Contratar seguro vida\n**MONTO:** No inferior 75 UTM\n**BENEFICIARIO:** Favor personal guardias\n**COBERTURA:** Guardias/nocheros/porteros/rondines\n**NORMATIVA:** DS 93/1985 Art. 13° inc. 3°\n**INFRACCIÓN:** No contratar seguro vida'
},
'rule_541': {
keywords: ["capacitación personal", "materias carabineros", "oportunidades dispuestas"],
response: '🤖🎓 **CAPACITACIÓN GUARDIAS** (Art. 5° Bis DL 3607):\n**OBLIGACIÓN:** Capacitar personal guardias\n**MATERIAS:** Dispuestas Carabineros Chile\n**OPORTUNIDADES:** Según determine Carabineros\n**PERSONAL:** Guardias/nocheros/porteros/rondines\n**NORMATIVA:** DS 93/1985 Art. 13° inc. 1°\n**INFRACCIÓN:** Sin capacitar materias/oportunidades'
},
'rule_542': {
keywords: ["implementos seguridad", "autorización prefectura", "no armas fuego"],
response: '🤖🛡️ **IMPLEMENTOS SEGURIDAD** (Art. 5° Bis DL 3607):\n**AUTORIZACIÓN:** Prefectura Carabineros previa\n**IMPLEMENTOS:** Cualquier tipo excepto armas fuego\n**LABOR:** Guardias/nocheros/porteros/rondines\n**REQUISITO:** Previamente autorizado\n**NORMATIVA:** DS 93/1985 Art. 14° inc. 1°\n**INFRACCIÓN:** Implementos no autorizados Directiva'
},
'rule_543': {
keywords: ["prohibición armas fuego", "guardias seguridad", "emplear", "desempeño labor"],
response: '🤖🔫 **PROHIBICIÓN ARMAS FUEGO** (Art. 5° Bis DL 3607):\n**PROHIBICIÓN:** Emplear armas fuego\n**PERSONAL:** Guardias/nocheros/porteros/rondines\n**DESEMPEÑO:** Durante cumplimiento funciones\n**LEY:** 17.798 Art. 6°\n**NORMATIVA:** DS 93/1985 Art. 14°\n**INFRACCIÓN:** Emplear armas fuego funciones'
},
'rule_544': {
keywords: ["credencial obligatoria", "extremo superior izquierdo", "permanentemente portada"],
response: '🤖🆔 **CREDENCIAL GUARDIAS** (Art. 5° Bis DL 3607):\n**PORTE:** Obligatorio desempeño funciones\n**UBICACIÓN:** Extremo superior izquierdo tenida\n**PERMANENCIA:** Portada permanentemente\n**OTORGADA:** Prefectura Carabineros respectiva\n**NORMATIVA:** DS 93/1985 Art. 18°\n**INFRACCIÓN:** No portar credencial vigente'
},
'rule_545': {
keywords: ["requisitos guardias", "chileno", "18 años", "octavo básico", "sin condenas"],
response: '🤖✅ **REQUISITOS GUARDIAS** (Art. 5° Bis DL 3607):\n**NACIONALIDAD:** Ser chileno\n**EDAD:** 18 años cumplidos\n**EDUCACIÓN:** Octavo básico aprobado mínimo\n**ANTECEDENTES:** Sin condenas/procesos crimen/delito\n**SALUD:** Condiciones físicas compatibles función\n**INFRACCIÓN:** Personal sin cumplir requisitos'
},
'rule_546': {
keywords: ["uniforme autorizado", "prefectura carabineros", "directiva funcionamiento"],
response: '🤖👕 **UNIFORME GUARDIAS** (Art. 5° Bis DL 3607):\n**OBLIGACIÓN:** Vestir uniforme autorizado\n**AUTORIZACIÓN:** Prefectura Carabineros respectiva\n**DOCUMENTO:** Incorporado Directiva Funcionamiento\n**DESEMPEÑO:** Durante funciones guardias\n**NORMATIVA:** DS 93/1985 Art. 15° inc. 2°\n**INFRACCIÓN:** Uniforme no autorizado Directiva'
},
'rule_547': {
keywords: ["directiva funcionamiento", "comunicado prefectura", "lugar", "misión", "uniforme"],
response: '🤖📋 **DIRECTIVA FUNCIONAMIENTO** (Art. 5° Bis DL 3607):\n**COMUNICACIÓN:** Prefecturas Carabineros\n**CONTENIDO:** Lugar/misión/tipo uniforme\n**APROBACIÓN:** Puede ser aprobada/modificada/rechazada\n**MODIFICACIÓN:** Interesados deben modificar\n**NORMATIVA:** DS 93/1985 Art. 15° inc. 2°\n**INFRACCIÓN:** Sin Directiva aprobada Prefectura'
},
'rule_548': {
keywords: ["libro existencia", "equipos materiales", "recursos técnicos", "exhibir"],
response: '🤖📚 **LIBRO EXISTENCIA** (Art. 5° Bis DL 3607):\n**OBLIGACIÓN:** Mantener libro existencia\n**CONTENIDO:** Equipos/materiales/elementos poder\n**ACTUALIZACIÓN:** Forma actualizada/permanente\n**EXHIBICIÓN:** Cada vez requiera Prefectura\n**NORMATIVA:** DS 93/1985 Art. 3° inc. 1° y 7°\n**INFRACCIÓN:** No mantener actualizado/permanente'
},
'rule_549': {
keywords: ["programas cursos", "aprobación prefectura", "capacitación vigilantes", "10 días"],
response: '🤖🎯 **PROGRAMAS CAPACITACIÓN** (Art. 5° Bis DL 3607):\n**INDIVIDUALIZACIÓN:** 10 días anticipación inicio\n**CONTENIDO:** Materias/alumnos participantes\n**ENTIDAD:** Indicar donde prestan servicios\n**APROBACIÓN:** Prefectura Carabineros\n**NORMATIVA:** DS 93/1985 Art. 9°\n**INFRACCIÓN:** Sin aprobación programas cursos'
},
'rule_550': {
keywords: ["medidas seguridad", "60 días", "decreto supremo", "500 UF"],
response: '🤖⏰ **MEDIDAS SEGURIDAD OBLIGADAS** (Art. 1° Ley 19303):\n**PLAZO:** 60 días desde notificación\n**MONTO:** Iguales/superiores 500 UF caja\n**DECRETO:** Supremo cataloga obligadas\n**PRESENTACIÓN:** Prefectura Carabineros respectiva\n**NORMATIVA:** DS 1772/1995 Art. 7°\n**INFRACCIÓN:** No presentar dentro plazo'
},
'rule_551': {
keywords: ["combustible público", "medidas seguridad", "precisas concretas"],
response: '🤖⛽ **COMBUSTIBLE PÚBLICO** (Art. 1° inc. 2° Ley 19303):\n**OBLIGACIÓN:** Presentar medidas seguridad\n**TIPO:** Precisas y concretas\n**ESTABLECIMIENTOS:** Venta combustible público\n**PRESENTACIÓN:** Prefectura Carabineros\n**NORMATIVA:** DS 1772/1995 Art. 7°\n**INFRACCIÓN:** No presentar medidas seguridad'
},
'rule_552': {
keywords: ["implementación medidas", "30 días hábiles", "aprobadas prefectura"],
response: '🤖✅ **IMPLEMENTACIÓN MEDIDAS** (Art. 7° Ley 19303):\n**PLAZO:** 30 días hábiles\n**APROBACIÓN:** Prefectura Carabineros respectiva\n**OBLIGADOS:** Entidades Decreto/combustible público\n**EJECUCIÓN:** Poner en ejecución medidas\n**NORMATIVA:** Ley 19303/1994 Art. 7°\n**INFRACCIÓN:** No implementar medidas aprobadas'
},
'rule_553': {
keywords: ["vigilantes privados", "estudio seguridad", "decreto ley 3607", "ley 17798"],
response: '🤖👮‍♂️ **VIGILANTES EN MEDIDAS** (Art. 16° Ley 19303):\n**CONTEMPLEN:** Servicio vigilantes privados\n**CUMPLIMIENTO:** DL 3607/1981 y Ley 17798\n**TENENCIA:** Porte armas según normativa\n**ESTUDIO:** Seguridad debidamente aprobado\n**NORMATIVA:** DS 1772/1995 Art. 9°\n**INFRACCIÓN:** Sin Estudio seguridad DL 3607'
},
'rule_554': {
keywords: ["facilidades carabineros", "información recintos", "medidas implementadas"],
response: '🤖🔍 **FACILIDADES INFORMACIÓN** (Art. 9° Ley 19303):\n**OBLIGACIÓN:** Otorgar facilidades Carabineros\n**INFORMACIÓN:** Recintos/locales medidas seguridad\n**OBLIGADOS:** Combustible/entidades Decreto Supremo\n**ACCESO:** Para obtener información\n**NORMATIVA:** Ley 19303/1994 Art. 9°\n**INFRACCIÓN:** No proporcionar información requerida'
},
    // REGLAS OS11 - CONTROL DE ARMAS
'rule_560': { 
    keywords: ["*portal armas*","*consulta armas*","*registro armas*","*armas chile*"], 
    response: '🧙🏼‍♂️🤖👉🏼 *PORTAL DE CONSULTAS DE ARMAS*\nhttps://www.portalarmaschile.gob.cl/' 
},
'rule_561': { 
    keywords: ["*os11*","*os 11*","*control de armas*","*oficina armas*"], 
    response: '🤖👉🏼 *O.S.11 INFORMACIÓN GENERAL*\nhttps://www.zosepcar.cl/OS11.php#faq' 
},
'rule_562': { 
    keywords: ["*tramites os11*","*tramites armas*","*inscribir arma*","*permiso armas*"], 
    response: '🤖👉🏼 *O.S.11 TRÁMITES*\nhttps://www.zosepcar.cl/OS11.php#tramites' 
},
'rule_563': { 
    keywords: ["*os11 regiones*","*oficinas armas*","*donde tramitar armas*","*direcciones os11*"], 
    response: '🤖👉🏼 *OS11 POR REGIONES - FONOS Y DIRECCIONES*\nhttps://www.zosepcar.cl/OS11.php#inforegion' 
},
'rule_564': { 
    keywords: ["*os11 la serena*","*armas la serena*","*1a comisaria*","*af 15*"], 
    response: '🤖📍 *OS11 LA SERENA (A.F. 15)*\n**Dirección:** Balmaceda N° 4828, Pard. 10 La Pampa\n**Fono:** 512651101\n**Horario:** Lunes a Viernes 08:00 a 13:00 hrs\n**Comunas:** La Serena, La Higuera\n**Email:** af_laserena@dgmn.cl\nos11.laserena@carabineros.cl' 
},
'rule_565': { 
    keywords: ["*os11 coquimbo*","*armas coquimbo*","*2a comisaria*","*af 16*","*andacollo*"], 
    response: '🤖📍 *OS11 COQUIMBO (A.F. 16)*\n**Dirección:** Tegualda N° 515\n**Fono:** 512651125\n**Horario:** Lunes a Viernes 08:00 a 13:00 hrs\n**Comunas:** Coquimbo, Andacollo\n**Email:** af_coquimbo@dgmn.cl\nos11.coquimbo@carabineros.cl' 
},
'rule_566': { 
    keywords: ["*os11 vicuña*","*armas vicuña*","*5a comisaria*","*af 17*","*paihuano*"], 
    response: '🤖📍 *OS11 VICUÑA (A.F. 17)*\n**Dirección:** Av. Las Delicias N° 599\n**Fono:** 512651170\n**Horario:** Lunes a Viernes 08:00 a 13:00 y 15:00 a 17:00 hrs\n**Comunas:** Vicuña, Paihuano\n**Email:** af_vicuna@dgmn.cl\nos11.vicuna@carabineros.cl' 
},
'rule_567': { 
    keywords: ["*os11 ovalle*","*armas ovalle*","*3a comisaria*","*af 18*","*rio hurtado*","*punitaqui*","*monte patria*"], 
    response: '🤖📍 *OS11 OVALLE (A.F. 18)*\n**Dirección:** Tangue N° 20\n**Fono:** 532453016\n**Horario:** Lunes a Viernes 08:00 a 13:00 hrs\n**Comunas:** Ovalle, Río Hurtado, Punitaqui, Monte Patria\n**Email:** af_ovalle@dgmn.cl\nos11.ovalle@carabineros.cl' 
},
'rule_568': { 
    keywords: ["*os11 combarbala*","*armas combarbala*","*af 19*","*combarbalá*"], 
    response: '🤖📍 *OS11 COMBARBALÁ (A.F. 19)*\n**Dirección:** Plaza de Armas N° 100\n**Fono:** 532453072\n**Horario:** Lunes a Viernes 08:00 a 13:00 hrs\n**Comuna:** Combarbalá\n**Email:** af_combarbala@dgmn.cl\nos11.combarbala@carabineros.cl' 
},
'rule_569': { 
    keywords: ["*os11 illapel*","*armas illapel*","*4a comisaria*","*af 20*","*salamanca*","*los vilos*","*canela*"], 
    response: '🤖📍 *OS11 ILLAPEL (A.F. 20)*\n**Dirección:** O\'Higgins N° 189\n**Fono:** 532453134\n**Horario:** Lunes a Viernes 08:00 a 13:00 hrs\n**Comunas:** Illapel, Salamanca, Los Vilos, Canela\n**Email:** af_illapel@dgmn.cl\nos11.illapel@carabineros.cl' 
},
'rule_570': { 
    keywords: ["*prefectura coquimbo armas*","*oficinas armas coquimbo*","*donde tramitar arma region coquimbo*"], 
    response: '🤖🏛️ *PREFECTURA COQUIMBO - OFICINAS OS11*\n\n**A.F. 15 - LA SERENA:** 512651101\n**A.F. 16 - COQUIMBO:** 512651125\n**A.F. 17 - VICUÑA:** 512651170\n**A.F. 18 - OVALLE:** 532453016\n**A.F. 19 - COMBARBALÁ:** 532453072\n**A.F. 20 - ILLAPEL:** 532453134\n\n📋 Para más detalles escriba el nombre de la comuna' 
},

// PREGUNTAS FRECUENTES PLATAFORMA SPD Y LEY 21.659
'rule_600': {
    keywords: ["plataforma spd", "link spd", "pagina spd", "sitio spd", "web spd", "donde ingreso spd"],
    response: '🤖💻 **PLATAFORMA SPD**\nLa plataforma oficial de la Subsecretaría de Prevención del Delito para trámites de seguridad privada es:\n👉 https://segprivada.minsegpublica.gob.cl/'
},
'rule_601': {
    keywords: ["ingreso representante legal", "entrar representante", "clave única empresa", "como ingreso empresa"],
    response: '🤖🔑 **INGRESO REPRESENTANTE LEGAL**\nSi usted es el representante legal de una empresa, podrá ingresar al sistema utilizando su **Clave Única**. Una vez dentro de la plataforma, deberá adjuntar una declaración jurada que acredite su calidad de representante legal.'
},
'rule_602': {
    keywords: ["pagar en línea", "pago credenciales", "pagar credencial online", "pago online"],
    response: '🤖💳 **PAGO EN LÍNEA**\nSí. Las credenciales podrán pagarse en línea a través de la plataforma. El sistema permitirá realizar el pago de manera directa y segura.'
},
'rule_603': {
    keywords: ["error plataforma", "plataforma no funciona", "problemas tramite online", "soporte electrónico"],
    response: '🤖⚠️ **ERRORES EN PLATAFORMA**\nEn caso de que la plataforma presente errores o no permite completar un trámite, deberá contactar al soporte electrónico para reportar la situación y recibir asistencia técnica.'
},
'rule_604': {
    keywords: ["validez acreditaciones", "vigencia acreditaciones 2025", "acreditaciones después noviembre 2025"],
    response: '🤖📅 **VIGENCIA ACREDITACIONES**\nLas autorizaciones otorgadas a personas naturales y jurídicas para ejercer actividades de seguridad privada y que se encuentren vigentes al 28 de noviembre de 2025, seguirán siendo válidas hasta la fecha de su vencimiento conforme con la legislación vigente a la época de su otorgamiento.'
},
'rule_605': {
    keywords: ["que es seguridad privada", "definición seguridad privada"],
    response: '🤖🛡️ **SEGURIDAD PRIVADA**\nEs el conjunto de actividades o medidas de carácter preventivas, coadyuvantes y complementarias de la seguridad pública, destinadas a la protección de personas, bienes y procesos productivos, desarrolladas en un área determinada y realizadas por personas naturales o jurídicas de derecho privado, debidamente autorizadas en la forma y condiciones que establece la ley N°21.659.'
},
'rule_606': {
    keywords: ["a quien regula ley 21659", "alcance ley 21659", "quienes regula ley seguridad"],
    response: '🤖📜 **ALCANCE LEY 21.659**\nRegula a las empresas y personas que prestan servicios de seguridad privada, así como a aquellas entidades que se encuentran obligadas a tener medidas de seguridad privada. Además, regula la realización de eventos masivos.'
},
'rule_607': {
    keywords: ["autoridades fiscalizadoras", "quien fiscaliza", "autoridad fiscalizadora"],
    response: '🤖👮 **AUTORIDADES FISCALIZADORAS**\n**Carabineros de Chile** es la autoridad fiscalizadora principal.\n\nEn recintos específicos:\n- **DIRECTEMAR:** Recintos portuarios/marítimos.\n- **DGAC:** Aeropuertos.\n- **Autoridad Militar:** Recintos bajo su control.'
},
'rule_608': {
    keywords: ["función subsecretaría prevención delito", "rol spd", "spd ley 21659"],
    response: '🤖🏛️ **ROL SUBSECRETARÍA (SPD)**\nLe corresponde autorizar, regular, supervigilar, controlar y ejercer las demás atribuciones legales en materia de seguridad privada. Actúa como órgano rector y vela por el cumplimiento del rol preventivo y coadyuvante de la seguridad pública.'
},
'rule_609': {
    keywords: ["tipos de registros", "registros seguridad privada", "que registros existen"],
    response: '🤖📂 **REGISTROS EXISTENTES**\n1. Entidades obligadas a tener medidas de seguridad.\n2. Entidades que voluntariamente adoptan medidas.\n3. Personas que ejercen funciones (guardias, vigilantes, etc.).\n4. Empresas de seguridad privada.\n5. Registro de sanciones.\n6. Registro de eventos masivos.\n*El registro es secreto, salvo excepciones legales.*'
},
'rule_610': {
    keywords: ["sanciones ley 21659", "castigos ley 21659", "multas ley 21659"],
    response: '🤖⚖️ **SANCIONES LEY 21.659**\nLas infracciones se sancionan con:\n- Multas.\n- Suspensión o revocación de autorización.\n- Clausura de la sucursal, agencia u oficina donde se cometió la infracción.'
},
'rule_611': {
    keywords: ["quien sanciona", "competencia sanciones", "juzgado policía local seguridad privada"],
    response: '🤖👨‍⚖️ **COMPETENCIA SANCIONES**\n- **Multas:** Juzgado de Policía Local (Ley 18.287).\n- **Suspensión/Revocación/Clausura:** Subsecretaría de Prevención del Delito.'
},
'rule_612': {
    keywords: ["que es entidad obligada", "definición entidad obligada"],
    response: '🤖🏢 **ENTIDAD OBLIGADA**\nSon entidades públicas o privadas obligadas a mantener medidas de seguridad privada porque su actividad genera un riesgo para la seguridad pública (alto, medio o bajo).'
},
'rule_613': {
    keywords: ["medidas de seguridad privada", "que son medidas seguridad"],
    response: '🤖🔒 **MEDIDAS DE SEGURIDAD**\nEs toda acción que involucre la implementación de recursos humanos, materiales, tecnológicos o procedimientos destinados a otorgar protección a personas y bienes dentro de un recinto o área determinada.'
},
'rule_614': {
    keywords: ["cuales son entidades obligadas", "entidades obligadas por ley"],
    response: '🤖📋 **ENTIDADES OBLIGADAS POR LEY**\n- Empresas de transporte de valores.\n- Instituciones bancarias y financieras.\n- Empresas de apoyo al giro bancario (con dinero).\n- Empresas de venta de combustible.'
},
'rule_615': {
    keywords: ["quien declara entidad obligada", "organismo declara obligada"],
    response: '🤖✍️ **DECLARACIÓN ENTIDAD OBLIGADA**\nLa **Subsecretaría de Prevención del Delito** es la autoridad competente para declarar a una entidad como obligada mediante resolución, previo informe de la autoridad fiscalizadora, considerando el nivel de riesgo.'
},
'rule_616': {
    keywords: ["empresas obligadas decreto 3607", "transición entidades obligadas", "ley 19603 transición"],
    response: '🤖🔄 **TRANSICIÓN ENTIDADES OBLIGADAS**\nSe mantendrán como obligadas por un máximo de **2 años** desde la vigencia de la Ley 21.659. En ese plazo, la SPD deberá determinarlas nuevamente como obligadas según su nivel de riesgo.'
},
'rule_617': {
    keywords: ["que hacer si soy entidad obligada", "declarado entidad obligada"],
    response: '🤖📝 **SI ES DECLARADO OBLIGADO**\nDebe elaborar un **estudio de seguridad** y presentarlo para aprobación ante la Subsecretaría de Prevención del Delito dentro del plazo legal. Puede contratar asesoría de una empresa de seguridad autorizada.'
},
'rule_618': {
    keywords: ["matriz de factores de riesgo", "matriz riesgo seguridad privada"],
    response: '🤖📊 **MATRIZ DE RIESGO**\nInstrumento para valorar y clasificar el riesgo (bajo, medio, alto) de una entidad, considerando peligros internos y externos que puedan afectar la seguridad pública.'
},
'rule_619': {
    keywords: ["quien aplica matriz riesgo", "aplicación matriz riesgo"],
    response: '🤖🔍 **APLICACIÓN MATRIZ**\nLa matriz es aplicada por la **Subsecretaría de Prevención del Delito**, organismo competente para su supervisión técnica e interpretación.'
},
'rule_620': {
    keywords: ["nivel de riesgo medio", "entidad riesgo medio"],
    response: '🤖🟠 **RIESGO MEDIO**\nLas entidades evaluadas con riesgo medio serán declaradas por la SPD como **entidades obligadas** a mantener medidas de seguridad privada.'
},
'rule_621': {
    keywords: ["nivel de riesgo alto", "entidad riesgo alto", "sistema vigilancia privada obligatorio"],
    response: '🤖🔴 **RIESGO ALTO**\nDeben incorporar un **Sistema de Vigilancia Privada**. Esto implica:\n- Estudio de seguridad exigente.\n- Organismo de seguridad interno (Jefe, Encargado, Encargado de Armas).\n- Vigilantes Privados y Guardias.\n*Siempre obligadas: Transporte valores, Bancos, Apoyo giro bancario.*'
},
'rule_622': {
    keywords: ["que es estudio de seguridad", "definición estudio seguridad"],
    response: '🤖📘 **ESTUDIO DE SEGURIDAD**\nInstrumento que identifica vulnerabilidades y establece la política de seguridad a implementar. Debe indicar medidas precisas y concretas. Se presenta ante la SPD para aprobación.'
},
'rule_623': {
    keywords: ["vigencia estudio seguridad", "cuanto dura estudio seguridad"],
    response: '🤖⏳ **VIGENCIA ESTUDIO SEGURIDAD**\n- **Regla general:** 4 años.\n- **Con sistema vigilancia privada:** 2 años.\n- **Transporte de valores:** 1 año.'
},
'rule_624': {
    keywords: ["plazo implementar estudio seguridad", "tiempo implementar estudio"],
    response: '🤖⏱️ **PLAZO IMPLEMENTACIÓN**\nLa entidad tiene un plazo de **30 días** para implementar el estudio de seguridad desde la notificación de la resolución que lo aprueba.'
},
'rule_625': {
    keywords: ["entidades comparten infraestructura", "entidades mismo espacio"],
    response: '🤖🤝 **ENTIDADES COMPARTIDAS**\nSi dos o más entidades obligadas comparten espacios, sus estudios de seguridad deben estar **coordinados**. Deben elaborar un protocolo conjunto con estrategias comunes.'
},
'rule_626': {
    keywords: ["contenido sistema vigilancia privada", "que tiene sistema vigilancia"],
    response: '🤖👁️ **SISTEMA VIGILANCIA PRIVADA**\nIntegrado por:\n- Organismo de seguridad interno.\n- Recursos tecnológicos y materiales.\n- Estudio de seguridad autorizado por la SPD.'
},
'rule_627': {
    keywords: ["personal sistema vigilancia privada", "composicion sistema vigilancia"],
    response: '🤖👥 **PERSONAL VIGILANCIA PRIVADA**\nEl organismo interno se compone de:\n- Jefe de Seguridad.\n- Encargado de Seguridad.\n- Encargados de Armas.\n- Vigilantes Privados.\n- Guardias de Seguridad de apoyo.'
},
'rule_628': {
    keywords: ["quien dirige sistema vigilancia", "director sistema vigilancia"],
    response: '🤖👨‍✈️ **DIRECCIÓN SISTEMA**\nSerá dirigido por el **Jefe de Seguridad**, quien debe estar autorizado por la Subsecretaría de Prevención del Delito.'
},
'rule_629': {
    keywords: ["subcontratar sistema vigilancia", "vigilancia privada subcontratada"],
    response: '🤖📝 **SUBCONTRATACIÓN**\nSí, puede ser propio o subcontratado. En ambos casos aplican las obligaciones de la Ley 21.659. Los vigilantes son trabajadores dependientes (Código del Trabajo). El armamento siempre es propiedad de la entidad obligada (comodato).'
},
'rule_630': {
    keywords: ["que es empresa seguridad privada", "definición empresa seguridad"],
    response: '🤖🏢 **EMPRESA SEGURIDAD PRIVADA**\nTienen por objeto suministrar bienes o servicios de protección. Deben disponer de medios materiales, técnicos y humanos, y estar autorizadas por la SPD.'
},
'rule_631': {
    keywords: ["requisitos empresa seguridad privada", "autorizar empresa seguridad"],
    response: '🤖✅ **REQUISITOS EMPRESA SEGURIDAD**\n- Persona jurídica de derecho privado.\n- Objeto social específico.\n- Medios humanos/técnicos/financieros.\n- Seguros para el personal.\n- Socios/representantes sin condenas (crimen/simple delito) ni acusaciones por leyes específicas (armas, drogas, terrorismo, etc.).\n- No haber dejado FF.AA./Orden por medida disciplinaria (últimos 5 años).'
},
'rule_632': {
    keywords: ["vigencia autorización empresa seguridad", "duración autorización empresa"],
    response: '🤖📅 **VIGENCIA AUTORIZACIÓN EMPRESA**\nLa autorización para actuar como empresa de seguridad privada tiene una vigencia de **4 años**.'
},
'rule_633': {
    keywords: ["empresa seguridad electrónica", "que es empresa seguridad electrónica"],
    response: '🤖📹 **EMPRESA SEGURIDAD ELECTRÓNICA**\nObjeto: Instalación/mantenimiento de sistemas de seguridad, alarmas, videovigilancia y operación de centrales. Deben estar autorizadas por la SPD.'
},
'rule_634': {
    keywords: ["correo otec", "email otec", "contacto otec", "carga sobredimensionada", "correo carga", "persona natural spd", "persona juridica spd", "spd cargadimensionada"],
    response: '🤖📋 **CONTACTO OTEC Y CARGA (SPD)**\nSi la plataforma no funciona, contacta por correo a:\n👉 **spd-cargadimensionada@minsegpublica.gob.cl**\n\n**Temas:**\n- Organismos Técnicos de Capacitación (OTEC)\n- Consultas sobre carga sobredimensionada\n- Trámites para personas naturales y jurídicas'
},
'rule_635': {
    keywords: ["correo capacitacion", "email capacitacion", "contacto capacitacion", "planes capacitacion", "programas formacion", "cursos spd", "spd capacitacion"],
    response: '🤖🎓 **CONTACTO CAPACITACIÓN (SPD)**\nSi la plataforma no funciona, contacta por correo a:\n👉 **spd-capacitacionessp@minsegpublica.gob.cl**\n\n**Temas:**\n- Consultas sobre planes de capacitación\n- Programas de formación en seguridad privada\n- Información sobre cursos disponibles'
},
'rule_636': {
    keywords: ["correos spd", "emails spd", "contactos spd", "a quien escribir spd", "soporte spd", "ayuda correo"],
    response: '🤖📬 **CONTACTO POR CORREO ELECTRÓNICO SPD**\nSi la plataforma no funciona:\n\n1️⃣ **OTEC y Carga:** spd-cargadimensionada@minsegpublica.gob.cl\n2️⃣ **Capacitación:** spd-capacitacionessp@minsegpublica.gob.cl'
},
'rule_637': {
    keywords: ["plataforma ley 21659", "cuando funciona plataforma", "modulos plataforma", "implementacion plataforma", "plazos plataforma"],
    response: '🤖💻 **IMPLEMENTACIÓN PLATAFORMA LEY 21.659**\nLa plataforma debe estar operativa máx. 1 año desde vigencia de la ley. \n\n**Al 28 de Noviembre 2025 estarán listos los módulos:**\n1. **Entidades Obligadas:** Estudios y planes.\n2. **Personas Naturales:** Guardias, Vigilantes, Capacitadores (Solicitudes ante SPD).\n3. **Instituciones Capacitación:** Solicitud autorización.\n4. **Eventos Masivos:** Solicitudes organizadores.'
},
'rule_638': {
    keywords: ["tramite presencial", "donde presentar solicitud", "modulos no activos", "tramite carabineros", "donde ir si no hay plataforma"],
    response: '🤖👮 **TRÁMITE TRANSITORIO (Módulos no activos)**\nMientras no funcionen los módulos en la plataforma, las solicitudes deben presentarse ante la **Prefectura de Carabineros** respectiva.\n\n*Excepción:* En puertos, aeropuertos o recintos militares, ante la autoridad institucional correspondiente (DIRECTEMAR, DGAC, etc.).'
},
'rule_639': {
    keywords: ["tramite transitorio spd", "correo carga sobredimensionada", "correo planes capacitacion", "tramitacion transitoria", "excepcion carabineros"],
    response: '🤖📧 **TRAMITACIÓN TRANSITORIA SPD (Vía Email)**\nSe exceptúan del trámite en Carabineros y se envían por email (PDF) a la SPD:\n\n1. **Carga Sobredimensionada:**\n📧 spd-cargadimensionada@minsegpublica.gob.cl\n\n2. **Planes y Programas Capacitación (OTEC):**\n📧 spd-capacitacionessp@minsegpublica.gob.cl\n\n*Vigente hasta implementación de módulos electrónicos.*'
}
    ,
    'rule_nueva_1': { keywords: ["cuando entra en vigencia", "vigencia ley 21659"], response: '🤖📅 **VIGENCIA LEY 21.659:** Entró en vigencia el 28-NOV-2025. Decretos: 208 y 209. Autoridad: SPD.' },
    'rule_nueva_2': { keywords: ["subsecretaria prevencion delito", "spd", "que es spd"], response: '🤖🏛️ **SPD:** Subsecretaría de Prevención del Delito, nuevo órgano rector de seguridad privada. Autoriza empresas, certifica personal, fiscaliza.' },
    'rule_nueva_3': { keywords: ["diferencia guardia vigilante", "guardia vs vigilante"], response: '🤖⚖️ **GUARDIA vs VIGILANTE:** Vigilante puede portar armas, curso 100 hrs c/2 años. Guardia NO porta armas, curso 90 hrs c/4 años.' },
    'rule_nueva_4': { keywords: ["cuanto dura curso", "horas curso"], response: '🤖⏰ **DURACIÓN CURSOS:** Vigilante: 100h + 40h c/2 años. Guardia: 90h + perfeccionamiento c/4 años. Supervisor: 120h.' },
    'rule_nueva_5': { keywords: ["requisitos generales", "requisitos para trabajar"], response: '🤖📋 **REQUISITOS (Art. 46):** Mayor 18 años, enseñanza media, salud compatible, certificado antecedentes, curso aprobado.' },
    'rule_nueva_6': { keywords: ["vigencia credencial", "cada cuanto renovar"], response: '🤖⏳ **VIGENCIA:** Vigilantes: 2 años. Guardias/Porteros: 4 años. No requiere nuevo curso si cambia empleador.' },
    'rule_nueva_7': { keywords: ["materias curso", "contenido capacitacion"], response: '🤖📚 **MATERIAS OBLIGATORIAS:** Derechos Humanos, privacidad, primeros auxilios, legislación, probidad, no discriminación, género.' },
    'rule_nueva_8': { keywords: ["reincidencia", "segunda infraccion"], response: '🤖⚠️ **REINCIDENCIA (Art. 105):** Dentro de 24 meses. Leve+Reincidencia=Grave. Grave+Reincidencia=Gravísima.' },
    'rule_nueva_9': { keywords: ["autodenunciarse", "reduccion multa"], response: '🤖💰 **AUTODENUNCIA (Art. 107):** 1er denunciante: 90% reducción. 2do: 60%. 3ro+: 30% máx.' },
    'rule_nueva_10': { keywords: ["juzgado policia local", "donde se tramita"], response: '🤖⚖️ **COMPETENCIA:** Juzgado Policía Local del domicilio del infractor. Procedimiento Ley 18.287.' },
    'rule_nueva_11': { keywords: ["plataforma spd", "sistema digital"], response: '🤖💻 **PLATAFORMA SPD:** Máx. 1 año implementación. Mientras tanto: Prefectura Carabineros. Emails: spd-cargadimensionada@ y spd-capacitacionessp@minsegpublica.gob.cl' },
    'rule_nueva_12': { keywords: ["estudios de seguridad", "plan de seguridad"], response: '🤖📄 **ESTUDIOS:** Elabora Asesor autorizado. Aprueba SPD. Obligatorio para bancos, transporte valores, empresas estratégicas.' },
    'rule_nueva_13': { keywords: ["uniforme vigilante", "ropa reglamentaria"], response: '🤖👔 **UNIFORMES:** Vigilante: tipo SLACK. Guardia: reglamentario empresa. PROHIBIDO simular FF.AA. o Carabineros (gravísima).' },
    'rule_nueva_14': { keywords: ["elementos defensivos", "spray pimienta"], response: '🤖🛡️ **ELEMENTOS:** Guardias: bastón, aerosol, esposas. Vigilantes además: armas fuego autorizadas. Guardias NO armas fuego.' },
    'rule_nueva_15': { keywords: ["eventos masivos", "seguridad eventos"], response: '🤖🎭 **EVENTOS MASIVOS:** Plan seguridad obligatorio. Presentación SPD. Coordinación autoridades. Infracción gravísima: 501-1.000 UTM.' },
    'rule_nueva_16': { keywords: ["instituciones capacitacion", "otec"], response: '🤖🎓 **CAPACITACIÓN:** OTEC, educación superior autorizados por SPD. Email: spd-capacitacionessp@minsegpublica.gob.cl' },
    'rule_nueva_17': { keywords: ["empresas seguridad", "crear empresa"], response: '🤖🏢 **EMPRESAS:** Tipos: Servicios, Transporte Valores, Sistemas, Asesoría. Infracciones: Gravísimas 50-650 UTM.' },
    'rule_nueva_18': { keywords: ["transporte valores", "blindados"], response: '🤖🚛 **TRANSPORTE VALORES:** Solo vigilantes autorizados armados. Mínimo 3 por vehículo. Blindaje certificado, GPS.' },
    'rule_nueva_19': { keywords: ["carga sobredimensionada", "escolta carga"], response: '🤖🚚 **CARGA SOBREDIMENSIONADA:** Ministerio Transportes autoriza servicios seguridad. Email: spd-cargadimensionada@minsegpublica.gob.cl' },
    'rule_nueva_20': { keywords: ["agravante penal", "delito contra guardia"], response: '🤖⚖️ **AGRAVANTE PENAL (Art. 118):** Nuevo Art. 12 N°24 Código Penal. Delito contra personal seguridad en servicio aumenta pena.' }
    ,
    
    // ==================== NUEVAS REGLAS AGREGADAS ====================
    
    'rule_directiva_duracion': { 
        keywords: ["duracion directiva", "cuanto dura una directiva de funcionamiento", "cuanto dura una directiva","vigencia directiva", "cuanto dura directiva", "directiva 3 años"], 
        response: '🤖📋 **DURACIÓN DIRECTIVA DE FUNCIONAMIENTO (Art. 92 Decreto 209):**\n\n**VIGENCIA:** 3 AÑOS desde notificación de resolución aprobatoria.\n\n**RENOVACIÓN:** Transcurrido el plazo, debe presentar nueva directiva actualizada.\n\n**EXCEPCIÓN:** Servicios temporales (eventos masivos, construcción condominios): vigencia por duración de la actividad.\n\n**PRESENTACIÓN:** 15 días hábiles antes del inicio del servicio ante SPD.' 
    },
    
    'rule_duraciones_componentes': {
        keywords: ["duracion componentes", "vigencia certificacion", "cuanto tiempo dura", "cada cuanto renovar componentes"],
        response: '🤖⏳ **DURACIÓN CERTIFICACIONES - COMPONENTES DEL SISTEMA:**\n\n**VIGILANTE PRIVADO:**\n✅ Certificación: 2 AÑOS (Art. 60 Ley 21.659)\n✅ Perfeccionamiento: cada 2 años (40 hrs)\n\n**GUARDIA DE SEGURIDAD:**\n✅ Certificación: 4 AÑOS\n✅ Perfeccionamiento: cada 4 años\n\n**PORTERO/NOCHERO/RONDÍN:**\n✅ Certificación: 4 AÑOS\n✅ Perfeccionamiento: cada 4 años\n\n**SUPERVISOR:**\n✅ Curso: 120 hrs (válido 4 años)\n\n**ENCARGADO:**\n✅ Curso: 120 hrs\n\n**JEFE DE SEGURIDAD:**\n✅ Diplomado: 400 hrs\n\n**ASESOR:**\n✅ Diplomado: 400 hrs\n\n**DIRECTIVA FUNCIONAMIENTO:**\n✅ Vigencia: 3 AÑOS\n\n**NO requiere nuevo curso si cambia empleador dentro del plazo.**'
    },
    
    'rule_vigilante_duracion': {
        keywords: ["cuanto dura un vigilante", "vigencia vigilante", "renovacion vigilante"],
        response: '🤖👮 **VIGILANTE PRIVADO - DURACIÓN:**\n\n✅ Certificación: 2 AÑOS\n✅ Perfeccionamiento: cada 2 años (40 horas)\n✅ NO requiere curso nuevo al cambiar empleador'
    },
    
    'rule_guardia_duracion': {
        keywords: ["cuanto dura un guardia", "vigencia guardia", "renovacion guardia"],
        response: '🤖🛡️ **GUARDIA DE SEGURIDAD - DURACIÓN:**\n\n✅ Certificación: 4 AÑOS\n✅ Perfeccionamiento: cada 4 años\n✅ NO requiere curso nuevo al cambiar empleador'
    },
    
    'rule_supervisor_duracion': {
        keywords: ["cuanto dura un supervisor", "vigencia supervisor"],
        response: '🤖👀 **SUPERVISOR - DURACIÓN:**\n\n✅ Curso: 120 horas (mínimo)\n✅ Si tiene curso guardia: +30 hrs supervisión\n✅ Si tiene curso vigilante: +20 hrs supervisión\n✅ Cursos válidos 4 años antes de postulación'
    },
    
    'rule_jefe_duracion': {
        keywords: ["cuanto dura jefe", "vigencia jefe seguridad"],
        response: '🤖👨‍✈️ **JEFE DE SEGURIDAD - DURACIÓN:**\n\n✅ Diplomado: 400 horas académicas\n✅ Si requiere vigilante privado: certificación 2 años'
    },
    
    'rule_asesor_duracion': {
        keywords: ["cuanto dura asesor", "vigencia asesor"],
        response: '🤖💼 **ASESOR DE SEGURIDAD - DURACIÓN:**\n\n✅ Diplomado: 400 horas académicas\n✅ Título profesional área seguridad\n✅ Autorización SPD'
    },
    
    'rule_encargado_duracion': {
        keywords: ["cuanto dura encargado", "vigencia encargado"],
        response: '🤖🔧 **ENCARGADO DE SEGURIDAD - DURACIÓN:**\n\n✅ Curso: 120 horas académicas mínimo\n✅ Área seguridad o materias afines'
    },
    
    'rule_portero_duracion': {
        keywords: ["cuanto dura portero", "vigencia portero", "nochero duracion"],
        response: '🤖🚪 **PORTERO/NOCHERO/RONDÍN - DURACIÓN:**\n\n✅ Certificación: 4 AÑOS\n✅ Perfeccionamiento: cada 4 años\n✅ NO requiere curso nuevo al cambiar empleador'
    },

    // ==================== DECRETOS 208 Y 209 - SPD ====================

    'rule_decreto_209': {
        keywords: ["decreto 209", "reglamento seguridad privada", "que es el decreto 209"],
        response: '🤖📘 **DECRETO 209 - REGLAMENTO DE SEGURIDAD PRIVADA:**\n\nReglamento principal de la Ley 21.659, vigente desde el 28-NOV-2025.\n\n**REGULA:** Requisitos de todos los componentes del sistema, directivas de funcionamiento, uniformes, cursos, infracciones y empresas de seguridad privada.\n\n**TRAMITACIÓN:** Ante la SPD\n👉 https://segprivada.minsegpublica.gob.cl/'
    },

    'rule_decreto_208': {
        keywords: ["decreto 208", "reglamento 208", "que es el decreto 208"],
        response: '🤖🏟️ **DECRETO 208 - REGLAMENTO EVENTOS MASIVOS:**\n\nReglamento de la Ley 21.659 para eventos con más de 3.000 personas, vigente desde el 28-NOV-2025.\n\n**EXIGE:** Directiva de Funcionamiento específica, organizador responsable, encargado de seguridad, guardias capacitados, CCTV, coordinación con Carabineros y seguro de responsabilidad civil.\n\n**TRAMITACIÓN:** Ante la SPD\n👉 https://segprivada.minsegpublica.gob.cl/'
    },

    // ==================== COMPONENTES CON LOGO SPD → TRAMITAR EN SPD ====================

    'rule_spd_tramitar': {
        keywords: ["tramitar vigilante", "tramitar guardia", "tramitar supervisor", "tramitar capacitador", "tramitar portero", "tramitar nochero", "tramitar conserje", "tramitar empresa seguridad", "tramitar empresa capacitacion", "tramitar empresa electronica", "tramitar empresa asesoria", "tramitar empresa recursos humanos", "tramitar empresa externalizacion", "tramitar empresa custodia", "donde tramito", "donde tramitar credencial", "logo spd", "componente spd", "tramite spd"],
        response: '🤖🏛️ **¡ATENCIÓN! TRÁMITE EN LA SPD** 🔵\n\nEste componente tiene el logo **SPD** en la página. El trámite se realiza en la **Subsecretaría de Prevención del Delito**, NO en la oficina OS10.\n\n👉 **https://segprivada.minsegpublica.gob.cl/**\n\n**COMPONENTES QUE SE TRAMITAN EN SPD:**\n👮 Vigilante Privado\n🛡️ Guardia de Seguridad\n👀 Supervisor de Seguridad\n👀 Supervisor de Vigilantes Privados\n👨‍🏫 Capacitador\n🚪 Portero / Nochero / Rondín / Conserje\n🏢 Empresas de Seguridad Privada (todos los tipos)\n📄 Doc. Editables SPD (formatos y plantillas)\n\n**SE TRAMITAN EN OS10 (Carabineros):**\n- Jefe de Seguridad\n- Encargado de Seguridad\n- Asesor de Seguridad\n- Técnico en Seguridad / Instalador / Operador de Cámaras\n- Encargado de Armas\n- Empresa Transporte de Valores\n\n📞 OS10 Coquimbo: 512651024 / 512651023\n📧 spd-cargadimensionada@minsegpublica.gob.cl'
    },

    'rule_spd_doc_editables': {
        keywords: ["documentos editables spd", "formatos spd", "descargar formatos spd", "formato estudio seguridad spd", "formato plan seguridad spd", "formato declarar dueños", "formato declarar socios", "plantilla inicio curso", "plantilla termino curso", "plantilla servicio custodia", "declaracion jurada spd", "descargables spd"],
        response: '🤖📄 **DOC. EDITABLES SPD** 🔵\n\nLos documentos con logo SPD se descargan desde:\n\n👉 **https://segprivada.minsegpublica.gob.cl/descargables**\n\n**DISPONIBLES:**\n📋 Entidades con Medidas de Seguridad:\n- Formato declarar dueños y socios\n- Formato Estudio de Seguridad\n- Formato Planes de Seguridad (sucursal)\n\n📋 Entidades con Sistema de Vigilancia Privada:\n- Formato declarar dueños y socios\n- Formato Estudio de Seguridad\n- Formato Planes de Seguridad (sucursal)\n\n📋 Mod. Declaración Jurada SPD\n\n🎓 Planes y Programas de Capacitación:\n👉 **https://segprivada.minsegpublica.gob.cl/descargables-autorizaciones**\n- Plantilla informar inicio de curso\n- Plantilla informar término de curso\n- Plantilla informar servicio de custodia'
    }

};

const systemPrompt = `Eres un asistente virtual y funcionario de la oficina de Seguridad Privada O.S.10 de Carabineros en Coquimbo, Chile. Tu principal objetivo es ayudar a los usuarios con sus trámites y consultas, responde como si fueras un experto en Seguridad Privada bajo la LEY 21.659 Y DECRETO 209, profesional.
Tus reglas principales son:
1.  **Asume tu Rol:** Responde siempre como si fueras un miembro del equipo de la oficina O.S.10 Coquimbo. Usa un tono servicial y profesional, se preciso y concreto para responder, responde corto y preciso, no te explayes deja tu respuesta corta y buena.
2.  **Prioridad a los documentos:** Tu máxima prioridad es buscar y entregar primero cualquier documento, guía o PDF que tengas en tu base de datos cuando se te pregunte por un trámite (ej. "cómo tramitar credencial"). Una vez entregado el documento, puedes responder preguntas adicionales.
3.  **Respuestas cortas y reales:** Sé conciso y factual. No inventes respuestas. Si no sabes algo, indícalo amablemente.
4.  **Formato claro:** Usa Markdown para dar formato. Para listas, asegúrate de que cada ítem esté en una nueva línea (ej. "1. Guardia\\n2. Vigilante").
5.- **OS10 COQUIMBO, OFICINA DE SEGURIDAD PRIVADA OS10 COQUIMBO, OFICINA, O.S.10:** Es una oficina que se encuentra en el centro de La Serena, su direccion es Calle Cienfuegos N°180, La Serena, sus fonos son los siguientes: 512651024 o el 512651023.
6.  **infracciones del os10 - LEY 21.659:** Las infracciones para guardia de seguridad y vigilante privado están clasificadas en GRAVÍSIMAS, GRAVES y LEVES según Art. 94, 96 y 98 de la Ley 21.659 y Decreto 209. Cada una tiene multas específicas en UTM.
7.- **Nueva Ley de seguridad privada:** La Ley 21.659 entra en vigencia el 28-NOV-2025. El Decreto 209 y 208 son sus reglamentos. Toda información debe referirse a esta nueva ley, no a leyes anteriores.
8.- **infracciones de seguridad privada:** Siempre que te pregunten por infracciones entrega información detallada según Art. 94 (Gravísimas), Art. 96 (Graves) y Art. 98 (Leves) de la Ley 21.659.
9.- **Requisitos de personal:** Entrega requisitos según Art. 46 (generales) y Decreto 209 (específicos) para cada componente del sistema.
10.- **Logo SPD = tramitar en SPD:** Los componentes con logo SPD (Vigilante, Guardia, Supervisor, Capacitador, Portero/Nochero/Conserje, todas las Empresas de Seguridad excepto Transporte de Valores, Doc. Editables SPD) se tramitan en https://segprivada.minsegpublica.gob.cl/ — NO en OS10. Los sin badge SPD (Jefe, Encargado, Asesor, Técnico, Instalador, Operador de Cámaras, Encargado de Armas, Empresa Transporte de Valores) se tramitan en OS10.
11.- **TRANSITORIEDAD (Art. 20 Ley 21.659):** Durante el período de transitoriedad, la oficina O.S.10 Coquimbo SIGUE tramitando credenciales, directivas de funcionamiento y planes de seguridad. Esta responsabilidad se está traspasando de forma gradual a la SPD (Subsecretaría de Prevención del Delito), pero mientras ese proceso no esté completo, O.S.10 continúa siendo la entidad competente. Si alguien pregunta quién tramita credenciales, directivas o planes, responde que actualmente lo sigue haciendo O.S.10 en virtud del artículo 20 de la Ley 21.659 (transitoriedad), y que poco a poco esto pasará a la SPD.
12.- **VALORES DE CREDENCIALES (1° semestre 2026, vigente hasta 30.06.2026):** Todas las credenciales de personal cuestan **5.960 pesos** (guardia, vigilante, jefe de seguridad, supervisor, asesor, encargado de armas, operador de cámaras, técnico/instalador). Credencial empresa: **5.960 pesos**. Plan de seguridad: **39.732 pesos**. Los cursos (formación y perfeccionamiento) NO se tramitan en OS10, van directo a la SPD por la empresa de capacitación. IMPORTANTE: nunca uses el signo $ al indicar valores, siempre escribe el número seguido de la palabra "pesos".
13.- **CONTINUIDAD DE CONVERSACIÓN:** Si el usuario hace una pregunta corta de seguimiento como "¿y para el jefe de seguridad?", "¿y el supervisor?", "¿y para X?", mantén el MISMO TEMA de la pregunta anterior. Si antes preguntaron por un valor o costo, responde con el valor/costo para ese rol. NO cambies el tema a requisitos o tramitación a menos que el usuario lo pida explícitamente.
Genera respuestas usando Markdown para formato, como **negrita** para énfasis y listas con * o números.`;

// Hacer variables globalmente accesibles
window.responses = responses;
window.systemPrompt = systemPrompt;

// ========== FUNCIÓN DE VALIDACIÓN MEJORADA ==========
/**
 * Procesa un mensaje y valida si debe responder con una regla
 * @param {string} userMessage - El mensaje del usuario
 * @param {object} rules - El objeto de reglas
 * @returns {string|null} - La respuesta o null si no hay coincidencia
 */
function procesarMensajeConValidacion(userMessage, rules) {
    const messageLower = userMessage
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    
    for (let ruleKey in rules) {
        const rule = rules[ruleKey];
        
        // Verificar si coincide con alguna palabra clave
        const tieneKeyword = rule.keywords.some(keyword => 
            messageLower.includes(
                keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            )
        );
        
        if (!tieneKeyword) continue;
        
        // Si la regla requiere palabras específicas, validar que estén presentes
        if (rule.requiresKeywords && rule.requiresKeywords.length > 0) {
            const tieneRequiredKeyword = rule.requiresKeywords.some(reqKeyword =>
                messageLower.includes(
                    reqKeyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                )
            );
            
            // Si no tiene las palabras requeridas, NO responder
            if (!tieneRequiredKeyword) {
                return null;
            }
        }
        
        // Si llegamos aquí, la regla es válida
        return rule.response;
    }
    
    return null;
}

// Hacer variables globalmente accesibles
window.responses = responses;
window.procesarMensajeConValidacion = procesarMensajeConValidacion;

// Verificación
console.log(`✅ ${Object.keys(responses).length} reglas cargadas correctamente con validación mejorada`);
