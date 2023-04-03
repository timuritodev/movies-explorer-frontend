import React from "react";
import { Link, NavLink } from 'react-router-dom';

function Popup({ isPopupOpen, switchPopup }) {

  return (
    <div className={`popup ${isPopupOpen ? "popup_opened" : ""}`}>
      <div className="popup__block">
        <button className="popup__close button" type="button" onClick={switchPopup}></button>
        <nav className="popup__nav">
          <ul className="popup__links">
            <li><NavLink to="/" className={({isActive}) => `popup__link link ${isActive ? "popup__link_line" : ""}`} onClick={switchPopup}>Главная</NavLink></li>
            <li><NavLink to="/movies" className={({isActive}) => `popup__link link ${isActive ? "popup__link_line" : ""}`} onClick={switchPopup}>Фильмы</NavLink></li>
            <li><NavLink to="/saved-movies" className={({isActive}) => `popup__link link ${isActive ? "popup__link_line" : ""}`} onClick={switchPopup}>Сохранённые фильмы</NavLink></li>
          </ul>
          <Link className="popup__link popup__link_acc link" to="/profile" onClick={switchPopup}>Аккаунт</Link>
        </nav>
      </div>
    </div>
  );
}

export default Popup;
