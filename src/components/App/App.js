import Header from '../Header/Header';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';

function App() {
  return (
    <div className="app">
      <Header />
      <Movies />
      {/* <Routes>
        <Route exact path='/' element={<Main />}>
        </Route>
      </Routes> */}
      {/* <Main /> */}
      <Footer />

    </div>
  );
}

export default App;
