import React from "react";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full p-6 relative"
          onClick={(e) => e.stopPropagation()}
          style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
        >
          {title && (
            <header className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
              <button
                onClick={onClose}
                aria-label="Fechar modal"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
              >
                &#x2715;
              </button>
            </header>
          )}
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default ModalWrapper;
