import { endpoints } from "@/lib/endpoints";
import { useQuery } from "@tanstack/react-query";

const COINGECKO_IDS: Record<string, string> = {
  ethereum: "ethereum",
  usdc: "usd-coin",
  bitcoin: "bitcoin",
  tron: "tron",
};

const fetchPrices = async (coinIds: string[]) => {
  const ids = coinIds.join(",");
  const res = await fetch(endpoints.COIN_GECKO_ID(ids));
  if (!res.ok) throw new Error("Failed to fetch prices");
  return res.json() as Promise<Record<string, { usd: number }>>;
};

export const useCoinPrices = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["coinPrices"],
    queryFn: () => fetchPrices(Object.values(COINGECKO_IDS)),
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 2,
  });

  const getPrice = (coin: string): number => {
    const geckoId = COINGECKO_IDS[coin];
    return data?.[geckoId]?.usd ?? 0;
  };

  const getUsdValue = (coin: string, amount: string): string => {
    const price = getPrice(coin);
    const value = price * parseFloat(amount || "0");
    return value.toFixed(2);
  };

  return { getPrice, getUsdValue, isLoading };
};
