import './App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="content">
        <HomePage />
      </main>
      <Footer />
    </div>
  )
}

export default App