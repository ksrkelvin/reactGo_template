import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AppLayout from "./components/layout";
import { LoadingProvider } from "./contexts/loading";
import AuthProvider from "./contexts/auth";
import { ModalProvider } from "./contexts/modal";

const initializeApp = () => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter>
        <LoadingProvider>
          <AuthProvider>
            <ModalProvider>
              <AppLayout>
                <App />
              </AppLayout>
            </ModalProvider>
          </AuthProvider>
        </LoadingProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

initializeApp();
