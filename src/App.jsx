import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieInfo from './components/MovieInfo';
import CacheManager from './components/CacheManager';
import useMovieSearch from './hooks/useMovieSearch';

function App() {
  const {
    movieName,
    setMovieName,
    movieInfo,
    loading,
    error,
    handleSearch,
    cacheSize,
    clearCache,
    clearExpiredCache
  } = useMovieSearch();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Informații despre filme</h1>
            <SearchBar 
              movieName={movieName} 
              setMovieName={setMovieName} 
              handleSearch={handleSearch} 
              loading={loading} 
            />
          </div>
          
          {error && <div className="text-red-500 mb-4">{error}</div>}
          
          {movieInfo && <MovieInfo movieInfo={movieInfo} />}
          
          <CacheManager 
            cacheSize={cacheSize} 
            clearExpiredCache={clearExpiredCache} 
            clearCache={clearCache} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;