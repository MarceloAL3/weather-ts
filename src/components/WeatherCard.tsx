import type { Weather } from "../types/weather";

interface WeatherCardProps {
  weather: Weather;
}

export function WeatherCard({
  weather,
}: WeatherCardProps) {
  return (
    <div>
      <h2>{weather.city}</h2>

      <h1>{weather.temperature}°C</h1>

      <p>{weather.description}</p>

      <p>
        💧 Umidade: {weather.humidity}%
      </p>

      <p>
        💨 Vento: {weather.windSpeed} km/h
      </p>
    </div>
  );
}