import './Header.css';
import filterIcon from './filter-icon.png';

function Header() {
  return (
    <header className="header">

      <div className="main-header">
              <h1>Pel·lícules Ghibli</h1>
      </div>
      <div className="filter">
      <img src={filterIcon} alt="Filter Icon" />
      </div>
    </header>

 
  );
}

export default Header;