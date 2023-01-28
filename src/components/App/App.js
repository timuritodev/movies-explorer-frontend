import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies'
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

function App() {

const [isMainPage, setIsMainPage] = useState(false);

const { pathname } = useLocation();
const urlHeaderRender = ['/', '/movies', '/saved-movies', '/profile'];
const urlFooterRender = ['/', '/movies', '/saved-movies'];

function CheckMainPage() {
  pathname === '/' ? setIsMainPage(true) : setIsMainPage(false)
}

useEffect(() => {
  CheckMainPage();
}, [pathname]);

function compareUrl(urlList) {
  for (let key in urlList) {
    if (urlList[key] === pathname) {
      return true;
    }
  }
  return false;
}

  return (
    <div className="app">
      {compareUrl(urlHeaderRender) ? <Header isMainPage={isMainPage} /> : null}

      <Routes>
      <Route exact path='/' element={<Main />}>
        </Route>
        <Route path='/movies' element={<Movies />}>
        </Route>
        <Route path='/saved-movies' element={<SavedMovies />}>
        </Route>
        <Route path='/profile' element={<Profile />}>
        </Route>
        <Route path='/signup' element={<Register />}>
        </Route>
        <Route path='/signin' element={<Login />}>
        </Route>
        <Route path="*" element={<NotFound />}>
        </Route>
      </Routes>

      {compareUrl(urlFooterRender) ? <Footer /> : null}

    </div>
  );
}

export default App;
