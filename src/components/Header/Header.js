import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import NavAuth from "./NavAuth/NavAuth";

function Header({ loggedIn, switchPopup }) {
  const location = useLocation();
  return (
    <header className={`header ${location.pathname === "/" ? "" : "header_dark"}`}>
      <Link className="header__logo link" to="/" />
      {loggedIn ? <Navigation /> : <NavAuth /> }
      <button className={`button header__burger ${loggedIn ? "" : "header__burger_invisible"}`} type="button" onClick={switchPopup}/>
    </header>
  );
}

export default Header;
