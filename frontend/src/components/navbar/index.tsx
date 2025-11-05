import React from "react";
import { ThemeToggle } from "../themeToggle";

export const Navbar: React.FC = () => {
  return (
    <header
      className="flex items-center justify-between px-6 h-16 border-b"
      style={{ borderColor: "border", background: "var(--color-surface)" }}
    >
      <h1 className="text-lg font-semibold tracking-wide" style={{ color: "var(--color-text)" }}>
        My Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
