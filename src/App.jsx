import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InfoFilm from './pages/InfoFilm';
import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';

function App() {
  return (
<div> 
  <Header />
  <Menu />
  <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/film/:id" element={<InfoFilm />} />
    </Routes>
  <Footer />
    </div>
   

  );
}

export default App;