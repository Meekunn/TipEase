import { createContext, useState, type ReactNode } from "react";

interface SendTipContextType {
  sendTipForm: ISendTipForm;
  updateSendTipForm: (details: Partial<ISendTipForm>) => void;
  clearSendTipForm: () => void;
}

export const SendTipContext = createContext<SendTipContextType | undefined>(undefined);

const defaultForm: ISendTipForm = {
  coin: "usdt",
  amount: "",
  recipientAddress: "",
  note: "",
  anonymous: false,
};

export function SendTipProvider({ children }: { children: ReactNode }) {
  const [sendTipForm, setSendTipForm] = useState<ISendTipForm>(() => {
    const stored = localStorage.getItem("tipease_send_tip_form");
    return stored ? JSON.parse(stored) : defaultForm;
  });

  const updateSendTipForm = (details: Partial<ISendTipForm>) => {
    setSendTipForm((prev) => {
      const updated = { ...prev, ...details };
      localStorage.setItem("tipease_send_tip_form", JSON.stringify(updated));
      return updated;
    });
  };

  const clearSendTipForm = () => {
    setSendTipForm(defaultForm);
    localStorage.removeItem("tipease_send_tip_form");
  };

  return (
    <SendTipContext.Provider value={{ sendTipForm, updateSendTipForm, clearSendTipForm }}>
      {children}
    </SendTipContext.Provider>
  );
}