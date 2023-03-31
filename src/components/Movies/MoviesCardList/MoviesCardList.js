import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import useWindowSize from "../../../utils/windowSize";
import { breakpoints } from "../../../utils/windowSize";

function MoviesCardList({ path, data, saveMovie }) {

  const [isScreenSizeChanged, setIsScreenSizeChanged] = useState(true);
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [showButtonVisible, setShowButtonVisible] = useState(false);
  const [maxRenderedMovies, setMaxRenderedMovies] = useState(0);
  const [numberOfMoviesToAdd, setMoviesToAdd] = useState(0);
  const size = useWindowSize();

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
    if (size.width >= breakpoints.l.width) {
      setMaxRenderedMovies(breakpoints.l.renderedMovies);
      setMoviesToAdd(breakpoints.l.moviesToAdd);
    } else if (size.width < breakpoints.l.width && size.width >= breakpoints.m.width) {
      setMaxRenderedMovies(breakpoints.m.renderedMovies);
      setMoviesToAdd(breakpoints.m.moviesToAdd);
    } else if (size.width < breakpoints.s.width && size.width >= breakpoints.xs.width) {
      setMaxRenderedMovies(breakpoints.s.renderedMovies);
      setMoviesToAdd(breakpoints.s.moviesToAdd);
    } else if (size.width < breakpoints.xs.width) {
      setMaxRenderedMovies(breakpoints.xs.renderedMovies);
      setMoviesToAdd(breakpoints.xs.moviesToAdd);
    };
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
      setRenderedMovies(data.slice(0, maxRenderedMovies));
      setShowButtonVisible(data.length > maxRenderedMovies);
    }
  }, [data, maxRenderedMovies]);

  return (
    <>
      <section className="movies-cardlist">
        {moviesCardsMarkup}
      </section>
      {showButtonVisible ? (
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
