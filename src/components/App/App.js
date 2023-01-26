import Header from '../Header/Header';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route exact path='/' element={<Main />}>
        </Route>
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
