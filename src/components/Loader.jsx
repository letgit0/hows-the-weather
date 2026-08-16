function Loader() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-mauve-300 px-6">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-5">
          <div className="absolute inset-0 scale-75 rounded-full bg-white/40 blur-2xl" />

          <div className="relative animate-bounce text-7xl drop-shadow-sm">
            👻
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800">
          Flying high
        </h2>

        <p className="mt-1 max-w-xs text-sm text-gray-500">
          Ghost is looking for the latest weather.
        </p>

        <div className="mt-5 h-1.5 w-32 overflow-hidden rounded-full bg-white/60">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-mauve-600" />
        </div>
      </div>
    </main>
  );
}

export default Loader;