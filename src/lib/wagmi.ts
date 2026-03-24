import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { createAppKit } from "@reown/appkit/react";
import { sepolia as appKitSepolia } from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";
import { http } from "wagmi";

export const projectId: string = import.meta.env.VITE_REOWN_PROJECT_ID!;

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [appKitSepolia];

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  transports: {
    [appKitSepolia.id]: http(import.meta.env.VITE_ALCHEMY_RPC_URL),
  },
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: "TipEase",
    description: "Send tips with any wallet, any token.",
    url: window.location.origin,
    icons: ["/logo.svg"],
  },
  features: {
    analytics: false,
  },
});

export const TOKEN_CONTRACTS = {
  usdc: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  usdt: "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0",
  ethereum: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
} as const;

export type SupportedToken = keyof typeof TOKEN_CONTRACTS;
