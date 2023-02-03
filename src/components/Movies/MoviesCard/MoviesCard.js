import React from "react";

function MoviesCard({ image, title, duration, isFavourite }) {
  return (
    <article className="movies-card">
      <div className="movies-card__block">
        <h2 className="movies-card__title">{title}</h2>
        <p className="movies-card__duration">{duration}</p>
      </div>
      <img className="movies-card__img"src={image} alt={title} />
      <button className={`${isFavourite ? "movies-card__favourites-remove" : "movies-card__favourites-add"} button`} type="button">Сохранить</button>
    </article>
  );
}

export default MoviesCard;
