import React from "react";

function Techs() {
  return (
    <section className="techs">
      <div className="techs__container">
      <h2 className="section-title">Технологии</h2>
      <p className="techs__subtitle">7 технологий</p>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__lists">
        <li className="techs__list">HTML</li>
        <li className="techs__list">CSS</li>
        <li className="techs__list">JS</li>
        <li className="techs__list">React</li>
        <li className="techs__list">Git</li>
        <li className="techs__list">Express.js</li>
        <li className="techs__list">mongoDB</li>
      </ul>
      </div>
    </section>
  );
}

export default Techs;
