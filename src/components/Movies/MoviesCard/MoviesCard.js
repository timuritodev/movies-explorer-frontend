import React, { useState, useEffect } from "react";

function MoviesCard({
  data,
  locationPathname,
  onSaveMovie,
  onDeleteSavedMovie,
 }) {

  const getImage = (path) => {
    if (locationPathname === '/saved-movies') {
      return data.image;
    } else if (locationPathname === '/movies'){
      return `https://api.nomoreparties.co/${path}`;
    }
  }

  const getDuration = (min) => {
    let hour = Math.trunc(min/60);
    let minute = min % 60;
    let renderHour = hour === 0 ? '' : `${hour}ч`
    let renderMinute = minute === 0 ? '' : `${minute}м`
    return `${renderHour} ${renderMinute}`
  }

  const [movieData, setMovieData] = useState({
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
  })

  const [isFavourite, setIsFavourite] = useState(data.saved);

  useEffect(() => {
    if (locationPathname === '/saved-movies') {
      setIsFavourite(false);
    } else if (locationPathname === '/movies') {
      setIsFavourite(data.saved ? false : true);
    }
  }, [data.saved, locationPathname])

  const handleClickButton = () => {
    if (locationPathname === '/movies') {
      if (!data.saved) {
        onSaveMovie(movieData);
      } else {
        onDeleteSavedMovie(data.id);
      }
    } else if (locationPathname === '/saved-movies') {
      onDeleteSavedMovie(data._id, data.movieId);
    }
  };

  return (
    <article className="movies-card">
      <div className="movies-card__block">
        <h2 className="movies-card__title">{movieData.nameRU || movieData.nameEN}</h2>
        <p className="movies-card__duration">{getDuration(data.duration)}</p>
      </div>
      <img className="movies-card__img" src={movieData.image} alt={movieData.nameRU || movieData.nameEN} />
      <button className={`${isFavourite ? "movies-card__favourites-add" : "movies-card__favourites-remove"} button`} type="button" onClick={handleClickButton}>Сохранить</button>
    </article>
  );
}

export default MoviesCard;
