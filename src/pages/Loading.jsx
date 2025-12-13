import './Loading.css';
import loadingGif from '../../public/loading-erasedbg_2.gif';
function Loading() {
    return (
        <div className="loading-container">
        <img src="/loading.svg" alt="Carregant..." className="loading-image" />
            <div className='gif-loading'>
                  <img src={loadingGif} alt="Carregant..." className="loading-gif" />
            </div>
        </div>
    );
}

export default Loading;