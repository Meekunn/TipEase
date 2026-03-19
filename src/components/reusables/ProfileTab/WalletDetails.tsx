import { useState } from "react";
import {
  copyToClipboard,
  hideValue,
  truncateWalletAddress,
} from "@/utils/formatText";
import {
  VStack,
  HStack,
  Text,
  Avatar,
  IconButton,
  Button,
  Box,
  For,
  Dialog,
} from "@chakra-ui/react";
import {
  BitcoinIcon,
  CopyIcon,
  UsdtIcon,
  BnbIcon,
  EthereumIcon,
  SolanaIcon,
} from "@/components/reusables/icon";
import { IoMdPower } from "react-icons/io";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { LiaWalletSolid } from "react-icons/lia";
import TokenValueCard from "./TokenValueCard";
import WithdrawDialog from "../WithdrawDialog";
import { useWallet } from "@/hooks/useWallet";
import { useDisconnectWallet } from "@/hooks/useDisconnectWallet";

const WalletDetails = () => {
  const { wallet } = useWallet();
  const {disconnectWallet} = useDisconnectWallet()
  const totalValue = "$15,963.70";
  const [showValue, setShowValue] = useState(false);

  const walletAddress = wallet?.walletAddress ?? ""
  const tokens: TokenValueCardProps[] = [
    {
      tokenName: "Bitcoin",
      tokenValue: "0.050BTC",
      walletValue: "$690.34",
      icon: <BitcoinIcon />,
    },
    {
      tokenName: "Tether USDT",
      tokenValue: "12430.050USDT",
      walletValue: "$12,490.34",
      icon: <UsdtIcon />,
    },
    {
      tokenName: "Solana",
      tokenValue: "81.76050SOL",
      walletValue: "$1,690.34",
      icon: <SolanaIcon />,
    },
    {
      tokenName: "Ethereum",
      tokenValue: "0.050BTC",
      walletValue: "$690.34",
      icon: <EthereumIcon />,
    },
    {
      tokenName: "BNB",
      tokenValue: "5.3050BNB",
      walletValue: "$1,690.34",
      icon: <BnbIcon />,
    },
  ];

  return (
    <VStack
      bg="white"
      border="0.6px solid"
      borderColor="bgPrimary"
      p={4}
      gap={5}
      borderRadius="xl"
      w="full"
      align="start"
    >
      <VStack gap={6} w="full" align="start">
        <VStack gap={4} w="full" align="start">
          <HStack gap={2} justify="space-between" w="full">
            <HStack gap={2}>
              <Avatar.Root size="2xs">
                <Avatar.Fallback name="Person Name" />
                <Avatar.Image src={wallet?.avatarUrl} objectPosition="bottom" />
              </Avatar.Root>
              <Text color="textLight" fontSize="xs">
                {truncateWalletAddress(walletAddress)}
              </Text>
              <IconButton
                aria-label="Copy Wallet Address"
                size="xs"
                variant="ghost"
                p={0}
                _hover={{
                  bgColor: "bgPrimary",
                }}
                onClick={() => {
                  copyToClipboard(walletAddress);
                }}
              >
                <CopyIcon />
              </IconButton>
            </HStack>
            <IconButton
              aria-label="Disconnect Wallet"
              size="xs"
              variant="ghost"
              color="red.500"
              borderRadius="full"
              _hover={{
                bgColor: "red.100",
              }}
              onClick={disconnectWallet}
            >
              <IoMdPower />
            </IconButton>
          </HStack>
          <VStack gap={1} align="start">
            <Text color="textSecondary" fontSize="xs">
              Total Value
            </Text>
            <HStack gap={4.5}>
              <Text fontSize="xl">
                {showValue ? totalValue : hideValue(totalValue)}
              </Text>
              <IconButton
                aria-label="Toggle Visibility"
                size="sm"
                variant="ghost"
                borderRadius="full"
                color="textPrimary"
                _hover={{
                  bgColor: "bgPrimary",
                }}
                onClick={() => setShowValue(!showValue)}
              >
                {showValue ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )}
              </IconButton>
            </HStack>
          </VStack>
        </VStack>
        <WithdrawDialog>
          <Dialog.Trigger asChild>
            <Button w="full" variant="solid" borderRadius="4xl" py={2} fontSize="sm">
              <LiaWalletSolid />
              Withdraw
            </Button>
          </Dialog.Trigger>
        </WithdrawDialog>
      </VStack>
      <Box w="full" h="0.6px" bg="bgPrimary" />
      <VStack gap={4} w="full" align="start">
        <Text fontSize="xs">Tokens</Text>
        <VStack gap={6} w="full" align="start">
          <For each={tokens}>
            {(token, index) => (
              <TokenValueCard
                key={index}
                tokenName={token.tokenName}
                tokenValue={token.tokenValue}
                walletValue={token.walletValue}
                icon={token.icon}
              />
            )}
          </For>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default WalletDetails;
