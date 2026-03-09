import { useContext } from "react";
import { PreferenceContext } from "../context/PreferenceContext";

export const usePreference = () => {
  const context = useContext(PreferenceContext);
  if (!context)
    throw new Error("usePreference must be used within a PreferenceProvider");
  return context;
};
