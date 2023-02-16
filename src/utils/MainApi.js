class MainApi {
  constructor(apiConfig) {
    this._url = apiConfig.url;
    this._headers = apiConfig.headers;
  }

  setToken(token) {
    this._headers.Authorization = `Bearer ${token}`;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  register(data) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(this._checkResponse);
  };

  authorize(data) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(this._checkResponse);
  };

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
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

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    })
      .then(this._checkResponse)
  }

  saveMovie(data, token) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse)
  }

    deleteMovie(id, token) {
        return fetch(`${this._url}/movies/${id}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._checkResponse);
    }
}

export const mainApi = new MainApi({
  url: 'http://localhost:3000',
  headers: {
    Authorization: '',
    'Content-Type': 'application/json'
  }
});
