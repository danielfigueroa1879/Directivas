// netlify/functions/gemini-proxy.js
// Node 18+ (Netlify runtime) tiene fetch nativo — no requiere node-fetch

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

  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

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

        if (geminiResponse.status === 401 || geminiResponse.status === 403) {
          console.error("ERROR CRÍTICO: La Clave API de Gemini es inválida o expiró (Status 401/403).");
          return {
            statusCode: 503,
            body: JSON.stringify({ error: "La clave API de Gemini no es válida. Por favor, verifique su configuración." }),
          };
        }

        if (geminiResponse.status === 429 || geminiResponse.status >= 500) {
          retries++;
          const delay = Math.pow(2, retries) * 1000;
          console.log(`Reintentando en ${delay / 1000} segundos... (Intento ${retries}/${MAX_RETRIES})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        } else {
          return {
            statusCode: geminiResponse.status,
            body: JSON.stringify(responseData),
          };
        }
      }

      // Respuesta exitosa
      return {
        statusCode: 200,
        body: JSON.stringify(responseData),
      };

    } catch (error) {
      console.error("ERROR INESPERADO EN EL BLOQUE TRY/CATCH:", error);
      retries++;
      const delay = Math.pow(2, retries) * 1000;
      console.log(`Reintentando en ${delay / 1000} segundos... (Intento ${retries}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  // Fallo después de todos los reintentos
  return {
    statusCode: 503,
    body: JSON.stringify({ error: "El servicio de IA está temporalmente no disponible. Por favor, inténtelo de nuevo más tarde." }),
  };
};
