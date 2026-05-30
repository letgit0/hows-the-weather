import { WeatherIcon } from "./WeatherIcon";

function WeatherCard({ weather }) {

  return (
    <div
      className="
          relative overflow-hidden
          w-full max-w-md
          rounded-3xl
          bg-white/70
          backdrop-blur-xl
          border border-white/40
          shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]
          p-6 sm:p-8 md:p-10
          transition-all duration-300
          hover:scale-[1.02]
          hover:shadow-[0_25px_70px_-12px_rgba(0,0,0,0.3)]
        "
    >
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-yellow-300/30 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-sky-300/20 blur-3xl"></div>

      <div className="relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-wide text-gray-900 truncate">
          {weather.name}, {weather.sys.country}
        </h2>

        <p className="text-sm sm:text-base text-gray-500 mt-2">
          {new Date()
            .toLocaleString("en-US", {
              weekday: "long",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
            .replace(",", " • ")}
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-between mt-8">
        <div className="flex items-center gap-4">
          <span className="text-6xl sm:text-7xl drop-shadow-md animate-pulse">
            <WeatherIcon condition={weather.weather[0].main} />
          </span>
          <div>
            <p className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-none">
              {weather.main.temp}°
            </p>

            <p className="text-base sm:text-lg text-gray-500 mt-2 italic">
              {weather.weather[0].description}
            </p>
          </div>
        </div>
      </div>

      <div
        className="
            relative z-10
            grid grid-cols-3 gap-3 sm:gap-5
            mt-8 pt-6
            border-t border-gray-200/70
          "
      >
        <div className="rounded-2xl bg-white/60 p-3 sm:p-4 text-center shadow-sm">
          <p className="text-[11px] sm:text-xs uppercase tracking-widest text-gray-500 pt-2">
            Humidity
          </p>

          <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">
            {weather.main.humidity}%
          </p>
        </div>

        <div className="rounded-2xl bg-white/60 p-3 sm:p-4 text-center shadow-sm">
          <p className="text-[11px] sm:text-xs uppercase tracking-widest text-gray-500 pt-2">
            Wind
          </p>

          <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2 flex items-end justify-center flex-wrap">
            {weather.wind.speed}
            <span className="text-sm sm:text-base ml-1 font-medium">km/h</span>
          </p>
        </div>

        <div className="rounded-2xl bg-white/60 p-3 sm:p-4 text-center shadow-sm">
          <p className="text-[11px] sm:text-xs uppercase tracking-widest text-gray-500 whitespace-nowrap pt-2">
            Feels Like
          </p>

          <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">
            {weather.main.feels_like}°
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
