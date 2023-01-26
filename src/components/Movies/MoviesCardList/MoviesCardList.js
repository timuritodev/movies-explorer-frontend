import React from "react";
import mov1 from "../../../images/mov1.png"
import mov2 from "../../../images/mov2.png"
import mov3 from "../../../images/mov3.png"
import mov4 from "../../../images/mov4.png"
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  const moviesList = [
    {
      _id: 1,
      image: mov1,
      title: "Мистер Бэнкс",
      duration: "1ч33м",
      isFavourite: false,
    },
    {
      _id: 2,
      image: mov2,
      title: "Мистер Бэнкс",
      duration: "1ч33м",
      isFavourite: true,
    },
    {
      _id: 3,
      image: mov3,
      title: "Мистер Бэнкс",
      duration: "1ч33м",
      isFavourite: true,
    },
    {
      _id: 4,
      image: mov4,
      title: "Мистер Бэнкс",
      duration: "1ч33м",
      isFavourite: true,
    },
    {
      _id: 5,
      image: mov1,
      title: "Мистер Бэнкс",
      duration: "1ч33м",
      isFavourite: false,
    },
    {
      _id: 6,
      image: mov2,
      title: "Мистер Бэнкс",
      duration: "1ч33м",
      isFavourite: false,
    },
    {
      _id: 7,
      image: mov3,
      title: "Мистер Бэнкс",
      duration: "1ч33м",
      isFavourite: true,
    },
    {
      _id: 8,
      image: mov4,
      title: "Мистер Бэнкс",
      duration: "1ч33м",
      isFavourite: true,
    },
    {
      _id: 9,
      image: mov1,
      title: "Мистер Бэнкс",
      duration: "1ч33м",
      isFavourite: false,
    },
  ];

  const movies = moviesList.map((card) => (
    <MoviesCard
      key={card._id}
      image={card.image}
      title={card.title}
      duration={card.duration}
      isFavourite={card.isFavourite}
    />
  ));

  return (
    <section className="movies-cardlist">
      {movies}
    </section>
  );
}

export default MoviesCardList;
