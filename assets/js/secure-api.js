/**
 * secure-api.js
 * ✅ Clase helper para hacer requests seguros a funciones Netlify
 * - Valida responses
 * - Maneja errores
 * - Implementa rate limiting del lado del cliente
 * - Timeouts automáticos
 */

class SecureAPI {
  constructor(maxRequestsPerMinute = 30) {
    this.maxRequests = maxRequestsPerMinute;
    this.requests = [];
    this.defaultTimeout = 30000; // 30 segundos
  }

  /**
   * Verifica si se ha excedido el rate limit
   * @private
   * @returns {boolean} true si está dentro del límite
   */
  async checkRateLimit() {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;

    // Limpiar requests antiguos
    this.requests = this.requests.filter(time => time > oneMinuteAgo);

    if (this.requests.length >= this.maxRequests) {
      throw new Error(`Demasiadas solicitudes. Máximo ${this.maxRequests} por minuto.`);
    }

    this.requests.push(now);
    return true;
  }

  /**
   * Hace un POST request seguro
   * @param {string} endpoint - URL o ruta del endpoint
   * @param {object} data - Datos a enviar
   * @param {number} timeout - Timeout en ms (default: 30000)
   * @returns {Promise<object>} Response JSON
   * @throws {Error} Si hay problema en la solicitud
   */
  async post(endpoint, data, timeout = this.defaultTimeout) {
    try {
      // Validar inputs
      if (typeof endpoint !== 'string' || !endpoint.trim()) {
        throw new Error('Endpoint inválido');
      }

      if (typeof data !== 'object' || data === null) {
        throw new Error('Datos inválidos');
      }

      // Verificar rate limit
      await this.checkRateLimit();

      // Crear abort controller para timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Validar status HTTP
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.error || `HTTP ${response.status}`;
          throw new Error(errorMessage);
        }

        // Parsear response
        const jsonData = await response.json();
        return jsonData;

      } catch (error) {
        clearTimeout(timeoutId);

        // Manejar diferentes tipos de error
        if (error.name === 'AbortError') {
          throw new Error('La solicitud tardó demasiado tiempo');
        }

        throw error;
      }

    } catch (error) {
      console.error(`[SecureAPI] Error en POST ${endpoint}:`, error.message);
      throw error;
    }
  }

  /**
   * Hace un GET request seguro
   * @param {string} endpoint - URL o ruta del endpoint
   * @param {number} timeout - Timeout en ms (default: 30000)
   * @returns {Promise<object>} Response JSON
   * @throws {Error} Si hay problema en la solicitud
   */
  async get(endpoint, timeout = this.defaultTimeout) {
    try {
      // Validar input
      if (typeof endpoint !== 'string' || !endpoint.trim()) {
        throw new Error('Endpoint inválido');
      }

      // Verificar rate limit
      await this.checkRateLimit();

      // Crear abort controller para timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Validar status HTTP
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.error || `HTTP ${response.status}`;
          throw new Error(errorMessage);
        }

        // Parsear response
        const jsonData = await response.json();
        return jsonData;

      } catch (error) {
        clearTimeout(timeoutId);

        // Manejar diferentes tipos de error
        if (error.name === 'AbortError') {
          throw new Error('La solicitud tardó demasiado tiempo');
        }

        throw error;
      }

    } catch (error) {
      console.error(`[SecureAPI] Error en GET ${endpoint}:`, error.message);
      throw error;
    }
  }

  /**
   * Reset del rate limiter (útil para debugging)
   * @private
   */
  resetRateLimit() {
    this.requests = [];
  }

  /**
   * Obtiene el número de requests en el último minuto
   * @returns {number} Cantidad de requests
   */
  getRequestCount() {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    return this.requests.filter(time => time > oneMinuteAgo).length;
  }
}

// ✅ Exportar instancia global
window.secureAPI = new SecureAPI(60); // 60 requests por minuto por defecto

// ✅ Hacer disponible para módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SecureAPI;
}
