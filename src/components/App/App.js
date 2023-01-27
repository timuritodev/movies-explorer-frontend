import Header from '../Header/Header';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies'
import Login from '../Login/Login';

function App() {
  return (
    <div className="app">
      <Header />
      <Login />
      {/* <Movies /> */}
      {/* <SavedMovies /> */}
      {/* <Routes>
        <Route exact path='/' element={<Main />}>
        </Route>
      </Routes> */}
      {/* <Main />
      <Footer /> */}

    </div>
  );
}

export default App;
