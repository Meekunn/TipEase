import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import { endpoints } from "./endpoints";
import { useWallet } from "@/hooks/useWallet";
import { usePreference } from "@/hooks/usePreference";
import { useTip } from "@/hooks/useTip";

// User
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { updateWallet } = useWallet();
  return useMutation({
    mutationFn: (data: Partial<IUser> & { avatarFile?: File | null }) => {
      const formData = new FormData();

      if (data.tagName !== undefined)
        formData.append("tagName", data.tagName ?? "");
      if (data.bio !== undefined) formData.append("bio", data.bio ?? "");
      if (data.instagram !== undefined)
        formData.append("instagram", data.instagram ?? "");
      if (data.twitter !== undefined)
        formData.append("twitter", data.twitter ?? "");
      if (data.tiktok !== undefined)
        formData.append("tiktok", data.tiktok ?? "");
      if (data.showWalletAddress !== undefined)
        formData.append("showWalletAddress", String(data.showWalletAddress));
      if (data.avatarFile) formData.append("avatar", data.avatarFile);

      return api.putForm<{ user: IUser }>(endpoints.USER, formData);
    },
    onSuccess: ({ user }) => {
      updateWallet(user);
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
};

// Preferences
export const useUpdatePreferences = () => {
  const queryClient = useQueryClient();
  const { updatePreferenceContext } = usePreference();
  return useMutation({
    mutationFn: (data: Partial<IPreference>) =>
      api.put(endpoints.PREFERENCES, data),
    onSuccess: ({ preference }) => {
      updatePreferenceContext(preference);
      queryClient.invalidateQueries({ queryKey: ["preferences"] });
    },
  });
};

// Tips
export const useCreateTip = () => {
  const queryClient = useQueryClient();
  const { updateTip } = useTip();
  return useMutation({
    mutationFn: (data: ISendTip & { txHash: string }) =>
      api.post(endpoints.POST_TIPS, data),
    onSuccess: ({ tip }) => {
      console.log("tip:", tip);
      updateTip(tip);
      queryClient.invalidateQueries({ queryKey: ["tips", "sent"] });
      queryClient.invalidateQueries({ queryKey: ["tips", "received"] });
    },
  });
};

// // Withdrawals
// export const useCreateWithdrawal = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (data: {
//       txHash: string;
//       coin: string;
//       amount: string;
//       toAddress: string;
//     }) => api.post(endpoints.withdrawals.create, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["withdrawals", "history"] });
//     },
//   });
// };
