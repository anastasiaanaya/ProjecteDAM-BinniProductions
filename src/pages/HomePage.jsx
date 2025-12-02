import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Filters from '../components/filters';

const API_URL = 'https://ghibliapi.vercel.app/films';



// --- OPCIONES DEL FILTRE ---
const SORT_OPTIONS = {
  DATA_ASC: "dataAsc",
  DATA_DESC: "dataDesc",
  TEMPS_ASC: "tempsAsc",
  TEMPS_DESC: "tempsDesc",
  VALORACIO_ASC: "valoracioAsc",
  VALORACIO_DESC: "valoracioDesc",
};

// --- FUNCIÓ PER ORDENAR ---
const sortFilms = (films, option) => {
  return [...films].sort((a, b) => {
    switch (option) {
      case SORT_OPTIONS.DATA_ASC:
        return Number(a.release_date) - Number(b.release_date);
      case SORT_OPTIONS.DATA_DESC:
        return Number(b.release_date) - Number(a.release_date);

      case SORT_OPTIONS.TEMPS_ASC:
        return Number(a.running_time) - Number(b.running_time);
      case SORT_OPTIONS.TEMPS_DESC:
        return Number(b.running_time) - Number(a.running_time);

      case SORT_OPTIONS.VALORACIO_ASC:
        return Number(a.rt_score) - Number(b.rt_score);
      case SORT_OPTIONS.VALORACIO_DESC:
        return Number(b.rt_score) - Number(a.rt_score);

      default:
        return 0;
    }
  });
};

function HomePage() {

  const [films, setFilms] = useState([]);
  const [sortOption, setSortOption] = useState(""); // Mostrar 'Filtres' por defecto
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok)
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

  if (loading) return <p>Carregant pel·lícules...</p>;
  if (error) return <div className="error-message">Error: {error}</div>;

  // --- APLICAR FILTRE ---
  const sortedFilms = sortFilms(films, sortOption);

  return (
    <div className="homePage-container">
      <div className="filter">
        <Filters
          sortOption={sortOption}
          setSortOption={setSortOption}
          SORT_OPTIONS={SORT_OPTIONS}
        />
      </div>

      <div className="films-grid">
        {sortedFilms.map((film) => (
          <article key={film.id} className="film-card">
            <Link to={`/film/${film.id}`}><img src={film.image} alt={film.title} className="film-image" /></Link>

          </article>
         
        ))}
      </div>


    </div>
  );
}

export default HomePage;
