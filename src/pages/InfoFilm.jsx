import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import './InfoFilm.css';

const API_URL = 'https://ghibliapi.vercel.app/films';

function InfoFilm(){

  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingChars, setLoadingChars] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('No se proporcionó id de película.');
      setLoading(false);
      return;
    }

    const fetchFilm = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        const data = await res.json();
        setFilm(data);

        // Si la API devuelve URLs de 'people', intentamos obtener los nombres
        // (la API de Ghibli devuelve a veces una URL única o una lista vacía)
        if (data.people && Array.isArray(data.people) && data.people.length > 0 && data.people[0] !== 'https://ghibliapi.vercel.app/people/') {
          setLoadingChars(true);
          try {
            const peoplePromises = data.people.map((url) =>
              fetch(url).then((r) => (r.ok ? r.json() : null)).catch(() => null)
            );
            const peopleArr = await Promise.all(peoplePromises);
            const parsed = peopleArr
              .filter(Boolean)
              .map((p) => ({ id: p.id || p.url || p.name, name: p.name, age: p.age, gender: p.gender }));
            setCharacters(parsed);
          } catch (e) {
            console.warn('Error fetching people:', e);
          } finally {
            setLoadingChars(false);
          }
        }
      } catch (err) {
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

  if (loading) return <p>Cargando película...</p>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!film) return <div>No se encontró la película.</div>;

  return (
    <div className="infoFilm-container">
      <Header />

      <main className="film-main">
        <Link to="/" className="back-link">← Volver al catálogo</Link>

        <header className="film-header">
          {/* Banner (si existe) o imagen de portada */}
          <img
            src={film.movie_banner || film.image}
            alt={`${film.title} banner`}
            className="film-banner"
          />

          <div className="film-meta">
            <h1 className="film-title">
              {film.title}
              {film.original_title ? <span className="original"> （{film.original_title}）</span> : null}
            </h1>

            {film.original_title_romanised && (
              <h2 className="romanised">{film.original_title_romanised}</h2>
            )}

            <p className="film-submeta">
              <strong>Puntuación (rt_score):</strong> {film.rt_score} • <strong>Director:</strong> {film.director}
            </p>

            <p>
              <strong>Productor:</strong> {film.producer}
            </p>

            <p>
              <strong>Año de estreno:</strong> {film.release_date} • <strong>Duración:</strong> {film.running_time} min
            </p>
          </div>
        </header>

        <section className="film-description">
          <h3>Sinopsis</h3>
          <p>{film.description}</p>
        </section>

        <section className="film-characters">
          <h3>Personajes</h3>
          {loadingChars ? (
            <p>Cargando personajes...</p>
          ) : characters.length > 0 ? (
            <ul>
              {characters.map((c) => (
                <li key={c.id}>
                  {c.name} {c.age ? `— ${c.age}` : ''} {c.gender ? `— ${c.gender}` : ''}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay personajes listados por la API para esta película.</p>
          )}
        </section>

        <section className="film-raw">
          <h3>Datos</h3>
          <pre className="raw-json">{JSON.stringify({
            id: film.id,
            title: film.title,
            original_title: film.original_title,
            original_title_romanised: film.original_title_romanised,
            image: film.image,
            movie_banner: film.movie_banner,
            description: film.description,
            director: film.director,
            producer: film.producer,
            release_date: film.release_date,
            running_time: film.running_time,
            rt_score: film.rt_score,
          }, null, 2)}</pre>
        </section>
      </main>

      <Menu />
      <Footer />
    </div>
  );
}
export default InfoFilm;


