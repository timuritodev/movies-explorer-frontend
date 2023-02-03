import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return(
    <nav className="navigation">
      <ul className="navigation__links">
        <Link className="navigation__link link" to="/movies">Фильмы</Link>
        <Link className="navigation__link navigation__link_favourite link" to="/saved-movies">Сохранённые фильмы</Link>
        <Link className="navigation__link navigation__link_acc link" to="/profile">Аккаунт</Link>
      </ul>
    </nav>
  );
};

export default Navigation;
