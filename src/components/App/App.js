import { useEffect, useState, useMemo } from 'react';
import Header from '../Header/Header';
import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import PopupMenu from '../PopupMenu/PopupMenu';
import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { moviesApi } from '../../utils/MoviesApi';
import searchFilter from '../../utils/searchFilter';

function App() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });
  const [loggedIn, setLoggedIn] = useState(true);

  const [updateUserStatus, setUpdateUserStatus] = useState(false);
  const [updateRegisterStatus, setUpdateRegisterStatus] = useState(false);
  const [updateLoginStatus, setUpdateLoginStatus] = useState(false);

  const [isLoadingMoviesData, setIsLoadingMoviesData] = useState(false);

  const [isNeedUpdateCard, setIsNeedUpdateCard] = useState(false);

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  const [isMoviesApiError, setIsMoviesApiError] = useState(false);
  const [isFavouritesMoviesApiError, setIsFavouritesMoviesApiError] = useState(false);

  const { pathname } = useLocation();
  const urlHeaderRender = ['/', '/movies', '/saved-movies', '/profile'];
  const urlFooterRender = ['/', '/movies', '/saved-movies'];

  const isMainPage = useMemo(() => pathname === '/' ? true : false, [pathname]);
  let navigate = useNavigate();

  const mergeMovies = (bitFilmsMovies, savedMovies) => {
    return bitFilmsMovies.map((movie) => {
      const savedMovie = savedMovies.find((movieSaved) => movieSaved.movieId === movie.id)
      movie.saved = !!savedMovie;
      movie._id = savedMovie ? savedMovie._id : "";
      return movie;
    })
  }

  const filterMovies = (name, isShorts) => {
    setIsNeedUpdateCard(true);
    localStorage.setItem('search-name', name);
    localStorage.setItem('search-isShorts', JSON.stringify(isShorts));

    const filter = (films) => {
      const filteredFilms = searchFilter(name, isShorts, films);
      setFilteredMovies(filteredFilms);
    }

    if (movies.length === 0) {
      const localMovies = JSON.parse(localStorage.getItem('movies') || "[]");
      if (localMovies.length === 0) {
        setIsLoadingMoviesData(true);
        const jwt = localStorage.getItem("jwt");
        mainApi.setToken(jwt);

        Promise.all([moviesApi.getMoviesCards(), mainApi.getSavedMovies()])
          .then(([bitFilmsMovies, { data: savedMovies }]) => {
            const mergedMovies = mergeMovies(bitFilmsMovies, savedMovies)
            setIsMoviesApiError(false);
            setMovies(mergedMovies);
            filter(mergedMovies)
            localStorage.setItem('movies', JSON.stringify(mergedMovies));
            setIsMoviesApiError(false);
          })
          .catch((err) => {
            console.log(err);
            setIsMoviesApiError(true);
          })
          .finally(() => {
            setIsLoadingMoviesData(false);
          })
      } else {
        setMovies(localMovies);
        filter(localMovies);
      }

    } else {
      filter(movies);
    }
  }

  const filterSavedMovies = (name, isShorts) => {
    setIsNeedUpdateCard(true);

    const filter = (films) => {
      const filteredFilms = searchFilter(name, isShorts, films);
      setFilteredSavedMovies(filteredFilms);
    }

    if (savedMovies.length === 0) {
      const localMovies = JSON.parse(localStorage.getItem('saved-movies') || "[]");
      if (localMovies.length === 0) {
        setIsLoadingMoviesData(true);
        const jwt = localStorage.getItem("jwt");
        mainApi.setToken(jwt);
        mainApi.getSavedMovies()
          .then((res) => {
            const cards = res.data.map((card) => {
              card.saved = true;
              return card;
            })

            setSavedMovies(cards);
            filter(cards)
            localStorage.setItem('saved-movies', JSON.stringify(cards));
            setIsFavouritesMoviesApiError(false);
          })
          .catch((err) => {
            console.log(err);
            setIsFavouritesMoviesApiError(true);
          })
          .finally(() => {
            setIsLoadingMoviesData(false);
          })
      } else {
        setSavedMovies(localMovies);
        filter(localMovies);
      }

    } else {
      filter(savedMovies);
    }
  }

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    mainApi.setToken(jwt)
    if (jwt) {
      mainApi.getUserInfo()
        .then((userData) => {
          if (userData) {
            setCurrentUser(userData.user);
            setLoggedIn(true);
          } else {
            setLoggedIn(false);
            navigate("/");
          }
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(`Переданный токен некорректен: ${err}`);
        });
    } else {
      setLoggedIn(false);
    }
  }

  const handleLogin = (userEmail, userPassword, resetLoginForm) => {
    if (!userEmail || !userPassword) {
      return;
    }
    mainApi
      .authorize(userEmail, userPassword)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          navigate("/movies");
          resetLoginForm && resetLoginForm();
        }
      })
      .catch((err) => {
        setUpdateLoginStatus(err);
        console.log(err);
      });
  };

  const handleRegister = (userEmail, userPassword, userName, resetRegisterForm) => {
    mainApi
      .register(userEmail, userPassword, userName)
      .then((res) => {
        handleLogin(userEmail, userPassword);
        resetRegisterForm && resetRegisterForm();
      })
      .catch((err) => {
        setUpdateRegisterStatus(err);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser({});
    setMovies([]);
    setSavedMovies([]);
    navigate("/signin");
    setLoggedIn(false);
  };

  function handleUpdateUser(name, email, setIsEditDone) {
    mainApi.setUserInfo(name, email)
      .then((userData) => {
        setCurrentUser(userData.data);
        setIsEditDone(true);
        setUpdateUserStatus(200);
      })
      .catch ((err) => {
      setIsEditDone(false);
      setUpdateUserStatus(err);
      console.log(err);
    })
  }

  function compareUrl(urlList) {
    for (let key in urlList) {
      if (urlList[key] === pathname) {
        return true;
      }
    }
    return false;
  }

  const togglePopupMenu = () => {
    setIsPopupOpen(!isPopupOpen);
  }

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const handleSaveFavMovie = (card) => {
    setIsNeedUpdateCard(true);
    const promise = card.saved ? mainApi.deleteSavedMovie(card._id) : mainApi.saveMovie(card);
    promise
      .then(() => mainApi.getSavedMovies())
      .then(({ data }) => {
        const cards = data.map((card) => {
          card.saved = true;
          return card;
        })
        localStorage.setItem('saved-movies', JSON.stringify(cards));
        setSavedMovies(() => cards);
        const mergedMovies = mergeMovies(movies, cards)
        setMovies(() => mergedMovies);
        localStorage.setItem('movies', JSON.stringify(mergedMovies));
      })
      .catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    if (isNeedUpdateCard) {
      filterSavedMovies("", false);
      setIsNeedUpdateCard(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMovies.length])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {compareUrl(urlHeaderRender) ? <Header loggedIn={loggedIn} isMainPage={isMainPage} togglePopupMenu={togglePopupMenu} /> : null}

        <Routes>
          <Route exact path='/' element={<Main />}>
          </Route>
          <Route path='/movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Movies
                filterMovies={filterMovies}
                isLoadingData={isLoadingMoviesData}
                isMoviesApiError={isMoviesApiError}
                moviesData={filteredMovies}
                onSaveMovie={handleSaveFavMovie}
              />
            </ProtectedRoute>
          }>
          </Route>
          <Route path='/saved-movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies
                isLoadingData={isLoadingMoviesData}
                savedMovies={filteredSavedMovies}
                handleSearchSavedMovies={filterSavedMovies}
                onSaveMovie={handleSaveFavMovie}
                isFavouritesMoviesApiError={isFavouritesMoviesApiError}
              />
            </ProtectedRoute>
          }>
          </Route>
          <Route path='/profile' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile onEditProfile={handleUpdateUser} handleLogout={handleLogout} updateUserStatus={updateUserStatus} />
            </ProtectedRoute>
          }>
          </Route>
          <Route path='/signup' element={
            <ProtectedRoute loggedIn={!loggedIn}>
              <Register handleRegister={handleRegister} handleLogin={handleLogin} updateRegisterStatus={updateRegisterStatus} />
            </ProtectedRoute>
          }>
          </Route>
          <Route path='/signin' element={
            <ProtectedRoute loggedIn={!loggedIn}>
              <Login handleLogin={handleLogin} updateLoginStatus={updateLoginStatus} />
            </ProtectedRoute>
          }>
          </Route>
          <Route path="*" element={<NotFound />}>
          </Route>
        </Routes>

        {compareUrl(urlFooterRender) ? <Footer /> : null}

        <PopupMenu isOpen={isPopupOpen} togglePopupMenu={togglePopupMenu} compareUrl={compareUrl} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
