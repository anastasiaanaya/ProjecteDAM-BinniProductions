import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InfoFilm from './pages/InfoFilm';
import Header from './components/Header';
import Menu from './components/Menu';

import Favourites from './pages/Favourites';

function App() {
  return (
<div> 
  <Header />
  
  <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/film/:id" element={<InfoFilm />} />
      <Route path="/favourites" element={<Favourites />} />
  </Routes>

  <Menu />
  
    </div>
   

  );
}

export default App;