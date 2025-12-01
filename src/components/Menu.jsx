import './Menu.css';
import totoroIconUrl from './totoro-icon.svg';

function Menu() {
  return (
    <nav className="navigation-menu">
      <div className="navigation-pages">
        <div className="home-page selected-page">
          <img src={totoroIconUrl} alt="Totoro" className="totoro-icon" />
        </div>
        
        <div className="favourites-page"></div>
      </div>

      <div className="search-bar">
        <span className="material-symbols-rounded search-icon">search</span>
      </div>
    </nav>
  );
}

export default Menu;