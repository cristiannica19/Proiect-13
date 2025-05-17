// Aici actualizam starea interfetei în funcție de rezultate 

{/* - SearchBar -> actualizează starea movieName prin setMovieName
    - Utilizatorul apasă butonul de căutare → se declanșează handleSearch din useMovieSearch.js
    - handleSearch setează loading la true și șterge eventualele erori
    - handleSearch apelează getCachedMovie din movieService.js pentru a verifica cache-ul
    - Daca filmul nu exista în cache, handleSearch apelează searchMovie din movieService.js
    - Dupa primirea datelor, handleSearch apelează cacheMovie pentru a le salva local
    - handleSearch actualizeaza starea movieInfo si loading pentru a reflecta rezultatul
    - Componenta App rerandează interfața în funcție de noile stări 
*/}

import { useState, useEffect } from 'react';
import { 
  searchMovie, 
  getCachedMovie, 
  cacheMovie, 
  getCacheSize, 
  clearAllCache, 
  clearExpiredCache 
} from '../services/movieService';


const useMovieSearch = () => {
  // Stările pentru gestionarea căutării filmelor
  const [movieName, setMovieName] = useState('');  // titlu introdus de utilizator
  const [movieInfo, setMovieInfo] = useState(null); // datele filmului din API sau cache
  const [loading, setLoading] = useState(false); // indicator daca e o cerere in curs
  const [error, setError] = useState(null);
  const [cacheSize, setCacheSize] = useState(0); // numarul de filme stocate in localStorage
  
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
  
  // Actualizează dimensiunea cache-ului in UI
  const updateCacheSize = () => {
    setCacheSize(getCacheSize());
  };
  
  // Golirea cache-ului
  const clearCache = () => {
    clearAllCache();
    updateCacheSize();
  };
  
  // Stergem si actualizam și starea in UI
  const handleClearExpiredCache = () => {
    clearExpiredCache();
    updateCacheSize();
  };
  
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