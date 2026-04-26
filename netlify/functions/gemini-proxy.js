// netlify/functions/gemini-proxy.js

const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  console.log("--- DETECTOR: La función gemini-proxy se ha iniciado. ---");

  if (event.httpMethod !== "POST") {
    console.error("ERROR: Se recibió un método no permitido:", event.httpMethod);
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método no permitido. Solo se aceptan peticiones POST." }),
    };
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    console.error("ERROR CRÍTICO: La variable de entorno GEMINI_API_KEY no está configurada en Netlify.");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "La API key no está configurada en el servidor. Verifique la variable GEMINI_API_KEY en Netlify." }),
    };
  }
  console.log(`GEMINI_API_KEY presente (longitud: ${API_KEY.length}).`);

  // Usamos un modelo que soporta herramientas y es estable para chat
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

  const MAX_RETRIES = 3;
  let retries = 0;
  // Guardamos el último error real para devolverlo si todos los reintentos fallan
  let lastGeminiStatus = null;
  let lastGeminiBody = null;
  let lastThrownError = null;

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
        lastGeminiStatus = geminiResponse.status;
        lastGeminiBody = responseData;
        console.error(`Error de Gemini (status ${geminiResponse.status}):`, JSON.stringify(responseData));

        if (geminiResponse.status === 401 || geminiResponse.status === 403) {
          console.error("ERROR CRÍTICO: La Clave API de Gemini es inválida o expiró (Status 401/403).");
          return {
            statusCode: 503,
            body: JSON.stringify({
              error: "La clave API de Gemini no es válida o expiró. Verifica GEMINI_API_KEY en Netlify.",
              geminiStatus: geminiResponse.status,
              geminiError: responseData,
            }),
          };
        }

        if (geminiResponse.status === 429 || geminiResponse.status >= 500) {
          retries++;
          const delay = Math.pow(2, retries) * 1000;
          console.log(`Reintentando en ${delay / 1000}s (intento ${retries}/${MAX_RETRIES}). Motivo status ${geminiResponse.status}.`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        } else {
          // Error no recuperable (400, 404, etc.) — devolver el error real de Gemini
          return {
            statusCode: geminiResponse.status,
            body: JSON.stringify({
              error: `Gemini respondió con status ${geminiResponse.status}.`,
              geminiStatus: geminiResponse.status,
              geminiError: responseData,
            }),
          };
        }
      }

      return {
        statusCode: 200,
        body: JSON.stringify(responseData),
      };

    } catch (error) {
      lastThrownError = error && error.message ? error.message : String(error);
      console.error("ERROR INESPERADO EN EL BLOQUE TRY/CATCH:", error);
      retries++;
      const delay = Math.pow(2, retries) * 1000;
      console.log(`Reintentando en ${delay / 1000}s (intento ${retries}/${MAX_RETRIES}).`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  // Fallo después de todos los reintentos — devolver el último error real
  return {
    statusCode: 503,
    body: JSON.stringify({
      error: "El servicio de IA (Gemini) no respondió correctamente tras varios reintentos.",
      lastGeminiStatus,
      lastGeminiError: lastGeminiBody,
      lastThrownError,
    }),
  };
};
