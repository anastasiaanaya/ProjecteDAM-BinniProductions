import {Routes, Route} from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';
import HomePage from './pages/HomePage';
import InfoFilm from './pages/InfoFilm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
     <Header />

     <Rouets>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<InfoFilm />}
        <Route path="/" element={<Menu />} />
     </Rouets>
{/* FALTA MENU*/}
      <Footer />

      {/* aixo es el que hi havia abans:
      <main className="content">
        <HomePage />
      </main>*/}


    </div>
  )
}

export default App