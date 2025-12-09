import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './InfoFilm.css';
import { useFavorites } from '../context/FavoritesContext';
import heartRed from './heartRed.svg';
import heartWhite from './heartWhite.svg';
import back from './back.svg';

const API_URL = 'https://ghibliapi.vercel.app/films';

function InfoFilm() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [related, setRelated] = useState({ people: [], species: [], locations: [], vehicles: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if
        (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setFilm(data);
        const resolveUrls = async (urls = []) => {
          if (!urls || urls.length === 0) return [];
          const out = [];
          for (const u of urls) {
            try {
              const r = await fetch(u);
              if (!r.ok) {
                out.push(u);
                continue;
              }
              const j = await r.json();
              out.push(j.name || j.title || j.url || 'sin nombre');
            } catch {
              out.push(u);
            }
          }
          return out;
        };

        const people = await resolveUrls(data.people);
        const species = await resolveUrls(data.species);
        const locations = await resolveUrls(data.locations);
        const vehicles = await resolveUrls(data.vehicles);

        setRelated({ people, species, locations, vehicles });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

    const { toggleFavorite, isFavorite } = useFavorites();

  if (loading) return <p>Carregant pel·lícules...</p>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!film) return <div>No s'ha trobat la pel·lícula'</div>;

  return (
    <div className="film-detail">
      <div className="film-banner-wrap">
        <Link to="/" className="back" aria-label="Volver">
           <img src={back} alt="Volver" className="back-icon" />
        </Link>

        <button className="btn-fav" onClick={()=> toggleFavorite(film)}>
             <img src={isFavorite(film.id) ? heartRed : heartWhite} alt="corazón" className="heart-icon"/>
        </button>

        <img src={film.movie_banner || film.image} alt={film.title} />
      </div>

      <div className="film-content">
        <div className="film-original">{film.original_title}</div>
        <h2 className="film-title">{film.title}</h2>
        <div className="film-meta">{film.release_date} | {film.running_time}' | ★ {film.rt_score}</div>

        <p className="film-desc">{film.description}</p>

        <div className="meta-group"><strong>Characters:</strong> {related.people.join(', ') || '—'}</div>
        <div className="meta-group"><strong>Director:</strong> {film.director}</div>
        <div className="meta-group"><strong>Producer:</strong> {film.producer}</div>

        <div className="poster-wrap">
          <img src={film.image} alt={`${film.title} poster`} />
        </div>
      </div>
    </div>
  );
}

export default InfoFilm;
