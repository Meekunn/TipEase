import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors: [metaMask()],
  transports: {
    [sepolia.id]: http(import.meta.env.VITE_ALCHEMY_RPC_URL),
  },
});

export const TOKEN_CONTRACTS = {
  usdc: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  usdt: "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0",
  ethereum: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
} as const;

export type SupportedToken = keyof typeof TOKEN_CONTRACTS;
