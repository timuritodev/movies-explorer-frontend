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
    setQuery(inputValue);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    if (!form.checkValidity() || query.length === 0) {
      setIsQueryEmpty(true);
      return;
    }
    setIsQueryEmpty(false);
    onSubmit(query, shortQuery);
  }

  return (
    <section className="search-form">
      <form className="search-form__form" name="search-form" onSubmit={handleSubmit} noValidate>
        <div className="search-form__block">
          <input className="search-form__input" id="search-input" name="search-input" type="text" placeholder="Фильм" value={query} onChange={handleSearchInputChange} required />
          <button className="search-form__button button" type="submit">Найти</button>
        </div>
        <span className="search-form__error">{isQueryEmpty && "Нужно ввести ключевое слово"}</span>
        <FilterCheckbox filterCheckbox={shortQuery} onClickCheckbox={onClickCheckbox} />
      </form>
    </section>
  );
}

export default SearchForm;
