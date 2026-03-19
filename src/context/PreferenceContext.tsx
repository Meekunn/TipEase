import { createContext, useState, type ReactNode } from "react";

interface PreferenceContextType {
  preference: IPreference;
  updatePreference: (details: Partial<IPreference>) => void;
}

export const PreferenceContext = createContext<PreferenceContextType | undefined>(undefined);

const defaultPreference: IPreference = {
  defaultCurrency: "USD",
  minTipAmount: "0",
  defaultThankYouMessage: "",
  autoAcceptTips: true,
};

export function PreferenceProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<IPreference>(defaultPreference);

  const updatePreference = (details: Partial<IPreference>) => {
    setPreference((prev) => ({ ...prev, ...details }));
  };

  return (
    <PreferenceContext.Provider value={{ preference, updatePreference }}>
      {children}
    </PreferenceContext.Provider>
  );
}