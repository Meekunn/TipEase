import { COINGECKO_IDS } from "@/constants/currencies";
import { useTokenPricesQuery } from "@/lib/queries";

export const useCoinPrices = () => {
  const { data: prices, isLoading: pricesLoading } = useTokenPricesQuery();

  const getPrice = (coin: string): number => {
    const geckoId = COINGECKO_IDS[coin];
    return parseFloat(prices?.[geckoId]?.usd.toString() ?? "0");
  };

  const getUsdValue = (coin: string, amount: string): string => {
    const price = getPrice(coin);
    const value = price * parseFloat(amount || "0");
    return value.toFixed(2);
  };

  return { getPrice, getUsdValue, pricesLoading };
};
