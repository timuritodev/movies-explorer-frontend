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

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [noMoviesFound, setNoMoviesFound] = useState(false);
  const [noSavedMoviesFound, setNoSavedMoviesFound] = useState(false);
  const [loadingMoviesData, setLoadingMoviesData] = useState(false);
  const [savedMoviesFound, setSavedMoviesFound] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [getSavedMoviesResStatus, setGetSavedMoviesResStatus] = useState(null);
  const [savedMoviesNull, setSavedMoviesNull] = useState(false);
  const [moviesApiResStatus, setMoviesApiResStatus] = useState(null);

  const { pathname } = useLocation();
  const urlHeaderRender = ['/', '/movies', '/saved-movies', '/profile'];
  const urlFooterRender = ['/', '/movies', '/saved-movies'];

  const isMainPage = useMemo(() => pathname === '/' ? true : false, [pathname]);
  let navigate = useNavigate();

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    mainApi.setToken(jwt)
    if (jwt) {
      mainApi.getUserInfo()
        .then((userData) => {
          if (userData) {
            setCurrentUser(userData);
            setLoggedIn(true);
            navigate("/movies");
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
      navigate("/");
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
          resetLoginForm();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRegister = (userEmail, userPassword, userName, resetRegisterForm) => {
    mainApi
      .register(userEmail, userPassword, userName)
      .then((res) => {
        console.log('handleRegister', res);
        navigate("/signin");
        resetRegisterForm();
        console.log("Успех регистрации", res);
      })
      .catch((err) => {
        console.log("Ошибка регистрации", err);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser({});
    setMoviesData([]);
    setSavedMoviesFound([]);
    navigate("/signin");
    setLoggedIn(false);
  };

  function handleUpdateUser(name, email) {
    mainApi.setUserInfo(name, email)
      .then((userData) => {
        setCurrentUser(userData.data);
      })
      .catch((err) => {
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

  const handleSearchMovData = (request, filtercheckbox) => {
    setLoadingMoviesData(true);
    localStorage.setItem("request", request);
    localStorage.setItem("filtercheckbox", filtercheckbox);
    moviesApi.getMoviesCards()
      .then((res) => {
        localStorage.setItem('movies', JSON.stringify(res));
      })
      .catch((err) => {
        console.log(err);
        setMoviesApiResStatus(false);
      })
      .finally(() => {
        setLoadingMoviesData(false);
      })

    const localMoviesData = JSON.parse(localStorage.getItem('movies'));
    if (localMoviesData) {
      const filteredMov = searchFilter(request, filtercheckbox, localMoviesData);
      if (filteredMov.length === 0) {
        setNoMoviesFound(true);
      } else {
        setNoMoviesFound(false);
      }
      localStorage.setItem('filterer-previously-movies', JSON.stringify(filteredMov));
      setMoviesData(filteredMov);
    }
  };

  const loadSavedMovData = () => {
    mainApi.getSavedMovies()
      .then((res) => {
        setGetSavedMoviesResStatus(res.status);
        if (res.data.length === 0) {
          setSavedMoviesNull(true);
          setSavedMoviesFound(res.data);
          return;
        } else {
          setSavedMoviesNull(false);
          setSavedMoviesFound(res.data.reverse());
        }
      })
      .catch((err) => {
        console.log(err);
        setMoviesApiResStatus(err);
      })
  }

  const handleSearchSavedMovData = (request, filtercheckbox) => {
    const filteredSavedMovies = searchFilter(request, filtercheckbox, savedMoviesFound);
    if (filteredSavedMovies.length === 0) {
      setNoSavedMoviesFound(true);
    } else {
      setNoSavedMoviesFound(false);
    }
    setSavedMoviesFound(filteredSavedMovies);
  }

  useEffect(() => {
    checkToken();
  }, [loggedIn]);

  const toggleFavMovInLocal = (id) => {
    const filteredMovies = JSON.parse(localStorage.getItem('filtered-previously-movies'));
    filteredMovies.forEach((foundMov) => {
      if (foundMov.id === id) {
        if (foundMov.saved) {
          foundMov.saved = false;
        } else {
          foundMov.saved = true;
        }
      }
    })
    localStorage.setItem('filtered-previously-movies', JSON.stringify(filteredMovies));
    setMoviesData(filteredMovies);
  }

  const getSavedMoviesForPageMovies = (cardLocalId) => {
    return mainApi.getSavedMovies()
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const deleteSavedMovieFromPageMovies = async (id) => {
    const savedMovies = await getSavedMoviesForPageMovies();
    let serverId = "";
    savedMovies.forEach((foundMovie) => {
      if (foundMovie.movieId === id) {
        serverId = foundMovie._id;
      }
    })
    mainApi.deleteSavedMovie(serverId)
      .then((res) => {

      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        toggleFavMovInLocal(id);
        console.log('delete movie from local');
      })
  }

  const handleSaveFavMovie = (data) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi.deleteSavedMovie(data, token)
        .then((res) => {

        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          toggleFavMovInLocal(data.movieId);
        })
    } else {
      console.log('пользователь не обнаружен');
    }
  }

  const handleDeleteSavedMovie = (serverId, localId) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi.deleteSavedMovie(serverId, token)
        .then((res) => {
          toggleFavMovInLocal(localId);
          savedMoviesFound.forEach((item, index) => {
            if (item._id === serverId) {
              delete savedMoviesFound[index];
              setSavedMoviesFound(savedMoviesFound);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
        })
    };
  }

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
                noMoviesFound={noMoviesFound}
                isLoadingData={loadingMoviesData}
                resStatus={moviesApiResStatus}
                onSubmit={handleSearchMovData}
                moviesData={moviesData}
                onSaveMovie={handleSaveFavMovie}
                onDeleteSavedMovie={deleteSavedMovieFromPageMovies}
              />
            </ProtectedRoute>
          }>
          </Route>
          <Route path='/saved-movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies
                loadSavedMovData={loadSavedMovData}
                savedMoviesNull={savedMoviesNull}
                isLoadingData={loadingMoviesData}
                noSavedMoviesFound={noSavedMoviesFound}
                savedMovies={savedMoviesFound}
                handleSearchSavedMovData={handleSearchSavedMovData}
                onDeleteSavedMovie={handleDeleteSavedMovie}
                getSavedMoviesResStatus={getSavedMoviesResStatus}
              />
            </ProtectedRoute>
          }>
          </Route>
          <Route path='/profile' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile onEditProfile={handleUpdateUser} handleLogout={handleLogout} />
            </ProtectedRoute>
          }>
          </Route>
          <Route path='/signup' element={<Register handleRegister={handleRegister} />}>
          </Route>
          <Route path='/signin' element={<Login handleLogin={handleLogin} />}>
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
