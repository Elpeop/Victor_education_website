import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import './index.css';

// Debug log - remove after fixing
console.log('Initializing app...');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
