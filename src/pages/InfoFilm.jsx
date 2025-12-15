// Hooks de React Router para leer parámetros y navegar
import { useParams, Link } from 'react-router-dom';

// Hooks de React para estado y efectos
import { useEffect, useState } from 'react';

// Estilos del componente
import './InfoFilm.css';

// Contexto de favoritos
import { useFavorites } from '../context/FavoritesContext';

// Botón para añadir/quitar favoritos
import ButtonFav from '../components/button-fav';

// Componente de carga
import Loading from './Loading';

// Icono de volver atrás
import back from '../../public/back.svg';

// URL base de la API de Ghibli
const API_URL = 'https://ghibliapi.vercel.app/films';

function InfoFilm() {
  // Obtiene el id de la película desde la URL
  const { id } = useParams();

  // Estados del componente
  const [film, setFilm] = useState(null);       // Datos de la película
  const [people, setPeople] = useState([]);     // Personajes
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null);     // Errores

  // Carga la película cuando cambia el id
  useEffect(() => {
    const fetchFilm = async () => {
      try {
        // Petición a la API para obtener la película
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setFilm(data);

        // Resuelve URLs de personajes a nombres
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

        // Obtiene los nombres de los personajes
        const resolvedPeople = await resolveUrls(data.people);
        setPeople(resolvedPeople);
      } catch (err) {
        // Guarda el error si falla la petición
        setError(err.message);
      } finally {
        // Finaliza el estado de carga
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

  // Funciones del sistema de favoritos
  const { toggleFavorite, isFavorite } = useFavorites();

  // Estados de renderizado
  if (loading) return <Loading />;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!film) return <div>No s'ha trobat la pel·lícula</div>;

  return (
    <div className="film-detail">
      {/* Banner principal */}
      <div className="film-banner-wrap">
        <div className="info-film-buttons">

          {/* Botón para volver a la Home */}
          <Link to="/" className="back" aria-label="Volver">
            <img src={back} alt="Volver" className="back-icon" />
          </Link>

          {/* Botón de favoritos */}
          <ButtonFav className="button-fav" film={film} />
        </div>

        {/* Imagen grande de la película */}
        <img src={film.movie_banner || film.image} alt={film.title} />
      </div>

      {/* Contenido principal */}
      <div className="film-content">
        {/* Título original en japonés */}
        <div className="film-original">{film.original_title}</div>

        {/* Título principal */}
        <h2 className="film-name">{film.title}</h2>

        {/* Datos básicos */}
        <div className="film-data">
          {film.release_date} | {film.running_time}' | ★ {film.rt_score}
        </div>

        {/* Descripción */}
        <p className="film-desc">{film.description}</p>

        {/* Información adicional */}
        <div className="meta-group">
          <strong>Characters:</strong> {people.join(', ') || '—'}
        </div>
        <div className="meta-group">
          <strong>Director:</strong> {film.director}
        </div>
        <div className="meta-group">
          <strong>Producer:</strong> {film.producer}
        </div>

        {/* Póster */}
        <div className="poster-wrap">
          <img src={film.image} alt={`${film.title} poster`} />
        </div>
      </div>
    </div>
  );
}

export default InfoFilm;
