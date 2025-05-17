import { useState } from 'react';

const CacheManager = ({ cacheSize, clearExpiredCache, clearCache }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-gray-900 rounded-md overflow-hidden transition-all duration-300 border border-gray-800">
     
      {/* Header */}
      <button 
        className="w-full px-4 py-3 flex justify-between items-center focus:outline-none cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
          <h3 className="text-lg font-medium text-gray-300">Setări avansate</h3>
      </button>
      
      {/* Conținut dupa apasare buton */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 border-t border-gray-800">
          <div className="mb-4">
            <h4 className="text-lg text-gray-300 mb-2">Gestionare Cache</h4>
            <p className="text-sm text-gray-500 mb-2">
              Filmele căutate sunt salvate local pentru utilizare ulterioară rapidă.
            </p>
            <div className="bg-gray-800 rounded-md px-4 py-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-900 flex items-center justify-center text-lg font-bold text-red-500 mr-3">
                  {cacheSize}
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Filme în cache</p>
                  <p className="text-xs text-gray-500">Memorate pentru acces rapid</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md text-sm font-medium transition-colors duration-300 flex items-center justify-center"
              onClick={clearExpiredCache}
            >
              Curăță cache mai mare 24 ore
            </button>
            <button
              className="px-4 py-2 bg-red-900 hover:bg-red-800 text-red-300 rounded-md text-sm font-medium transition-colors duration-300 flex items-center justify-center"
              onClick={clearCache}
            >
              Curăță tot cache-ul
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CacheManager;