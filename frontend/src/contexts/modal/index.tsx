import React, { createContext, useContext, useState, ReactNode } from "react";
import ModalWrapper from "../../components/modalWarper";

interface ModalContextType {
  isOpen: boolean;
  openModal: (content: ReactNode, title?: string) => void;
  closeModal: () => void;
  modalContent: ReactNode | null;
  modalTitle?: string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal deve ser usado dentro de ModalProvider");
  }
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [modalTitle, setModalTitle] = useState<string | undefined>(undefined);

  const openModal = (content: ReactNode, title?: string) => {
    setModalContent(content);
    setModalTitle(title);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
    setModalTitle(undefined);
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalContent, modalTitle }}>
      {children}
      <ModalWrapper
        isOpen={isOpen}
        onClose={closeModal}
        title={modalTitle}
      >
        {modalContent}
      </ModalWrapper>
    </ModalContext.Provider>
  );
};
