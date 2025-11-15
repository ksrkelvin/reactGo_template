import React from "react";
import { Sidebar } from "../sidebar";
import { Navbar } from "../navbar";
import { Footer } from "../footer";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className="flex flex-col h-screen" 
      style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <Navbar />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 min-h-0">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};
export default AppLayout;
