import React, { useEffect, useState, useMemo } from "react";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import { useLocation } from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import { findMovies } from "../../utils/functions";
import { mainApi } from "../../utils/MainApi";
import { mergeMovieLists } from "../../utils/functions";
import { moviesApi } from "../../utils/MoviesApi";

function Movies() {

  const [moviesList, setMoviesList] = useState([]);
  const [filteredMoviesList, setFilteredMoviesList] = useState([]);
  const [moviesApiError, setMoviesApiError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isMovieNeedUpdate, setIsMovieNeedUpdate] = useState(false);

  const searchSavedName = localStorage.getItem("search-SavedName") || "";
  const searchSavedNameShorts = (localStorage.getItem("search-SavedNameShorts") === "true") ? true : false;


  let location = useLocation();

  const isNoResults = useMemo(() => !isMoviesLoading && filteredMoviesList.length === 0, [isMoviesLoading, filteredMoviesList]);

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

  const updateMovies = async (search, isMovieShort) => {
    localStorage.setItem('search-SavedName', search);
    localStorage.setItem('search-SavedNameShorts', JSON.stringify(isMovieShort));
    setIsMovieNeedUpdate(true);

    const filterMoviesList = (movies) => {
      const filteredMovies = findMovies(search, isMovieShort, movies);
      setFilteredMoviesList(filteredMovies);
    };

    if (moviesList.length === 0) {
      const localMovies = JSON.parse(localStorage.getItem('moviesList') || '[]');

      if (localMovies.length === 0) {
        setIsMoviesLoading(true);
        try {
          const bitFilmsMovies = await moviesApi.getMoviesCards();
          const savedMovies = await fetchSavedMovies();
          const mergedMovies = mergeMovieLists(bitFilmsMovies, savedMovies);

          localStorage.setItem('moviesList', JSON.stringify(mergedMovies));
          setMoviesList(mergedMovies);
          filterMoviesList(mergedMovies);
          setMoviesApiError(false);
        } catch (error) {
          console.log(error);
          setMoviesApiError(true);
        } finally {
          setIsMoviesLoading(false);
        }
      } else {
        setMoviesList(localMovies);
        filterMoviesList(localMovies);
      }
    } else {
      filterMoviesList(moviesList);
    }
  };

  useEffect(() => {
    updateMovies(searchSavedName, searchSavedNameShorts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchSavedName, searchSavedNameShorts, moviesList]);

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

  const handleSubmit = (search, isMovieShort) => {
    updateMovies(search, isMovieShort);
  }

  return (
    <>
      <SearchForm onSubmit={handleSubmit} locationPathname={location.pathname} />
      {isNoResults && (
        <span className="movies__text">Ничего не найдено</span>
      )}
      {isMoviesLoading && <Preloader />}
      {moviesApiError && (
        <span className="movies__text">Проблема с сервером или соединением</span>
      )}
      {!isNoResults && !moviesApiError && (
        <MoviesCardList data={filteredMoviesList} path={location.pathname} saveMovie={switchLike} />
      )}
    </>
  );
}

export default Movies;
