/* Imports: contexto de favoritos, enrutado (Link, location, navigate) y estilos */
import { useFavorites } from '../context/FavoritesContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Favourites.css';

function FavoritesPage() {
  /* Estado y hooks: favoritos desde el contexto, y hooks de ruta */
  const { favorites, toggleFavorite } = useFavorites();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  /* `q` es el término de búsqueda en la query string, normalizado */
  const q = (params.get('q') || '').toLowerCase().trim();
  const navigate = useNavigate();

  /* Filtre al fer cerca en favourites */
  const filtered = q
    ? (favorites || []).filter((film) => {
        const hay = `${film.title || ''} ${film.original_title || ''} ${film.director || ''}`.toLowerCase();
        return hay.includes(q);
      })
    : favorites || [];

  /* Estado vacío: mostrar ilustración y mensaje si no hay favoritos guardados */
  if (!favorites || favorites.length === 0) {
    return (
      <div className="empty-fav">
        <img src="/NoFavPonyo.svg" alt="Ponyo surprised" className="img-ponyo"/>
        <h2>No saved favorites yet</h2>
        <p>Go back to the Home Page to save your favorite movies by taping the heart!</p>
      </div>
    );
  }

  /* Si no hi ha resultats que coincideixin amb la cerca, donar la opció de buscar en totes les pel·lícules */
  if (filtered.length === 0) {
    const qRaw = params.get('q') || '';
    const encoded = encodeURIComponent(qRaw);
    return (
      <div className="empty-fav-search">
        <img src="/NoResultsSearch.svg" alt="No results"/>
        <p>It looks like none of your favourites match your search.</p>

        <div className="no-results-actions">
          <button
            className="search-all"
            onClick={() => navigate(`/?q=${encoded}`)}
          >
            Search in all films
          </button>
        </div>
      </div>
    );
  }

  /* Render: lista de favoritos en grid. Cada tarjeta muestra poster, título, meta y botón favorito */
  return (
    <div className="favorites-container">
      <div className="favorites-title">
        <h2 className="favorites-heading">Your favorites</h2>
        <p className="favorites-count">{filtered.length} saved movies</p>
      </div>
      
      <div className="favorites-grid">
        {filtered.map((film) => (
          <article key={film.id} className="film-card">
            
            {/* Link para que toda la tarjeta sea clickable.
                Gracias al CSS, ocupa el 100% del espacio. */}
            <Link to={`/film/${film.id}`} className="card-link-overlay" 
              aria-label={`View details for ${film.title}`}
            />

            {/* Acciones de la tarjeta: botón para añadir/quitar favoritos */}
            <div className="film-actions">
                <button
                  className="pill-toggle"
                  onClick={() => toggleFavorite(film)}
                  aria-label="Treure dels favorits"
                  title="Treure dels favorits"
                >
                  <img src="/HeartRed.svg" alt="Heart"/>
                </button>
            </div>     
            
            {/* Poster clickable (enlaza al detalle) */}
            <Link to={`/film/${film.id}`} className="poster-link">
              <img src={film.image} alt={film.title} className="film-poster" />
            </Link>

            {/* Información textual: título original, título y metadatos */}
            <div className="film-info">
              <div className="film-original">{film.original_title}</div>

              {/* Título (link visual) */}
              <Link to={`/film/${film.id}`} className="film-title">
                {film.title}
              </Link>

              <div className="film-meta">
                {film.release_date} | {film.running_time}' | ★ {film.rt_score}
              </div>
            </div>

          </article>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;