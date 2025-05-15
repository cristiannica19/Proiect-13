import React from 'react';

const MovieInfo = ({ movieInfo }) => {
  // Obținerea recomandării bazate pe rating
  const getRecommendation = () => {
    if (!movieInfo || !movieInfo.Ratings || movieInfo.Ratings.length === 0) {
      return 'Nu există suficiente informații pentru a face o recomandare.';
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
    
    return 'Nu există suficiente informații pentru a face o recomandare.';
  };
  
  // Obține recomandarea în funcție de scor
  const getRecommendationByScore = (score) => {
    if (score > 80) {
      return 'Ar trebui să vizionați acest film chiar acum!';
    } else if (score < 50) {
      return 'Ar trebui să evitați acest film cu orice preț!';
    } else {
      return 'Acest film are un rating decent.';
    }
  };

  return (
    <div className="mt-4">
      <div className="md:flex">
        {movieInfo.Poster && movieInfo.Poster !== 'N/A' && (
          <div className="flex-shrink-0 md:mr-4 mb-4 md:mb-0">
            <img
              className="h-64 w-48 object-cover rounded"
              src={movieInfo.Poster}
              alt={`Poster pentru ${movieInfo.Title}`}
            />
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Titlu: {movieInfo.Title}</h2>
          <p className="mt-1 text-gray-600">An: {movieInfo.Year}</p>
          <p className="mt-1 text-gray-600">Evaluare: {movieInfo.Rated}</p>
          <p className="mt-1 text-gray-600">Durata: {movieInfo.Runtime}</p>
          <p className="mt-2 text-gray-800">Descriere: {movieInfo.Plot}</p>
          
          <div className="mt-4 p-2 bg-blue-50 border-l-4 border-blue-500 text-blue-700">
            <p className="font-medium">{getRecommendation()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;