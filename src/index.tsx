import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/index.scss';
import App from './components/App';
import './database';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(<App />);
}
