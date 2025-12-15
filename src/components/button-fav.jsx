import './button-fav.css';
import { useFavorites } from '../context/FavoritesContext';

function ButtonFav({ film }) {
  // Si no hi ha pel·lícula, no es llegeix id
  if (!film) return null;

  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = (id) => favorites.some(f => f.id === id); //.some comrpova si algun element a l'array compleix la condició

  return (
    <button
      className={`fav-btn ${isFavorite(film.id) ? 'is-fav' : ''}`}
      onClick={() => toggleFavorite(film)}
      aria-label={isFavorite(film.id) ? 'Eliminar favorito' : 'Afegir a favorits'}
      title={isFavorite(film.id) ? 'Eliminar favorito' : 'Afegir a favorits'}
    >
      <img src={isFavorite(film.id) ? "/HeartRed.svg" : "/HeartWhite.svg"} alt="corazón" className="heart-icon"/>
    </button>
  );
}

export default ButtonFav;