import { createContext, useState, type ReactNode } from "react";

interface PreferenceContextType {
  preference: IPreference;
  updatePreference: (details: Partial<IPreference>) => void;
}

export const PreferenceContext = createContext<PreferenceContextType | undefined>(undefined);

const defaultPreference: IPreference = {
  defaultCurrency: "USD",
  minTipAmount: "0",
  defaultThankYouMessage: null,
  autoAcceptTips: true,
};

export function PreferenceProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<IPreference>(() => {
    const stored = localStorage.getItem("tipease_preference");
    return stored ? JSON.parse(stored) : defaultPreference;
  });

  const updatePreference = (details: Partial<IPreference>) => {
    setPreference((prev) => {
      const updated = { ...prev, ...details };
      localStorage.setItem("tipease_preference", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <PreferenceContext.Provider value={{ preference, updatePreference }}>
      {children}
    </PreferenceContext.Provider>
  );
}