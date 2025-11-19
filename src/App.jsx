import './App.css';
import Header from './components/Header';
import PostList from './components/PostList';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="content">
        <PostList />
      </main>
      <Footer />
    </div>
  )
}

export default App