import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { searchCities, getLocationName } from "../services/geoCoding";
import Error from "../components/Error";
import Loader from "../components/Loader";

function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setSuggestions([]);
      setSearching(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setSearching(true);
        setError("");

        const results = await searchCities(trimmedCity);

        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
      } finally {
        setSearching(false);
      }
    }, 350);

    return () => clearTimeout(timeout);
  }, [city]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setError("Please enter a city to search.");
      return;
    }

    if (suggestions.length > 0) {
      handleCitySelect(suggestions[0]);
      return;
    }

    setError("Couldn't find that city. Try another search.");
  };

  const handleCitySelect = (location) => {
    setShowSuggestions(false);
    setSuggestions([]);
    setCity(location.name);
    setError("");

    navigate(
      `/weather/${encodeURIComponent(location.name)}?lat=${location.lat}&lon=${location.lon}`,
    );
  };

  function handleUseLocation() {
    if (!navigator.geolocation) {
      setError("Location is unavailable. Try searching for your city instead.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const location = await getLocationName(latitude, longitude);

          navigate(
            `/weather/${encodeURIComponent(
              location.name,
            )}?lat=${location.lat}&lon=${location.lon}`,
          );
        } catch (error) {
          setError(error.message || "Couldn't determine your location.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        setError("Couldn't access your location. Try searching for your city.");
      },
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <main className="min-h-screen bg-mauve-300">
      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-12 sm:px-6">
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-4xl font-black tracking-tight text-mauve-900 sm:text-5xl lg:text-6xl">
            What's the weather like?
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-mauve-800 sm:text-lg">
            Search a city to discover current conditions, hourly weather, and
            your 5-day forecast.
          </p>

          <div ref={searchRef} className="relative mx-auto mt-8 max-w-xl">
            <div className="rounded-3xl border border-white/50 bg-white/40 p-2 shadow-lg shadow-gray-500/10 backdrop-blur-sm">
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-2 sm:flex-row"
              >
                <div className="relative min-w-0 flex-1">
                  <input
                    type="text"
                    placeholder="Enter a city..."
                    value={city}
                    onFocus={() => {
                      if (suggestions.length > 0) {
                        setShowSuggestions(true);
                      }
                    }}
                    onChange={(e) => {
                      setCity(e.target.value);

                      if (error) {
                        setError("");
                      }
                    }}
                    aria-label="City name"
                    aria-autocomplete="list"
                    aria-expanded={showSuggestions}
                    className="h-14 w-full rounded-2xl border border-white/60 bg-white/90 px-5 pr-12 text-base text-gray-800 shadow-sm outline-none placeholder:text-gray-400 transition focus:border-mauve-500 focus:ring-4 focus:ring-mauve-400/30"
                  />

                  {searching && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-mauve-300 border-t-mauve-600" />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="h-14 rounded-2xl bg-linear-to-r from-mauve-500 to-mauve-600 px-7 font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:from-mauve-600 hover:to-mauve-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-mauve-400/40"
                >
                  Search
                </button>
              </form>
            </div>

            {showSuggestions && city.trim() && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-white/60 bg-white/90 text-left shadow-xl shadow-gray-500/10 backdrop-blur-xl">
                {searching ? (
                  <div className="px-5 py-4 text-sm text-gray-500">
                    Looking for cities...
                  </div>
                ) : suggestions.length > 0 ? (
                  <div className="py-2">
                    {suggestions.map((location, index) => (
                      <button
                        key={`${location.lat}-${location.lon}-${index}`}
                        type="button"
                        onClick={() => handleCitySelect(location)}
                        className="flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-mauve-100/70 focus:bg-mauve-100/70 focus:outline-none"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mauve-200/70 text-mauve-700">
                          <MapPin size={17} strokeWidth={2} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-gray-800">
                            {location.name}
                          </p>

                          <p className="truncate text-xs text-gray-500">
                            {location.state ? `${location.state}, ` : ""}
                            {location.country}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-5 py-4">
                    <p className="text-sm font-semibold text-gray-700">
                      No cities found
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Try checking the spelling or searching for another city.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={handleUseLocation}
              className="inline-flex items-center gap-2 rounded-full border border-mauve-500/30 bg-mauve-500 px-5 py-2.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-mauve-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-mauve-600/50"
            >
              <span className="text-lg">◎</span>
              Use my current location
            </button>
          </div>

          <p className="mt-8 text-sm font-medium text-mauve-700/80">
            👻 Ghost is ready to find the latest weather.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;
