import './Menu.css';
import { Link } from 'react-router-dom';
import totoroIcon from './totoro-icon.svg';
import starIcon from './star-icon.svg';

function Menu() {
  return (
    <nav className="navigation-menu">
      <div className="navigation-pages">
        <div className="home-page selected-page">
          <Link to="/"><img src={totoroIcon} alt="Totoro Icon" className="totoro-icon" /></Link>
        </div>

        <div className="favourites-page">
          <Link to="/favourites"><img src={starIcon} alt="Star Icon" className="star-icon" /></Link>
        </div>
      </div>

      <div className="search-bar">
        <span className="material-symbols-rounded search-icon">search</span>
      </div>
    </nav>
  );
}

export default Menu;