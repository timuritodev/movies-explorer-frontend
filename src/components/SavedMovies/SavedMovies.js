import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../Movies/SearchForm/SearchForm";
import { findMovies } from "../../utils/functions";
import { mainApi } from "../../utils/MainApi";
import { mergeMovieLists } from "../../utils/functions";

function SavedMovies() {

  // eslint-disable-next-line no-unused-vars
  const [moviesList, setMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [filteredSavedMoviesList, setFilteredSavedMoviesList] = useState([]);
  const [savedMoviesApiError, setSavedMoviesApiError] = useState(false);

  const [isMoviesLoading, setIsMoviesLoading] = useState(false);
  const [isMovieNeedUpdate, setIsMovieNeedUpdate] = useState(false);

  const searchSavedName = localStorage.getItem("search-SavedName") || "";
  const searchSavedNameShorts = (localStorage.getItem("search-SavedNameShorts") === "true") ? true : false;

  let location = useLocation();

  const isNoResults = useMemo(() => !isMoviesLoading && filteredSavedMoviesList.length === 0, [isMoviesLoading, filteredSavedMoviesList]);

  const fetchSavedMovies = () => {
    setIsMoviesLoading(true);
    const jwt = localStorage.getItem("jwt");
    mainApi.setAuthorizationToken(jwt);

    return mainApi.getSavedMovies()
      .then((res) => {
        const movies = res.data.map((movie) => ({ ...movie, saved: true }));
        localStorage.setItem('saved-moviesList', JSON.stringify(movies));
        return movies;
      });
  };

  const updateSavedMovies = useCallback(async (search, isMovieShort) => {
    setIsMovieNeedUpdate(true);

    try {
      let movies = savedMoviesList;
      if (movies.length === 0) {
        const localMovies = JSON.parse(localStorage.getItem('saved-moviesList') || "[]");
        if (localMovies.length === 0) {
          movies = await fetchSavedMovies();
        } else {
          movies = localMovies;
        }
        setSavedMoviesList(movies);
      }
      const filteredMovies = findMovies(search, isMovieShort, movies);
      setFilteredSavedMoviesList(filteredMovies);
      setSavedMoviesApiError(false);
    } catch (error) {
      console.log(error);
      setSavedMoviesApiError(true);
    } finally {
      setIsMoviesLoading(false);
    }
  }, [savedMoviesList]);

  useEffect(() => {
    updateSavedMovies(searchSavedName, searchSavedNameShorts);
  }, [searchSavedName, searchSavedNameShorts, updateSavedMovies]);

  useEffect(() => {
    if (isMovieNeedUpdate) {
      updateSavedMovies("", false);
      setIsMovieNeedUpdate(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMoviesList.length, updateSavedMovies]);


  const handleSubmit = (request, filtercheckbox) => {
    updateSavedMovies(request, filtercheckbox);
  }

  const switchLike = async (movie) => {
    setIsMovieNeedUpdate(true);

    try {
      if (movie.saved) {
        await mainApi.deleteMovie(movie._id);
      } else {
        await mainApi.saveMovie(movie);
      }

      const { data } = await mainApi.getSavedMovies();
      const movies = data.map((movie) => {
        movie.saved = true;
        return movie;
      });

      localStorage.setItem('saved-moviesList', JSON.stringify(movies));
      setSavedMoviesList(movies);

      const mergedMovies = mergeMovieLists(moviesList, movies);
      localStorage.setItem('moviesList', JSON.stringify(mergedMovies));

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <SearchForm onSubmit={handleSubmit} />
      {isMoviesLoading && <Preloader />}
      {isNoResults && (
        <span className="section-text section-text_movies">Ничего не найдено.</span>
      )}
      {savedMoviesApiError && (
        <span className="section-text section-text_movies">Во время запроса произошла ошибка.
          Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз.</span>
      )}
      {!isNoResults && !savedMoviesApiError && (
        <MoviesCardList
          data={filteredSavedMoviesList}
          path={location.pathname}
          saveMovie={switchLike}
        />
      )}
    </>
  );
}

export default SavedMovies;
