import { createListCollection } from "@chakra-ui/react";
import { BitcoinIcon, EthereumIcon, TronIcon, UsdcIcon, UsdtIcon } from "@/components/reusables/icon";
import type { JSX } from "react";

export const cryptoCurrencyOptions = createListCollection({
  items: [
    { label: "ETH", value: "ethereum", icon: <EthereumIcon /> },
    { label: "USDC", value: "usdc", icon: <UsdcIcon /> },
    { label: "USDT", value: "usdt", icon: <UsdtIcon /> },
    { label: "BTC", value: "bitcoin", icon: <BitcoinIcon /> },
    { label: "TRX", value: "tron", icon: <TronIcon /> },
  ],
});

export const currencyOptions = createListCollection({
  items: [
    { value: "USD", label: "USD - US Dollar" },
    { value: "CAD", label: "CAD - Canadian Dollar" },
    { value: "EUR", label: "EUR - Euros" },
  ],
});

export const coinIconMap: Record<string, JSX.Element> = {
  ethereum: <EthereumIcon size={"md"} />,
  usdc: <UsdcIcon size={"md"} />,
  bitcoin: <BitcoinIcon size={"md"} />,
  tron: <TronIcon size={"md"} />,
};
