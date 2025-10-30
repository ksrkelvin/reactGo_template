import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';

function App() {
  return (
<div className="h-full bg-gray-100 text-gray-900 flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 min-h-0">
        {/* <Sidebar user={user} /> */}
        {/* <MainContent>{children}</MainContent> */}
      </div>
      {/* <Footer /> */}
    </div>
  );

}

export default App;
