import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import './index.css';
import App from './App';
import { NewsProvider } from './context/NewsContext';
import { AdMonetizationProvider } from './context/AdMonetizationContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <AdMonetizationProvider>
        <NewsProvider>
          <App />
        </NewsProvider>
      </AdMonetizationProvider>
    </MotionConfig>
  </StrictMode>
);
