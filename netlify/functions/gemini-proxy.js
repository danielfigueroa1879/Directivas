// netlify/functions/gemini-proxy.js

const fetch = require("node-fetch");

const MAX_BODY_SIZE = 500 * 1024; // 500 KB máximo (acomoda mensajes largos)
const MAX_MESSAGE_LENGTH = 50000; // 50k caracteres por solicitud

// Rate limiting
const rateLimitMap = new Map();

function checkRateLimit(clientIp, maxPerMinute = 100) {
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
  console.log("--- DETECTOR: La función gemini-proxy se ha iniciado. ---");

  const origin = event.headers.origin || event.headers.referer;
  const clientIp = event.headers['client-ip'] || 'unknown';
  const corsHeaders = getCorsHeaders(origin);

  // ✅ CORS Preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== "POST") {
    console.error("ERROR: Se recibió un método no permitido:", event.httpMethod);
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Método no permitido. Solo se aceptan peticiones POST." }),
    };
  }

  // ✅ Rate limiting
  if (!checkRateLimit(clientIp)) {
    console.warn(`[SEGURIDAD] Rate limit excedido para ${clientIp}`);
    return {
      statusCode: 429,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Demasiadas solicitudes. Intente más tarde." }),
    };
  }

  // ✅ Validar tamaño del body
  if (!event.body || event.body.length > MAX_BODY_SIZE) {
    console.error("ERROR: El tamaño de la solicitud excede el límite");
    return {
      statusCode: 413,
      headers: corsHeaders,
      body: JSON.stringify({ error: "El tamaño de la solicitud es demasiado grande" }),
    };
  }

  // ✅ Validar JSON válido
  let requestBody;
  try {
    requestBody = JSON.parse(event.body);
  } catch (error) {
    console.error("ERROR: JSON inválido", error);
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: "JSON inválido en el cuerpo de la solicitud" }),
    };
  }

  // ✅ Validar estructura esperada
  if (!requestBody.contents || !Array.isArray(requestBody.contents)) {
    console.error("ERROR: Estructura de solicitud inválida");
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Estructura de solicitud inválida" }),
    };
  }

  // ✅ Validar tamaño de contenido
  const totalLength = JSON.stringify(requestBody).length;
  if (totalLength > MAX_MESSAGE_LENGTH) {
    console.error("ERROR: El contenido es demasiado largo");
    return {
      statusCode: 413,
      headers: corsHeaders,
      body: JSON.stringify({ error: "El contenido es demasiado largo" }),
    };
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    console.error("ERROR CRÍTICO: La variable de entorno GEMINI_API_KEY no está configurada en Netlify.");
    // Devuelve un error 500 específico para que el cliente sepa que es un problema del servidor
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "La API key no está configurada en el servidor. Verifique la variable GEMINI_API_KEY en Netlify." }),
    };
  }

  // Usamos un modelo que soporta herramientas y es estable para chat
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

  const MAX_RETRIES = 3;
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const requestBody = JSON.parse(event.body);

      const geminiResponse = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const responseData = await geminiResponse.json();
      
      if (!geminiResponse.ok) {
        console.error("Error recibido de la API de Gemini:", responseData);

        // Manejo específico de errores de autenticación (clave inválida/expirada)
        if (geminiResponse.status === 401 || geminiResponse.status === 403) {
             console.error("ERROR CRÍTICO: La Clave API de Gemini es inválida o expiró (Status 401/403).");
             return {
                statusCode: 503, // Devolvemos 503 al cliente
                headers: corsHeaders,
                body: JSON.stringify({ error: "La clave API de Gemini no es válida. Por favor, verifique su configuración." }),
             };
        }

        // Reintentar solo en códigos de error específicos: 429 (Too Many Requests) o 500+ (Internal Server Error)
        if (geminiResponse.status === 429 || geminiResponse.status >= 500) {
          retries++;
          const delay = Math.pow(2, retries) * 1000; // Retroceso exponencial
          console.log(`Reintentando en ${delay / 1000} segundos... (Intento ${retries}/${MAX_RETRIES})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue; // Intentar de nuevo
        } else {
          // Si es un error no recuperable (e.g., 400 Bad Request), salir.
          return {
            statusCode: geminiResponse.status,
            headers: corsHeaders,
            body: JSON.stringify(responseData),
          };
        }
      }

      // Respuesta exitosa
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(responseData),
      };

    } catch (error) {
      console.error("ERROR INESPERADO EN EL BLOQUE TRY/CATCH:", error);
      retries++;
      const delay = Math.pow(2, retries) * 1000; // Retroceso exponencial
      console.log(`Reintentando en ${delay / 1000} segundos... (Intento ${retries}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  // Fallo después de todos los reintentos
  return {
    statusCode: 503, // Usamos 503 Service Unavailable
    headers: corsHeaders,
    body: JSON.stringify({ error: "Ocurrió un error interno en el servidor después de varios reintentos. El servicio de IA está temporalmente no disponible o sobrecargado. Por favor, inténtelo de nuevo más tarde." }),
  };
};
