import React from "react";
import { Link } from "react-router-dom";

function PopupMenu({ isOpen, togglePopupMenu }) {
  return (
    <div className={`popup-menu ${isOpen ? "popup-menu_opened" : ""}`}>
      <div className="popup-menu__block">
        <button className="popup-menu__close button" type="button" onClick={togglePopupMenu}></button>
        <nav className="popup-menu__nav">
          <ul className="popup-menu__links">
            <li><Link className="popup-menu__link link" to="/" onClick={togglePopupMenu}>Главная</Link></li>
            <li><Link className="popup-menu__link popup-menu__link_line link" to="/movies" onClick={togglePopupMenu}>Фильмы</Link></li>
            <li><Link className="popup-menu__link popup-menu__link_fav link" to="/saved-movies" onClick={togglePopupMenu}>Сохранённые фильмы</Link></li>
          </ul>
          <Link className="popup-menu__link popup-menu__link_acc link" to="/">Аккаунт</Link>
        </nav>
      </div>
    </div>
  );
}

export default PopupMenu;
