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
  isDisabled?: boolean;
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
  tagName: string;
  bio: string;
  avatarUrl: string;
  instagram: string;
  twitter: string;
  tiktok: string;
  showWalletAddress: boolean;
  createdAt: string;
}
interface ISendTip {
  coin: string;
  amount: string;
  recipientAddress: string;
  note: string;
  anonymous: boolean;
}

interface ITip {
  id: string;
  txHash: string;
  coin: string;
  amount: string;
  senderAddress: string;
  recipientAddress: string;
  note: string;
  anonymous: boolean;
  status: "pending" | "confirmed" | "failed";
}

interface IPreference {
  defaultCurrency: string;
  minTipAmount: string;
  defaultThankYouMessage: string;
  autoAcceptTips: boolean;
}

interface IEditProfileForm {
  tagName: string;
  avatarUrl: string | null;
  instagram: string;
  twitter: string;
  tiktok: string;
  bio: string;
}

type CoinGeckoPrices = {
  ethereum: { usd: number };
  tether: { usd: number };
  "usd-coin": { usd: number };
};
