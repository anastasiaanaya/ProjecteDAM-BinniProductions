/* Importar hooks y componentes necesarios: enrutado, estado, estilos y utilidades */
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './InfoFilm.css';
import ButtonFav from '../components/button-fav';
import Loading from './Loading';
import back from '../../public/back.svg';

/* URL base de la API de películas (Ghibli) */
const API_URL = 'https://ghibliapi.vercel.app/films';

/* Componente principal: carga datos de la película y muestra la UI */
function InfoFilm() {
  /* Obtener `id` de la URL */
  const { id } = useParams();
  /* Estado local: datos de la película, personas relacionadas, carga y error */
  const [film, setFilm] = useState(null);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* Efecto: al montar o cambiar `id`, obtener datos de la API */
  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setFilm(data);

        /* Resolver URLs (personajes u otros recursos) a nombres legibles */
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
              out.push(j.name || j.title || j.url || 'no characters registered');
            } catch {
              out.push(u);
            }
          }
          return out;
        };

        const resolvedPeople = await resolveUrls(data.people);
        setPeople(resolvedPeople);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

  /* Estados de carga/errores: mostrar componentes apropiados */
  if (loading) return <Loading />;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!film) return <div>No s'ha trobat la pel·lícula</div>;

  /* Renderizado principal: banner, botones, información y póster */
  return (
    <div className="film-detail">
      <div className="film-banner-wrap">
        <div className="info-film-buttons">
          {/* Link para volver a la lista */}
          <Link to="/" className="back" aria-label="Volver">
          <img src={back} alt="Volver" className="back-icon" />
        </Link>
        {/* Componente botón favorito (contexto maneja el estado) */}
        <ButtonFav className="button-fav" film={film} />
        </div>


        {/* Banner de la película (imagen grande) */}
        <img className="film-banner" src={film.movie_banner || film.image} alt={film.title} />
      </div>

      <div className="film-content">
        {/* Títulos y datos principales */}
        <div className="film-original">{film.original_title}</div>
        <h2 className="film-name">{film.title}</h2>
        <div className="film-data">{film.release_date} | {film.running_time}' | ★ {film.rt_score}</div>

        {/* Sinopsis */}
        <p className="film-desc">{film.description}</p>

        {/* Metadatos: personajes, director y productor */}
        <div className="meta-group"><strong>Characters:</strong> {people.join(', ') || '—'}</div>
        <div className="meta-group"><strong>Director:</strong> {film.director}</div>
        <div className="meta-group"><strong>Producer:</strong> {film.producer}</div>

        {/* Póster centrado */}
        <div className="poster-wrap">
          <img src={film.image} alt={`${film.title} poster`} />
        </div>
      </div>
    </div>
  );
}

export default InfoFilm;