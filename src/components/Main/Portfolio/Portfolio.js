import React from "react";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__block">
        <li className="portfolio__links"><a className="portfolio__link link" href="https://github.com/sosalnet/how-to-learn" target="_blank" rel="noreferrer">Статичный сайт</a></li>
        <li className="portfolio__links"><a className="portfolio__link link" href="https://github.com/sosalnet/russian-travel" target="_blank" rel="noreferrer">Адаптивный сайт</a></li>
        <li className="portfolio__links"><a className="portfolio__link link" href="https://github.com/sosalnet/react-mesto-api-full" target="_blank" rel="noreferrer">Одностраничное приложение</a></li>
      </ul>
    </section>
  );
}

export default Portfolio;
