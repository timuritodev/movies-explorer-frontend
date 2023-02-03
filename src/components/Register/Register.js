import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeName = (evt) => {
    setName(evt.target.value)
  }

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value)
  }

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value)
  }

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegister(email, password, name, resetForm)
  }

  return (
    <section className="login">
      <div className="login__block">
      <Link className="header__logo link" to="/"></Link>
      <h1 className="login__title">Добро пожаловать!</h1>
      <form className="login-form" name="register" onSubmit={ handleSubmit}>
        <label className="login-form__label">Имя</label>
        <input className="login-form__input" name="name" id="name"  type="text" placeholder="Имя" value={name} onChange={handleChangeName}></input>
        <span className="login-form__error"></span>
        <label className="login-form__label">E-mail</label>
        <input className="login-form__input" name="email" id="email"  type="email" placeholder="Email" value={email} onChange={handleChangeEmail}></input>
        <span className="login-form__error"></span>
        <label className="login-form__label">Пароль</label>
        <input className="login-form__input" name="password" id="password"  type="password" placeholder="Пароль" value={password} onChange={handleChangePassword}></input>
        <span className="login-form__error"></span>
        <button className="login-form__button button" type="submit">Зарегистрироваться</button>
        <p className="login-form__text">Уже зарегистрированы?<Link className="login-form__link link" to="/signin">{" "} Войти</Link></p>
      </form>
      </div>
    </section>
  );
}

export default Register;
