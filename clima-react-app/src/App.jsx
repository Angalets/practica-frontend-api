import { useWeather } from './hooks/useWeather';
import './App.css'; 

// Coordenadas fijas de ejemplo (CDMX) o puedes usar geolocalización del navegador
const LAT = 19.4326; 
const LON = -99.1332;

function App() {
  const { weather, loading, error, refetch } = useWeather(LAT, LON);

  return (
    <div className="app-container">
      <h1>Monitor de Clima</h1>

      {/* 1. Estado de Carga (UX para espera) */}
      {loading && (
        <div className="skeleton-card">
          <p>Consultando satélite...</p>
          {/* Aquí podrías poner un spinner CSS */}
        </div>
      )}

      {/* 2. Estado de Error (Resiliencia) */}
      {error && (
        <div className="error-banner">
          <p>⚠️ {error}</p>
          <button onClick={refetch}>Reintentar conexión</button>
        </div>
      )}

      {/* 3. Estado de Éxito */}
      {weather && !loading && (
        <div className="weather-card">
          <h2>Temperatura Actual</h2>
          <p className="temp">{weather.temperature} °C</p>
          <p>Viento: {weather.windspeed} km/h</p>
          <button onClick={refetch}>Actualizar</button>
        </div>
      )}
    </div>
  );
}

export default App;