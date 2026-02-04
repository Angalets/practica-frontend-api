
export const ERROR_TYPES = {
  NETWORK: 'NETWORK',   // Sin internet
  TIMEOUT: 'TIMEOUT',   // Internet muy lento
  SERVER: 'SERVER',     // Error 500 o 404 de la API
  UNKNOWN: 'UNKNOWN',
};

export const fetchWeather = async (lat, lon) => {

  if (!navigator.onLine) {
    throw { type: ERROR_TYPES.NETWORK };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw { type: ERROR_TYPES.SERVER, status: response.status };
    }

    const data = await response.json();
    return data.current_weather;

  } catch (error) {
  
    if (error.name === 'AbortError') {
      throw { type: ERROR_TYPES.TIMEOUT };
    }

    throw error.type ? error : { type: ERROR_TYPES.UNKNOWN };
  }
};