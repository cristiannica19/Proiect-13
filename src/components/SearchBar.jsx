import { useState } from 'react';

const SearchBar = ({ movieName, setMovieName, handleSearch}) => {
  {/*Componenta unde tinem cont daca campul de search este selectat */} 
  const [isFocused, setIsFocused] = useState(false); 
  
  return (
    <div className="relative">
      {/*daca isFocused este true atunci punem un contur rosu in jurul campului de search*/}
      <div className={`flex rounded-md overflow-hidden transition-all duration-300 ${isFocused ? 'ring-2 ring-red-600' : 'bg-gray-800'}`}>
        {/*inputul textului */}
        <input
          type="text"
          className="flex-1 px-4 py-2 bg-gray-800 text-white outline-none placeholder-gray-500 w-full"
          placeholder="Caută un film..."
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)} // de fiecare daca cand scriem o litera se actualizeaza valoarea
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // apasam enter daca nu vrem sa apasam pe butonul "Cauta"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)} // folosim onBlur ca sa determinam cand nu mai e selectat campul de cautare 
        />
        <button
          className={`bg-red-800 px-6 py-2 flex items-center justify-center transition-colors duration-300 cursor-pointer`}
          onClick={handleSearch} // apelam handleSearch la apasarea butonului
        > 
            <span className=" flex items-center">
              <span>Caută</span>
            </span>   
        </button>
      </div>
    </div>
  );
};

export default SearchBar;