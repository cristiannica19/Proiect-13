
////// Folosim OMDb API pt datele filmelor + aici gestionam operatiile cu localStorage

{/* - Cand se cauta un film, aplicația verifică mai întâi cache-ul local
    - Daca filmul exista în cache și nu a expirat, folosește datele locale
    - Daca filmul nu exista în cache sau datele au expirat, face o cerere la API
    - După obținerea datelor de la API, le salvează în cache pentru utilizări viitoare
*/}

// Cheia API 
const API_KEY = import.meta.env.VITE_APICHEIE;

// Constanta pentru calcularea expirarii cache-ului (24 ore)
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;

{/*Cautam filmul si preluam datele de la OMDB API */}
export const searchMovie = async (movieName) => {
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${API_KEY}`; // codifică movieName astfel încât spațiile, diacriticele și alte caractere speciale sa devină valide în URL.
  
  const response = await fetch(url); // cerere HTTP de tip GET catre omdbapi
  const data = await response.json(); // transforma response in json
  
  if (data.Response === 'False') { 
    throw new Error(data.Error || 'Filmul nu a fost găsit.');
  }
  
  return data;
};

{/* Functie prin care gasim filmele care sunt deja in localStorage */}
export const getCachedMovie = (name) => {
  try {
    const cachedData = localStorage.getItem(`movie_${name}`); // valoarea stocată sub cheia movie_<name>
    if (!cachedData) return null;
    
    const { data, timestamp } = JSON.parse(cachedData); // data — obiectul cu detaliile filmului / timestamp — momentul (în milisecunde) când a fost salvat în cache.
    
    // Verificare dacă cache-ul a expirat (mai mare de 24 ore)
    if (Date.now() - timestamp > CACHE_EXPIRATION) {
      localStorage.removeItem(`movie_${name}`);
      return null;
    }
    
    return data; // Daca intrarea exista si nu a expirat, returnează obiectul data cu informațiile filmului.
  } 
    catch (error) {
    console.error('Eroare la citirea din cache:', error);
    return null;
  }
};

{/* */}
{/*Stocharea datelor despre un film în localStorage */}
export const cacheMovie = (name, data) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now()
    };
    
    localStorage.setItem(`movie_${name}`, JSON.stringify(cacheData)); // JSON.stringify transforma obiectul cacheData intr-un sir JSON, de forma: "{\"data\":{…},\"timestamp\":121231231321}"
  } 
    catch (error) {
    console.error('Eroare la scrierea în cache:', error);
  }
};

{/*Obtinem numarul de filme din cache */}
export const getCacheSize = () => {
  let size = 0; // numar initial de filme
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('movie_')) {
      size++; // contorul creste de fiecare data doar cand gaseste o cheie care incepe cu movie_
    }
  }
  return size;
};

{/* Stergem toate intrările din localStorage care au fost salvate cu prefixul movie_ */}
export const clearAllCache = () => {
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key && key.startsWith('movie_')) {
      localStorage.removeItem(key);
    }
  }
};

{/* Stergem cache-ul mai mare de 24 ore */}

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
      } catch (error) {
        localStorage.removeItem(key);
      }
    }
  }
};