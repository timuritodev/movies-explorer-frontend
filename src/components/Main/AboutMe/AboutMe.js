import React from "react";
import photo from "../../../images/myphoto.jpeg"

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="section-title">Студент</h2>
      <div className="about-me__block">
        <div className="about-me__info">
          <h3 className="about-me__name">Тимур</h3>
          <p className="about-me__description">Фронтенд-разработчик, 20 лет</p>
          <p className="about-me__text">Я родился в Набережных Челнах, сейчас живу и учусь в Казани в КФУ на программиста.
          Люблю играть в компьютерные игры, слушать музыку, смотреть сериалы и различные фильмы. Кодить начал достаточно давно,
          но никогда не занимался этим всерьез, до курса по веб-разработке от Яндекса. Пока что нигде не работаю, но надеюсь в скором времени
          найти работу связанную с веб-разработкой.</p>
          <a className="about-me__link link" href="https://github.com/sosalnet" target="_blank" rel="noreferrer">Github</a>
        </div>
        <img className="about-me__img" src={photo} alt="Тимур, фронтенд-разработчик, 20 лет" />
      </div>
    </section>
  );
}

export default AboutMe;
