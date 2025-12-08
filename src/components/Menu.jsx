import './Menu.css';
import { Link, useLocation } from 'react-router-dom';
import totoroIcon from './totoro-icon.svg';
import heartIcon from './heart-icon.svg';
import { useState } from 'react';

function Menu() {
  // Hook per saber a quina pàgina es troba l'usuari
  const location = useLocation();
  const path = location.pathname;

  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <nav className="navigation-menu">
      {/* Si la barra de búsqueda està oberta s'afegeix la classe contracted, sinó res */}
      <div className={`navigation-pages${searchExpanded ? ' contracted' : ''}`}> 
        
        {!searchExpanded && (
          // Afegir la classe sliding-marker (icona seleccionada del menú) segons la pàgina on es troba l'usuari
          <div className={`sliding-marker${(path === '/' || path.startsWith('/film')) ? ' home' : (path.startsWith('/favourites') ? ' favourites' : ' home')}`} />
        )}

        {searchExpanded ? (
          (path === '/' || path.startsWith('/film')) ? (
            <div className="home-page contracted-page">
              <img src={totoroIcon} alt="Totoro Icon" className="totoro-icon" />
            </div>
          ) : (
            <div className="favourites-page contracted-page">
              <img src={heartIcon} alt="Heart Icon" className="heart-icon" />
            </div>
          )
        ) : (
          <>
            <div className={`home-page`}>
              <Link to="/"><img src={totoroIcon} alt="Totoro Icon" className="totoro-icon" /></Link>
            </div>
            <div className={`favourites-page`}>
              <Link to="/favourites"><img src={heartIcon} alt="Heart Icon" className="heart-icon" /></Link>
            </div>
          </>
        )}
      </div>

      <div className={`search-bar${searchExpanded ? ' expanded' : ''}`}> 
        <span className="material-symbols-rounded search-icon" onClick={() => setSearchExpanded(true)}>search</span>
        
        {searchExpanded && (
          <input
            type="text"
            className="search-input"
            placeholder="Cerca per títol, director..."
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            autoFocus // Quan s'obra la lupa ja està seleccionat el camp de text per escriure
            onBlur={() => setSearchExpanded(false)} // Quan l'usuari clica a fora del buscador es tanca
          />
        )}
      </div>
    </nav>
  );
}

export default Menu;