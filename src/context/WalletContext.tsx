import { createContext, useState, type ReactNode } from "react";

interface WalletContextType {
  wallet: IWallet | null;
  isConnected: boolean;
  updateWallet: (details: Partial<IWallet>) => void;
  deleteWallet: () => void;
}

export const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<IWallet | null>(() => {
    const stored = localStorage.getItem("tipease_wallet");
    return stored ? JSON.parse(stored) : null;
  });

  const isConnected = !!wallet?.user.walletAddress;

  const updateWallet = (details: Partial<IWallet>) => {
    setWallet((prev) => {
      const updated = { ...prev, ...details } as IWallet;
      localStorage.setItem("tipease_wallet", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteWallet = () => {
    setWallet(null);
    localStorage.removeItem("tipease_wallet");
  };

  return (
    <WalletContext.Provider value={{ wallet, isConnected, updateWallet, deleteWallet }}>
      {children}
    </WalletContext.Provider>
  );
}