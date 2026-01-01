"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

export type ModalType = "delete-note" | "archive-note" | null;

export interface ModalPayload {
  noteId?: string;
}

export interface ModalState {
  isOpen: boolean;
  type: ModalType;
  payload?: ModalPayload;
}

interface ModalContextType {
  modal: ModalState;
  openModal: (type: ModalType, payload?: ModalPayload) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    type: null,
    payload: undefined,
  });

  const openModal = (type: ModalType, payload?: ModalPayload) => {
    setModal({ isOpen: true, type, payload });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: null, payload: undefined });
  };

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
}
