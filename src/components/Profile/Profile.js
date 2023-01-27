import React from "react";

function Profile() {
  return (
    <section className="profile">
      <h1 className="login__title">Привет, Тимур!</h1>
      <form className="profile-form">
        <div className="profile-form__block">
          <label className="profile-form__label">Имя</label>
          <input className="profile-form__input" name="profile-name" id="profile-name" type="text" placeholder="Тимур" />
        </div>
        <div className="profile-form__block">
          <label className="profile-form__label">E-mail</label>
          <input className="profile-form__input" name="profile-email" id="profile-email" type="email" placeholder="sosalnet@yandex.ru" />
        </div>
      </form>
      <button className="profile__button" type="submit">Редактировать</button>
      <button className="profile__button profile__button_exit" type="submit">Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;
