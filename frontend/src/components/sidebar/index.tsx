import React, { useState } from "react";
import {
  faChevronRight,
  faChevronLeft,
  faHome,
  faUser,
  faChartBar,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: faHome },
    { path: "/me", label: "Perfil", icon: faUser },
  ];

  return (
    <aside
      className={`relative flex flex-col transition-all duration-300 overflow-hidden border-r`}
      style={{
        width: collapsed ? "5rem" : "15rem",
        background: "var(--color-surface)",
        borderColor: "var(--color-border)",
        color: "var(--color-text)",
      }}
      aria-label="Sidebar Navigation"
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expandir sidebar" : "Encolher sidebar"}
        className="absolute -right-3 top-6 bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-border)] p-2 rounded-full shadow-md transition-all"
      >
        <FontAwesomeIcon icon={collapsed ? faChevronRight : faChevronLeft} size="sm" />
      </button>

      <ul className="flex-1 flex flex-col mt-4 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                title={item.label}
                className={`group flex items-center w-full px-3 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-[var(--color-primary)] text-[var(--color-text)] bg-opacity-20"
                    : "hover:bg-[var(--color-border)] hover:bg-opacity-30"
                }`}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  size="lg"
                  className={`transition-colors ${
                    isActive
                      ? "text-[var(--color-text)]"
                      : "text-[var(--color-text)] opacity-80 group-hover:opacity-100"
                  }`}
                />
                {!collapsed && (
                  <span
                    className={`ml-3 text-sm font-medium ${
                      isActive ? "text-[var(--color-text)]" : "text-[var(--color-text)]"
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
