import React from "react";
import { Sidebar } from "../sidebar";
import { Navbar } from "../navbar";
import { Footer } from "../footer";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          <div>
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
export default AppLayout;
