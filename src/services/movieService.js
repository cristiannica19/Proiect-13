
// Constanta pentru expirarea cache-ului (24 ore)
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;

// Cheia API 
const API_KEY = import.meta.env.VITE_APICHEIE;

/**
 * Serviciu pentru interacțiunea cu OMDb API și gestionarea cache-ului.
 * Acest fișier centralizează toate funcționalitățile legate de date.
 */

/**
 * Caută un film folosind OMDb API.
 * @param {string} movieName - Numele filmului de căutat
 * @returns {Promise<Object>} - Date despre film
 */
export const searchMovie = async (movieName) => {
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${API_KEY}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.Response === 'False') {
    throw new Error(data.Error || 'Filmul nu a fost găsit.');
  }
  
  return data;
};

/**
 * Obține un film din cache.
 * @param {string} name - Numele filmului
 * @returns {Object|null} - Date despre film sau null dacă nu există în cache
 */
export const getCachedMovie = (name) => {
  try {
    const cachedData = localStorage.getItem(`movie_${name}`);
    if (!cachedData) return null;
    
    const { data, timestamp } = JSON.parse(cachedData);
    
    // Verificare dacă cache-ul a expirat
    if (Date.now() - timestamp > CACHE_EXPIRATION) {
      localStorage.removeItem(`movie_${name}`);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Eroare la citirea din cache:', error);
    return null;
  }
};

/**
 * Salvează un film în cache.
 * @param {string} name - Numele filmului
 * @param {Object} data - Date despre film
 */
export const cacheMovie = (name, data) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now()
    };
    
    localStorage.setItem(`movie_${name}`, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Eroare la scrierea în cache:', error);
  }
};

/**
 * Obține numărul de filme în cache.
 * @returns {number} - Numărul de filme în cache
 */
export const getCacheSize = () => {
  let size = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('movie_')) {
      size++;
    }
  }
  return size;
};

/**
 * Curăță tot cache-ul de filme.
 */
export const clearAllCache = () => {
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key && key.startsWith('movie_')) {
      localStorage.removeItem(key);
    }
  }
};

/**
 * Curăță doar cache-ul expirat.
 */
export const clearExpiredCache = () => {
  const now = Date.now();
  
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key && key.startsWith('movie_')) {
      try {
        const cachedData = JSON.parse(localStorage.getItem(key));
        if (now - cachedData.timestamp > CACHE_EXPIRATION) {
          localStorage.removeItem(key);
        }
      } catch (e) {
        localStorage.removeItem(key);
      }
    }
  }
};