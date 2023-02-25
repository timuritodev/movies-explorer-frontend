import React, { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ onSubmit, savedSearchName, savedSearchShorts, locationPathname }) {

  const [searchName, setSearchName] = useState(savedSearchName);
  const [searchShorts, setSearchShorts] = useState(savedSearchShorts);
  const [isRequestEmpty, setIsRequestEmpty] = useState(false);

  const handleSearchName = (evt) => {
    if (evt.target.value.length > 0) {
      setIsRequestEmpty(false);
    }
    setSearchName(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (locationPathname === '/movies' && searchName.length === 0) {
      setIsRequestEmpty(true);
      return;
    }
    setIsRequestEmpty(false);
    onSubmit(searchName, searchShorts);
  }

  const handleCheckbox = (checkboxStatus) => {
    onSubmit(searchName, checkboxStatus);
    setSearchShorts(checkboxStatus);
  }

  return (
    <section className="search-form">
      <form className="search-form__form" name="search-form" onSubmit={handleSubmit}>
        <div className="search-form__block">
          <input className="search-form__input" id="search-input" name="search-input" type="text" placeholder="Фильм" value={searchName} onChange={handleSearchName} />
          <button className="search-form__button button" type="submit">Найти</button>
        </div>
        <span className="movies__text">{isRequestEmpty && "Нужно ввести ключевое слово"}</span>
        <FilterCheckbox filtercheckbox={searchShorts} handleCheckbox={handleCheckbox} />
      </form>
    </section>
  );
}

export default SearchForm;
