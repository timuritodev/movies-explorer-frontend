import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies({
  savedMovies,
  handleSearchSavedMovies,
  onSaveMovie,
}) {

  const savedSearchName = localStorage.getItem("search-name-saved") || "";
  const savedSearchShorts = (localStorage.getItem("search-isShorts-saved") === "true") ? true : false;

  const handleSubmit = (request, filtercheckbox) => {
    handleSearchSavedMovies(request, filtercheckbox);
  }

  let location = useLocation();

  useEffect(() => {
    handleSearchSavedMovies(savedMovies, savedSearchShorts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <SearchForm
        onSubmit={handleSubmit}
        savedSearchName={savedSearchName}
      />
      <MoviesCardList
        data={savedMovies}
        locationPathname={location.pathname}
        onSaveMovie={onSaveMovie}
      />
    </>
  );
}

export default SavedMovies;
