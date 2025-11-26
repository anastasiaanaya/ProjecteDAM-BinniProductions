import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import InfoFilm from './pages/InfoFilm';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/film/:id" element={<InfoFilm />} />
          </Routes>
       
    </BrowserRouter>
    // <div className="App">
     
    //   <main className="content">
    //     <InfoFilm />
    //   </main>
     
    // </div>
  )
}

export default App