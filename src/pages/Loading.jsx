import './Loading.css';
import loadingGif from '../../public/loading-erasedbg_7.gif';
import { useEffect } from 'react';

function Loading() {
  useEffect(() => {
    // Prevent background scrolling while the loading overlay is visible
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      // Restore previous scroll behaviour
      document.body.style.overflow = prevBodyOverflow || '';
      document.documentElement.style.overflow = prevHtmlOverflow || '';
    };
  }, []);

  return (
    <div className="loading-overlay" role="status" aria-live="polite" aria-busy="true">
      <div className="loading-container">
        <img src="/loading-mobile.svg" alt="Carregant..." className="loading-image" />
        <div className="gif-loading">
          <img src={loadingGif} alt="Carregant..." className="loading-gif" />
        </div>
      </div>
    </div>
  );
}

export default Loading;