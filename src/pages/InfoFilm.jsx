import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './InfoFilm.css';

const API_BASE = 'https://ghibliapi.vercel.app/films';

function InfoFilm() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [related, setRelated] = useState({ people: [], species: [], locations: [], vehicles: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const res = await fetch(`${API_BASE}/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setFilm(data);

        const resolveUrls = async (urls = []) => {
          if (!urls.length) return [];
          const results = await Promise.all(
            urls.map(u => fetch(u).then(r => (r.ok ? r.json().catch(() => null) : null)).catch(() => null))
          );
          return results.map(r => (r && (r.name || r.title) ? r.name || r.title : r?.url || 'sin nombre'));
        };

        const [people, species, locations, vehicles] = await Promise.all([
          resolveUrls(data.people),
          resolveUrls(data.species),
          resolveUrls(data.locations),
          resolveUrls(data.vehicles),
        ]);

        setRelated({ people, species, locations, vehicles });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!film) return <div>No se encontró la película</div>;

  return (
    <div className="film-detail">

      <div className="film-banner-wrap">
        {/* Botón volver */}
        <Link to="/" className="btn-back" aria-label="Volver">
          <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>

        {/* Botón favorito */}
        <button className="btn-fav" aria-label="Favorito">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.6-9-8.1C1 9 4 6 6.5 6S12 10 12 10s2.5-4 5.5-4 5.5 3 3.5 6.9C19 16.4 12 21 12 21z"/></svg>
        </button>

        <img src={film.movie_banner || film.image} alt={film.title} />
      </div>

      <div className="film-content">
        <div className="film-original">{film.original_title}</div>
        <h1 className="film-title">{film.title}</h1>
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
