"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface NotesType {
  isOpen: boolean;
  mode: string;
  id?: string;
}

interface NotesContextType {
  workSpace: NotesType;
  setWorkSpace: Dispatch<SetStateAction<NotesType>>;
}

const NotesContext = createContext<NotesContextType | null>(null);

function NotesProvider({ children }: { children: React.ReactNode }) {
  const [workSpace, setWorkSpace] = useState<NotesType>({
    isOpen: false,
    mode: "",
    id: undefined,
  });

  const valueprops = { workSpace, setWorkSpace };
  return (
    <NotesContext.Provider value={valueprops}>{children}</NotesContext.Provider>
  );
}

function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}

export { useNotes, NotesProvider };
