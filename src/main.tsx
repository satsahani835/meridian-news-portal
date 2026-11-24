import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import './index.css';
import App from './App';
import { NewsProvider } from './context/NewsContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <NewsProvider>
        <App />
      </NewsProvider>
    </MotionConfig>
  </StrictMode>
);
