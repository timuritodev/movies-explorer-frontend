import React from "react";
import { Link } from "react-router-dom";

function Popup({ isPopupOpen, switchPopup }) {

  return (
    <div className={`popup ${isPopupOpen ? "popup_opened" : ""}`}>
      <div className="popup__block">
        <button className="popup__close button" type="button" onClick={switchPopup}></button>
        <nav className="popup__nav">
          <ul className="popup__links">
            <li><Link className="popup__link link" to="/" onClick={switchPopup}>Главная</Link></li>
            <li><Link className="popup__link popup__link_line link" to="/movies" onClick={switchPopup}>Фильмы</Link></li>
            <li><Link className="popup__link popup__link_fav link" to="/saved-movies" onClick={switchPopup}>Сохранённые фильмы</Link></li>
          </ul>
          <Link className="popup__link popup__link_acc link" to="/profile" onClick={switchPopup}>Аккаунт</Link>
        </nav>
      </div>
    </div>
  );
}

export default Popup;
