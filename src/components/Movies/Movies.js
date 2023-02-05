import React from "react";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";

function Movies({ handleGetMovies}) {
  return (
    <>
      <SearchForm handleGetMovies={handleGetMovies} />
      <MoviesCardList />
      <div className="movies__button">
        <button className="more__button button" type="button">Ещё</button>
      </div>
    </>
  );
}

export default Movies;
