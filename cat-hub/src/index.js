import { createRoot } from 'react-dom/client';


import './index.css';
import App from './App';


const container = document.getElementById('result')
const root = createRoot(container)
root.render(
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App tab="home"  />
    </BrowserRouter>
)