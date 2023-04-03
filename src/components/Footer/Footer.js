import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__block">
        <p className="footer__date">&copy; 2023</p>
        <div className="footer__info">
          <p className="footer__text">Яндекс.Практикум</p>
          <a className="footer__text link" href="https://github.com/sosalnet/movies-explorer-frontend" target="_blank" rel="noreferrer">Github</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
