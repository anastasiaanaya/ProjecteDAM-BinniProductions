import './Header.css';
import logoGhibli from '../../public/logo-ghibli2.svg';

function Header({ sortOption, setSortOption, SORT_OPTIONS }) {
  return (
    <header className="header">    
      <section className="main-header">

        <div className="logo-ghibli">
          <img src={logoGhibli} alt="Logo Ghibli" className="img-ghibli"/>

        </div>
        <div className="titol-ghibli">

        </div>
        
        
      </section>

    </header>
  );
}

export default Header;
