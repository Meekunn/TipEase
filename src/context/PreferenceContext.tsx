import { createContext, useState, type ReactNode } from "react";

interface PreferenceContextType {
  preference: IPreference;
  updatePreferenceContext: (details: Partial<IPreference>) => void;
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

  const updatePreferenceContext = (details: Partial<IPreference>) => {
    setPreference((prev) => ({ ...prev, ...details }));
  };

  return (
    <PreferenceContext.Provider value={{ preference, updatePreferenceContext }}>
      {children}
    </PreferenceContext.Provider>
  );
}