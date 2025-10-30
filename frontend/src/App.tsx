import React from 'react';

import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import MePage from './pages/me';

const App = () =>{
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/me" element={<MePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
