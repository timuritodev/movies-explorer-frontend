import React, {useState} from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ handleGetMovies }) {

  const lastFiltercheckbox = (localStorage.getItem("filtercheckbox") === "true") ? true : false;
  const lastSearch = localStorage.getItem("request");

  const [filtercheckbox, setFiltercheckbox] = useState(lastFiltercheckbox);
  const [request, setReqeust] = useState("" || lastSearch);

  const handleRequest = (evt) => {
    setReqeust(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (request === "") {
      console.log("Нужно ввести запрос");
      return;
    }
    handleGetMovies(request, filtercheckbox);
  }

  return (
    <section className="search-form">
      <form className="search-form__form" name="search-form" onSubmit={handleSubmit}>
        <div className="search-form__block">
          <input className="search-form__input" id="search-input" name="search-input" type="text" placeholder="Фильм" onChange={handleRequest} required />
          <button className="search-form__button button" type="submit">Найти</button>
        </div>
        <FilterCheckbox filtercheckbox={filtercheckbox} handleCheckbox={setFiltercheckbox}/>
      </form>
    </section>
  );
}

export default SearchForm;
