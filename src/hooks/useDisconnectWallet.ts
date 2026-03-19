import { useDisconnect } from "wagmi";
import { useWallet } from "./useWallet";

export const useDisconnectWallet = () => {
  const {
    mutate: disconnect,
    isSuccess: success,
    isError: error,
  } = useDisconnect();
  const { deleteWallet } = useWallet();

  const disconnectWallet = () => {
    disconnect();
    console.log(success);
    console.log(error);
    deleteWallet();
  };

  return { disconnectWallet };
};
