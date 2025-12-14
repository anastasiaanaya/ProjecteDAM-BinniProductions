import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';
import './Favourites.css';

function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  if (!favorites || favorites.length === 0) {
    return (
      <div className="empty-fav">
        <img src="/NoFavPonyo.svg" alt="Ponyo surprised" className="img-ponyo"/>
        <h2>No saved favorites yet</h2>
        <p>Go back to the Home Page to save your favorite movies by taping the heart!</p>
       
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <div className="favorites-title">
        <h2 className="favorites-heading">Your favorites</h2>
        <p className="favorites-count">{favorites.length} saved movies</p>
      </div>
      

      <div className="favorites-grid">
        {favorites.map((film) => (
          <article key={film.id} className="film-card">

            <div className="film-actions">
                <button
                  className="pill-toggle"
                  onClick={() => toggleFavorite(film)}
                  aria-label="Treure dels favorits"
                  title="Treure dels favorits"
                >
                  <img src="/HeartRed.svg"/>
                </button>

                
              </div>     
            
            <Link to={`/film/${film.id}`} className="poster-link">
              <img src={film.image} alt={film.title} className="film-poster" />
            </Link>

                  

            <div className="film-info">
              <div className="film-original">{film.original_title}</div>


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
