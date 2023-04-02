export const breakpoints = {
  SIZE_SMALL: {
    width: 768,
    renderedMovies: 5,
    moviesToAdd: 2,
  },
  SIZE_MEDIUM: {
    width: 990,
    renderedMovies: 8,
    moviesToAdd: 2,
  },
  SIZE_BIG: {
    width: 1024,
    renderedMovies: 12,
    moviesToAdd: 3,
  },
  SIZE_LARGE: {
    width: 1280,
    renderedMovies: 16,
    moviesToAdd: 4,
  }
}

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
