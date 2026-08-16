import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocationName } from "../services/weatherApi";

function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setError("Please enter a city to search.");
      return;
    }

    setError("");
    handleSearch(trimmedCity);
    setCity("");
  };

  const handleSearch = (cityName) => {
    navigate(`/weather/${encodeURIComponent(cityName)}`);
  };

  function handleUseLocation() {
    if (!navigator.geolocation) {
      setError(
        "Location is unavailable. Try searching for your city instead.",
      );
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const location = await getLocationName(latitude, longitude);

          navigate(`/weather/${encodeURIComponent(location.name)}`);
        } catch (error) {
          setError("Couldn't determine your location.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        setError(
          "Couldn't access your location. Try searching for your city.",
        );
      },
    );
  }

  return (
    <main className="min-h-screen bg-mauve-300">
      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-12 sm:px-6">
        <div className="w-full max-w-2xl text-center">

          <h1 className="text-4xl font-black tracking-tight text-mauve-900 sm:text-5xl lg:text-6xl">
            What's the weather like?
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-mauve-800 sm:text-lg">
            Search a city to discover current conditions, hourly weather,
            and your 5-day forecast.
          </p>

          {/* Search */}
          <div className="mx-auto mt-8 max-w-xl rounded-3xl border border-white/50 bg-white/40 p-2 shadow-lg shadow-gray-500/10 backdrop-blur-sm">
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-2 sm:flex-row"
            >
              <input
                type="text"
                placeholder="Enter a city..."
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  if (error) setError("");
                }}
                aria-label="City name"
                className="h-14 min-w-0 flex-1 rounded-2xl border border-white/60 bg-white/90 px-5 text-base text-gray-800 shadow-sm outline-none placeholder:text-gray-400 transition focus:border-mauve-500 focus:ring-4 focus:ring-mauve-400/30"
              />

              <button
                type="submit"
                className="h-14 rounded-2xl bg-linear-to-r from-mauve-500 to-mauve-600 px-7 font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:from-mauve-600 hover:to-mauve-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-mauve-400/40"
              >
                Search
              </button>
            </form>
          </div>

          {/* Location */}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleUseLocation}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full border border-mauve-500/30 bg-mauve-500 px-5 py-2.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-mauve-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-mauve-600/50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="text-lg">
                {loading ? "👻" : "◎"}
              </span>

              {loading
                ? "Finding your location..."
                : "Use my current location"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="mx-auto mt-5 flex max-w-md items-center gap-3 rounded-2xl border border-white/60 bg-white/60 px-4 py-3 text-left text-sm text-mauve-900 shadow-sm backdrop-blur-sm"
            >
              <span className="text-2xl">👻</span>

              <p>{error}</p>
            </div>
          )}

          {/* Bottom message */}
          <p className="mt-8 text-sm font-medium text-mauve-700/80">
            👻 Ghost is ready to find the latest weather.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;