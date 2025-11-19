import { useState, useEffect } from 'react';
import './PostList.css'; // Importem el CSS mobile-first

// URL de l'API que farem servir
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

function PostList() {
  
  // --- ESTATS ---
  // 1. Els 3 estats per a la càrrega de dades
  const [posts, setPosts] = useState(null); // 'null' per saber que no s'ha carregat res
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  // --- EFECTE SECUNDARI ---
  // S'executa només un cop (array de dependències buit [])
  useEffect(() => {
    
    // Definim la funció async a dins de l'efecte
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_URL);
        // Gestionem errors de la resposta (ex: 404, 500)
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data); // 1. Guardem les dades
      } catch (err) {
        setError(err.message); // 2. Guardem l'error
      } finally {
        setLoading(false); // 3. Deixem de carregar (tant si hi ha èxit com error)
      }
    };

    fetchPosts(); // Cridem la funció que acabem de definir
    
  }, []); // <-- Array buit = "executa't només un cop al muntar"

  
  // --- LÒGICA DE RENDERITZAT ---
  
  // 1. Renderitzat condicional (gestió d'estats de càrrega)
  if (loading) {
    return <p>Carregant publicacions...</p>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  // 2. Renderitzat principal (si tot ha anat bé)
  return (
    <div className="post-list-container">
      <h2>Publicacions de l'API</h2>

      {/* 3. El .map() per "pintar" les dades */}
      <div className="posts-grid">
        
        {posts.map((post) => (
          <article key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}...</p>
          </article>
        ))}
        
      </div>
    </div>
  );
}

export default PostList;