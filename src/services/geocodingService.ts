export interface Location {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  state?: string;
}

export async function getLocation(
  city: string
): Promise<Location | null> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1&language=pt&format=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro ao buscar a cidade.");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    return null;
  }

  const location = data.results[0];

  return {
    name: location.name,
    latitude: location.latitude,
    longitude: location.longitude,
    country: location.country,
    state: location.admin1,
  };
}