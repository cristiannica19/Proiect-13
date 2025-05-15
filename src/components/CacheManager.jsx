import React from 'react';

const CacheManager = ({ cacheSize, clearExpiredCache, clearCache }) => {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-md">
      <h3 className="text-lg font-medium text-gray-800">Gestionare Cache</h3>
      <p className="text-sm text-gray-600 mt-1">
        Filme în cache: {cacheSize}
      </p>
      <div className="mt-3 flex space-x-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={clearExpiredCache}
        >
          Curăță cache expirat
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={clearCache}
        >
          Curăță tot cache-ul
        </button>
      </div>
    </div>
  );
};

export default CacheManager;