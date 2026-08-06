import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './styles/reset.css';
import './styles/variables.css';
import './styles/themes.css';
import './styles/global.css';
import './styles/utilities.css';
import App from './App';

const container = document.getElementById('root');

if (import.meta.env.DEV) {
  // Vite dev server sends an empty shell. We must client-render.
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  // Prod/Preview has pre-rendered HTML. We must hydrate.
  hydrateRoot(container, 
    <StrictMode>
      <App />
    </StrictMode>, 
    {
      onRecoverableError(error, errorInfo) {
        console.error('🚨 HYDRATION MISMATCH', error, errorInfo);
      }
    }
  );
}
