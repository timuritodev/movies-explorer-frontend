import React from "react";
import { NavLink } from 'react-router-dom';

function Navigation() {
  return(
    <nav className="navigation">
      <ul className="navigation__links">
        <NavLink to="/movies" className={({isActive}) => `navigation__link link ${isActive ? "navigation__link_active" : ""}`}>Фильмы</NavLink>
        <NavLink to="/saved-movies" className={({isActive}) => `navigation__link link ${isActive ? "navigation__link_active" : ""}`}>Сохранённые фильмы</NavLink>
        <NavLink className="navigation__link navigation__link_acc link" to="/profile">Аккаунт</NavLink>
      </ul>
    </nav>
  );
};

export default Navigation;
