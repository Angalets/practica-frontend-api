// Definimos errores personalizados para saber qué decirle al usuario después
export const ERROR_TYPES = {
  NETWORK: 'NETWORK',   // Sin internet
  TIMEOUT: 'TIMEOUT',   // Internet muy lento
  SERVER: 'SERVER',     // Error 500 o 404 de la API
  UNKNOWN: 'UNKNOWN',
};

export const fetchWeather = async (lat, lon) => {
  // 1. Verificación de Red (UX preventiva)
  if (!navigator.onLine) {
    throw { type: ERROR_TYPES.NETWORK };
  }

  // 2. Configurar Timeout (Para ancho de banda limitado)
  // Si la API no responde en 5 segundos, abortamos la petición.
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId); // Limpiamos el reloj si respondió a tiempo

    if (!response.ok) {
      throw { type: ERROR_TYPES.SERVER, status: response.status };
    }

    const data = await response.json();
    return data.current_weather;

  } catch (error) {
    // 3. Diferenciar errores para la UX
    if (error.name === 'AbortError') {
      throw { type: ERROR_TYPES.TIMEOUT };
    }
    // Si ya es un error tipado nuestro, lo lanzamos, si no, es desconocido
    throw error.type ? error : { type: ERROR_TYPES.UNKNOWN };
  }
};