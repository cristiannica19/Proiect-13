##### Proiect 13 - creat cu React+TailwindCSS si Vite

Componenta principala (App.jsx) - organizeaza intreaga aplicatie
SearchBar - bara de cautare pentru introducerea numelui filmului
MovieInfo - afiseaza detaliile filmului gasit
CacheManager - gestioneaza cache-ul local pentru filme
useMovieSearch - hook personalizat pentru logica de cautare
movieService - serviciu pentru interactiunea cu API-ul si localStorage

##### Fluxul de functionare al aplicatiei:

1. Când aplicatia se incarca:

Se afiseaza un ecran initial care indeamna utilizatorul sa caute un film
Se verifica câte filme sunt deja in localStorage (cache)
Se actualizeaza UI-ul cu aceasta informatie

2. Procesul de cautare a unui film

 - Introducerea datelor:

Utilizatorul introduce numele filmului in SearchBar
Starea movieName se actualizeaza prin setMovieName cu fiecare tasta apasata

- Initierea cautarii:

La apasarea butonului "Cauta" sau la tasta Enter
Se apeleaza functia handleSearch din hook-ul useMovieSearch

- Verificarea cache-ului:

Se verifica daca filmul exista deja in localStorage folosind functia getCachedMovie
Daca filmul exista si nu a expirat (mai putin de 24 ore), se folosesc datele din cache

 - Cautarea prin API (daca nu exista in cache):

Se face o cerere catre OMDB API prin functia searchMovie
Datele primite sunt stocate in starea movieInfo
Filmul este adaugat in cache pentru cautari viitoare prin cacheMovie

3. Afisarea informatiilor filmului

- Când datele filmului sunt disponibile:

Componenta MovieInfo primeste datele -> Datele sunt transmise ca props catre componenta MovieInfo

Se cauta rating-ul de pe Rotten Tomatoes sau se converteste rating-ul IMDb
In functie de scor, se genereaza o recomandare personalizata:

 - Afisarea informatiilor:

Poster, titlu, an, rating, durata, plot, actori, regizor, gen si recomandare

4. Gestionarea cache-ului

 - Aplicatia utilizeaza localStorage pentru a stoca datele filmelor cautate:

 - Structura cache-ului:

Fiecare film este stocat cu prefix movie_ urmat de numele filmului
Se stocheaza atât datele filmului, cât si timestamp-ul când a fost adaugat
Cache-ul expira dupa 24 ore (CACHE_EXPIRATION = 24 * 60 * 60 * 1000 ms)

 - Interfata de gestionare:

Componenta CacheManager permite utilizatorului sa vada câte filme sunt in cache
Ofera optiunea de a sterge cache-ul expirat sau tot cache-ul