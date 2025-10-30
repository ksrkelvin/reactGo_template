import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import { User } from './domain/models/user.models';

function App() {

	const [userData, setUserData] = React.useState<User>({} as User);

  return (
<div className="h-full bg-gray-100 text-gray-900 flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 min-h-0">
        <Sidebar user={userData} />
        {/* <MainContent>{children}</MainContent> */}
      </div>
      {/* <Footer /> */}
    </div>
  );

}

export default App;
