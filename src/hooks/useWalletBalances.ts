import { useBalance, useConnection, useReadContract } from "wagmi";
import { sepolia } from "wagmi/chains";
import { formatUnits } from "viem";
import { TOKEN_CONTRACTS } from "@/lib/wagmi";
import { useTokenPricesQuery } from "@/lib/queries";

const COINGECKO_IDS = {
  ETH: "ethereum",
  USDT: "tether",
  SOL: "solana",
  BNB: "binancecoin",
  BTC: "bitcoin",
} as const;

type TokenSymbol = keyof typeof COINGECKO_IDS;

export type TokenBalance = {
  symbol: TokenSymbol;
  balance: number; // human-readable (e.g. 0.05)
  usdPrice: number; // price of 1 token in USD
  usdValue: number; // balance * usdPrice
};

export type WalletBalances = {
  tokens: TokenBalance[];
  totalUsd: number;
  isLoading: boolean;
  error: string | null;
};


const ERC20_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;

export const useWalletBalances = () => {
  const { address, isConnected } = useConnection();
  const { data: prices, isLoading: pricesLoading } = useTokenPricesQuery();

  // native ETH balance
  const { data: ethBalance, isLoading: ethLoading } = useBalance({
    address,
    chainId: sepolia.id,
    query: { enabled: isConnected },
  });

  // USDT balance
  const { data: usdtRaw, isLoading: usdtLoading } = useReadContract({
    address: TOKEN_CONTRACTS.usdt,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [address!],
    chainId: sepolia.id,
    query: { enabled: isConnected && !!address },
  });

  const { data: usdcRaw, isLoading: usdcLoading } = useReadContract({
    address: TOKEN_CONTRACTS.usdc,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [address!],
    chainId: sepolia.id,
    query: { enabled: isConnected && !!address },
  });

  return {
    balances: {
      ethereum: {
        formatted: ethBalance
          ? formatUnits(ethBalance.value, ethBalance.decimals)
          : "0",
        symbol: ethBalance?.symbol ?? "ETH",
        value: ethBalance?.value ?? BigInt(0),
      },
      usdt: {
        formatted: usdtRaw ? formatUnits(usdtRaw as bigint, 6) : "0",
        symbol: "USDT",
        value: usdtRaw ?? BigInt(0),
      },
      usdc: {
        formatted: usdcRaw ? formatUnits(usdcRaw as bigint, 6) : "0",
        symbol: "USDC",
        value: usdcRaw ?? BigInt(0),
      },
    },
    isLoading: ethLoading || usdtLoading || usdcLoading,
  };
};
