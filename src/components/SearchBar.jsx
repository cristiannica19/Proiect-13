import React from 'react';

const SearchBar = ({ movieName, setMovieName, handleSearch, loading }) => {
  return (
    <div className="flex">
      <input
        type="text"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Introdu numele unui film"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? 'Se caută...' : 'Caută'}
      </button>
    </div>
  );
};

export default SearchBar;