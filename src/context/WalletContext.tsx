import { createContext, useState, type ReactNode } from "react";

interface WalletContextType {
  wallet: IWallet;
  updateWallet: (details: Partial<IWallet>) => void;
  deleteWallet: () => void;
}

export const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {

  const [wallet, setWallet] = useState<IWallet>(() => {
    const stored = localStorage.getItem("tipease_wallet");
    return stored ? JSON.parse(stored) : { address: "", name: "", image: "", platform: "", balance: 0 };
  });

  const updateWallet = (details: Partial<IWallet>) => {
    setWallet((prev) => {
      const updated = { ...prev, ...details };
      localStorage.setItem("tipease_wallet", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteWallet = () => {
    setWallet({ address: "", name: "", image: "", platform: "", balance: 0 })
    localStorage.removeItem("tipease_wallet")
  }

  return (
    <WalletContext.Provider value={{wallet, updateWallet, deleteWallet}}>
      {children}
    </WalletContext.Provider>
  );
}