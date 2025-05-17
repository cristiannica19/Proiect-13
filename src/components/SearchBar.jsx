import { useState } from 'react';

const SearchBar = ({ movieName, setMovieName, handleSearch, loading }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="relative">
      <div className={`flex rounded-md overflow-hidden transition-all duration-300 ${isFocused ? 'ring-2 ring-red-600' : 'bg-gray-800'}`}>
        <input
          type="text"
          className="flex-1 px-4 py-2 bg-gray-800 text-white outline-none placeholder-gray-500 w-full"
          placeholder="Caută un film..."
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          className={`px-6 py-2 flex items-center justify-center transition-colors duration-300 ${loading ? 'bg-gray-700' : 'bg-red-600 hover:bg-red-700'}`}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Căutare...</span>
            </span>
          ) : (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
              <span>Caută</span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;