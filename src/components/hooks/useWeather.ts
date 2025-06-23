import { useEffect, useState } from "react";
import type { Weather } from "../../types/Interfaces";

const GEO_API = "https://geocoding-api.open-meteo.com/v1";
const WEATHER_API = "https://api.open-meteo.com/v1";

export default function useWeather(city: string) {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${GEO_API}/search?name=${encodeURIComponent(city)}`
        );
        const data = await res.json();
        const location = data.results?.[0];
        if (!location) throw new Error("City not found.");

        const { latitude, longitude } = location;
        const weatherRes = await fetch(
          `${WEATHER_API}/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const weatherData = await weatherRes.json();
        const { temperature, weathercode, is_day, windspeed } =
          weatherData.current_weather;
        setWeather({
          locationName: data.results?.[0].name,
          temperature,
          conditionCode: weathercode,
          dayTime: is_day,
          windSpeed: windspeed,
        });
      } catch (e) {
        console.error("Errorrrr");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, loading };
}
