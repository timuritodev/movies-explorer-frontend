// eslint-disable-next-line no-unused-vars
const Api_url = "https://api.diploma-sosalnet.nomoredomains.club";
// eslint-disable-next-line no-unused-vars
const Local_api_url = "http://localhost:3001";

class MainApi {
  constructor(apiConfig) {
    this._url = apiConfig.url;
    this._headers = apiConfig.headers;
  }

  setAuthorizationToken(token) {
    this._headers.Authorization = `Bearer ${token}`;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then(this._checkResponse);
  };

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(this._checkResponse);
  };

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  setUserInfo(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, email })
    })
      .then(this._checkResponse)
  }

  saveMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse)
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this._checkResponse);
  }
}

export const mainApi = new MainApi({
  url: Local_api_url,
  headers: {
    Authorization: "",
    "Content-Type": "application/json"
  }
});
