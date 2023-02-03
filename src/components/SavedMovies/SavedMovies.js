import React from "react";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies() {
  return (
    <>
      <SearchForm />
      <MoviesCardList />
    </>
  );
}

export default SavedMovies;
