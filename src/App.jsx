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
     <Header />{/* No sé si al final el Header pot variar o no*/}
     {/*si al final els filtres van per separat suposo que es posarien per aquí*/}

     <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<InfoFilm />} />
     </Routes>

     <Menu />{/* El menu aquí pq hi serà sempre*/}

      <Footer />

      {/* aixo es el que hi havia abans:
      <main className="content">
        <HomePage />
      </main>*/}


    </div>
  )
}

export default App