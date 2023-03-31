import React, { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ onSubmit, pathname }) {

  const searchSavedName = localStorage.getItem("search-SavedName") || "";
  const searchSavedNameShorts = (localStorage.getItem("search-SavedNameShorts") === "true") ? true : false;

  const [query, setQuery] = useState(searchSavedName);
  const [shortQuery, setShortQuery] = useState(searchSavedNameShorts);
  const [isQueryEmpty, setIsQueryEmpty] = useState(false);

  const onClickCheckbox = (checkbox) => {
    onSubmit(query, checkbox);
    setShortQuery(checkbox);
  }

  const handleSearchInputChange = (evt) => {
    const inputValue = evt.target.value;
    setIsQueryEmpty(inputValue.length === 0 ? true : false);
    setQuery(inputValue);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (pathname === '/movies' && query.length === 0) {
      setIsQueryEmpty(true);
      return;
    }
    setIsQueryEmpty(false);
    onSubmit(query, shortQuery);
  }

  return (
    <section className="search-form">
      <form className="search-form__form" name="search-form" onSubmit={handleSubmit}>
        <div className="search-form__block">
          <input className="search-form__input" id="search-input" name="search-input" type="text" placeholder="Фильм" value={query} onChange={handleSearchInputChange} />
          <button className="search-form__button button" type="submit">Найти</button>
        </div>
        <span className="movies__text">{isQueryEmpty && "Введите ключевое слово"}</span>
        <FilterCheckbox filterCheckbox={shortQuery} onClickCheckbox={onClickCheckbox} />
      </form>
    </section>
  );
}

export default SearchForm;
