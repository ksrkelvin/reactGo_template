import React from "react";

export const Footer: React.FC = () => (
  <footer
    className="text-center py-4 border-t text-sm"
    style={{
      borderColor: "var(--color-border)",
      background: "var(--color-surface)",
      color: "var(--color-text)",
    }}
  >
    © 2025 My Company — All rights reserved.
  </footer>
);
export default Footer;
