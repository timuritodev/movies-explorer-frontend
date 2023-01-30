import React from "react";
import { Link } from 'react-router-dom';

function Promo() {
  return (
    <>
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
    </section>
    <div className="promo__links">
    <Link className="promo__link" to="/">О&nbsp;проекте</Link>
    <Link className="promo__link" to="/">Технологии</Link>
    <Link className="promo__link" to="/">Студент</Link>
  </div>
  </>
  );
}

export default Promo;
