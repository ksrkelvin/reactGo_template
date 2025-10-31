import React from "react";

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import MePage from "./pages/me";
import RequireAuth from "./usercase/util/privateRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/me"
        element={
          <RequireAuth>
            <MePage />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default App;
