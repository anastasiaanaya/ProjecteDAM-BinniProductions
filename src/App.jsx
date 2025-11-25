import './App.css';
import Header from './components/Header';
import InfoFilm from './pages/InfoFilm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
     
      <main className="content">
        <InfoFilm />
      </main>
     
    </div>
  )
}

export default App