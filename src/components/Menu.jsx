import './Menu.css';

function Header() {
  return (
    <header className="navigation-menu">
      <h1>Pel·lícules Ghibli</h1>
      <div className="filter">
      <img src="/assets/filter-icon.png" alt="Filter Icon" />
      </div>
    </header>

 
  );
}

export default Header;