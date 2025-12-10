import './Menu.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Menu() {
  // Hook per saber a quina pàgina es troba l'usuari
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const [searchExpanded, setSearchExpanded] = useState(false);
  // Search state is now local and synced with the URL query param 'q'.
  const paramsInit = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(paramsInit.get('q') || '');

  // Keep local state in sync if the URL changes (back/forward navigation)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get('q') || '');
  }, [location.search]);

  // When navigating away to a film or favourites page, clear the local search
  // and remove the query param from the URL so searches are not persisted.
  useEffect(() => {
    if (location.pathname.startsWith('/film') || location.pathname.startsWith('/favourites')) {
      if (searchQuery) setSearchQuery('');
      if (location.search) navigate(location.pathname, { replace: true });
      setSearchExpanded(false);
    }
  }, [location.pathname]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim()) {
      navigate(`/?q=${encodeURIComponent(value)}`, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

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
              <img src="/totoro-icon.svg" alt="Totoro Icon" className="totoro-icon" />
            </div>
          ) : (
            <div className="favourites-page contracted-page">
              <img src="/heart-icon.svg" alt="Heart Icon" className="heart-icon" />
            </div>
          )
        ) : (
          <>
            <div className={`home-page`}>
              <Link to="/"><img src="/totoro-icon.svg" alt="Totoro Icon" className="totoro-icon" /></Link>
            </div>
            <div className={`favourites-page`}>
              <Link to="/favourites"><img src="/heart-icon.svg" alt="Heart Icon" className="heart-icon" /></Link>
            </div>
          </>
        )}
      </div>

      <div className={`search-bar${searchExpanded ? ' expanded' : ''}`}> 
        <span
          className="material-symbols-rounded search-icon"
          onClick={() => {
            setSearchExpanded(true);
            // al obrir el buscador mantenim la query anterior
          }}
        >
          search
        </span>
        
        {searchExpanded && (
          <input
            type="text"
            className="search-input"
            placeholder="Cerca per títol, director..."
            value={searchQuery}
            onChange={handleSearchChange}
            autoFocus // Quan s'obra la lupa ja està seleccionat el camp de text per escriure (línia intermitent)
            onBlur={() => setSearchExpanded(false)} // Quan l'usuari clica a fora del buscador es tanca
          />
        )}
      </div>
    </nav>
  );
}

export default Menu;