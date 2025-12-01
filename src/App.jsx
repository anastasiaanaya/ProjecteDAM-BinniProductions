import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InfoFilm from './pages/InfoFilm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/film/:id" element={<InfoFilm />} />
    </Routes>
  );
}

export default App;