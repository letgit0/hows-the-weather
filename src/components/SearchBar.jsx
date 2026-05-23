function SearchBar() {
  return (
    <div className="w-full flex items-center justify-center">
      
      <input
        type="text"
        placeholder="Enter city name"
        className="h-14 w-1/3 px-10 text-lg text-gray-800 
        border border-gray-300/70 rounded-l-xl
        bg-white/90 backdrop-blur-md
        shadow-md
        focus:outline-none focus:ring-4 focus:ring-mauve-400/40 focus:border-mauve-500
        transition-all duration-300 ease-in-out"
      />

      <button
        className="h-14 bg-linear-to-r from-mauve-500 to-mauve-600 text-white px-10 text-lg rounded-r-xl
        shadow-md hover:shadow-xl hover:scale-[1.02]
        active:scale-[0.98]
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-4 focus:ring-mauve-400/40"
      >
        Search
      </button>

    </div>
  );
}

export default SearchBar;