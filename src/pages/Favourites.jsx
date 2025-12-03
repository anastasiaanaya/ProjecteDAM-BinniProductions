import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';
import '../pages/HomePage';

function FavoritesPage(){
      // 1. Ens connectem al Context per llegir la llista
  const { favorites, toggleFavorite } = useFavorites();

  
  // 2. Cas buit: Si no hi ha res, avisem l'usuari
  if (favorites.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>No tens favorits encara 😢</h2>
        <p>Ves a la llista i guarda'n algun!</p>
        <Link to="/" className="btn-back">← Tornar a l'inici</Link>
      </div>
    );
  }

  // 3. Cas amb dades: Pintem la llista
  return (
    <div className="post-list-container">
      <h2>Els meus Favorits ❤️ ({favorites.length})</h2>
      
      <div className="films-grid">
        {favorites.map((film) => (
          <article key={film.id} className="film-card">
            {/* Títol que et porta al detall */}
            <Link to={`/film/${film.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
              <h3>{film.title}</h3>
            </Link>

            {/* Botó per eliminar des d'aquí mateix */}
            <button 
              onClick={() => toggleFavorite(post)}
              style={{ 
                marginTop: '10px', 
                padding: '5px 10px', 
                backgroundColor: '#ffdddd', 
                border: '1px solid red', 
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              🗑️ Treure
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;

