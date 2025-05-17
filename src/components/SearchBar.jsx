import { useState } from 'react';

const SearchBar = ({ movieName, setMovieName, handleSearch}) => {
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
          className={`bg-red-800 px-6 py-2 flex items-center justify-center transition-colors duration-300 cursor-pointer`}
          onClick={handleSearch}
        > 
            <span className=" flex items-center">
              <span>Caută</span>
            </span>   
        </button>
      </div>
    </div>
  );
};

export default SearchBar;