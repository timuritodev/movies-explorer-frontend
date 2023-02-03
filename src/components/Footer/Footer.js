import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__block">
        <p className="footer__date">&copy; 2023</p>
        <div className="footer__info">
          <p className="footer__text">Яндекс.Практикум</p>
          <Link className="footer__text link" to="https://github.com/sosalnet/movies-explorer-frontend" target="_blank">Github</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
