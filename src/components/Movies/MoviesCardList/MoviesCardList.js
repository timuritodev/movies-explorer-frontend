import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import useWindowSize from "../../../utils/windowSize";
import { BREAKPOINTS } from "../../../utils/constants";

function MoviesCardList({ path, data, saveMovie }) {

  const [isScreenSizeChanged, setIsScreenSizeChanged] = useState(true);
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [showButtonVisible, setShowButtonVisible] = useState(false);
  const [maxRenderedMovies, setMaxRenderedMovies] = useState(0);
  const [numberOfMoviesToAdd, setNumberOfMoviesToAdd] = useState(0);
  const size = useWindowSize();
  const location = useLocation();

  const moviesCardsMarkup = renderedMovies.map((item) => (
    <MoviesCard
      key={item.id || item._id}
      data={item}
      path={path}
      saveMovie={saveMovie}
    />
  ))

  const clickShowMoreMoviesButton = () => {
    if (data) {
      setRenderedMovies(prevRenderedMovies => [
        ...prevRenderedMovies,
        ...data.slice(prevRenderedMovies.length, prevRenderedMovies.length + numberOfMoviesToAdd)
      ]);

      setMaxRenderedMovies(prevMaxRenderedMovies => prevMaxRenderedMovies + numberOfMoviesToAdd);

      if (renderedMovies.length >= data.length - numberOfMoviesToAdd) {
        setShowButtonVisible(false);
      }
    }
  };

  const setNumberOfMoviesBasedOnScreenWidth = () => {
    if (size.width >= BREAKPOINTS.SIZE_BIG.width) {
      setMaxRenderedMovies(BREAKPOINTS.SIZE_BIG.renderedMovies);
      setNumberOfMoviesToAdd(BREAKPOINTS.SIZE_BIG.moviesToAdd);
    } else if (size.width < BREAKPOINTS.SIZE_BIG.width && size.width >= BREAKPOINTS.SIZE_MEDIUM.width) {
      setMaxRenderedMovies(BREAKPOINTS.SIZE_MEDIUM.renderedMovies);
      setNumberOfMoviesToAdd(BREAKPOINTS.SIZE_MEDIUM.moviesToAdd);
    } else {
      setMaxRenderedMovies(BREAKPOINTS.SIZE_SMALL.renderedMovies);
      setNumberOfMoviesToAdd(BREAKPOINTS.SIZE_SMALL.moviesToAdd);
    } if (location.pathname === "/saved-movies") {
      setMaxRenderedMovies(1000);
      setNumberOfMoviesToAdd(0);
    }
  };

  useEffect(() => {
    setNumberOfMoviesBasedOnScreenWidth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.width]);

  useEffect(() => {
    if (data && isScreenSizeChanged) {
      setRenderedMovies(data.slice(0, maxRenderedMovies));
      setIsScreenSizeChanged(false);
      setShowButtonVisible(data.length > maxRenderedMovies);
    }
  }, [data, isScreenSizeChanged, maxRenderedMovies]);

  useEffect(() => {
    if (data) {
      if (isScreenSizeChanged) {
        setIsScreenSizeChanged(false)
        setRenderedMovies(data.slice(0, maxRenderedMovies));
        if (data.length <= maxRenderedMovies) {
          setShowButtonVisible(false);
        } else {
          setShowButtonVisible(true);
        };
      } else {
        setRenderedMovies(data.slice(0, maxRenderedMovies));
        if (data.length <= maxRenderedMovies) {
          setShowButtonVisible(false);
        } else {
          setShowButtonVisible(true);
        };
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isScreenSizeChanged, maxRenderedMovies])

  return (
    <>
      <section className="movies-cardlist">
        {moviesCardsMarkup}
      </section>
      {location.pathname === "/movies" && showButtonVisible ? (
        <div className="movies__button">
          <button
            className="more__button button"
            type="button"
            onClick={clickShowMoreMoviesButton}
          >
            Ещё</button>
        </div>
      ) : null}
    </>
  );
}

export default MoviesCardList;
