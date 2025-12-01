import './Header.css';
import filterIcon from './filter-icon.png';
import Filters from '../components/filters';

function Header({ sortOption, setSortOption, SORT_OPTIONS }) {
  return (
    <header className="header">
      <div className="main-header">
        <h1>Pel·lícules Ghibli</h1>
      </div>

    </header>
  );
}

export default Header;
