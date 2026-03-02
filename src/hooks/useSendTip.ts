import { useContext } from "react";
import { SendTipContext } from "@/context/SendTipContext";

export const useSendTip = () => {
  const context = useContext(SendTipContext);
  if (!context)
    throw new Error("useSendTip must be used within a SendTipProvider");
  return context;
};
