import './button-fav.css';
import { useFavorites } from '../context/FavoritesContext';
import heartRed from '../../public/HeartRed.svg';
import heartWhite from '../../public/HeartWhite.svg';

function ButtonFav({ film }) {
  // If no film provided, don't try to read film.id
  if (!film) return null;

  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = (id) => favorites.some(f => f.id === id);

  return (
    <button
      className={`fav-btn ${isFavorite(film.id) ? 'is-fav' : ''}`}
      onClick={() => toggleFavorite(film)}
      aria-label={isFavorite(film.id) ? 'Eliminar favorito' : 'Afegir a favorits'}
      title={isFavorite(film.id) ? 'Eliminar favorito' : 'Afegir a favorits'}
    >
      <img src={isFavorite(film.id) ? heartRed : heartWhite} alt="corazón" className="heart-icon"/>
    </button>
  );
}

export default ButtonFav;