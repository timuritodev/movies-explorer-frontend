import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ onEditProfile, handleLogout }) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [textError, setTextError] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    setNewName(currentUser.name);
    setNewEmail(currentUser.email);
  }, [currentUser]);

  function handleChangeName(evt) {
    setNewName(evt.target.value);
    setTextError("");
  }

  function handleChangeEmail(evt) {
    setNewEmail(evt.target.value);
    setTextError("");
  }

  function handleUpdateUser(evt) {
    evt.preventDefault();
    if (name === newName || email === newEmail) {
      setTextError('Введите новые данные');
      return;
    }
    onEditProfile(newName, newEmail);
  }

  return (
    <section className="profile">
      <h1 className="login__title">Привет, Тимур!</h1>
      <form className="profile-form">
        <div className="profile-form__block">
          <label className="profile-form__label">Имя</label>
          <input className="profile-form__input" name="profile-name" id="profile-name" type="text" placeholder="Имя" value={newName || name} onChange={handleChangeName} />
        </div>
        <div className="profile-form__block">
          <label className="profile-form__label">E-mail</label>
          <input className="profile-form__input" name="profile-email" id="profile-email" type="email" placeholder="Email" value={newEmail || email} onChange={handleChangeEmail} />
        </div>
        <span className="profile-form__input-error">{textError}</span>
      </form>
      <button className="profile__button button" type="submit" onClick={handleUpdateUser}>Редактировать</button>
      <button className="profile__button profile__button_exit button" type="submit" onClick={handleLogout}>Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;
