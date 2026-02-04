import { useWeather } from './hooks/useWeather';
import './App.css'; 

// Coordenadas de Hermosillo, Sonora, México
const LAT = 29.0750; 
const LON = -110.9559;

function App() {
  const { weather, loading, error, refetch } = useWeather(LAT, LON);

  return (
    <div className="app-container">
      <h1>Clima en Hermosillo</h1>

      
      {loading && (
        <div className="skeleton-card">
          <p>Consultando satélite...</p>
          {}
        </div>
      )}

      
      {error && (
        <div className="error-banner">
          <p>⚠️ {error}</p>
          <button onClick={refetch}>Reintentar conexión</button>
        </div>
      )}

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