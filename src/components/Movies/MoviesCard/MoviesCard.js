import React from "react";
import { formatDuration } from "../../../utils/functions";

function MoviesCard({ data, path, saveMovie}) {

  const handleClickButton = () => {
    saveMovie(movieData);
  };

  const getMovieImage = (url) => {
    if (path === '/movies') {
      return `https://api.nomoreparties.co/${url}`;
    }
    else if (path === '/saved-movies') {
      return data.image;
    }
  }

  const sharedData = {
    country: data.country,
    director: data.director,
    duration: data.duration,
    year: data.year,
    description: data.description,
    image: getMovieImage(data.image.url),
    trailerLink: data.trailerLink,
    nameRU: data.nameRU,
    nameEN: data.nameEN,
    movieId: data.id,
    thumbnail: getMovieImage(data.image.url),
  };

  const movieData = data.saved ? { ...data, ...sharedData } : sharedData;

  return (
    <article className="movies-card">
      <div className="movies-card__block">
        <h2 className="movies-card__title">{movieData.nameRU || movieData.nameEN}</h2>
        <p className="movies-card__duration">{formatDuration(data.duration)}</p>
      </div>
      <a href={movieData.trailerLink} target='_blank' rel='noreferrer'>
        <img className="movies-card__img" src={movieData.image} alt={movieData.nameRU || movieData.nameEN} />
      </a>
      <button
        className={`${movieData.saved ? "movies-card__favourites-remove" : "movies-card__favourites-add"} button ${path === "/saved-movies" ? "movies-card__favourites" : ""} button`}
        type="button"
        onClick={handleClickButton}
      >
        Сохранить</button>
    </article>
  );
}

export default MoviesCard;
