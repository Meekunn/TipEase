import { createContext, useState, type ReactNode } from "react";

interface TipContextType {
  sendTipForm: ISendTip;
  updateSendTipForm: (details: Partial<ISendTip>) => void;
  clearSendTipForm: () => void;
  tip: ITip | null;
  updateTip: (tips: ITip) => void;
  sentTips: ITip[];
  updateSentTips: (tips: ITip[]) => void;
  receivedTips: ITip[];
  updateReceivedTips: (tips: ITip[]) => void;
}

export const TipContext = createContext<TipContextType | undefined>(undefined);

const defaultForm: ISendTip = {
  coin: "ethereum",
  amount: "",
  recipientAddress: "",
  note: "",
  anonymous: false,
};

export function TipProvider({ children }: { children: ReactNode }) {
  const [sendTipForm, setSendTipForm] = useState<ISendTip>(defaultForm);
  const [tip, setTip] = useState<ITip | null>(null);
  const [sentTips, setSentTips] = useState<ITip[]>([]);
  const [receivedTips, setReceivedTips] = useState<ITip[]>([]);

  const updateSendTipForm = (details: Partial<ISendTip>) => {
    setSendTipForm((prev) => ({ ...prev, ...details }));
  };

  const clearSendTipForm = () => {
    setSendTipForm(defaultForm);
  };

  const updateTip = (tips: ITip) => {
    setTip(tips);
  };

  const updateSentTips = (tips: ITip[]) => {
    setSentTips(tips);
  };

  const updateReceivedTips = (tips: ITip[]) => {
    setReceivedTips(tips);
  };

  return (
    <TipContext.Provider value={{ sendTipForm, updateSendTipForm, clearSendTipForm, tip, updateTip, sentTips, updateSentTips, receivedTips, updateReceivedTips }}>
      {children}
    </TipContext.Provider>
  );
}