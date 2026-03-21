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
  Spinner,
} from "@chakra-ui/react";
import {
  CopyIcon,
  UsdtIcon,
  EthereumIcon,
  UsdcIcon,
  EmptyWalletIcon,
} from "@/components/reusables/icon";
import { IoMdPower } from "react-icons/io";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { LiaWalletSolid } from "react-icons/lia";
import TokenValueCard from "./TokenValueCard";
import WithdrawDialog from "../WithdrawDialog";
import { useWallet } from "@/hooks/useWallet";
import { useDisconnectWallet } from "@/hooks/useDisconnectWallet";
import { useWalletBalances } from "@/hooks/useWalletBalances";
import ConnectWalletDialog from "../ConnectWalletDialog";

const WalletDetails = () => {
  const { wallet, isConnected } = useWallet();
  const {tokens, totalUsd, isLoading } = useWalletBalances();
  const {disconnectWallet} = useDisconnectWallet()
  const [showValue, setShowValue] = useState(false);

  const walletAddress = wallet?.walletAddress ?? ""

  const formattedTotal = `$${totalUsd.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const iconMap: Record<string, React.ReactNode> = {
    ETH: <EthereumIcon />,
    USDT: <UsdtIcon />,
    USDC: <UsdcIcon />,
  };

  const tokenCards: TokenValueCardProps[] = tokens.map((t) => ({
    tokenName: t.symbol === "ETH" ? "Ethereum"
      : t.symbol === "USDT" ? "Tether USDT"
      : "USD Coin",
    tokenValue: `${t.balance.toFixed(4)} ${t.symbol}`,
    walletValue: `$${t.usdValue}`,
    icon: iconMap[t.symbol],
  }));

  if (!isConnected) {
    return(
    <VStack
      bg="white"
      border="0.6px solid"
      borderColor="bgPrimary"
      p={6}
      gap={5}
      borderRadius="xl"
      w="full"
      align="center"
    >
      <Text fontSize="sm" textAlign="center">You need to connect your wallet to view your wallet details</Text>
      <ConnectWalletDialog>
        <Dialog.Trigger asChild>
          <Button borderRadius="lg">
            Connect Wallet <EmptyWalletIcon />
          </Button>
        </Dialog.Trigger>
      </ConnectWalletDialog>
    </VStack>
    )
  }

  if (isLoading) {
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
          <VStack gap={1} align="center" w="full" py={10}>
            <Spinner size="xl" borderWidth="4px" />
          </VStack>
        </VStack>
      </VStack>
    </VStack>
    )
  }

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
                {showValue ? formattedTotal : hideValue(formattedTotal)}
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
            <Button w="full" variant="solid" borderRadius="4xl" py={2} fontSize="sm" disabled>
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
          <For each={tokenCards}>
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
