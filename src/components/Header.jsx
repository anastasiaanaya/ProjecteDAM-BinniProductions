import './Header.css';

function Header() {
  return (
    <header className="header">

      <div className="main-header">
              <h1>Pel·lícules Ghibli</h1>
      </div>
      <div className="filter">
      <img src="src\components\filter-icon.png" alt="Filter Icon" />
      </div>
    </header>

 
  );
}

export default Header;