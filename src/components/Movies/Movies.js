import React, { useState, useEffect } from "react";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import { useLocation } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

function Movies({
  filterMovies,
  isLoadingData,
  isMoviesApiError,
  moviesData,
  onSaveMovie,
}) {

  let location = useLocation();

  const savedSearchName = localStorage.getItem("search-name") || "";
  const savedSearchShorts = (localStorage.getItem("search-isShorts") === "true") ? true : false;

  const handleSubmit = (name, isShorts) => {
    filterMovies(name, isShorts);
  }

  useEffect(() => {
    const localMovies = JSON.parse(localStorage.getItem('movies') || "[]");

    if (localMovies.length > 0) {
      filterMovies(savedSearchName, savedSearchShorts);
    }

  }, []);

  return (
    <>
      <SearchForm onSubmit={handleSubmit} savedSearchName={savedSearchName} savedSearchShorts={savedSearchShorts} locationPathname={location.pathname} />
      {!isLoadingData && moviesData.length === 0 && (
        <span className="movies__text">Ничего не найдено</span>
      )}
      {isLoadingData && (
        <Preloader />
      )}
      {isMoviesApiError && (
        <span className="movies__text">Проблема с сервером или соединением</span>
      )}
      <MoviesCardList
        data={moviesData}
        locationPathname={location.pathname}
        onSaveMovie={onSaveMovie}
      />
    </>
  );
}

export default Movies;
