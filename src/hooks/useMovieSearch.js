import { useState, useEffect } from 'react';
import { 
  searchMovie, 
  getCachedMovie, 
  cacheMovie, 
  getCacheSize, 
  clearAllCache, 
  clearExpiredCache 
} from '../services/movieService';

/**
 * Hook personalizat pentru gestionarea căutării de filme și a stării asociate.
 * Acest hook extrage întreaga logică din componenta principală și o
 * încapsulează într-un mod reutilizabil.
 */
const useMovieSearch = () => {
  // Stările pentru gestionarea căutării filmelor
  const [movieName, setMovieName] = useState('');
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cacheSize, setCacheSize] = useState(0);
  
  // Actualizarea informațiilor despre cache la încărcarea componentei
  useEffect(() => {
    updateCacheSize();
  }, []);
  
  // Funcția pentru căutarea filmului
  const handleSearch = async () => {
    if (!movieName.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Verificăm mai întâi cache-ul
      const cachedMovie = getCachedMovie(movieName);
      if (cachedMovie) {
        console.log('Folosim date din cache pentru', movieName);
        setMovieInfo(cachedMovie);
        setLoading(false);
        return;
      }
      
      // Dacă nu există în cache, facem cererea API
      const data = await searchMovie(movieName);
      setMovieInfo(data);
      
      // Salvăm rezultatul în cache
      cacheMovie(movieName, data);
      updateCacheSize();
    } catch (error) {
      setError(error.message || 'A apărut o eroare la căutarea filmului.');
      setMovieInfo(null);
    } finally {
      setLoading(false);
    }
  };
  
  // Actualizează dimensiunea cache-ului
  const updateCacheSize = () => {
    setCacheSize(getCacheSize());
  };
  
  // Golirea cache-ului
  const clearCache = () => {
    clearAllCache();
    updateCacheSize();
  };
  
  // Wrapper pentru clearExpiredCache care actualizează și starea
  const handleClearExpiredCache = () => {
    clearExpiredCache();
    updateCacheSize();
  };
  
  // Returnăm toate stările și funcțiile pentru a fi folosite în componente
  return {
    movieName,
    setMovieName,
    movieInfo,
    loading,
    error,
    handleSearch,
    cacheSize,
    clearCache,
    clearExpiredCache: handleClearExpiredCache
  };
};

export default useMovieSearch;