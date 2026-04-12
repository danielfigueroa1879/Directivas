// netlify/functions/elevenlabs-proxy.js
// ✅ SEGURO: La clave API está en variable de entorno, no en el código

const fetch = require("node-fetch");

const MAX_BODY_SIZE = 50 * 1024; // 50 KB
const MAX_TEXT_LENGTH = 5000; // 5000 caracteres de texto máximo

// Whitelist de voces permitidas
const ALLOWED_VOICES = [
  'C1bXqZJA3hjyNeTdcjMW', // Voz Personalizada
  'nPczCjzI2devNBz1zQrb', // Alejandro
  'g5CIjZEefAph4nQFvHAz', // Diego
  'ErXwobaYiN019PkySvjV', // Antoni
  'TxGEqnHWrfWFTfGW9XjX', // Josh
  'pNInz6obpgDQGcFmaJgB'  // Adam
];

// Rate limiting (memoria simple - usar Redis en producción)
const rateLimitMap = new Map();

function checkRateLimit(clientIp, maxPerMinute = 60) {
  const now = Date.now();
  const oneMinuteAgo = now - 60000;

  if (!rateLimitMap.has(clientIp)) {
    rateLimitMap.set(clientIp, []);
  }

  const requests = rateLimitMap.get(clientIp);
  const recentRequests = requests.filter(time => time > oneMinuteAgo);
  recentRequests.push(now);
  rateLimitMap.set(clientIp, recentRequests);

  return recentRequests.length <= maxPerMinute;
}

// Headers CORS seguros
function getCorsHeaders(origin = null) {
  const allowedOrigins = [
    'https://tu-dominio.com',
    'https://www.tu-dominio.com',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://localhost:8000',
  ];

  const isAllowed = allowedOrigins.some(allowed =>
    origin && origin.includes(allowed)
  );

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : 'null',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'X-Content-Type-Options': 'nosniff',
  };
}

exports.handler = async function(event, context) {
  const origin = event.headers.origin || event.headers.referer;
  const clientIp = event.headers['client-ip'] || 'unknown';
  const corsHeaders = getCorsHeaders(origin);

  console.log("--- DETECTOR: La función elevenlabs-proxy se ha iniciado. ---");

  // ✅ CORS Preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  // ✅ Solo POST permitido
  if (event.httpMethod !== 'POST') {
    console.warn(`[SEGURIDAD] Intento de ${event.httpMethod} en elevenlabs-proxy desde ${clientIp}`);
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Solo se aceptan solicitudes POST' }),
    };
  }

  // ✅ Rate limiting
  if (!checkRateLimit(clientIp)) {
    console.warn(`[SEGURIDAD] Rate limit excedido para ${clientIp}`);
    return {
      statusCode: 429,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Demasiadas solicitudes. Intente más tarde.' }),
    };
  }

  // ✅ Validar tamaño del body
  if (!event.body || event.body.length > MAX_BODY_SIZE) {
    console.warn(`[SEGURIDAD] Body demasiado grande: ${event.body?.length || 0} bytes desde ${clientIp}`);
    return {
      statusCode: 413,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Solicitud demasiado grande' }),
    };
  }

  // ✅ Parsear JSON
  let requestData;
  try {
    requestData = JSON.parse(event.body);
  } catch (error) {
    console.warn('[SEGURIDAD] JSON inválido recibido');
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'JSON inválido' }),
    };
  }

  // ✅ Validar campos requeridos
  if (!requestData.voiceId || !requestData.text) {
    console.warn('[SEGURIDAD] Campos requeridos faltantes');
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Campos requeridos: voiceId, text' }),
    };
  }

  // ✅ Validar voiceId contra whitelist
  if (!ALLOWED_VOICES.includes(requestData.voiceId)) {
    console.warn(`[SEGURIDAD] Voice ID inválido: ${requestData.voiceId}`);
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Voice ID inválido' }),
    };
  }

  // ✅ Validar texto
  const text = String(requestData.text).trim();
  if (!text || text.length > MAX_TEXT_LENGTH) {
    console.warn(`[SEGURIDAD] Texto inválido o demasiado largo: ${text.length}`);
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({
        error: `Texto debe tener entre 1 y ${MAX_TEXT_LENGTH} caracteres`
      }),
    };
  }

  // ✅ Obtener API key de variable de entorno (NUNCA hardcodeado)
  const API_KEY = process.env.ELEVENLABS_API_KEY;
  if (!API_KEY) {
    console.error('[CRÍTICO] ELEVENLABS_API_KEY no configurada en Netlify');
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }

  // ✅ Llamar a API de ElevenLabs
  let retries = 0;
  const MAX_RETRIES = 2;

  while (retries < MAX_RETRIES) {
    try {
      console.log(`[INFO] Síntesis de voz solicitada (intento ${retries + 1}/${MAX_RETRIES})`);

      const elevenLabsResponse = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${requestData.voiceId}`,
        {
          method: 'POST',
          headers: {
            'xi-api-key': API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            model_id: 'eleven_monolingual_v1',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        }
      );

      if (!elevenLabsResponse.ok) {
        console.error(
          `[ERROR] ElevenLabs retornó ${elevenLabsResponse.status}`
        );

        // No reintentar errores 4xx (excepto 429)
        if (elevenLabsResponse.status >= 400 && elevenLabsResponse.status < 500 && elevenLabsResponse.status !== 429) {
          return {
            statusCode: elevenLabsResponse.status,
            headers: corsHeaders,
            body: JSON.stringify({
              error: 'Error en la API de síntesis de voz'
            }),
          };
        }

        // Reintentar errores 5xx y 429
        if (elevenLabsResponse.status >= 500 || elevenLabsResponse.status === 429) {
          retries++;
          if (retries < MAX_RETRIES) {
            const delay = Math.pow(2, retries) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
        }
      }

      const audioBuffer = await elevenLabsResponse.arrayBuffer();

      // ✅ Retornar audio en formato seguro
      console.log('[INFO] Audio generado exitosamente');
      return {
        statusCode: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
        body: Buffer.from(audioBuffer).toString('base64'),
        isBase64Encoded: true,
      };

    } catch (error) {
      console.error(`[ERROR] Excepción en síntesis: ${error.message}`);
      retries++;

      if (retries < MAX_RETRIES) {
        const delay = Math.pow(2, retries) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  // ✅ Error final después de reintentos
  console.error('[CRÍTICO] Fallo después de múltiples reintentos');
  return {
    statusCode: 503,
    headers: corsHeaders,
    body: JSON.stringify({
      error: 'El servicio de síntesis está temporalmente no disponible'
    }),
  };
};
