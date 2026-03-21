import { useContext } from "react";
import { TipContext } from "@/context/TipContext";

export const useTip = () => {
  const context = useContext(TipContext);
  if (!context) throw new Error("useTip must be used within a TipProvider");
  return context;
};
