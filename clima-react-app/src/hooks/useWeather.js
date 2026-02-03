import { useState, useEffect } from 'react';
import { fetchWeather, ERROR_TYPES } from '../services/weather.service';

export const useWeather = (lat, lon) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      // Simulamos un retraso para probar el Loader (Opcional, quitar en prod)
      // await new Promise(resolve => setTimeout(resolve, 1000));
      
      const data = await fetchWeather(lat, lon);
      setWeather(data);
    } catch (err) {
      // Aquí "traducimos" el error técnico a UX
      let userMessage = "Algo salió mal inesperadamente.";
      
      if (err.type === ERROR_TYPES.NETWORK) 
        userMessage = "No tienes conexión. Revisa tu internet.";
      if (err.type === ERROR_TYPES.TIMEOUT) 
        userMessage = "La red está muy lenta. Intenta de nuevo.";
      if (err.type === ERROR_TYPES.SERVER) 
        userMessage = "El servicio del clima no está disponible ahora.";

      setError(userMessage);
    } finally {
      setLoading(false);
    }
  };

  // Cargar al montar
  useEffect(() => {
    getWeather();
  }, [lat, lon]);

  return { weather, loading, error, refetch: getWeather };
};