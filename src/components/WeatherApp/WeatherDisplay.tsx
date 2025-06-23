import { memo } from "react";
import type { Weather } from "../../types/Interfaces";

interface WeatherProps {
  weather: Weather;
  condition: string;
}

function WeatherDisplay({ weather, condition }: WeatherProps) {
  if (!weather) return <p className="weather-empty">No Weather to display</p>;

  return (
    <div className="weather-card">
      <h3 className="weather-location">
        {weather.locationName}&nbsp;
        {weather.dayTime ? "☀" : "🌙"}
      </h3>
      <p>{condition}</p>
      <p className="weather-detail">🌡️ Temperature: {weather.temperature}°C</p>
      <p className="weather-detail">💨 Wind Speed: {weather.windSpeed} kph</p>
      <p className="weather-detail">
        🌀 Condition Code: {weather.conditionCode}
      </p>
    </div>
  );
}
export default memo(WeatherDisplay);
