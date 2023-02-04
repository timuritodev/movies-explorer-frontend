class MainApi {
  constructor(apiConfig) {
      this._baseUrl = apiConfig.baseUrl;
      this._headers = apiConfig.headers;
  }

  setToken(token) {
    this._headers.Authorization = `Bearer ${token}`;
  }

  _checkResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password, name: name }),
    })
    .then(this._checkResponse);
  };

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    .then(this._checkResponse);
  };

  getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
              method: 'GET',
              headers: this._headers
          })
          .then(this._checkResponse)
  }

  // getCards() {
  //     return fetch(`${this._baseUrl}/cards`, {
  //             method: 'GET',
  //             headers: this._headers
  //         })
  //         .then(this._checkResponse)
  // }

  setUserInfo(name, email) {
      return fetch(`${this._baseUrl}/users/me`, {
              method: 'PATCH',
              headers: this._headers,
              body: JSON.stringify({
                  name: name,
                  about: email
              })
          })
          .then(this._checkResponse)
  }

//   addNewCard(name, link) {
//       return fetch(`${this._baseUrl}/cards`, {
//               method: 'POST',
//               headers: this._headers,
//               body: JSON.stringify({
//                   name: name,
//                   link: link
//               })
//           })
//           .then(this._checkResponse)
//   }

//   changeLikeCardStatus(id, isLiked) {
//       return fetch(`${this._baseUrl}/cards/likes/${id}`, {
//               method: isLiked ? 'PUT' : 'DELETE',
//               headers: this._headers
//           })
//           .then(this._checkResponse);
//   }

//   deleteCard(id) {
//       return fetch(`${this._baseUrl}/cards/${id}`, {
//               method: 'DELETE',
//               headers: this._headers
//           })
//           .then(this._checkResponse);
//   }

//   addNewAvatar(avatar) {
//       return fetch(`${this._baseUrl}/users/me/avatar`, {
//               method: 'PATCH',
//               headers: this._headers,
//               body: JSON.stringify({
//                   avatar: avatar.avatar
//               })
//           })
//           .then(this._checkResponse);
//   }
// }
}

export const mainApi = new MainApi({
  baseUrl: 'http://localhost:3001',
  headers: {
      Authorization: '',
      'Content-Type': 'application/json'
  }
});
