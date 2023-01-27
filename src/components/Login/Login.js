import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="login">
      <div className="login__block">
      <Link className="header__logo" to="/"></Link>
      <h1 className="login__title">Рады, видеть!</h1>
      <form className="login-form" name="login">
        <label className="login-form__label">E-mail</label>
        <input className="login-form__input" name="email" id="email"  type="email" placeholder="Email"></input>
        <span className="login-form__error"></span>
        <label className="login-form__label">Пароль</label>
        <input className="login-form__input" name="password" id="password"  type="password" placeholder="Пароль"></input>
        <span className="login-form__error"></span>
        <button className="login-form__button" type="submit">Войти</button>
        <p className="login-form__text">Ещё не зарегистрированы?<Link className="login-form__link" to="/">{" "} Регистрация</Link></p>
      </form>
      </div>
    </section>
  );
}

export default Login;
