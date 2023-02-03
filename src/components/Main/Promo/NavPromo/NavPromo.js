import React from "react";
import { Link } from 'react-router-dom';

function Promo() {
  return (
    <section className="nav-promo">
      <ul className="nav-promo__links">
        <li><Link className="nav-promo__link" to="/">О&nbsp;проекте</Link></li>
        <li><Link className="nav-promo__link" to="/">Технологии</Link></li>
        <li><Link className="nav-promo__link" to="/">Студент</Link></li>
      </ul>
    </section>
  );
}

export default Promo;
