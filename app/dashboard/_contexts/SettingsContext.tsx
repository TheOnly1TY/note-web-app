"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface SettingsContextType {
  currentSettings: string;
  setCurrentSettings: Dispatch<SetStateAction<string>>;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [currentSettings, setCurrentSettings] = useState<string>("Colors");

  const valueprops = { currentSettings, setCurrentSettings };
  return (
    <SettingsContext.Provider value={valueprops}>
      {children}
    </SettingsContext.Provider>
  );
}

function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

export { useSettings, SettingsProvider };
