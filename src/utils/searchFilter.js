const searchFilter = (request = '', filtercheckbox = false, moviesData) => {
  const filterRequest = (movie) => {
    return JSON.stringify(movie).toLocaleLowerCase().includes(request.toLocaleLowerCase());
  }

  const filterFilmShort = (movie) => {
    return movie.duration <= 40;
  }

  if (filtercheckbox) {
    return moviesData.filter(filterFilmShort).filter(filterRequest);
  } else {
    return moviesData.filter(filterRequest);
  }
}

export default searchFilter;
