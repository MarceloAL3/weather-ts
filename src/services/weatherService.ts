import type { Weather } from "../types/weather";

export async function getWeather(
  latitude: number,
  longitude: number,
  city: string
): Promise<Weather> {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m` +
    `&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro ao buscar os dados do clima.");
  }

  const data = await response.json();

  return {
    city,
    temperature: data.current.temperature_2m,
    description: getWeatherDescription(
      data.current.weather_code
    ),
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
  };
}

function getWeatherDescription(code: number): string {
  if (code === 0) {
    return "Céu limpo";
  }

  if (code === 1 || code === 2 || code === 3) {
    return "Parcialmente nublado";
  }

  if (code === 45 || code === 48) {
    return "Neblina";
  }

  if (code >= 51 && code <= 67) {
    return "Chuva";
  }

  if (code >= 71 && code <= 77) {
    return "Neve";
  }

  if (code >= 80 && code <= 82) {
    return "Pancadas de chuva";
  }

  if (code >= 95) {
    return "Tempestade";
  }

  return "Condição desconhecida";
}