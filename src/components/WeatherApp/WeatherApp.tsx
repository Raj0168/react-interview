import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useWeather from "../hooks/useWeather";
import WeatherDisplay from "./WeatherDisplay";
import "./WeatherApp.css";
import useDebounce from "../hooks/useDebounce";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const inputRef = useRef(null);
  const justSelectedRef = useRef(false);
  const suggestionBoxRef = useRef(null);
  const debouncedCity = useDebounce(city, 500);

  const { weather, loading } = useWeather(search);

  useEffect(() => {
    if (justSelectedRef.current) {
      justSelectedRef.current = false;
      return;
    }

    if (!debouncedCity.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            debouncedCity
          )}`
        );
        const data = await res.json();
        const cityNames = data.results?.map((loc: any) => loc.name) || [];
        const uniqueCities = Array.from(new Set(cityNames));
        setSuggestions(uniqueCities.slice(0, 5));
        setShowSuggestions(true);
      } catch (e) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [debouncedCity]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (name: string) => {
    justSelectedRef.current = true;
    setCity(name);
    setSearch(name);
    setShowSuggestions(false);
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!city.trim()) alert("enter a city first");
      setSearch(city.trim());
      inputRef.current.focus();
    },
    [city]
  );

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const conditionMessage = useMemo(() => {
    if (!weather) return "";
    return weather.temperature > 25 ? "☀️ Warm Day" : "🌥️ Cool Day";
  }, [weather]);

  return (
    <div className="center-all">
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "20px" }}>
        <div className="input-wrapper">
          <input
            style={{ height: "2rem", fontSize: "1rem" }}
            ref={inputRef}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="enter city"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div ref={suggestionBoxRef} className="suggestion-box">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit">Get Weather</button>
      </form>

      {loading && <p>Loading...</p>}

      <WeatherDisplay weather={weather} condition={conditionMessage} />
    </div>
  );
}
