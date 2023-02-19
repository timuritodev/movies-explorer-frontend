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
  const [loggedIn, setLoggedIn] = useState(false);

  const [updateUserStatus, setUpdateUserStatus] = useState(false);
  const [updateRegisterStatus, setUpdateRegisterStatus] = useState(false);
  const [updateLoginStatus, setUpdateLoginStatus] = useState(false);

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
        navigate("/signin");
        resetRegisterForm && resetRegisterForm();
        console.log("Успех регистрации", res);
      })
      .catch((err) => {
        setUpdateRegisterStatus(err);
        console.log("Ошибка регистрации", err);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser({});
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
      .catch((err) => {
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
  }, [loggedIn]);

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

        })
    } else {
      console.log('пользователь не обнаружен');
    }
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
              <Movies />
            </ProtectedRoute>
          }>
          </Route>
          <Route path='/saved-movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies />
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
              <Login handleLogin={handleLogin} updateLoginStatus={updateLoginStatus}/>
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
