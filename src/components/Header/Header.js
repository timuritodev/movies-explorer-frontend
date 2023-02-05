import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import NavAuth from "./NavAuth/NavAuth";

function Header({ loggedIn, isMainPage, togglePopupMenu }) {
  return (
    <header className={`header ${isMainPage ? "" : "header_dark"}`}>
      <Link className="header__logo link" to="/" />
      {loggedIn ? <Navigation /> : <NavAuth /> }
      <button className={`button header__burger ${loggedIn ? "" : "header__burger_invisible"}`} type="button" onClick={togglePopupMenu}/>
    </header>
  );
}

export default Header;
