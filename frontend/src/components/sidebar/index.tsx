import { Link, useNavigate } from "react-router-dom";
import { User } from "../../domain/models/user.models";

interface SideBarProps {
	user: User;
}

export default function Sidebar({ user }:  SideBarProps ) {
  const navigate = useNavigate();
  return (
    <aside
      id="sidebar"
      className="bg-white w-64 h-full border-r border-gray-200 flex flex-col justify-between transform -translate-x-full md:translate-x-0 transition-transform duration-300 fixed md:static z-50"
    >
      <nav className="mt-6 flex-1">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m2 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6"
                />
              </svg>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/explorer"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7l4-4 4 4m0 10l-4 4-4-4"
                />
              </svg>
              Explorer
            </Link>
          </li>
          <li>
            <Link
              to="/notifications"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 17h5l-1.405-1.405M19 13V8a7 7 0 10-14 0v5l-1 1v1h16v-1l-1-1z"
                />
              </svg>
              Notifications
            </Link>
          </li>
        </ul>
      </nav>
      <div className="border-t border-gray-200 p-4">
        <IsLoggedIn user={user} />
      </div>
    </aside>
  );
}

export function IsLoggedIn({ user }:SideBarProps) {
  const isAuthenticated = user && Object.keys(user).length > 0;

  if (isAuthenticated) {
    return (
      <Link to="/me" className="block">
        <div className="flex items-center space-x-3 hover:bg-gray-100 rounded-lg cursor-pointer p-2">
          <img src={user.avatar} alt="Avatar" className="h-10 w-10 rounded-full" />
          <div>
            <p className="text-gray-900 font-semibold">{user.name}</p>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <Link
        to="/login"
        className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
      >
        Entrar
      </Link>
    );
  }
}

  export function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
      sidebar.classList.toggle("-translate-x-full");
    }
  }
