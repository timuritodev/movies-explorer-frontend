import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile({ handleUpdate, handleLogout }) {

  const currentUser = useContext(CurrentUserContext);

  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [inputUsernameError, setInputUsernameError] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);

  const [useremail, setUseremail] = useState("");
  const [newUsermail, setNewUsermail] = useState("");
  const [inputUseremailError, setInputUseremailError] = useState("");
  const [isUseremailValid, setIsUseremailValid] = useState(false);

  const [infoText, setInfoText] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const errorMessages = {
    200: "Данные были обновлены",
    409: "Пользователь с такой почтой уже существует",
    500:  "Попробуйте позже. Ошибка на сервере.",
    default: "Попробуйте позже. Произошла ошибка",
  };

  function handleUsernameChange(evt) {
    const inputs = evt.target.value;
    setNewUsername(inputs);
    setInfoText("");
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
    setNewUsermail(inputs);
    setInfoText("");
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

  function validation() {
    if (username === newUsername && useremail === newUsermail) {
      setInfoText('Внесите изменение в поле');
      setFormIsValid(false);
      return;
    }

    if (!isUsernameValid && !isUseremailValid) {
      setInfoText('');
      setFormIsValid(false);
      return;
    }

    setFormIsValid(true);
  }

  useEffect(() => {
    validation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newUsername, newUsermail])

  function handleUpdateUser(evt) {
    evt.preventDefault();
    setIsSubmitting(true);
    handleUpdate(newUsername, newUsermail)
      .then(() => {
        setIsEdit(false);
        setIsSubmitting(false);
      })
      .catch(() => setIsSubmitting(false));
  }

  function handleApiMessage(updatedCondition) {
    if (updatedCondition) {
      const errorMessage = errorMessages[updatedCondition] || errorMessages.default;
      setInfoText(errorMessage);
    }
  }

  useEffect(() => {
    handleApiMessage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isEdit ]);

  useEffect(() => {
    setUsername(currentUser.name);
    setUseremail(currentUser.email);
    setNewUsername(currentUser.name);
    setNewUsermail(currentUser.email);
  }, [currentUser]);

  return (
    <section className="profile">
      <h1 className="login__title">Привет, {username}!</h1>
      <form className="profile-form" name="profile-form">
        <div className="profile-form__block">
          <label className="profile-form__label">Имя</label>
          <input
            className="profile-form__input"
            name="profile-name"
            id="profile-name"
            type="text"
            placeholder="Имя"
            value={newUsername}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <span className="login-form__error">{inputUsernameError}</span>
        <div className="profile-form__block">
          <label className="profile-form__label">E-mail</label>
          <input
            className="profile-form__input"
            name="profile-email"
            id="profile-email"
            type="email"
            placeholder="Email"
            value={newUsermail}
            onChange={handleUseremailChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <span className="login-form__error">{inputUseremailError}</span>
      </form>
      <span className={`login-form__error ${isEdit ? "profile-form__error_positive" : ""}`}>{infoText}</span>
      <button
        className={`profile__button ${formIsValid ? "" : "profile__button_disabled"}`}
        type="submit"
        onClick={handleUpdateUser}
        disabled={!formIsValid || isSubmitting}
      >
        Редактировать</button>
      <button
        className="profile__button profile__button_exit button"
        type="button"
        onClick={handleLogout}
      >
        Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;
