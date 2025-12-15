import './Loading.css';
import loadingGif from '../../public/loading-erasedbg_7.gif';
import { useEffect } from 'react';

function Loading() {
  useEffect(() => {
    // Bloquear al entrar
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Desbloquear al salir (simplemente borrando el estilo 'hidden')
      document.body.style.overflow = ''; 
    };
}, []);

  return (
    <div className="loading-overlay" role="status" aria-live="polite" aria-busy="true">
      {/* hacemos esto para que la imagen se cargue desde el css de loading-container */}
      <div className="loading-container" aria-hidden="true">
        <div className="gif-loading">
          <img src={loadingGif} alt="Carregant..." className="loading-gif" />
        </div>
      </div>
    </div>
  );
}

export default Loading;