import React from "react";
import { Link } from "react-router-dom";
import { Navigation } from "../Navigation/Navigation";
import NavAuth from "./NavAuth/NavAuth";

function Header() {
  return (
    <header className="header">
      <Link className="header__logo" to="/"></Link>
      <NavAuth />
    </header>
  );
}

export default Header;
