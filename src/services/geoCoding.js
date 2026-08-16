const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const GEO_URL = "https://api.openweathermap.org/geo/1.0";

export const getCoordinates = async (city) => {
  const response = await fetch(
    `${GEO_URL}/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to find city");
  }

  const data = await response.json();

  if (!data.length) {
    throw new Error("City not found");
  }

  return {
    name: data[0].name,
    lat: data[0].lat,
    lon: data[0].lon,
    country: data[0].country,
    state: data[0].state,
  };
};

export const searchCities = async (city) => {
  if (!city.trim()) {
    return [];
  }

  const response = await fetch(
    `${GEO_URL}/direct?q=${encodeURIComponent(city.trim())}&limit=5&appid=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to search cities");
  }

  const data = await response.json();

  return data.map((location) => ({
    name: location.name,
    lat: location.lat,
    lon: location.lon,
    country: location.country,
    state: location.state,
  }));
};

export const getLocationName = async (lat, lon) => {
  const response = await fetch(
    `${GEO_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to get location");
  }

  const [location] = await response.json();

  if (!location) {
    throw new Error("Couldn't determine your location");
  }

  return location;
};