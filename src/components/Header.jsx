import './Header.css';

function Header({ sortOption, setSortOption, SORT_OPTIONS }) {
  return (
    <header className="header">    
      <section className="main-header">

        <div className="logo-ghibli">          
          <img src="/logo-ghibli.svg" alt="Logo Ghibli" className="img-ghibli"/>

        </div>
        <div className="titol-ghibli">
          <h1> kiki's library</h1>
          
        </div>
        
        
      </section>

    </header>
  );
}

export default Header;
