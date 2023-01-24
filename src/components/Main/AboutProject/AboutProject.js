import React from "react";

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="section__title">О проекте</h2>
      <div className="about-project__info">
        <p className="about-project__title">Дипломный проект включал 5 этапов</p>
        <p className="about-project__title">На выполнение диплома ушло 5 недель</p>
        <p className="about-project__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <p className="about-project__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="about-project__time">
        <div className="about-project__time-line about-project__time-line_green">1 неделя</div>
        <div className="about-project__time-line">4 недели</div>
        <p className="about-project__time-text">Back-end</p>
        <p className="about-project__time-text">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
