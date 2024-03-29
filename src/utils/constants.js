export const BREAKPOINTS = {
  SIZE_SMALL: {
    renderedMovies: 5,
    moviesToAdd: 2,
  },
  SIZE_MEDIUM: {
    width: 630,
    renderedMovies: 8,
    moviesToAdd: 2,
  },
  SIZE_BIG: {
    width: 1276,
    renderedMovies: 12,
    moviesToAdd: 3,
  },
};

export const SHORTS_TIME = 40;

export const formatDuration = (min) => {
  let duration = "";
  if (min >= 60) {
    duration += Math.floor(min / 60);
    duration += " ч ";
  }
  duration += min % 60;
  duration += " м";
  return duration;
};
