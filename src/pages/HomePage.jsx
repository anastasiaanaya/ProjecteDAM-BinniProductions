import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import './HomePage.css';

const API_URL = 'https://ghibliapi.vercel.app/films';

function HomePage() {

    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const response = await fetch(API_URL);
                if(!response.ok) 
                    throw new Error(`Error HTTP: ${response.status}`);
                    const data = await response.json();
                    setFilms(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchFilms();
    }, []);
    if(loading) return <p>Carregant pel·lícules...</p>;
    if (error) return <div className="error-message">Error: {error}</div>;

    
    
  return (
    <div className="homePage-container">
      <Header />
      
      <div className="films-grid">
        {films.map((film) => (
          film &&(
            <a
            key={film.id}
            href={`/film/${film.id}`}
            className="film-card"
            title={film.title}
          >
            <img src={film.image} alt={film.title} className="film-image" />
            {/* <div className="film-title">{film.title}</div> */}
            </a>
          )
    ))}
        </div>
      <Menu />
      <Footer />
    </div>
  );
}

export default HomePage;