import './Menu.css';
import { Link, useLocation } from 'react-router-dom';
import totoroIcon from './totoro-icon.svg';
import heartIcon from './heart-icon.svg';

function Menu() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <nav className="navigation-menu">
      <div className="navigation-pages">
        <div className={`home-page ${path === '/' ? 'selected-page' : ''}`}>
          <Link to="/"><img src={totoroIcon} alt="Totoro Icon" className="totoro-icon" /></Link>
        </div>

        <div className={`favourites-page ${path === '/favourites' ? 'selected-page' : ''}`}>
          <Link to="/favourites"><img src={heartIcon} alt="Heart Icon" className="heart-icon" /></Link>
        </div>
      </div>

      <div className="search-bar">
        <span className="material-symbols-rounded search-icon">search</span>
      </div>
    </nav>
  );
}

export default Menu;