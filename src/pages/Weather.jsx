import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCurrentWeather, fetchForecast } from "../services/weatherApi";
import Loader from "../components/Loader";
import Error from "../components/Error";
import {
  Droplets,
  Wind,
  Gauge,
  Eye,
  Sun,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  Snowflake,
  CloudFog,
  Sunrise,
  Sunset,
  Thermometer,
  CloudSun,
  Navigation,
} from "lucide-react";

function Weather() {
  const { city } = useParams();

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWeather = async () => {
      try {
        setLoading(true);
        setError("");

        const weatherData = await fetchCurrentWeather(city);
        const forecastData = await fetchForecast(city);

        setWeather(weatherData);

        // OpenWeather forecast API normally returns data every 3 hours.
        setHourly(forecastData.list.slice(0, 8));

        // Group forecast data by day
        const groupedDays = {};

        forecastData.list.forEach((item) => {
          const date = new Date(item.dt * 1000)
            .toISOString()
            .split("T")[0];

          if (!groupedDays[date]) {
            groupedDays[date] = [];
          }

          groupedDays[date].push(item);
        });

        const dailyForecast = Object.values(groupedDays)
          .slice(0, 5)
          .map((day) => {
            const temps = day.map((item) => item.main.temp);

            const middleItem =
              day.find((item) => item.dt_txt?.includes("12:00:00")) ||
              day[Math.floor(day.length / 2)] ||
              day[0];

            return {
              ...middleItem,
              high: Math.round(Math.max(...temps)),
              low: Math.round(Math.min(...temps)),
            };
          });

        setForecast(dailyForecast);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [city]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error e={error} />;
  }

  if (!weather) return null;

  const currentDate = new Date(weather.dt * 1000);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const weatherCondition = weather.weather?.[0]?.main;
  const weatherDescription = weather.weather?.[0]?.description;

  const weatherIcon = getWeatherIcon(weatherCondition);

  const sunrise = weather.sys?.sunrise
    ? formatTime(weather.sys.sunrise)
    : "—";

  const sunset = weather.sys?.sunset
    ? formatTime(weather.sys.sunset)
    : "—";

  const windDirection = getWindDirection(weather.wind?.deg);

  return (
    <main className="min-h-screen bg-mauve-300 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        
        {/* HEADER*/}
        <header className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Weather in
              </p>

              <h1 className="text-4xl font-black tracking-tight text-gray-800 sm:text-5xl">
                {weather.name}
                {weather.sys?.country && (
                  <span className="ml-2 text-xl font-semibold text-gray-500 sm:text-2xl">
                    {weather.sys.country}
                  </span>
                )}
              </h1>

              <p className="mt-2 text-sm font-medium text-gray-500 sm:text-base">
                {formattedDate} <span className="mx-1">·</span> {formattedTime}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start rounded-full border border-white/50 bg-white/40 px-4 py-2 text-sm font-medium text-gray-600 shadow-sm backdrop-blur-sm sm:self-auto">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Live conditions
            </div>
          </div>
        </header>

        {/* CURRENT CONDITIONS*/}
        <section className="mb-10">
          <SectionHeading
            title="Current conditions"
            subtitle="Right now"
          />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/65 shadow-xl shadow-gray-500/10 backdrop-blur-xl">
            {/* Decorative background glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />

            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                {/* Main weather */}
                <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
                  <div className="mb-5 flex h-28 w-28 items-center justify-center rounded-[2rem] border border-white/60 bg-white/45 text-gray-700 shadow-inner sm:mb-0 sm:mr-7 sm:h-36 sm:w-36">
                    <div className="text-7xl sm:text-8xl">
                      {weatherIcon}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start justify-center sm:justify-start">
                      <span className="text-7xl font-black leading-none tracking-[-0.06em] text-gray-800 sm:text-8xl">
                        {Math.round(weather.main.temp)}
                      </span>

                      <span className="mt-1 text-4xl font-bold text-gray-500 sm:text-5xl">
                        °
                      </span>
                    </div>

                    <p className="mt-3 text-xl font-bold capitalize text-gray-700 sm:text-2xl">
                      {weatherDescription}
                    </p>

                    <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                      <span className="rounded-full bg-white/50 px-3 py-1 text-sm font-medium text-gray-600">
                        Feels like {Math.round(weather.main.feels_like)}°
                      </span>

                      {weather.main.temp_min !== undefined &&
                        weather.main.temp_max !== undefined && (
                          <span className="rounded-full bg-white/50 px-3 py-1 text-sm font-medium text-gray-600">
                            H {Math.round(weather.main.temp_max)}°
                            <span className="mx-1 text-gray-400">/</span>
                            L {Math.round(weather.main.temp_min)}°
                          </span>
                        )}
                    </div>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[420px] lg:grid-cols-2">
                  <MiniWeatherStat
                    icon={<Droplets />}
                    label="Humidity"
                    value={`${weather.main.humidity}%`}
                  />

                  <MiniWeatherStat
                    icon={<Wind />}
                    label="Wind"
                    value={`${weather.wind.speed} m/s`}
                    secondary={windDirection}
                  />

                  <MiniWeatherStat
                    icon={<Gauge />}
                    label="Pressure"
                    value={`${weather.main.pressure}`}
                    secondary="hPa"
                  />

                  <MiniWeatherStat
                    icon={<Eye />}
                    label="Visibility"
                    value={
                      weather.visibility
                        ? `${(weather.visibility / 1000).toFixed(1)}`
                        : "—"
                    }
                    secondary="km"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOURLY */}
        <section className="mb-10">
          <SectionHeading
            title="Hourly"
            subtitle="Upcoming conditions"
          />

          <div className="scrollbar-hide -mx-1 flex gap-3 overflow-x-auto px-1 pb-3">
            {hourly.map((item, index) => {
              const date = new Date(item.dt * 1000);

              const time =
                index === 0
                  ? "Now"
                  : date.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    });

              return (
                <div
                  key={item.dt}
                  className={`min-w-[105px] flex-shrink-0 rounded-2xl border p-4 text-center transition-all duration-200 ${
                    index === 0
                      ? "border-white/80 bg-white/80 shadow-lg shadow-gray-500/10"
                      : "border-white/50 bg-white/50 shadow-sm backdrop-blur-sm hover:-translate-y-1 hover:bg-white/70"
                  }`}
                >
                  <p
                    className={`text-xs font-bold uppercase tracking-wide ${
                      index === 0 ? "text-gray-800" : "text-gray-500"
                    }`}
                  >
                    {time}
                  </p>

                  <div className="my-4 flex justify-center text-4xl text-gray-700">
                    {getWeatherIcon(item.weather?.[0]?.main)}
                  </div>

                  <p className="text-xl font-black text-gray-800">
                    {Math.round(item.main.temp)}°
                  </p>

                  <p className="mt-1 text-xs capitalize text-gray-500">
                    {item.weather?.[0]?.main}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/*  5 DAY FORECAST */}
        <section className="mb-10">
          <SectionHeading
            title="5-day forecast"
            subtitle="Daily outlook"
          />

          <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/60 shadow-lg shadow-gray-500/10 backdrop-blur-xl">
            {forecast.map((item, index) => {
              const date = new Date(item.dt * 1000);

              const weekday = date.toLocaleDateString("en-US", {
                weekday: "short",
              });

              const dateLabel = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });

              return (
                <div
                  key={item.dt}
                  className={`group grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-5 transition-colors hover:bg-white/30 sm:grid-cols-[1fr_auto_1fr_auto] sm:px-7 ${
                    index !== forecast.length - 1
                      ? "border-b border-gray-200/50"
                      : ""
                  }`}
                >
                  {/* Date */}
                  <div>
                    <p className="font-bold text-gray-800">
                      {index === 0 ? "Today" : weekday}
                    </p>

                    <p className="mt-0.5 text-xs font-medium text-gray-500">
                      {dateLabel}
                    </p>
                  </div>

                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/40 text-3xl text-gray-700">
                    {getWeatherIcon(item.weather?.[0]?.main)}
                  </div>

                  {/* Description */}
                  <p className="hidden text-sm font-medium capitalize text-gray-500 sm:block">
                    {item.weather?.[0]?.description}
                  </p>

                  {/* Temperatures */}
                  <div className="text-right">
                    <span className="text-lg font-black text-gray-800">
                      {item.high}°
                    </span>

                    <span className="ml-2 text-sm font-semibold text-gray-400">
                      {item.low}°
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* MORE DETAILS */}
        <section className="pb-12">
          <SectionHeading
            title="More details"
            subtitle="Everything else you need to know"
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            <DetailCard
              icon={<Sunrise />}
              label="Sunrise"
              value={sunrise}
            />

            <DetailCard
              icon={<Sunset />}
              label="Sunset"
              value={sunset}
            />

            <DetailCard
              icon={<Droplets />}
              label="Humidity"
              value={`${weather.main.humidity}%`}
            />

            <DetailCard
              icon={<Gauge />}
              label="Pressure"
              value={`${weather.main.pressure} hPa`}
            />

            <DetailCard
              icon={<Eye />}
              label="Visibility"
              value={
                weather.visibility
                  ? `${(weather.visibility / 1000).toFixed(1)} km`
                  : "—"
              }
            />

            <DetailCard
              icon={<Wind />}
              label="Wind"
              value={`${weather.wind.speed} m/s`}
              secondary={windDirection}
            />

            <DetailCard
              icon={<CloudSun />}
              label="Cloud cover"
              value={
                weather.clouds?.all !== undefined
                  ? `${weather.clouds.all}%`
                  : "—"
              }
            />

            <DetailCard
              icon={<Thermometer />}
              label="Feels like"
              value={`${Math.round(weather.main.feels_like)}°`}
            />

            <DetailCard
              icon={<Navigation />}
              label="Wind direction"
              value={
                weather.wind?.deg !== undefined
                  ? `${weather.wind.deg}°`
                  : "—"
              }
              secondary={windDirection}
            />

            <DetailCard
              icon={<Cloud />}
              label="Condition"
              value={weather.weather?.[0]?.main || "—"}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

/* SECTION HEADING */

function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-black uppercase tracking-wide text-gray-800 sm:text-2xl">
          {title}
        </h2>

        <p className="mt-1 text-sm font-medium text-gray-500">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

/* MINI WEATHER STAT */

function MiniWeatherStat({ icon, label, value, secondary }) {
  return (
    <div className="rounded-2xl border border-white/50 bg-white/40 p-4">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/50 text-gray-600">
        {icon}
      </div>

      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <div className="mt-1 flex items-baseline gap-1">
        <p className="text-lg font-black text-gray-800">{value}</p>

        {secondary && (
          <span className="text-xs font-semibold text-gray-500">
            {secondary}
          </span>
        )}
      </div>
    </div>
  );
}

/* MORE DETAILS CARD */

function DetailCard({ icon, label, value, secondary }) {
  return (
    <div className="group rounded-2xl border border-white/50 bg-white/55 p-4 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/70 hover:shadow-md sm:p-5">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/50 text-gray-600 transition-transform group-hover:scale-105">
        {icon}
      </div>

      <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <div className="mt-1 flex flex-wrap items-baseline gap-1">
        <p className="text-base font-black text-gray-800 sm:text-lg">
          {value}
        </p>

        {secondary && (
          <span className="text-xs font-semibold text-gray-500">
            {secondary}
          </span>
        )}
      </div>
    </div>
  );
}

/* WEATHER ICON */

function getWeatherIcon(condition) {
  const iconProps = {
    size: "1em",
    strokeWidth: 1.8,
  };

  switch (condition?.toLowerCase()) {
    case "clear":
      return <Sun {...iconProps} />;

    case "clouds":
      return <Cloud {...iconProps} />;

    case "rain":
      return <CloudRain {...iconProps} />;

    case "drizzle":
      return <CloudDrizzle {...iconProps} />;

    case "thunderstorm":
      return <CloudLightning {...iconProps} />;

    case "snow":
      return <Snowflake {...iconProps} />;

    case "mist":
    case "fog":
    case "haze":
      return <CloudFog {...iconProps} />;

    default:
      return <Cloud {...iconProps} />;
  }
}

/* TIME FORMATTER */

function formatTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

/*WIND DIRECTION */

function getWindDirection(degrees) {
  if (degrees === undefined || degrees === null) {
    return null;
  }

  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];

  const index = Math.round(degrees / 22.5) % 16;

  return directions[index];
}

export default Weather;