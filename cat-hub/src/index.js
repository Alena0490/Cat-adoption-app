import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

const root = createRoot(document.getElementById('result'));

root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App tab="home" />
  </BrowserRouter>
);
