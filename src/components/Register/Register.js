import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister, updatedConditionRegister }) {

  const [username, setUsername] = useState("");
  const [inputUsernameError, setInputUsernameError] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);

  const [useremail, setUseremail] = useState("");
  const [inputUseremailError, setInputUseremailError] = useState("");
  const [isUseremailValid, setIsUseremailValid] = useState(false);

  const [userpassword, setUserpassword] = useState("");
  const [inputUserpasswordError, setInputUserpasswordError] = useState("");
  const [isUserpasswordValid, setIsUserpasswordValid] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);
  const [infoText, setInfoText] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const errorMessages = {
    409: "Этот адрес электронной почты уже зарегистрирован.",
    500: "Произошла ошибка на сервере. Пожалуйста, повторите попытку позже.",
    default: "Произошла ошибка. Пожалуйста, повторите попытку позже.",
  };

  function handleUsernameChange(evt) {
    const inputs = evt.target.value;
    setUsername(inputs);
    const usernameRegex = /^[а-яА-ЯёЁa-zA-Z -]+$/g;
    if (!usernameRegex.test(String(inputs))) {
      setInputUsernameError('Имя не соответствует разрешенным символам: а-яА-Яa-zA-Z');
      setIsUsernameValid(false);
    }
    else if (inputs.length <= 1) {
      setInputUsernameError('Длина имени должна быть от 2 символов');
      setIsUsernameValid(false);
    }
    else {
      setIsUsernameValid(true);
      setInputUsernameError('');
    }
  }

  function handleUseremailChange(evt) {
    const inputs = evt.target.value;
    setUseremail(inputs);

    const useremailRegex = /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!useremailRegex.test(String(inputs).toLowerCase())) {
      setInputUseremailError('Введите корректный e-mail: ivanov@yandex.ru');
      setIsUseremailValid(false);
    }
    else if (inputs.length === 0) {
      setInputUseremailError('e-mail не может быть пустым');
      setIsUseremailValid(false);
    }
    else {
      setIsUseremailValid(true);
      setInputUseremailError('');
    }
  }

  function handleUserpasswordChange(evt) {
    const inputs = evt.target.value;
    setUserpassword(inputs);

    if (inputs.length === 0) {
      setInputUserpasswordError('Пароль не может быть пустым')
      setIsUserpasswordValid(false);
    } else {
      setInputUserpasswordError('')
      setIsUserpasswordValid(true);
    }
  }

  function validation() {
    if (!isUseremailValid || !isUserpasswordValid || !isUsernameValid) {
      setFormIsValid(false);
      return;
    }
    setFormIsValid(true);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    handleRegister(username, useremail, userpassword)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }

  useEffect(() => {
    validation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useremail, userpassword, isUsernameValid]);

  function handleApiMessage() {
    if (updatedConditionRegister) {
      const errorMessage = errorMessages[updatedConditionRegister] || errorMessages.default;
      setInfoText(errorMessage);
    }
  }

  useEffect(() => {
    handleApiMessage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedConditionRegister]);

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
            name="username"
            id="username"
            type="text"
            placeholder="Имя"
            value={username}
            onChange={handleUsernameChange}
            required
            disabled={isLoading}
          ></input>
          <span className="login-form__error">{inputUsernameError}</span>
          <label className="login-form__label">E-mail</label>
          <input
            className="login-form__input"
            name="useremail"
            id="useremail"
            type="useremail"
            placeholder="email"
            value={useremail}
            onChange={handleUseremailChange}
            required
            disabled={isLoading}
          ></input>
          <span className="login-form__error">{inputUseremailError}</span>
          <label className="login-form__label">Пароль</label>
          <input
            className="login-form__input"
            name="userpassword"
            id="userpassword"
            type="password"
            placeholder="Пароль"
            value={userpassword}
            onChange={handleUserpasswordChange}
            required
            disabled={isLoading}
          ></input>
          <span className="login-form__error">{inputUserpasswordError}</span>
          <span className="login-form__error">{infoText}</span>
          <button
            className={`login-form__button button ${formIsValid ? "" : "login-form__button_disabled"}`}
            name="submit"
            type="submit"
            disabled={!formIsValid}
          >Зарегистрироваться</button>
          <p className="login-form__text">Уже зарегистрированы?<Link className="login-form__link link" to="/signin">{" "} Войти</Link></p>
        </form>
      </div>
    </section>
  );
}

export default Register;
