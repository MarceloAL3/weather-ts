import { useState } from "react";

import { SearchBar } from "./components/SearchBar";
import { WeatherCard } from "./components/WeatherCard";
import { Forecast } from "./components/Forecast";

import { getLocation } from "./services/geocodingService";
import { getWeather } from "./services/weatherService";

import type { Weather } from "./types/weather";

function App() {
  const [city, setCity] = useState("");

  const [weather, setWeather] =
    useState<Weather | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSearch() {
    if (!city.trim()) {
      setError("Digite uma cidade.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const location = await getLocation(city);

      if (!location) {
        setError("Cidade não encontrada.");
        return;
      }

      const weatherData = await getWeather(
        location.latitude,
        location.longitude,
        location.name
      );

      setWeather(weatherData);
    } catch (error) {
      setError("Não foi possível buscar o clima.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>🌦️ WeatherTS</h1>

      <SearchBar
        city={city}
        setCity={setCity}
        onSearch={handleSearch}
      />

      {loading && <p>Buscando clima...</p>}

      {error && <p>{error}</p>}

      {weather && (
        <>
          <WeatherCard weather={weather} />

          <Forecast />
        </>
      )}
    </main>
  );
}

export default App;