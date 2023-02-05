import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value)
  }

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value)
  }

  const resetForm = () => {
    setEmail("");
    setPassword("");
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(email, password, resetForm)
  }

  return (
    <section className="login">
      <div className="login__block">
        <Link className="header__logo link" to="/"></Link>
        <h1 className="login__title">Рады, видеть!</h1>
        <form className="login-form" name="login" onSubmit={handleSubmit}>
          <label className="login-form__label">E-mail</label>
          <input className="login-form__input" name="email" id="email" type="email" value={email} onChange={handleChangeEmail} placeholder="Email"></input>
          <span className="login-form__error"></span>
          <label className="login-form__label">Пароль</label>
          <input className="login-form__input" name="password" id="password" type="password" value={password} onChange={handleChangePassword} placeholder="Пароль"></input>
          <span className="login-form__error"></span>
          <button className="login-form__button" name="submit" type="submit button">Войти</button>
          <p className="login-form__text">Ещё не зарегистрированы?<Link className="login-form__link link" to="/signup">{" "} Регистрация</Link></p>
        </form>
      </div>
    </section>
  );
}

export default Login;
