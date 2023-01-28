import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import NavAuth from "./NavAuth/NavAuth";

function Header({ isMainPage, togglePopupMenu }) {
  return (
    <header className={`header ${isMainPage ? "" : "header_dark"}`}>
      <Link className="header__logo link" to="/" />
      {isMainPage ? <NavAuth /> : <Navigation />}
      <button className={`button header__burger ${isMainPage ? "header__burger_invisible" : ""}`} type="button" onClick={togglePopupMenu}/>
    </header>
  );
}

export default Header;
