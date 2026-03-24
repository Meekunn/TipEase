import { useDisconnect } from "@reown/appkit/react";
import { useWallet } from "./useWallet";

export const useDisconnectWallet = () => {
  const { disconnect } = useDisconnect();
  const { deleteWallet } = useWallet();

  const disconnectWallet = () => {
    disconnect();
    deleteWallet();
  };

  return { disconnectWallet };
};
