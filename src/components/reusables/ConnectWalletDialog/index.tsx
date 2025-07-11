import type { ReactNode } from "react";
import {
  Dialog,
  VStack,
  Portal,
  CloseButton,
  Avatar,
  For,
  Button,
  Box,
} from "@chakra-ui/react";
import WalletCard from "./WalletCard";
import MetaMask from "@/assets/metamask.png";
import TrustWallet from "@/assets/trust-wallet.png";
import CoinbaseWallet from "@/assets/coinbase.png";
import BinanceWallet from "@/assets/binance.png";
import WalletConnect from "@/assets/wallet-connect.png";
import AllWallets from "@/assets/other-wallet.png";
import { MdOutlineQrCodeScanner } from "react-icons/md";

interface ConnectWalletDialogProps {
  children: ReactNode;
}

const ConnectWalletDialog = ({ children }: ConnectWalletDialogProps) => {
  const walletOptions: WalletCardProps[] = [
    {
      icon: MetaMask,
      label: "MetaMask",
      description: "Connect to your MetaMask wallet.",
    },
    {
      icon: TrustWallet,
      label: "Trust Wallet",
      description: "Connect to your Trust Wallet wallet.",
    },
    {
      icon: CoinbaseWallet,
      label: "Coinbase Wallet",
      description: "Connect to your Coinbase wallet.",
    },
    {
      icon: BinanceWallet,
      label: "Binance Wallet",
      description: "Connect to your Binance wallet.",
    },
    {
      icon: WalletConnect,
      label: "WalletConnect",
      description: "Scan with WalletConnect to connect.",
      extra: (
        <Button
          bg="rgba(255, 126, 246, 0.2)"
          color="#FF7EF6"
          fontSize="8px"
          py={1}
          px={2}
          borderRadius="4px"
        >
          <MdOutlineQrCodeScanner width={3} height={3} />
          QR CODE
        </Button>
      ),
    },
    {
      icon: AllWallets,
      label: "All Wallets",
      description: "Select wallet",
      extra: (
        <Box
          bg="linear-gradient(180deg, #F7F7F7 0%, #EAE7E7 100%);"
          color="textPrimary"
          fontSize="2xs"
          py={1}
          px={2}
          borderRadius="4px"
          fontWeight="semibold"
        >
          440+
        </Box>
      ),
    },
  ];
  return (
    <Dialog.Root placement="center">
      {children}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="white" borderRadius="xl" p={4} gap={6}>
            <Dialog.CloseTrigger asChild>
              <CloseButton
                size="sm"
                variant="solid"
                borderRadius="full"
                _hover={{
                  bgColor: "bgPrimary",
                }}
              />
            </Dialog.CloseTrigger>
            <Dialog.Header p={2} justifyContent="center">
              <Dialog.Title fontWeight="medium" fontSize="xl">
                Connect Wallet
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body p={0}>
              <VStack gap={3}>
                <For each={walletOptions}>
                  {(wallet, index) => (
                    <WalletCard
                      key={index}
                      icon={
                        <AvatarCard image={wallet.icon} name={wallet.label} />
                      }
                      label={wallet.label}
                      description={wallet.description}
                      extra={wallet.extra}
                    />
                  )}
                </For>
              </VStack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

const AvatarCard = ({ image, name }: { image: string; name: string }) => {
  return (
    <Avatar.Root>
      <Avatar.Fallback name={name} />
      <Avatar.Image src={image} />
    </Avatar.Root>
  );
};

export default ConnectWalletDialog;
