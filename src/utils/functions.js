export const mergeMovieLists = (moviesList, savedMoviesList) => {
  return moviesList.map((movies) => {
    const savedMovie = savedMoviesList.find((movieSaved) => movieSaved.movieId === movies.id)
    movies.saved = !!savedMovie;
    movies._id = savedMovie ? savedMovie._id : "";
    return movies;
  })
}

export const findMovies = (name = '', includeShortMovies = false, movies) => {

  return movies.filter((movie) => {
    const isNameValid = movie.nameRU.toLowerCase().includes(name.toLowerCase());
    const isMovieShort = includeShortMovies ? movie.duration <= 40 : true;

    return isNameValid && isMovieShort;
  })
}

export const formatDuration = (min) => {
  let duration = "";
  if (min >= 60) {
    duration += Math.floor(min / 60);
    duration += " ч ";
  }
  duration += min % 60;
  duration += " м";
  return duration;
};

