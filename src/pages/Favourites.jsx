import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';
import './Favourites.css';

function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  if (!favorites || favorites.length === 0) {
    return (
      <div className="empty-fav">
        <h2>You haven't saved any favorites</h2>
        <p>Go save some in the Home Page!</p>
       
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h2 className="favorites-heading">Favorits <span className="count">({favorites.length})</span></h2>

      <div className="favorites-grid">
        {favorites.map((film) => (
          <article key={film.id} className="film-card">
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

              <div className="film-actions">
                <button
                  className="pill-toggle"
                  onClick={() => toggleFavorite(film)}
                  aria-label="Treure dels favorits"
                  title="Treure dels favorits"
                >
                  🗑️ Treure
                </button>

                
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
