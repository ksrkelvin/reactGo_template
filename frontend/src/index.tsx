import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AppLayout from './components/layout';
import { LoadingProvider } from './contexts/loading';
import AuthProvider from './contexts/auth';

const initializeApp = () => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
			<LoadingProvider>
        <AuthProvider>
          <AppLayout>
            <App />
          </AppLayout>
        </AuthProvider>
			</LoadingProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

initializeApp();
