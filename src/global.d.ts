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

interface IUser {
  id: string;
  walletAddress: string;
  tagName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  instagram: string | null;
  twitter: string | null;
  tiktok: string | null;
  showWalletAddress: boolean;
  createdAt: string;
}

interface IWallet {
  token: string;
  user: IUser;
}

interface ISendTipForm {
  coin: string;
  amount: string;
  recipientAddress: string;
  note: string;
  anonymous: boolean;
}

interface IPreference {
  defaultCurrency: string;
  minTipAmount: string;
  defaultThankYouMessage: string | null;
  autoAcceptTips: boolean;
}
