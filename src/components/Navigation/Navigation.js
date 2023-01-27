import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return(
    <nav className="navigation">
      <ul className="navigation__links">
        <Link className="navigation__link" to="/">Фильмы</Link>
        <Link className="navigation__link navigation__link_favourite" to="/">Сохранённые фильмы</Link>
        <Link className="navigation__link navigation__link_acc" to="/">Аккаунт</Link>
      </ul>
    </nav>
  );
};

export default Navigation;
