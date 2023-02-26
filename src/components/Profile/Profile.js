import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ onEditProfile, handleLogout, updateUserStatus }) {

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [isEditDone, setIsEditDone] = useState(false);
  const [inputNameError, setInputNameError] = useState("");
  const [inputEmailError, setInputEmailError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    setNewName(currentUser.name);
    setNewEmail(currentUser.email);
  }, [currentUser]);

  function handleApiMessage() {
    if (updateUserStatus) {
      switch (updateUserStatus) {
        case 200:
          setInfoMessage("Данные были обновлены");
          setIsFormValid(false);
          break;
        case 409:
          setInfoMessage("Пользователь с такой почтой уже существует");
          setIsFormValid(false);
          break;
        case 500:
          setInfoMessage("Попробуйте позже. Ошибка на сервере.");
          setIsFormValid(false);
          break;
        default:
          setInfoMessage("Попробуйте позже. Произошла ошибка");
          setIsFormValid(false);
          break;
      };
    };
  }

  useEffect(() => {
    handleApiMessage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUserStatus, isEditDone]);

  function makeFinalValidation() {
    if (name === newName && email === newEmail) {
      setInfoMessage('Внесите изменение в поле');
      setIsFormValid(false);
      return;
    }

    if (!isNameValid && !isEmailValid) {
      setInfoMessage('');
      setIsFormValid(false);
      return;
    }

    setIsFormValid(true);
  }

  function handleChangeName(evt) {
    let inputValue = evt.target.value;
    setNewName(inputValue);
    setInfoMessage("");
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
    setNewEmail(inputValue);
    setInfoMessage("");
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

  useEffect(() => {
    makeFinalValidation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newName, newEmail])

  function handleUpdateUser(evt) {
    evt.preventDefault();
    setIsEditDone(false);
    onEditProfile(newName, newEmail, setIsEditDone);
  }

  return (
    <section className="profile">
      <h1 className="login__title">Привет, {name}!</h1>
      <form className="profile-form" name="profile-form">
        <div className="profile-form__block">
          <label className="profile-form__label">Имя</label>
          <input
            className="profile-form__input"
            name="profile-name"
            id="profile-name"
            type="text"
            placeholder="Имя"
            value={newName}
            onChange={handleChangeName}
            required
          />
        </div>
        <span className="login-form__error">{inputNameError}</span>
        <div className="profile-form__block">
          <label className="profile-form__label">E-mail</label>
          <input
            className="profile-form__input"
            name="profile-email"
            id="profile-email"
            type="email"
            placeholder="Email"
            value={newEmail}
            onChange={handleChangeEmail}
            required
          />
        </div>
        <span className="login-form__error">{inputEmailError}</span>
      </form>
      <button
        className={`profile__button button ${isFormValid ? "" : "profile__button_disabled"}`}
        type="submit"
        onClick={handleUpdateUser}
        disabled={!isFormValid}
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
