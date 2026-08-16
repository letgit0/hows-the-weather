import { Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const isWeatherPage = location.pathname.startsWith("/weather");

  return (
    <header className="border-b border-white/10 bg-linear-to-r from-mauve-600 via-mauve-500 to-mauve-600 text-white shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2"
          aria-label="Go to home"
        >
          <span className="text-2xl transition-transform duration-200 group-hover:-translate-y-0.5 sm:text-3xl">
            👻
          </span>

          <h1 className="text-xl font-bold tracking-wide drop-shadow-md sm:text-2xl">
            How's the Weather?
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {isWeatherPage && (
            <Link
              to="/"
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/50 sm:px-4"
            >
              <Search size={16} strokeWidth={2.5} />

              <span className="hidden sm:inline">
                Search a city
              </span>
            </Link>
          )}

          <Link
            to="/"
            className={`rounded-full px-3 py-2 text-sm font-semibold transition-all duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 sm:px-4 ${
              location.pathname === "/"
                ? "bg-white/15"
                : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={`rounded-full px-3 py-2 text-sm font-semibold transition-all duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 sm:px-4 ${
              location.pathname === "/about"
                ? "bg-white/15"
                : ""
            }`}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;