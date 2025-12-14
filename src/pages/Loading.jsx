import './Loading.css';
import loadingGif from '../../public/loading-erasedbg_7.gif';
import { useEffect } from 'react';

function Loading() {
  useEffect(() => {
    // No deja hacer scroll mientras se muestra el loading
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      // Restaurar el scroll al quitar el loading
      document.body.style.overflow = prevBodyOverflow || '';
      document.documentElement.style.overflow = prevHtmlOverflow || '';
    };
  }, []);

  return (
    <div className="loading-overlay" role="status" aria-live="polite" aria-busy="true">
      {/* jacemos esto para que la imagen se cargue desde el css de loading-container */}
      <div className="loading-container" aria-hidden="true">
        <div className="gif-loading">
          <img src={loadingGif} alt="Carregant..." className="loading-gif" />
        </div>
      </div>
    </div>
  );
}

export default Loading;