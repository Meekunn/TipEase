import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { useWallet } from "@/hooks/useWallet";
import { endpoints } from "./endpoints";
import { usePreference } from "@/hooks/usePreference";
import { useSendTip } from "@/hooks/useSendTip";

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
  const { updatePreference } = usePreference();
  return useQuery({
    queryKey: ["preferences"],
    queryFn: async () => {
      const { preference } = await api.get(endpoints.PREFERENCES);
      updatePreference(preference);
      return preference as IPreference;
    },
    enabled: isConnected,
    staleTime: 1000 * 60 * 10,
  });
};

// Tips
export const useGetSentTips = () => {
  const { isConnected } = useWallet();
  const { updateTips } = useSendTip();
  return useQuery({
    queryKey: ["tips", "sent"],
    queryFn: async () => {
      const { tips } = await api.get(endpoints.GET_TIPS_SENT);
      updateTips(tips);
      return tips as ITip[];
    },
    enabled: isConnected,
  });
};

// Prices
export const useTokenPricesQuery = () => {
  return useQuery({
    queryKey: ["tokenPrices"],
    queryFn: async (): Promise<CoinGeckoPrices> => {
      const ids = "ethereum,tether,usd-coin";
      const res = await api.get(endpoints.COIN_GECKO_ID(ids));
      return res.data;
    },
    refetchInterval: 60_000,
    staleTime: 60_000,
  });
};

// export const useGetReceivedTips = () => {
//   const { isConnected } = useWallet();
//   return useQuery({
//     queryKey: ["tips", "received"],
//     queryFn: async () => {
//       const { tips } = await api.get(endpoints.GET_TIPS_RECEIVED);
//       return tips as ITip[];
//     },
//     enabled: isConnected,
//   });
// };

// export const useGetTipById = (id: string) => {
//   return useQuery({
//     queryKey: ["tips", id],
//     queryFn: async () => {
//       const { tip } = await api.get(endpoints.GET_TIPS_BY_ID(id));
//       return tip as ITip;
//     },
//     enabled: !!id,
//   });
// };

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
