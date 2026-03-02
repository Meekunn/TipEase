interface ISelectCurrency {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface WalletCardProps {
  icon: string;
  label: string;
  description: string;
  extra?: ReactNode;
}

interface TokenValueCardProps {
  tokenName: string;
  tokenValue: string;
  walletValue: string;
  icon: React.ReactNode;
}

interface StepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

interface IWallet {
  address: string;
  name: string;
  image: string;
  platform: string;
  balance: number;
}

interface ISendTipForm {
  coin: string;
  amount: string;
  address: string;
  note?: string;
  anonymous: boolean;
}
