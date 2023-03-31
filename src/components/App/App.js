import { Routes, Route,  useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, Fragment } from 'react';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Popup from '../Popup/Popup';
import './App.css';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { mainApi } from '../../utils/MainApi';

function App() {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const { pathname } = useLocation();
  const headerUrls = ['/', '/movies', '/saved-movies', '/profile'];
  const footerUrls = ['/', '/movies', '/saved-movies'];

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    mainApi.setAuthorizationToken(jwt)
    if (!jwt) {
      setIsLoggedIn(false);
      navigate('/');
    } else {
      mainApi
        .getUserInfo()
        .then((evt) => {
          setCurrentUser(evt.user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(`Переданный токен некорректен: ${err}`);
          setIsLoggedIn(false);
          navigate("/");
        });
    }
  }

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const switchPopup = () => {
    setIsPopupOpen(!isPopupOpen);
  }

  function checkUrlExists(urls, pathname) {
    return urls.includes(pathname);
  }

  const handleLogin = async (email, password) => {
    try {
      const data = await mainApi.authorize(email, password);
      if (data.token) {
        setIsLoggedIn(true);
        navigate("/movies");
        localStorage.setItem("jwt", data.token);
      }
    }
    catch (err) {
      console.log(err);
    }
  };

  const handleRegister = async (name, email, password) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await mainApi.register(name, email, password);
      await handleLogin(email, password);
    }
    catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (name, email) => {
    try {
      const response = await mainApi.setUserInfo(name, email);
      setCurrentUser(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    setIsLoggedIn(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Fragment>
        {checkUrlExists(headerUrls, pathname) && <Header loggedIn={isLoggedIn} switchPopup={switchPopup}  />}
        <Routes>
          <Route exact path="/" element={
            <Main />
          } />
          <Route path="/movies" element={
            <ProtectedRoute loggedIn={isLoggedIn}>
              <Movies />
            </ProtectedRoute>
          } />
          <Route path="/saved-movies" element={
            <ProtectedRoute loggedIn={isLoggedIn}>
              <SavedMovies />
            </ProtectedRoute>
          } />
          <Route path="/signup" element={
            <ProtectedRoute loggedIn={!isLoggedIn}>
              <Register
                handleRegister={handleRegister}
                handleLogin={handleLogin}
              />
            </ProtectedRoute>
          } />
          <Route path="/signin" element={
            <ProtectedRoute loggedIn={!isLoggedIn}>
              <Login
                handleLogin={handleLogin}
              />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute loggedIn={isLoggedIn}>
              <Profile
                handleUpdate={handleUpdate}
                handleLogout={handleLogout}
              />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {checkUrlExists(footerUrls, pathname) && <Footer />}
        <Popup
          isPopupOpen={isPopupOpen}
          checkUrlExists={checkUrlExists}
          switchPopup={switchPopup}
        />
      </Fragment>
    </CurrentUserContext.Provider>
  );
}

export default App;
