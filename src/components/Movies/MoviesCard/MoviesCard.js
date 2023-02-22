import React from "react";

function MoviesCard({
  data,
  locationPathname,
  onSaveMovie,
}) {

  const getImage = (path) => {
    if (locationPathname === '/saved-movies') {
      return data.image;
    } else if (locationPathname === '/movies') {
      return `https://api.nomoreparties.co/${path}`;
    }
  }

  const getDuration = (min) => {
    let hour = Math.trunc(min / 60);
    let minute = min % 60;
    let renderHour = hour === 0 ? '' : `${hour}ч`
    let renderMinute = minute === 0 ? '' : `${minute}м`
    return `${renderHour} ${renderMinute}`
  }

  const movieData = data.saved ? {
    ...data,
    country: data.country || 'Нет данных',
    director: data.director || 'Нет данных',
    duration: data.duration || 0,
    year: data.year || 'Нет данных',
    description: data.description || 'Нет данных',
    image: getImage(data.image.url),
    trailerLink: data.trailerLink,
    nameRU: data.nameRU || 'Нет данных',
    nameEN: data.nameEN || 'Нет данных',
    movieId: data.id,
    thumbnail: getImage(data.image.url),
  } : {
    country: data.country || 'Нет данных',
    director: data.director || 'Нет данных',
    duration: data.duration || 0,
    year: data.year || 'Нет данных',
    description: data.description || 'Нет данных',
    image: getImage(data.image.url),
    trailerLink: data.trailerLink,
    nameRU: data.nameRU || 'Нет данных',
    nameEN: data.nameEN || 'Нет данных',
    movieId: data.id,
    thumbnail: getImage(data.image.url),
  };

  const handleClickButton = () => {
    onSaveMovie(movieData);
  };

  return (
    <article className="movies-card">
      <div className="movies-card__block">
        <h2 className="movies-card__title">{movieData.nameRU || movieData.nameEN}</h2>
        <p className="movies-card__duration">{getDuration(data.duration)}</p>
      </div>
      <a href={movieData.trailerLink} target='_blank' rel='noreferrer'>
        <img className="movies-card__img" src={movieData.image} alt={movieData.nameRU || movieData.nameEN} />
      </a>
      <button
        className={`${movieData.saved ? "movies-card__favourites-add" : "movies-card__favourites-remove"} button ${locationPathname === "/saved-movies" ? "moviescard__favourites-remove-saved-movies" : ""} button`}
        type="button"
        onClick={handleClickButton}
      >
        Сохранить</button>
    </article>
  );
}

export default MoviesCard;
