import { createContext, useState, type ReactNode } from "react";

interface SendTipContextType {
  sendTipForm: ISendTip;
  updateSendTipForm: (details: Partial<ISendTip>) => void;
  clearSendTipForm: () => void;
  tip: ITip | null;
  updateTip: (tips: ITip) => void;
  tips: ITip[];
  updateTips: (tips: ITip[]) => void;
}

export const SendTipContext = createContext<SendTipContextType | undefined>(undefined);

const defaultForm: ISendTip = {
  coin: "ethereum",
  amount: "",
  recipientAddress: "",
  note: "",
  anonymous: false,
};

export function SendTipProvider({ children }: { children: ReactNode }) {
  const [sendTipForm, setSendTipForm] = useState<ISendTip>(defaultForm);
  const [tip, setTip] = useState<ITip | null>(null);
  const [tips, setTips] = useState<ITip[]>([]);

  const updateSendTipForm = (details: Partial<ISendTip>) => {
    setSendTipForm((prev) => ({ ...prev, ...details }));
  };

  const clearSendTipForm = () => {
    setSendTipForm(defaultForm);
  };

  const updateTip = (tips: ITip) => {
    setTip(tips);
  };

  const updateTips = (tips: ITip[]) => {
    setTips(tips);
  };

  return (
    <SendTipContext.Provider value={{ sendTipForm, updateSendTipForm, clearSendTipForm, tip, updateTip, tips, updateTips }}>
      {children}
    </SendTipContext.Provider>
  );
}