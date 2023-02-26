import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import useSize from "../../../utils/Size";

function MoviesCardList({
  locationPathname,
  data,
  onSaveMovie,
}) {

  const size = useSize();
  const reSize = {

    small: {
      width: 768,
      moviesToRender: 5,
      moviesToAdd: 1,
    },

    medium: {
      width: 990,
      moviesToRender: 8,
      moviesToAdd: 2,
    },

    large: {
      width: 1024,
      moviesToRender: 12,
      moviesToAdd: 3,
    },

    xl: {
      width: 1280,
      moviesToRender: 16,
      moviesToAdd: 4,
    }
  }

  const [isSizeChanged, setIsSizeChanged] = useState(true);
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [showButtonActive, setShowButtonActive] = useState(false);
  const [numberOfMoviesToRender, setNumberOfMoviesToRender] = useState(0);
  const [numberOfMoviesToAdd, setNumberOfMoviesToAdd] = useState(0);

  const countNumberOfMoviesToRender = () => {
    if (size.width >= reSize.xl.width) {
      setNumberOfMoviesToRender(reSize.xl.moviesToRender);
      setNumberOfMoviesToAdd(reSize.xl.moviesToAdd);
    } else if (size.width < reSize.xl.width && size.width >= reSize.large.width) {
      setNumberOfMoviesToRender(reSize.large.moviesToRender);
      setNumberOfMoviesToAdd(reSize.large.moviesToAdd);
    } else if (size.width < reSize.medium.width && size.width >= reSize.small.width) {
      setNumberOfMoviesToRender(reSize.medium.moviesToRender);
      setNumberOfMoviesToAdd(reSize.medium.moviesToAdd);
    } else if (size.width < reSize.small.width) {
      setNumberOfMoviesToRender(reSize.small.moviesToRender);
      setNumberOfMoviesToAdd(reSize.small.moviesToAdd);
    };
  };

  const clickShowMoreMoviesButton = () => {
    if (data) {
      setMoviesToRender(data.slice(0, moviesToRender.length + numberOfMoviesToAdd));
      let math = moviesToRender.length + numberOfMoviesToAdd;
      setNumberOfMoviesToRender(math);
      if (moviesToRender.length >= data.length - numberOfMoviesToAdd) {
        setShowButtonActive(false);
      }
    }
  }

  useEffect(() => {
    countNumberOfMoviesToRender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.width]);

  useEffect(() => {
    if (data) {
      if (isSizeChanged) {
        setIsSizeChanged(false)
        setMoviesToRender(data.slice(0, numberOfMoviesToRender));
        if (data.length <= numberOfMoviesToRender) {
          setShowButtonActive(false);
        } else {
          setShowButtonActive(true);
        };
      } else {
        setMoviesToRender(data.slice(0, numberOfMoviesToRender));
        if (data.length <= numberOfMoviesToRender) {
          setShowButtonActive(false);
        } else {
          setShowButtonActive(true);
        };
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (data) {
      setMoviesToRender(data.slice(0, numberOfMoviesToRender));
      if (data.length <= numberOfMoviesToRender) {
        setShowButtonActive(false);
      } else {
        setShowButtonActive(true);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfMoviesToRender])

  const moviesCardsMarkup = moviesToRender.map((item) => (
    <MoviesCard
      key={item.id || item._id}
      data={item}
      locationPathname={locationPathname}
      onSaveMovie={onSaveMovie}
    />
  ))

  return (
    <>
      <section className="movies-cardlist">
        {moviesCardsMarkup}
      </section>
      {showButtonActive ? (
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
