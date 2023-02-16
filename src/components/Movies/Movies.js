import React, { useState, useEffect } from "react";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import { useLocation } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

function Movies({
  isLoadingData,
  resStatus,
  moviesData,
  onSubmit,
  onSaveMovie,
  onDeleteSavedMovie,
  isNoMoviesFound }) {

  let location = useLocation();

  const [isMoviesApiError, setIsMoviesApiError] = useState(false);

  const handleErrors = () => {
    if (resStatus) {
      switch (resStatus) {
        case 200:
          setIsMoviesApiError(false);
          break;
        default:
          setIsMoviesApiError(true);
          break;
      }
    }
  }

  const getSearchMoviesPrevious = (moviesData) => {
    if (moviesData.length === 0) {
      return JSON.parse(localStorage.getItem('filtered-previouslu-movies'))
    }
    return moviesData;
  }

  const handleSubmit = (request, filtercheckbox) => {
    onSubmit(request, filtercheckbox);
  }

  useEffect(() => {
    handleErrors();
  }, [resStatus])

  return (
    <>
      <SearchForm onSubmit={handleSubmit} />
      {!isLoadingData && isNoMoviesFound && (
        <span className="profile-form__input-error">NO_MOV_FOUND</span>
      )}
      {!isLoadingData && (
        <Preloader />
      )}
      {isMoviesApiError && (
        <span className="profile-form__input-error">MOV_ERR_TEXT</span>
      )}
      <MoviesCardList
        data = {getSearchMoviesPrevious(moviesData)}
        locationPathname = {location.pathname}
        onSaveMovie = {onSaveMovie}
        onDeleteSavedMovie = {onDeleteSavedMovie}
      />
    </>
  );
}

export default Movies;
