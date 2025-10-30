import  { StrictMode } from 'react';
import  { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { getUser, AuthProvider } from './auth';
import AppLayout from './components/layout';

const initializeApp = async () => {
	const userSession = await getUser();

	createRoot(document.getElementById('root')!).render(
		<StrictMode>
					<BrowserRouter>
						<AuthProvider appAuth={userSession}>
							<AppLayout>
								<App />
							</AppLayout>
						</AuthProvider>
					</BrowserRouter>
		</StrictMode>
	);
};

initializeApp();
