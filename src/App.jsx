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
    <div className="min-h-screen bg-black text-white">
      {/* Header cu logo și bară de căutare */}
      <header className="bg-black py-4 px-6 shadow-md sticky top-0 z-10 border-b border-gray-800">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
  <img 
    src="/images/logofeaa.png" // 
    alt="Logo" 
    className="h-10 mt-1 mr-4 cursor-pointer"
    onClick={() => window.location.reload()}
    onHover
  />
</div>
          <div className="w-full md:w-2/3 lg:w-1/2">
            <SearchBar 
              movieName={movieName} 
              setMovieName={setMovieName} 
              handleSearch={handleSearch} 
              loading={loading} 
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Mesaj de eroare */}
        {error && (
          <div className="my-4 p-4 bg-red-900 bg-opacity-50 rounded-md border border-red-700">
            <p className="text-red-400">{error}</p>
          </div>
        )}
        
        {/* Conținutul principal */}
        <div className="my-6">
          {!movieInfo && !error && !loading && (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-gray-400 mb-4">Căutați filmul preferat</h2>
              <p className="text-gray-500">Introduceți titlul unui film pentru a vedea informații și recomandări</p>
            </div>
          )}
          
          {loading && (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
          )}
          
          {movieInfo && <MovieInfo movieInfo={movieInfo} />}
        </div>
        
        {/* Manager cache ascuns într-un colaps */}
        <div className="mt-12">
          <CacheManager 
            cacheSize={cacheSize} 
            clearExpiredCache={clearExpiredCache} 
            clearCache={clearCache} 
          />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-black py-6 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p className="">© 2025 FEAA FLIX</p>
        </div>
      </footer>
    </div>
  );
}

export default App;