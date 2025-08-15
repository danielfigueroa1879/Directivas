/**
 * chatbot.js - VERSIÓN COMPLETA CON VOZ Y API GEMINI
 * Se comunica con la API de Gemini a través de un proxy seguro en /api/gemini.
 * Incluye síntesis de voz (TTS) y reconocimiento de voz (STT)
 * TODAS LAS FUNCIONALIDADES ORIGINALES + VOZ
 */

// --- DOM Element Selection ---
const chatPopup = document.getElementById('chat-popup');
const chatToggleButton = document.getElementById('chat-toggle-button');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatBackdrop = document.getElementById('chat-backdrop');
const chatWidgetContainer = document.getElementById('chat-widget-container');
const internalCloseBtn = document.getElementById('chat-close-btn-internal');

// --- Voice Configuration ---
let speechSynthesis = window.speechSynthesis;
let speechRecognition = null;
let isListening = false;
let isAutoSpeakEnabled = true;
let currentUtterance = null;
let voices = [];

// Configurar reconocimiento de voz
if ('webkitSpeechRecognition' in window) {
    speechRecognition = new webkitSpeechRecognition();
} else if ('SpeechRecognition' in window) {
    speechRecognition = new SpeechRecognition();
}

if (speechRecognition) {
    speechRecognition.continuous = false;
    speechRecognition.interimResults = true;
    speechRecognition.lang = 'es-ES';
    speechRecognition.maxAlternatives = 1;
}

// --- Voice Functions ---
function initializeVoices() {
    voices = speechSynthesis.getVoices();
    
    if (voices.length === 0) {
        speechSynthesis.addEventListener('voiceschanged', () => {
            voices = speechSynthesis.getVoices();
            console.log('🎤 Voces cargadas:', voices.length);
        });
    }
}

function getSpanishVoice() {
    // Buscar Diego primero
    let selectedVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('diego')
    );
    
    // Si no encuentra Diego, buscar otras voces masculinas
    if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
            (voice.lang.startsWith('es') || voice.lang.includes('ES')) && 
            (voice.name.toLowerCase().includes('jorge') ||
             voice.name.toLowerCase().includes('carlos') ||
             voice.name.toLowerCase().includes('male') ||
             (!voice.name.toLowerCase().includes('female') && 
              !voice.name.toLowerCase().includes('maria') && 
              !voice.name.toLowerCase().includes('carmen')))
        );
    }
    
    // Último recurso: cualquier voz en español
    if (!selectedVoice) {
        selectedVoice = voices.find(voice => voice.lang.startsWith('es'));
    }
    
    return selectedVoice;
}

function speakText(text, isAutoSpeak = false) {
    if (!text.trim()) return;
    
    speechSynthesis.cancel();
    
    const cleanText = text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/<[^>]*>/g, '')
        .replace(/https?:\/\/[^\s]+/g, 'enlace web')
        .replace(/🤖|👮🏻‍♂️|🧙🏻‍♂️|⬇️|👇🏽|📋|☝🏼|✅|❌|⚠️|🚫|🔊|🎤|👋|😊/g, '')
        .replace(/\n+/g, '. ')
        .replace(/\s+/g, ' ')
        .trim();
    
    if (!cleanText) return;
    
    currentUtterance = new SpeechSynthesisUtterance(cleanText);
    
    const voice = getSpanishVoice();
    if (voice) {
        currentUtterance.voice = voice;
        console.log('🎤 Usando voz:', voice.name);
    }
    
    currentUtterance.rate = 1.2; // Más rápido
    currentUtterance.pitch = 0.8; // Tono más grave (masculino)
    currentUtterance.volume = 0.9;
    
    currentUtterance.onstart = () => {
        updateSpeakButton(true);
        if (isAutoSpeak) {
            showSpeechIndicator();
        }
    };
    
    currentUtterance.onend = () => {
        updateSpeakButton(false);
        currentUtterance = null;
        hideSpeechIndicator();
    };
    
    currentUtterance.onerror = (event) => {
        console.error('Error en síntesis de voz:', event.error);
        updateSpeakButton(false);
        currentUtterance = null;
        hideSpeechIndicator();
    };
    
    try {
        speechSynthesis.speak(currentUtterance);
    } catch (error) {
        console.error('Error al iniciar síntesis de voz:', error);
    }
}

function stopSpeaking() {
    speechSynthesis.cancel();
    updateSpeakButton(false);
    currentUtterance = null;
    hideSpeechIndicator();
}

function toggleSpeech() {
    if (speechSynthesis.speaking) {
        stopSpeaking();
    } else {
        const botMessages = document.querySelectorAll('.bot-message');
        if (botMessages.length > 0) {
            const lastBotMessage = botMessages[botMessages.length - 1];
            const text = lastBotMessage.textContent;
            speakText(text);
        }
    }
}

function startListening() {
    if (!speechRecognition) {
        addMessage('bot', '❌ Lo siento, tu navegador no soporta reconocimiento de voz. Intenta con Chrome o Edge.');
        return;
    }
    
    if (isListening) {
        stopListening();
        return;
    }
    
    stopSpeaking();
    
    isListening = true;
    updateVoiceButton(true);
    showListeningIndicator();
    
    try {
        speechRecognition.start();
    } catch (error) {
        console.error('Error al iniciar reconocimiento de voz:', error);
        stopListening();
    }
}

function stopListening() {
    if (!isListening) return;
    
    isListening = false;
    updateVoiceButton(false);
    hideListeningIndicator();
    
    if (speechRecognition) {
        try {
            speechRecognition.stop();
        } catch (error) {
            console.error('Error al detener reconocimiento:', error);
        }
    }
}

function updateVoiceButton(listening) {
    const voiceButton = document.getElementById('voice-btn');
    if (!voiceButton) return;
    
    if (listening) {
        voiceButton.style.backgroundColor = '#ef4444';
        voiceButton.innerHTML = '<div class="w-3 h-3 bg-white rounded-sm"></div>';
        voiceButton.title = 'Detener grabación';
    } else {
        voiceButton.style.backgroundColor = '#3b82f6';
        voiceButton.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" x2="12" y1="19" y2="23"/>
            <line x1="8" x2="16" y1="23" y2="23"/>
        </svg>`;
        voiceButton.title = 'Usar micrófono';
    }
}

function updateSpeakButton(speaking) {
    const speakButton = document.getElementById('speak-btn');
    if (!speakButton) return;
    
    if (speaking) {
        speakButton.style.backgroundColor = '#ef4444';
        speakButton.innerHTML = '<div class="w-3 h-3 bg-white rounded-sm"></div>';
        speakButton.title = 'Detener lectura';
    } else {
        speakButton.style.backgroundColor = '#22c55e';
        speakButton.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        </svg>`;
        speakButton.title = 'Leer último mensaje';
    }
}

function showListeningIndicator() {
    let indicator = document.getElementById('listening-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'listening-indicator';
        indicator.className = 'message-fade-in flex items-start';
        indicator.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-white border-2 border-red-400 flex items-center justify-center flex-shrink-0 p-1">
                <svg class="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    <line x1="12" x2="12" y1="19" y2="23"/>
                    <line x1="8" x2="16" y1="23" y2="23"/>
                </svg>
            </div>
            <div class="bot-bubble rounded-xl rounded-bl-none p-3 ml-2">
                <p class="text-gray-700 dark:text-gray-200 text-sm">
                    🎤 Escuchando... <span class="text-red-500">Habla ahora</span>
                    <br><span id="interim-text" class="text-blue-600 font-medium"></span>
                </p>
            </div>
        `;
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function hideListeningIndicator() {
    const indicator = document.getElementById('listening-indicator');
    if (indicator) {
        indicator.remove();
    }
}

function showSpeechIndicator() {
    let indicator = document.getElementById('speech-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'speech-indicator';
        indicator.className = 'fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2';
        indicator.innerHTML = `
            <svg class="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
            <span class="text-sm font-medium">Reproduciendo...</span>
        `;
        document.body.appendChild(indicator);
    }
}

function hideSpeechIndicator() {
    const indicator = document.getElementById('speech-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// --- TODAS LAS RESPUESTAS PREDEFINIDAS ORIGINALES ---
const predefinedResponses = {
    'rule_4': { keywords: ["guias","guia","componentes del sistema","componentes"], response: '*ESCRIBA EL NOMBRE DEL COMPONENTE DEL SISTEMA Y SE DESCARGARA UNA GUIA, PARA QUE PUEDA REALIZAR SU TRAMITE*👮🏻‍♂️ \n ⬇️\n*1.-* VIGILANTE PRIVADO\n*2.-* GUARDIA DE SEGURIDAD\n*3.-* JEFE DE SEGURIDAD \n*4.-* ENCARGADO DE SEGURIDAD\n*5.-* SUPERVISOR\n*6.-* ASESOR \n*7.-* CAPACITADOR\n*8.-* TÉCNICO \n*9.-* OPERADOR DE CAJEROS \n*10.-* INSTALADOR TÉC. DE SEGURIDAD\n*11.-* OPERADOR CCTV.\n*12.-* EMPRESAS' },
    'rule_5': { keywords: ["guardia de seguridad","guardia","guardia seguridad"], response: '🤖 🧙🏻‍♂️ Ok... en este link encontrará la guía de *GUARDIA DE SEGURIDAD* la puede descargar: https://www.zosepcar.cl/content/OS10/TRAM_guardia_de_seguridad.pdf' },
    'rule_6': { keywords: ["jefe de seguridad"], response: 'OK..en este link encontrará la guía de *JEFE DE SEGURIDAD* la puede descargar: https://www.zosepcar.cl/content/OS10/TRAM_jefe_de_seguridad.pdf' },
    'rule_7': { keywords: ["supervisor","acreditación supervisor","supervisor seguridad","para supervisor","acreditar un supervisor","supervisores","acreditar supervisores"], response: '🤖. *SUPERVISOR* \n1.- *GUIA*\nhttps://www.zosepcar.cl/content/OS10/TRAM_supervisor.pdf\n2.- *CREDENCIAL*\nhttps://os10.short.gy/Sup' },
    'rule_8': { keywords: ["*encargado de seguridad*","*encargado*"], response: '🤖 *ENCARGADO DE SEGURIDAD*\n*CREDENCIAL:*\nhttps://bit.ly/3H6pIOu\n*GUIA:*\nhttps://www.zosepcar.cl/content/OS10/TRAM_encargado_de_seguridad.pdf' },
    'rule_9': { keywords: ["capacitador"], response: '🤖 *CAPACITADOR*\nhttps://www.zosepcar.cl/content/OS10/TRAM_capacitador.pdf' },
    'rule_10': { keywords: ["tecnico"], response: '*TÉCNICO* https://www.zosepcar.cl/content/OS10/TRAM_tecnico.pdf' },
    'rule_11': { keywords: ["asesor"], response: '🤖 *ASESOR*\n**GUÍA:* \nhttps://www.zosepcar.cl/content/OS10/TRAM_asesor.pdf' },
    'rule_65': { keywords: ["*fono*", "*telefono*","*numero*","*ubicados*","*dirección*","*atención*","*horario*","*horarios*","*ubicación*","*direccion oficina*","*cual es la dirección del os10*","*horario atención publico*", "*donde estan*", "*donde esta el os10 coquimbo*", "*donde esta el os10*","*donde*", "*direccion*"], response: '🤖 👉🏼 *OS10 COQUIMBO*\nDe lunes a jueves de 09:00 horas a 13:00 horas.\nCienfuegos 180, La Serena.\nFonos: 512651024-512651022-\nCredenciales:512651023\nhttps://maps.app.goo.gl/QUhujWbTF1FjDA7E6' },
    'rule_66': { keywords: ["menu","menú","menus"], response: '*ESCRIBA LO QUE ESTA CON NEGRILLAS*\nconsultar patente: *ppu*\nConsultar nombre o rut: *rut*\nConsultar guardia *registro*\nmenú OS10: *Os10*\nComisaria cuadrantes: *comisaria*\nCiberseguridad: *ciberseguridad*\nDGAC Seg. Priv. *Dgac*\nModifica 261: *Decreto 32*\nResol.3632: *no hay sistema*\nDirectiva: *directiva*\n*Bots*: Seguridad privada, Ciberseguridad, tránsito, Ley Karyn' },
    'rule_89': { keywords: ["menu os10", "menú O.S.10"], response: '*De acuerdo OS10*🧙🏻‍♂️👮🏻‍♂️☝️*Escriba lo que está con negrillas:* \n \n ⬇️ ESCRIBA El QUE NECESITE:\n➢ *Bots:* recibirá un listado de bots con Inteligencia Avanzada.\n➢ *Componentes:* Obtendrá las guías\n➢ *Manuales:* Se desplega menu\n➢ *Leyes:* Se desplega menu\n➢ *Editable:* Documentos en Word.\n➢ *Directiva:* Requisitos presentar\n➢ *Valores:* Cursos y planes.\n➢ *Independiente:* Requisitos Cred.\n➢ *Menu credencial:* Menú credenciales\n➢ *Nueva Ley:* Nueva ley seguridad privada y reglamento.' },
    'rule_98': { keywords: ["Valores","cuanto cuesta","cual es el valor","valor plan","valores planes","valores plan","*valor*","*cuesta*"], response: '🤖🧙🏻‍♂️ *AQUI ESTAN LOS VALORES 2DO. SEMESTRE 2025*\n1.- CREDENCIAL\nhttps://dal5.short.gy/val\n2.- CRED. EMPRESA\nhttps://dal5.short.gy/C.emp\n3.- CURSO FORMACIÓN\nhttps://dal5.short.gy/Form\n4.- CURSO PERFECC\nhttps://dal5.short.gy/BjzkHI\n5.- VALOR PLAN\nhttps://os10.short.gy/Pl4n' },
    'rule_261': { keywords: ["hola","saludos"], response: '🤖👮🏻‍♂️ ¡Hola! Bienvenido/a a la Oficina de Seguridad Privada OS10 Coquimbo. Estoy aquí para ayudarle con sus consultas. ¿En qué puedo asistirle hoy?' },
    'rule_261a': { keywords: ["buenos días","buen día"], response: '🤖👮🏻‍♂️ ¡Buenos días! Bienvenido/a a la Oficina de Seguridad Privada OS10 Coquimbo. Estoy aquí para ayudarle con sus consultas. ¿En qué puedo asistirle hoy?' },
    'rule_261b': { keywords: ["buenas tardes","buena tarde"], response: '🤖👮🏻‍♂️ ¡Buenas tardes! Bienvenido/a a la Oficina de Seguridad Privada OS10 Coquimbo. Estoy aquí para ayudarle con sus consultas. ¿En qué puedo asistirle hoy?' },
    'rule_261c': { keywords: ["buenas noches","buena noche"], response: '🤖👮🏻‍♂️ ¡Buenas noches! Bienvenido/a a la Oficina de Seguridad Privada OS10 Coquimbo. Estoy aquí para ayudarle con sus consultas. ¿En qué puedo asistirle hoy?' },
    'rule_262': { keywords: ["gracias","muchas gracias","te agradezco","agradezco"], response: '🤖😊 ¡Es un placer ayudarle! Para eso estamos aquí en OS10 Coquimbo. Si tiene alguna otra consulta, no dude en escribirme. ¡Que tenga un excelente día!' },
    'rule_263': { keywords: ["chao","adiós","nos vemos","hasta luego","me voy"], response: '🤖👋 ¡Hasta luego! Gracias por contactar a OS10 Coquimbo. Recuerde que estamos de lunes a jueves de 09:00 a 13:00 horas en Cienfuegos 180, La Serena. ¡Que tenga un buen día!' },
    'rule_350': { keywords: ["*donde puedo hacer el curso*","*empresa capacitadora*","*empresa de capacitacion*","punto 7"], response: '🤖🧙🏼‍♂️✅ 🧙🏻‍♂️ Estas son algunas empresas de aqui de la region:\n*EMPRESAS DE CAPACITACIÓN 2025* https://d6.short.gy/Cap'},
    // Agrega aquí TODAS tus otras reglas...
};

// --- API Configuration ---
const API_URL = '/api/gemini';

// --- State Management ---
let chatHistory = [];

// --- Response Map ---
let responseMap = new Map();
let partialMatchRules = [];

function buildResponseMap() {
    const newResponseMap = new Map();
    const newPartialMatchRules = [];

    for (const key in predefinedResponses) {
        const item = predefinedResponses[key];
        for (const keyword of item.keywords) {
            const normalizedKeyword = keyword.toLowerCase().trim();
            
            if (normalizedKeyword.startsWith('*') && normalizedKeyword.endsWith('*')) {
                const cleanKeyword = normalizedKeyword.substring(1, normalizedKeyword.length - 1);
                if(cleanKeyword) {
                    newPartialMatchRules.push({ keyword: cleanKeyword, response: item.response });
                }
            } else {
                newResponseMap.set(normalizedKeyword, item.response);
            }
        }
    }
    responseMap = newResponseMap;
    partialMatchRules = newPartialMatchRules;
    console.log("Response map built successfully.", {exactMatches: responseMap.size, partialMatches: partialMatchRules.length});
}

// --- UI Functions ---
function toggleChat() {
    const isHidden = chatPopup.classList.contains('hidden');
    if (isHidden) {
        chatPopup.classList.remove('hidden');
        chatBackdrop.classList.remove('hidden');
        chatToggleButton.classList.add('hidden');
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.body.classList.add('chat-open-mobile');
        }
    } else {
        chatPopup.classList.add('hidden');
        chatBackdrop.classList.add('hidden');
        chatToggleButton.classList.remove('hidden');
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.body.classList.remove('chat-open-mobile');
            if (window.mobileChatManager) window.mobileChatManager.exitKeyboardMode();
        }
        stopListening();
        stopSpeaking();
    }
}

function markdownToHtml(text) {
    if (!text) return '';
    let formattedText = text.replace(/(https?:\/\/[^\s"'<>`]+)/g, '<a href="$1" target="_blank" class="text-blue-700 dark:text-blue-500 hover:underline">$1</a>');
    formattedText = formattedText.replace(/\*(\*?)(.*?)\1\*/g, '<b>$2</b>');
    formattedText = formattedText.replace(/^\s*-\s/gm, '🔹 ');
    return formattedText.replace(/\n/g, '<br>');
}

function addMessage(sender, text, buttons = []) {
    const messageElement = document.createElement('div');
    const isUser = sender === 'user';
    
    messageElement.className = `message-fade-in flex items-start max-w-full`;
    messageElement.classList.toggle('ml-auto', isUser);
    messageElement.classList.toggle('flex-row-reverse', isUser);

    const bubble = document.createElement('div');
    bubble.className = isUser 
        ? 'bg-green-500 rounded-xl rounded-br-none p-3 ml-2 max-w-xs md:max-w-sm' 
        : 'bot-bubble rounded-xl rounded-bl-none p-3 ml-2 max-w-[95%] md:max-w-sm bot-message';

    const p = document.createElement('p');
    p.className = isUser ? 'text-white chatbot-message-text' : 'text-gray-700 dark:text-gray-200 chatbot-message-text';
    
    if (isUser) {
        p.textContent = text;
    } else {
        p.innerHTML = markdownToHtml(text);
    }
    
    bubble.appendChild(p);
    
    if (!isUser && buttons.length > 0) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'mt-2 flex flex-col space-y-2';
        buttons.forEach(buttonText => {
            const button = document.createElement('button');
            button.textContent = buttonText;
            button.className = 'bg-green-100 dark:bg-gray-700 border border-green-500/50 text-green-800 dark:text-green-300 text-sm py-1.5 px-3 rounded-lg hover:bg-green-200 dark:hover:bg-gray-600 transition-colors w-full text-left font-medium';
            button.onclick = () => {
                userInput.value = buttonText;
                handleSendMessage();
            };
            buttonContainer.appendChild(button);
        });
        bubble.appendChild(buttonContainer);
    }

    const avatar = document.createElement('div');
    if (isUser) {
        avatar.className = 'w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold text-sm flex-shrink-0 text-gray-600 dark:text-gray-300';
        avatar.textContent = 'U';
    } else {
        avatar.className = 'w-8 h-8 rounded-full bg-white border-2 border-yellow-400 flex items-center justify-center flex-shrink-0 p-1';
        avatar.innerHTML = `<img src="assets/images/poli.png" alt="Bot Icon" class="h-full w-full object-contain">`;
    }

    messageElement.appendChild(avatar);
    messageElement.appendChild(bubble);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Auto-hablar respuestas del bot si está habilitado
    if (!isUser && isAutoSpeakEnabled && text.trim()) {
        setTimeout(() => {
            speakText(text, true);
        }, 500);
    }
}

function showTypingIndicator(show) {
    let indicator = document.getElementById('typing-indicator');
    if (show && !indicator) {
        indicator = document.createElement('div');
        indicator.id = 'typing-indicator';
        indicator.className = 'message-fade-in flex items-start';
        indicator.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-white border-2 border-yellow-400 flex items-center justify-center flex-shrink-0 p-1">
                 <img src="assets/images/poli.png" alt="Bot Icon" class="h-full w-full object-contain">
            </div>
            <div class="bot-bubble rounded-xl rounded-bl-none p-3 ml-2 typing-indicator">
                <span></span><span></span><span></span>
            </div>
        `;
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } else if (!show && indicator) {
        indicator.remove();
    }
}

function getPredefinedResponse(text) {
    const lowerCaseText = text.toLowerCase().trim();
    
    if (responseMap.has(lowerCaseText)) {
        return responseMap.get(lowerCaseText);
    }

    for (const rule of partialMatchRules) {
        if (lowerCaseText.includes(rule.keyword)) {
            return rule.response;
        }
    }

    return null;
}

// --- API Communication CON GEMINI ---
async function handleSendMessage() {
    const userText = userInput.value.trim();
    if (!userText) return;

    addMessage('user', userText);
    userInput.value = '';
    
    const predefinedResponse = getPredefinedResponse(userText);
    if (predefinedResponse) {
        setTimeout(() => {
            addMessage('bot', predefinedResponse);
            chatHistory.push({ role: "user", parts: [{ text: userText }] });
            chatHistory.push({ role: "model", parts: [{ text: predefinedResponse }] });
        }, 500);
        return;
    }
