const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Current weather
export const fetchCurrentWeather = async (lat, lon) => {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch current weather");
  }

  return response.json();
};

// 5-day forecast
export const fetchForecast = async (lat, lon) => {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch forecast");
  }

  return response.json();
};