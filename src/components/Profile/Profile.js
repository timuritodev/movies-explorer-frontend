import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ onEditProfile, handleLogout }) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleUpdateUser(evt) {
    evt.preventDefault();
    onEditProfile({ name, email });
  }

  return (
    <section className="profile">
      <h1 className="login__title">Привет, Тимур!</h1>
      <form className="profile-form">
        <div className="profile-form__block">
          <label className="profile-form__label">Имя</label>
          <input className="profile-form__input" name="profile-name" id="profile-name" type="text" placeholder="Имя" value={name} onChange={handleChangeName}/>
        </div>
        <div className="profile-form__block">
          <label className="profile-form__label">E-mail</label>
          <input className="profile-form__input" name="profile-email" id="profile-email" type="email" placeholder="Email" value={email} onChange={handleChangeEmail}/>
        </div>
      </form>
      <button className="profile__button button" type="submit" onClick={handleUpdateUser}>Редактировать</button>
      <button className="profile__button profile__button_exit button" type="submit" onClick={handleLogout}>Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;
