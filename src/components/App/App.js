import Header from '../Header/Header';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';

function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route exact path='/' element={<Main />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
