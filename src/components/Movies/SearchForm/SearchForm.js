import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <div className="search-form__block">
          <input className="search-form__input" id="search-form" name="search-form" type="text" placeholder="Фильм" required />
          <button className="search-form__button button" type="submit">Найти</button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;
