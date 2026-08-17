import { Link } from "react-router-dom";

function Error({ error }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-mauve-300 px-6">
      <div className="w-full max-w-md rounded-4xl border border-white/60 bg-white/70 p-8 text-center shadow-xl shadow-gray-500/10 backdrop-blur-xl sm:p-10">
        <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-white/40 blur-2xl" />

          <div className="relative text-6xl drop-shadow-sm">👻</div>
        </div>

        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
          Uh oh...
        </p>

        <h2 className="text-xl font-black text-gray-800">
          {error || "The ghost got lost"}
        </h2>

        <Link
          to="/"
          className="mt-7 inline-flex items-center rounded-full bg-mauve-500 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-mauve-600 hover:shadow-md"
        >
          ← Search again
        </Link>
      </div>
    </main>
  );
}

export default Error;
