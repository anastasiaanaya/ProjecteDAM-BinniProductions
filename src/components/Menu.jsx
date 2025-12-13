import './Menu.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Detecar si l'usuari està en un ordiandor
// Fet aquí i no al CSS perquè es canvia la lògica (al contraure despareix meitat de la barra de navegació, es contrau i s'elimna el sliding-marker)
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(() => (typeof window !== 'undefined' ? window.innerWidth >= 800 : false));
  
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 800);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return isDesktop;
};

function Menu() {
  // Hook per saber a quina pàgina es troba l'usuari
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const [searchExpanded, setSearchExpanded] = useState(false);
  const paramsInit = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(paramsInit.get('q') || '');

  const isDesktop = useIsDesktop();
  const isContracted = searchExpanded && !isDesktop;

  // Sincronitzar la URL amb la cerca
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get('q') || '');
  }, [location.search]);

  // Eliminar búsqueda de la URL quan es navega a altres pàgines
  useEffect(() => {
    if (location.pathname.startsWith('/film') || location.pathname.startsWith('/favourites')) {
      if (searchQuery) setSearchQuery('');
      if (location.search) navigate(location.pathname, { replace: true });
      setSearchExpanded(false);
    }
  }, [location.pathname]);

  // Actualitzar la cerca cada vegada que l'usuari escriu
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
      <div className={`navigation-pages${isContracted ? ' contracted' : ''}`}> 
        {!isContracted && (
          <div className={`sliding-marker${(path === '/' || path.startsWith('/film')) ? ' home' : (path.startsWith('/favourites') ? ' favourites' : ' home')}`} />
        )}

        {isContracted ? (
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
            setSearchExpanded(prev => !prev);
          }}
        >
          search
        </span>
        
        {searchExpanded && (
          <input
            type="text"
            className="search-input"
            placeholder="Search for title, director..."
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