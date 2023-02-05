class MoviesApi {
  constructor(apiConfig) {
    this._url = apiConfig.url;
    this._headers = apiConfig.headers;
  }

  _checkRespone(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status)
  }

  getMoviesCards() {
    return fetch(`${this._url}`, {
      headers: this._headers,
    })
    .then(this._checkRespone);
  }
}

export const moviesApi = new MoviesApi({
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    Authorization: "",
    "Content-Type": "application/json",
  }
})
