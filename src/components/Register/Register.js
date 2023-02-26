import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister, updateRegisterStatus, handleLogin }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputNameError, setInputNameError] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [inputEmailError, setInputEmailError] = useState("");
  const [inputPasswordError, setInputPasswordError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  function handleApiMessage() {
    if (updateRegisterStatus) {
      switch (updateRegisterStatus) {
        case 409:
          setInfoMessage("Пользователь с такой почтой уже существует");
          break;
        case 500:
          setInfoMessage("Попробуйте позже. Ошибка на сервере.");
          break;
        default:
          setInfoMessage("Попробуйте позже. Произошла ошибка");
          break;
      };
    }
  }

  useEffect(() => {
    handleApiMessage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateRegisterStatus]);

  function handleChangeName(evt) {
    let inputValue = evt.target.value;
    setName(inputValue);
    const nameRegex = /^[а-яА-ЯёЁa-zA-Z -]+$/g;
    if (inputValue.length < 2 || inputValue.length > 30) {
      setInputNameError('Длина имени должна быть от 2 до 30 слов');
      setIsNameValid(false);
    } else if (!nameRegex.test(String(inputValue))) {
      setInputNameError('Имя не соответствует разрешенным символам: а-яА-Яa-zA-Z');
      setIsNameValid(false);
    } else {
      setIsNameValid(true);
      setInputNameError('');
    }
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

  function makeFinalValidation() {
    if (!isEmailValid || !isPasswordValid || !isNameValid) {
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);
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

  useEffect(() => {
    makeFinalValidation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, isNameValid]);

  return (
    <section className="login">
      <div className="login__block">
        <Link className="header__logo link" to="/"></Link>
        <h1 className="login__title">Добро пожаловать!</h1>
        <form
          className="login-form"
          name="register"
          onSubmit={handleSubmit}>
          <label className="login-form__label">Имя</label>
          <input
            className="login-form__input"
            name="name"
            id="name"
            type="text"
            placeholder="Имя"
            value={name}
            onChange={handleChangeName}
            required
          ></input>
          <span className="login-form__error">{inputNameError}</span>
          <label className="login-form__label">E-mail</label>
          <input
            className="login-form__input"
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
            required
          ></input>
          <span className="login-form__error">{inputEmailError}</span>
          <label className="login-form__label">Пароль</label>
          <input
            className="login-form__input"
            name="password"
            id="password"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={handleChangePassword}
          ></input>
          <span className="login-form__error">{inputPasswordError}</span>
          <span className="login-form__error">{infoMessage}</span>
          <button
            className={`login-form__button button ${isFormValid ? "" : "login-form__button_disabled"}`}
            name="submit"
            type="submit"
            disabled={!isFormValid}
          >Зарегистрироваться</button>
          <p className="login-form__text">Уже зарегистрированы?<Link className="login-form__link link" to="/signin">{" "} Войти</Link></p>
        </form>
      </div>
    </section>
  );
}

export default Register;
