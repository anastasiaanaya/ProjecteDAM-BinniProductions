import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">    
      <section className="main-header">

        {/* Logo + nombre clicables → vuelven a Home */}
        <Link to="/" className="logo-link">
          <div className="logo-ghibli">          
            <img
              src="/logo-ghibli.svg"
              alt="Logo Ghibli"
              className="img-ghibli"
            />
          </div>

          <div className="titol-ghibli">
            <h1>kiki's library</h1>
          </div>
        </Link>

      </section>
    </header>
  );
}

export default Header;
