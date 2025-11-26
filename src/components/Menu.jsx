import './Menu.css';

function Menu() {
  return (

    <nav className="navigation-menu">
      <div className="navigation-pages">
        <div className="home-page selected-page">

        </div>
        <div className="favourites-page">

        </div>
      </div>
      <div className="search-bar">
        <span className="material-symbols-rounded search-icon">search</span>
      </div>
    </nav>
  );
}

export default Menu;