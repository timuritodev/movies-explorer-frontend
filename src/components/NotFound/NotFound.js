import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">Страница не найдена</p>
      <Link className="login-form__link login-form__link_profile not-found__link link" to="#" onClick={handleGoBack}>Назад</Link>
    </section>
  );
}

export default NotFound;
