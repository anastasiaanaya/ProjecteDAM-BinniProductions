import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './HomePage.css';
import Filters from '../components/filters';
import ButtonFav from '../components/button-fav';
import Loading from './Loading';  
const durada = 1500; // duración mínima de càrrega en ms

const API_URL = 'https://ghibliapi.vercel.app/films';

const SORT_OPTIONS = {
  DATA_ASC: "dataAsc",
  DATA_DESC: "dataDesc",
  TEMPS_ASC: "tempsAsc",
  TEMPS_DESC: "tempsDesc",
  VALORACIO_ASC: "valoracioAsc",
  VALORACIO_DESC: "valoracioDesc",
};

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

function HomePage({setAppLoading}) {
  const [films, setFilms] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  // Llegeix la query de la URL (per exemple ?q=totoro)
  const searchQuery = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    let isMounted = true;
  const start = Date.now();
    if (typeof setAppLoading === 'function') {
    setAppLoading(loading);
  }

    const fetchFilms = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();
        setFilms(data);
      } catch (err) {
        setError(err.message);
      } finally {
      const elapsed = Date.now() - start;
      const remaining = durada - elapsed;
      if (remaining > 0) {
        setTimeout(() => {
          if (isMounted) setLoading(false);
        }, remaining);
      } else {
        if (isMounted) setLoading(false);
      }
      }
    };
    fetchFilms();
    return () => { 
     if (typeof setAppLoading === 'function') setAppLoading(false);     
      isMounted = false; };
  }, [setAppLoading]);

  if (loading) return <Loading />;
  if (error) return <div className="error-message">Error: {error}</div>;

  const normalizedQuery = (searchQuery || '').trim().toLowerCase();

  const filteredFilms = normalizedQuery
    ? films.filter(f => {
        // Buscamos en título, director, productor y año
        return (
          (f.title || '').toLowerCase().includes(normalizedQuery) ||
          (f.director || '').toLowerCase().includes(normalizedQuery) ||
          (f.producer || '').toLowerCase().includes(normalizedQuery) ||
          (f.release_date || '').toLowerCase().includes(normalizedQuery)
        );
      })
    : films;

  const sortedFilms = sortFilms(filteredFilms, sortOption);

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
        {sortedFilms.length === 0 && normalizedQuery ? (
          <div className="no-results">
            <img src="/NoResultsSearch.svg" alt="No results" className="no-results-image" />
            <p>No movies match your search.</p>
          </div>
        ) : (
          sortedFilms.map((film) => (
            <article key={film.id} className="film-card">
              <Link to={`/film/${film.id}`}>
                <img src={film.image} alt={film.title} className="film-image" />
              </Link>
              {/* Botón favorito flotante */}
              <ButtonFav film={film} />
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
