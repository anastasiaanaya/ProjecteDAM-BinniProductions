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

        // Función para resolver arrays de URLs
        const resolveUrls = async (urls = []) => {
          if (!urls.length) return [];
          const results = await Promise.all(urls.map(u => fetch(u).then(r => r.ok ? r.json().catch(()=>null) : null).catch(()=>null)));
          return results.map(r => r && (r.name || r.title) ? (r.name || r.title) : (r.url || 'sin nombre'));
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
        
      <Link to="/">← Volver</Link>
      <h1>{film.title} ({film.original_title})</h1>
      <img src={film.movie_banner || film.image} alt={film.title} style={{maxWidth: '100%'}} />
      <p><strong>ID:</strong> {film.id}</p>
      <p><strong>Original title romanised:</strong> {film.original_title_romanised}</p>
      <p><strong>Description:</strong> {film.description}</p>
      <p><strong>Director:</strong> {film.director}</p>
      <p><strong>Producer:</strong> {film.producer}</p>
      <p><strong>Release date:</strong> {film.release_date}</p>
      <p><strong>Running time:</strong> {film.running_time} min</p>
      <p><strong>RT score:</strong> {film.rt_score}</p>
      <p><strong>People:</strong> {related.people.join(', ') || '—'}</p>
      <p><strong>Species:</strong> {related.species.join(', ') || '—'}</p>
      <p><strong>Locations:</strong> {related.locations.join(', ') || '—'}</p>
      <p><strong>Vehicles:</strong> {related.vehicles.join(', ') || '—'}</p>
      <p><strong>URL:</strong> <a href={film.url} target="_blank" rel="noreferrer">{film.url}</a></p>

    </div>
  );
}

export default InfoFilm;

