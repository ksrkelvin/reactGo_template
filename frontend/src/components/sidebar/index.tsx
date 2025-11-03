import React, { useState } from "react";
import {
  faChevronRight,
  faChevronLeft,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";


export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <aside
      className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shadow-md ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <button
        className="px-2 py-3 text-gray-600 hover:text-blue-600 focus:outline-none self-end"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Expandir sidebar" : "Encolher sidebar"}
      >
        <FontAwesomeIcon
          icon={isCollapsed ? faChevronRight : faChevronLeft}
          size="lg"
        />
      </button>

      <ul className="flex-1 flex flex-col mt-4 space-y-4 px-3">
        <li className="flex items-center space-x-3 cursor-pointer text-gray-700 hover:text-blue-600">
          <button
            onClick={() => navigate("/")}
            title="Home"
          >
            <FontAwesomeIcon icon={faHome} size="lg" />
            {!isCollapsed && <span className="font-medium">Home</span>}
          </button>
        </li>
        <li className="flex items-center space-x-3 cursor-pointer text-gray-700 hover:text-blue-600">
          <button
            onClick={() => navigate("/me")}
            title="Me"
          >
            <FontAwesomeIcon icon={faUser} size="lg" />
            {!isCollapsed && <span className="font-medium">Me</span>}
          </button>
        </li>
      </ul>
    </aside>
  );
};
