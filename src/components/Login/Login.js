import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Login({ handleLogin, updateLoginStatus }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputEmailError, setInputEmailError] = useState("");
  const [inputPasswordError, setInputPasswordError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  function handleApiMessage() {
    if (updateLoginStatus) {
      switch (updateLoginStatus) {
        case 400:
        case 401:
          setInfoMessage("Неверный логин или пароль");
          break;
        case 500:
          setInfoMessage("Попробуйте позже. Ошибка на сервере.")
          break;
        default:
          setInfoMessage("Попробуйте позже. Произошла ошибка");
          break;
      };
    };
  }

  useEffect(() => {
    handleApiMessage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateLoginStatus]);

  function makeFinalValidation() {
    if (!isEmailValid || !isPasswordValid) {
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);
  }

  function handleChangeEmail(evt) {
    let inputValue = evt.target.value;
    setEmail(inputValue);

    const emailRegex = /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (inputValue.length === 0) {
      setInputEmailError('e-mail не может быть пустым');
      setIsEmailValid(false);
    } else if (!emailRegex.test(String(inputValue).toLowerCase())) {
      setInputEmailError('Введите корректный e-mail: ivanov@yandex.ru');
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
      setInputEmailError('');
    }
  }

  function handleChangePassword(evt) {
    let inputValue = evt.target.value;
    setPassword(inputValue);

    if (inputValue.length === 0) {
      setInputPasswordError('Пароль не может быть пустым')
      setIsPasswordValid(false);
    } else {
      setInputPasswordError('')
      setIsPasswordValid(true);
    }
  }

  const resetForm = () => {
    setEmail("");
    setPassword("");
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(email, password, resetForm)
  }

  useEffect(() => {
    makeFinalValidation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password])

  return (
    <section className="login">
      <div className="login__block">
        <Link className="header__logo link" to="/"></Link>
        <h1 className="login__title">Рады, видеть!</h1>
        <form
          className="login-form"
          name="login"
          onSubmit={handleSubmit}
        >
          <label className="login-form__label">E-mail</label>
          <input
            className="login-form__input"
            name="email"
            id="email"
            type="email"
            value={email}
            onChange={handleChangeEmail}
            placeholder="Email"
            required
          ></input>
          <span className="login-form__error">{inputEmailError}</span>
          <label className="login-form__label">Пароль</label>
          <input
            className="login-form__input"
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={handleChangePassword}
            placeholder="Пароль"
            required
          ></input>
          <span className="login-form__error">{inputPasswordError}</span>
          <span className="login-form__error">{infoMessage}</span>
          <button
            className={`login-form__button button ${isFormValid ? "" : "login-form__button_disabled"}`}
            name="submit"
            type="submit"
            disabled={!isFormValid}
          >
            Войти</button>
          <p className="login-form__text">Ещё не зарегистрированы?<Link className="login-form__link link" to="/signup">{" "} Регистрация</Link></p>
        </form>
      </div>
    </section>
  );
}

export default Login;
