import './Menu.css';
import { Link, useLocation } from 'react-router-dom';
import totoroIcon from './totoro-icon.svg';
import heartIcon from './heart-icon.svg';
import { useState } from 'react';

function Menu() {
  const location = useLocation();
  const path = location.pathname;
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <nav className="navigation-menu">
      <div className={`navigation-pages${searchExpanded ? ' contracted' : ''}`}> 

        {!searchExpanded && (
          <div className={`sliding-marker${(path === '/' || path.startsWith('/film')) ? ' home' : (path.startsWith('/favourites') ? ' favourites' : ' home')}`} />
        )}
        {searchExpanded ? (
          path === '/' ? (
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
            autoFocus
            onBlur={() => setSearchExpanded(false)}
          />
        )}
      </div>
    </nav>
  );
}

export default Menu;