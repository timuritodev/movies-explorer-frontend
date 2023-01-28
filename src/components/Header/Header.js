import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import NavAuth from "./NavAuth/NavAuth";

function Header({ isMainPage }) {
  return (
    <header className={`header ${isMainPage ? "" : "header_dark"}`}>
      <Link className="header__logo link" to="/" />
      {isMainPage ? <NavAuth /> : <Navigation />}
    </header>
  );
}

export default Header;
