import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { FavoritesProvider } from './context/FavoritesContext';
import { SearchProvider } from './context/SearchContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavoritesProvider>
    <SearchProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </SearchProvider>
    </FavoritesProvider>
  </StrictMode>
);
