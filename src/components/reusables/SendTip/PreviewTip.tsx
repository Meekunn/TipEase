import {
  Button,
  Heading,
  HStack,
  Text,
  VStack,
  Icon,
  IconButton,
  Switch,
  Box,
} from "@chakra-ui/react";
import { RxCaretLeft } from "react-icons/rx";
import { CopyIcon } from "../icon";
import { IoInformationCircleOutline } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";
import { copyToClipboard, truncateWalletAddress } from "@/utils/formatText";
import { useState } from "react";
import { useSendTip } from "@/hooks/useSendTip";
import { useSendTipTransaction } from "@/hooks/useSendTransaction";
import { TOKEN_CONTRACTS } from "@/lib/wagmi";
import { coinIconMap } from "@/constants/currencies";
import { useCoinPrices } from "@/hooks/useCoinPrices";
import { useEstimateFeesPerGas } from "wagmi";
import { sepolia } from "wagmi/chains";

interface PreviewTipProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setIsSending: React.Dispatch<React.SetStateAction<boolean>>;
  setTipSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const PreviewTip = ({ setStep, setIsSending, setTipSuccess }: PreviewTipProps) => {

  const { sendTipForm } = useSendTip();
  const { sendTip, isLoading } = useSendTipTransaction();
  const { getUsdValue } = useCoinPrices();
  const { data: feeData } = useEstimateFeesPerGas({
    chainId: sepolia.id,
  });
  const [isAgree, setIsAgree] = useState(false)
  
  const estimatedFeeEth = feeData
    ? (Number(feeData.maxFeePerGas) * 21000 / 1e18).toFixed(6)
    : '...';

  const handleBackClick = () => setStep(1);

  const handleSendTip = async () => {
    try {
      setIsSending(true);
      await sendTip({
        coin: sendTipForm.coin,
        amount: sendTipForm.amount,
        recipientAddress: sendTipForm.recipientAddress as `0x${string}`,
        note: sendTipForm.note,
        anonymous: sendTipForm.anonymous,
        tokenContract: TOKEN_CONTRACTS[sendTipForm.coin as keyof typeof TOKEN_CONTRACTS],
      });
      setTipSuccess(true);
      setStep(3);
    } catch (error) {
      setTipSuccess(false);
      console.error("Transaction failed:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <VStack w="full" gap={4}>
      <VStack
        border="0.6px solid"
        borderColor="bgPrimary"
        borderRadius="xl"
        p={2}
        gap={4}
        w="full"
      >
        <VStack position="relative" gap={2} align="center" w="full" py={2}>
          <Text color="textSecondary" fontSize="sm">
            Preview and transfer
          </Text>
          <Heading
            as="h1"
            size="h1"
            fontSize="1.75rem"
            fontWeight="semibold"
            lineHeight="100%"
            mt={1}
          >
            {sendTipForm.amount} {sendTipForm.coin.toUpperCase()}
          </Heading>
          <Text color="textSecondary"> ≈ ${getUsdValue(sendTipForm.coin, sendTipForm.amount)} USD</Text>
          <Button
            size="xs"
            variant="outline"
            borderRadius="4xl"
            color="textPrimary"
            position="absolute"
            top={0}
            right={0}
            _hover={{
              bgColor: "bgPrimary",
            }}
            onClick={handleBackClick}
          >
            <RxCaretLeft />
            Back
          </Button>
        </VStack>
        <VStack
          bg="bgSecondary"
          borderRadius="xl"
          border="0.6px solid"
          borderColor="bgPrimary"
          p={4}
          gap={8}
          w="full"
        >
          <HStack justify="space-between" w="full">
            <Text color="textSecondary" fontSize="sm">
              You&apos;re Sending
            </Text>
            <HStack gap={1}>
              {coinIconMap[sendTipForm.coin] ?? null}
              <Text fontSize="sm">
                {sendTipForm.amount} {sendTipForm.coin.toUpperCase()}
              </Text>
            </HStack>
          </HStack>
          <HStack justify="space-between" w="full">
            <HStack gap={2}>
              <Text color="textSecondary" fontSize="sm">
                Fee
              </Text>
              <Icon fontSize="18px" color="textSecondary" pb={1}>
                <IoInformationCircleOutline />
              </Icon>
            </HStack>

            <HStack gap={2}>
              <Text fontSize="sm">
              {estimatedFeeEth} ETH{' '}
              <Text as="span" color="textSecondary">
                ≈ ${getUsdValue('ethereum', estimatedFeeEth)} USD
              </Text>
            </Text>
            </HStack>
          </HStack>
          <HStack justify="space-between" w="full">
            <Text color="textSecondary" fontSize="sm">
              Estimated Time
            </Text>
            <Text fontSize="sm">≈ 15 secs</Text>
          </HStack>
          <HStack justify="space-between" w="full">
            <Text color="textSecondary" fontSize="sm">
              Recipient Address
            </Text>
            <HStack gap={2}>
              <Text fontSize="sm">
                {truncateWalletAddress(sendTipForm.recipientAddress, 9, 7)}
              </Text>
              <IconButton
                aria-label="Copy Wallet Address"
                size="xs"
                variant="ghost"
                p={0}
                _hover={{
                  bgColor: "bgPrimary",
                }}
                onClick={() => copyToClipboard(sendTipForm.recipientAddress)}
              >
                <CopyIcon />
              </IconButton>
            </HStack>
          </HStack>
        </VStack>
        <VStack
          bg="bgSecondary"
          borderRadius="xl"
          border="0.6px solid"
          borderColor="bgPrimary"
          p={4}
          gap={6}
          w="full"
        >
          <VStack gap={4} w="full" align="start">
            <Text color="textSecondary" fontSize="sm">
              Recipient Address
            </Text>
            <HStack gap={2} justify="space-between" w="full">
              <Text fontSize="sm">
                {truncateWalletAddress(sendTipForm.recipientAddress, 17, 15)}
              </Text>
              <IconButton
                aria-label="Copy Wallet Address"
                size="xs"
                variant="ghost"
                p={0}
                _hover={{
                  bgColor: "bgPrimary",
                }}
                onClick={() => copyToClipboard(sendTipForm.recipientAddress)}
              >
                <CopyIcon />
              </IconButton>
            </HStack>
          </VStack>
          {sendTipForm.note && (
            <VStack gap={4} w="full" align="start">
              <Text color="textSecondary" fontSize="sm">
                Note
              </Text>
              <HStack gap={2} justify="space-between" w="full">
                <Text fontSize="sm">{sendTipForm.note}</Text>
                <Button
                  size="xs"
                  variant="ghost"
                  color="blue.500"
                  _hover={{
                    bgColor: "blue.100",
                  }}
                  onClick={handleBackClick}
                >
                  <RiEdit2Fill />
                  Edit
                </Button>
              </HStack>
            </VStack>
          )}
        </VStack>
      </VStack>
      <HStack justify="start" w="full" my={2}>
        <Switch.Root 
          colorPalette="gray" 
          size="lg"
          checked={isAgree}
          onCheckedChange={(e) => setIsAgree(e.checked)}
        >
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
            <Switch.Indicator />
          </Switch.Control>
          <Switch.Label color="textSecondary">
            I agree to the{" "}
            <Box as="span" color="textPrimary">
              terms and conditions
            </Box>{" "}
            of this platform service
          </Switch.Label>
        </Switch.Root>
      </HStack>
      <Button w="full" mt={16} variant="formBtn" onClick={handleSendTip} loading={isLoading} loadingText="Sending..." disabled={!isAgree}>
        Send tip
      </Button>
    </VStack>
  );
};

export default PreviewTip;
