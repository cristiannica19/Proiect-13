
const MovieInfo = ({ movieInfo }) => {
  // Obținerea recomandării bazate pe rating
  const getRecommendation = () => {
    if (!movieInfo || !movieInfo.Ratings || movieInfo.Ratings.length === 0) {
      return { text: 'Nu există suficiente informații pentru a face o recomandare.', color: 'yellow' };
    }
    
    // Încercăm să găsim rating-ul Rotten Tomatoes
    const rtRating = movieInfo.Ratings.find(rating => rating.Source === 'Rotten Tomatoes');
    if (!rtRating && movieInfo.Ratings.length >= 2) {
      // Folosim al doilea rating disponibil dacă nu există Rotten Tomatoes
      const score = parseInt(movieInfo.Ratings[1].Value.replace(/[^0-9]/g, ''));
      return getRecommendationByScore(score);
    } else if (rtRating) {
      const score = parseInt(rtRating.Value.replace('%', ''));
      return getRecommendationByScore(score);
    } else if (movieInfo.imdbRating) {
      // Folosim rating-ul IMDB dacă nu avem alte ratinguri
      const score = parseFloat(movieInfo.imdbRating) * 10;
      return getRecommendationByScore(score);
    }
    
    return { text: 'Nu există suficiente informații pentru a face o recomandare.', color: 'yellow' };
  };
  
  // Obține recomandarea în funcție de scor
  const getRecommendationByScore = (score) => {
    if (score >= 80) {
      return { 
        text: 'Ar trebui să vizionați acest film chiar acum!', 
        color: 'green',
        icon: '👍'
      };
    } else if (score <= 50) {
      return { 
        text: 'Nu recomandăm acest film!', 
        color: 'red',
        icon: '👎'
      };
    }
  };

  // Obținem recomandarea
  const recommendation = getRecommendation();
  
  // Calculăm culoarea badge-ului pentru evaluare
  const getRatingColor = (rating) => {
    if (!rating) return 'bg-gray-600';
    
    if (rating === 'R' || rating === 'NC-17') {
      return 'bg-red-800';
    } else if (rating === 'PG-13') {
      return 'bg-yellow-600';
    } else if (rating === 'PG') {
      return 'bg-blue-600';
    } else if (rating === 'G') {
      return 'bg-green-600';
    }
    
    return 'bg-gray-600';
  };
  
  // Generăm culorile pentru recomandare
  const getRecommendationStyle = (color) => {
    if (color === 'green') {
      return 'bg-green-900 bg-opacity-40 border-green-700 text-green-400';
    } else if (color === 'red') {
      return 'bg-red-900 bg-opacity-40 border-red-700 text-red-400';
    } else if (color === 'blue') {
      return 'bg-blue-900 bg-opacity-40 border-blue-700 text-blue-400';
    } else {
      return 'bg-yellow-900 bg-opacity-40 border-yellow-700 text-yellow-400';
    }
  };

  return (
    <div className="movie-info">
      {/* Banner cu poster și informații de bază */}
      <div className="relative rounded-lg overflow-hidden">
      
       
        {/* Conținutul principal */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Poster film */}
          <div className="flex items-center justify-center md:col-span-1">
            {movieInfo.Poster && movieInfo.Poster !== 'N/A' ? (
              <img
                className="h-96 w-64 object-cover rounded-md shadow-2xl transform transition-transform duration-500 hover:scale-105"
                src={movieInfo.Poster}
                alt={`Poster pentru ${movieInfo.Title}`}
              />
            ) : (
              <div className="h-96 w-64 flex items-center justify-center bg-gray-800 rounded-md">
                <span className="text-gray-500">Poster indisponibil</span>
              </div>
            )}
          </div>
          
          {/* Informații despre film */}
          <div className="md:col-span-2 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white mb-2">{movieInfo.Title}</h1>
            
            <div className="flex flex-wrap items-center mb-4 space-x-2">
              <span className="text-gray-400">{movieInfo.Year}</span>
              <span className="text-gray-600">•</span>
              <span className={`px-2 py-1 rounded text-xs font-bold ${getRatingColor(movieInfo.Rated)}`}>
                {movieInfo.Rated}
              </span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400">{movieInfo.Runtime}</span>
            </div>
            
            {/* Ratinguri IMDb, RottenTomatoes, etc */}
            <div className="flex flex-wrap gap-2 mb-4">
              {movieInfo.imdbRating && movieInfo.imdbRating !== 'N/A' && (
                <div className="flex items-center bg-gray-800 rounded-full px-3 py-1">
                  <span className="text-yellow-500 font-bold mr-1">IMDb</span>
                  <span className="text-white">{movieInfo.imdbRating}/10</span>
                </div>
              )}
              
              {movieInfo.Ratings && movieInfo.Ratings.map((rating, index) => (
                rating.Source !== 'Internet Movie Database' && (
                  <div key={index} className="flex items-center bg-gray-800 rounded-full px-3 py-1">
                    <span className="text-red-500 font-bold mr-1">
                      {rating.Source === 'Rotten Tomatoes' ? 'RT' : rating.Source}
                    </span>
                    <span className="text-white">{rating.Value}</span>
                  </div>
                )
              ))}
            </div>
            
            {/* Plot */}
            <p className="text-gray-300 mb-4 leading-relaxed">{movieInfo.Plot}</p>
            
            {/* Actori, Regizor etc. */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4">
              {movieInfo.Director && movieInfo.Director !== 'N/A' && (
                <div>
                  <span className="text-gray-500">Regizor:</span>
                  <span className="text-gray-300 ml-2">{movieInfo.Director}</span>
                </div>
              )}
              
              {movieInfo.Actors && movieInfo.Actors !== 'N/A' && (
                <div>
                  <span className="text-gray-500">Actori:</span>
                  <span className="text-gray-300 ml-2">{movieInfo.Actors}</span>
                </div>
              )}
              
              {movieInfo.Genre && movieInfo.Genre !== 'N/A' && (
                <div>
                  <span className="text-gray-500">Gen:</span>
                  <span className="text-gray-300 ml-2">{movieInfo.Genre}</span>
                </div>
              )}
              
              {movieInfo.Language && movieInfo.Language !== 'N/A' && (
                <div>
                  <span className="text-gray-500">Limbă:</span>
                  <span className="text-gray-300 ml-2">{movieInfo.Language}</span>
                </div>
              )}
            </div>
            
            {/* Recomandarea */}
            <div className={`mt-4 p-4 rounded-md border ${getRecommendationStyle(recommendation.color)}`}>
              <div className="flex items-center">
                {recommendation.icon && (
                  <span className="text-2xl mr-3">{recommendation.icon}</span>
                )}
                <p className="font-medium">{recommendation.text}</p>
              </div>
            </div>
            
            {/* Butoane */}
            <div className="flex mt-6 space-x-4">
              <button className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center font-medium transition-colors duration-300">
                Vizionează
              </button>
              <button className="px-5 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md flex items-center font-medium transition-colors duration-300">
                Salvează
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;