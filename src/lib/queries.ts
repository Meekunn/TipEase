import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { useWallet } from "@/hooks/useWallet";
import { endpoints } from "./endpoints";
import { usePreference } from "@/hooks/usePreference";
import { useTip } from "@/hooks/useTip";
import { COINGECKO_IDS } from "@/constants/currencies";

// User
export const useGetUser = () => {
  const { isConnected, updateWallet } = useWallet();
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const { user } = await api.get(endpoints.USER);
      updateWallet(user);
      return user as IUser;
    },
    enabled: isConnected,
    staleTime: 1000 * 60 * 10,
  });
};

export const useGetUserByAddress = (address: string) => {
  return useQuery({
    queryKey: ["user", address],
    queryFn: async () => {
      const { user } = await api.get(endpoints.GET_USER_BY_ADDRESS(address));
      return user as IUser;
    },
    enabled: !!address,
  });
};

// Preferences
export const useGetPreferences = () => {
  const { isConnected } = useWallet();
  const { updatePreferenceContext } = usePreference();
  return useQuery({
    queryKey: ["preferences"],
    queryFn: async () => {
      const { preference } = await api.get(endpoints.PREFERENCES);
      updatePreferenceContext(preference);
      return preference as IPreference;
    },
    enabled: isConnected,
    staleTime: 1000 * 60 * 10,
  });
};

// Tips
export const useGetSentTips = () => {
  const { isConnected } = useWallet();
  const { updateSentTips } = useTip();
  return useQuery({
    queryKey: ["tips", "sent"],
    queryFn: async () => {
      const { tips } = await api.get(endpoints.GET_TIPS_SENT);
      updateSentTips(tips);
      return tips as ITip[];
    },
    enabled: isConnected,
  });
};

export const useGetReceivedTips = () => {
  const { isConnected } = useWallet();
  const { updateReceivedTips } = useTip();
  return useQuery({
    queryKey: ["tips", "received"],
    queryFn: async () => {
      const { tips } = await api.get(endpoints.GET_TIPS_RECEIVED);
      updateReceivedTips(tips);
      return tips as ITip[];
    },
    enabled: isConnected,
  });
};

export const useGetTipById = (id: string) => {
  const { isConnected } = useWallet();
  const { updateTip } = useTip();
  return useQuery({
    queryKey: ["tips", id],
    queryFn: async () => {
      const { tip } = await api.get(endpoints.GET_TIPS_BY_ID(id));
      updateTip(tip);
      return tip as ITip;
    },
    enabled: !!id && isConnected,
  });
};

// Prices
export const useTokenPricesQuery = () => {
  return useQuery({
    queryKey: ["tokenPrices"],
    queryFn: async (): Promise<CoinGeckoPrices> => {
      const ids = Object.values(COINGECKO_IDS).join(",");
      const res = await api.getExternal(endpoints.COIN_GECKO_ID(ids));
      return res;
    },
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 2,
  });
};

// // Withdrawals
// export const useGetWithdrawalHistory = () => {
//   const { isConnected } = useWallet();
//   return useQuery({
//     queryKey: ["withdrawals", "history"],
//     queryFn: async () => {
//       const { withdrawals } = await api.get(endpoints.GET_WITHDRAWALS_HISTORY);
//       return withdrawals as IWithdrawal[];
//     },
//     enabled: isConnected,
//   });
// };
