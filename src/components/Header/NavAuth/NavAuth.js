import React from "react";
import { Link } from "react-router-dom";

function NavAuth() {
  return (
    <nav className="nav-auth">
      <ul className="nav-auth__list">
        <Link className="nav-auth__link link" to="/signup">Регистрация</Link>
        <Link className="nav-auth__link nav-auth__link_log link" to="/sigin">Войти</Link>
      </ul>
    </nav>
);
}

export default NavAuth;
