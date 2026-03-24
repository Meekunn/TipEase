import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useAppKit, useAppKitAccount, useDisconnect } from "@reown/appkit/react";
import { useSignMessage } from "wagmi";
import { generateNonce, SiweMessage } from "siwe";
import { api } from "@/lib/api";
import { useWallet } from "@/hooks/useWallet";
import Loader from "../Loader";

interface ConnectWalletDialogProps {
  children: ReactNode;
}

const ConnectWalletDialog = ({ children }: ConnectWalletDialogProps) => {
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAppKitAccount();
  const { mutateAsync: signMessageAsync } = useSignMessage();
  const { updateWallet, isConnected: isAppConnected } = useWallet();

  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const signedInRef = useRef<string | null>(null);

  const runSiwe = useCallback(
    async (addr: string) => {
      try {
        setIsLoading(true);
        setLoadingText("Signing message…");

        const nonce = generateNonce();
        const message = new SiweMessage({
          domain: window.location.host,
          address: addr,
          statement: "Sign in to TipEase",
          uri: window.location.origin,
          version: "1",
          chainId: 11155111,
          nonce,
        });

        const preparedMessage = message.prepareMessage();
        const signature = await signMessageAsync({ message: preparedMessage });

        setLoadingText("Verifying…");
        const { token, user } = await api.post("/auth/verify", {
          message: preparedMessage,
          signature,
        });

        localStorage.setItem("tipease_token", token);
        updateWallet(user);
        signedInRef.current = addr;
      } catch (error) {
        console.error("SIWE sign-in failed:", error);
        disconnect();
      } finally {
        setIsLoading(false);
        setLoadingText("");
      }
    },
    [signMessageAsync, updateWallet, disconnect],
  );

  useEffect(() => {
    if (!isConnected || !address) return;
    if (signedInRef.current === address) return;
    if (isAppConnected) {
      signedInRef.current = address;
      return;
    }
    runSiwe(address);
  }, [isConnected, address, isAppConnected, runSiwe]);

  return (
    <>
      <Loader open={isLoading} text={loadingText} />
      <span onClick={() => open()}>{children}</span>
    </>
  );
};

export default ConnectWalletDialog;
