/**
 * Netlify Build Plugin: IndexNow Ping
 * Tras cada deploy exitoso, notifica a Bing (y otros buscadores que soportan
 * IndexNow) que las URLs listadas fueron actualizadas, para indexación rápida.
 *
 * Configuración: ver netlify/plugins/indexnow/manifest.yml
 * Override por variable de entorno opcional: INDEXNOW_URLS (lista separada por coma)
 */

module.exports = {
  async onSuccess({ inputs, utils }) {
    const host = inputs.host;
    const key = inputs.key;
    const keyLocation = `https://${host}/${key}.txt`;

    // Permite sobreescribir las URLs vía variable de entorno en Netlify
    const envUrls = process.env.INDEXNOW_URLS;
    const urlList = envUrls
      ? envUrls.split(',').map((u) => u.trim()).filter(Boolean)
      : inputs.urls;

    if (!urlList || urlList.length === 0) {
      console.log('[IndexNow] No hay URLs configuradas — se omite el ping.');
      return;
    }

    const payload = {
      host,
      key,
      keyLocation,
      urlList,
    };

    console.log('[IndexNow] Enviando ping a api.indexnow.org con:', payload);

    try {
      const res = await fetch('https://api.indexnow.org/IndexNow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
      });

      const bodyText = await res.text().catch(() => '');

      if (res.status === 200 || res.status === 202) {
        console.log(`[IndexNow] OK (HTTP ${res.status}) — Bing recibió ${urlList.length} URL(s).`);
      } else {
        console.warn(
          `[IndexNow] Respuesta inesperada HTTP ${res.status}. Body: ${bodyText}`
        );
        // No fallamos el deploy por un ping no crítico
      }
    } catch (err) {
      console.warn('[IndexNow] Error al notificar:', err.message);
      // Intencional: no usamos utils.build.failPlugin() para no romper deploys.
    }
  },
};
