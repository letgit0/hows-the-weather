function About() {
  return (
    <main className="min-h-screen bg-mauve-300 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <section className="mb-8 text-center">
          <div className="mb-4 text-6xl drop-shadow-sm">👻</div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            About
          </p>

          <h1 className="text-4xl font-black tracking-tight text-gray-800 sm:text-5xl">
            How's The Weather?
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            A simple weather app with a little ghost to help you find what's
            happening in the sky.
          </p>
        </section>

        {/* About the app */}
        <section className="mb-6 rounded-4xl border border-white/60 bg-white/65 p-6 shadow-lg shadow-gray-500/10 backdrop-blur-xl sm:p-8">
          <h2 className="mb-3 text-2xl font-black text-gray-800">
            About the app
          </h2>

          <p className="leading-7 text-gray-600">
            How's The Weather is a weather application built with React. You can
            search for a city, choose the location you mean, or use your current
            location to find the weather around you. Once you choose a location, the
            ghost brings back the current conditions, hourly forecast, 5-day forecast,
            and all the other little details.
          </p>
        </section>

        {/* What you can do */}
        <section className="mb-6 rounded-4xl border border-white/60 bg-white/65 p-6 shadow-lg shadow-gray-500/10 backdrop-blur-xl sm:p-8">
          <h2 className="mb-5 text-2xl font-black text-gray-800">
            What you can do
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard
              icon="🔎"
              title="Find a city"
              description="Start typing a city name and choose the location you are looking for from the suggestions."
            />

            <InfoCard
              icon="📍"
              title="Use your location"
              description="Let the app use your browser location to find the weather for where you are."
            />

            <InfoCard
              icon="🌤️"
              title="See current conditions"
              description="Check the current temperature, feels-like temperature, condition, humidity, wind, pressure, and visibility."
            />

            <InfoCard
              icon="⏰"
              title="Look ahead by hour"
              description="Scroll through the upcoming hours to see how the weather and temperature are expected to change."
            />

            <InfoCard
              icon="📅"
              title="Check the next 5 days"
              description="Get a simple daily view with the expected conditions and high and low temperatures."
            />

            <InfoCard
              icon="📊"
              title="Explore the details"
              description="See useful weather information such as sunrise, sunset, humidity, pressure, visibility, and UV index."
            />
          </div>
        </section>

        {/* Built with */}
        <section className="mb-6 rounded-4xl border border-white/60 bg-white/65 p-6 shadow-lg shadow-gray-500/10 backdrop-blur-xl sm:p-8">
          <h2 className="mb-4 text-2xl font-black text-gray-800">
            Built with
          </h2>

          <div className="flex flex-wrap gap-2">
            <TechBadge label="React" />
            <TechBadge label="JavaScript" />
            <TechBadge label="Tailwind CSS" />
            <TechBadge label="React Router" />
            <TechBadge label="Vite" />
            <TechBadge label="Lucide React" />
            <TechBadge label="OpenWeather API" />
          </div>
        </section>

      </div>
    </main>
  );
}

function InfoCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-white/50 bg-white/40 p-5 transition hover:-translate-y-0.5 hover:bg-white/55">
      <div className="mb-3 text-3xl">{icon}</div>

      <h3 className="font-bold text-gray-800">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-6 text-gray-500">
        {description}
      </p>
    </div>
  );
}

function TechBadge({ label }) {
  return (
    <span className="rounded-full border border-white/60 bg-white/50 px-4 py-2 text-sm font-semibold text-gray-600">
      {label}
    </span>
  );
}

export default About;