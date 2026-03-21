import { useBalance, useConnection, useReadContract } from "wagmi";
import { sepolia } from "wagmi/chains";
import { formatUnits } from "viem";
import { TOKEN_CONTRACTS } from "@/lib/wagmi";
import { useCoinPrices } from "./useCoinPrices";

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
  const { getPrice, getUsdValue, pricesLoading } = useCoinPrices();

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

  const ethAmount = ethBalance
    ? parseFloat(formatUnits(ethBalance.value, ethBalance.decimals))
    : 0;
  const usdtAmount = usdtRaw
    ? parseFloat(formatUnits(usdtRaw as bigint, 6))
    : 0;
  const usdcAmount = usdcRaw
    ? parseFloat(formatUnits(usdcRaw as bigint, 6))
    : 0;

  const tokens = [
    {
      symbol: "ETH",
      balance: ethAmount,
      usdPrice: getPrice("ethereum"),
      usdValue: getUsdValue("ethereum", ethAmount.toString()),
    },
    {
      symbol: "USDT",
      balance: usdtAmount,
      usdPrice: getPrice("usdt"),
      usdValue: getUsdValue("usdt", usdtAmount.toString()),
    },
    {
      symbol: "USDC",
      balance: usdcAmount,
      usdPrice: getPrice("usdc"),
      usdValue: getUsdValue("usdc", usdcAmount.toString()),
    },
  ];

  const totalUsd = tokens.reduce((sum, t) => sum + parseFloat(t.usdValue), 0);

  return {
    tokens,
    totalUsd,
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
    isLoading: ethLoading || usdtLoading || usdcLoading || pricesLoading,
  };
};
