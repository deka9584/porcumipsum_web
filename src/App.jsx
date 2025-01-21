import 'bootstrap';
import './App.css';
import Home from './pages/Home';
import Header from './components/app/Header';
import ModalListener from './components/app/ModalListener';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import getClientTheme from './utils/getClientTheme';

function App() {

  useEffect(() => {
    let userTheme = localStorage.getItem("theme") || "dark";
    
    if (userTheme === "default") {
      userTheme = getClientTheme();
    }

    document.documentElement.setAttribute("data-bs-theme", userTheme);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ModalListener/>
        <Header/>
        <Home/>
      </BrowserRouter>
    </div>
  );
}

export default App;
