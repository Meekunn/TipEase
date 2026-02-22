interface ISelectCurrency {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface WalletCardProps {
  icon: ReactNode;
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
