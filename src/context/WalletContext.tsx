import { createContext, useState, type ReactNode } from "react";

interface WalletContextType {
  wallet: IUser | null;
  isConnected: boolean;
  updateWallet: (user: IUser) => void;
  deleteWallet: () => void;
}

export const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<IUser | null>(() => {
    const stored = localStorage.getItem('tipease_wallet');
    return stored ? JSON.parse(stored) : null;
  });

  const isConnected = !!wallet?.walletAddress;

  const updateWallet = (user: IUser) => {
    setWallet(user);
    localStorage.setItem('tipease_wallet', JSON.stringify(user));
  };

  const deleteWallet = () => {
    setWallet(null);
    localStorage.removeItem('tipease_token');
    localStorage.removeItem('tipease_wallet');
  };

  return (
    <WalletContext.Provider value={{ wallet, isConnected, updateWallet, deleteWallet }}>
      {children}
    </WalletContext.Provider>
  );
}