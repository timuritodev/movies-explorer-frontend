import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Login({ handleLogin }) {

  const [useremail, setUseremail] = useState("");
  const [inputUseremailError, setInputUseremailError] = useState("");
  const [isUseremailValid, setIsUseremailValid] = useState(false);

  const [userpassword, setUserpassword] = useState("");
  const [inputUserpasswordError, setInputUserpasswordError] = useState("");
  const [isUserpasswordValid, setIsUserpasswordValid] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);
  const [infoText, setInfoText] = useState("");

  const errorMessages = {
    401: "Неверный логин или пароль",
    500: "Попробуйте позже. Ошибка на сервере.",
    default: "Попробуйте позже. Произошла ошибка",
  };

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
    }
    else {
      setInputUserpasswordError('')
      setIsUserpasswordValid(true);
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(useremail, userpassword)
  }

  function validation() {
    if (!isUseremailValid || !isUserpasswordValid) {
      setFormIsValid(false);
      return;
    }
    setFormIsValid(true);
  }

  useEffect(() => {
    validation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useremail, userpassword])

  function handleApiMessage(updatedCondition) {
    if (updatedCondition) {
      const errorMessage = errorMessages[updatedCondition] || errorMessages.default;
      setInfoText(errorMessage);
    }
  }

  useEffect(() => {
    handleApiMessage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            value={useremail}
            onChange={handleUseremailChange}
            placeholder="Email"
            required
          ></input>
          <span className="login-form__error">{inputUseremailError}</span>
          <label className="login-form__label">Пароль</label>
          <input
            className="login-form__input"
            name="password"
            id="password"
            type="password"
            value={userpassword}
            onChange={handleUserpasswordChange}
            placeholder="Пароль"
            required
          ></input>
          <span className="login-form__error">{inputUserpasswordError}</span>
          <span className="login-form__error">{infoText}</span>
          <button
            className={`login-form__button button ${formIsValid ? "" : "login-form__button_disabled"}`}
            name="submit"
            type="submit"
            disabled={!formIsValid}
          >
            Войти</button>
          <p className="login-form__text">Ещё не зарегистрированы?<Link className="login-form__link link" to="/signup">{" "} Регистрация</Link></p>
        </form>
      </div>
    </section>
  );
}

export default Login;
