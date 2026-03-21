import { Box, Button, Dialog, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FaTimesCircle } from "react-icons/fa";
import { PiSealCheckFill } from "react-icons/pi";
import { BnbIcon, SendIcon, UsdcIcon, UsdtIcon } from "../icon";

const SendTipSummary = ({ isTipSuccess, sendTipForm, latestTip, getUsdValue, onClose }: {
  isTipSuccess: boolean;
  sendTipForm: ISendTip;
  latestTip?: ITip;
  getUsdValue: (coin: string, amount: string) => string;
  onClose: () => void;
}) => (
  <>
    <Dialog.Body>
      <VStack w="full" gap={4} p={2} borderRadius="xl" border="0.6px solid" borderColor="bgPrimary">
        <VStack bg="bgSecondary" borderRadius="xl" py={4} gap={12} w="full" align="center">
          <VStack gap={7} align="center">
            <Icon color={isTipSuccess ? "green.500" : "red.500"} w={20} h={20}>
              {isTipSuccess ? <PiSealCheckFill /> : <FaTimesCircle />}
            </Icon>
            <VStack gap={3}>
              <Heading as="h1" size="h1" fontSize="1.75rem" fontWeight="semibold" lineHeight="100%">
                {isTipSuccess ? "Tip Successful!" : "Tip Failed!"}
              </Heading>
              <Text color="textSecondary" fontSize="sm">
                Congratulations! You have tipped{" "}
                <Box as="span" color="textPrimary">
                  {sendTipForm.recipientAddress
                    ? `${sendTipForm.recipientAddress.slice(0, 6)}...`
                    : "recipient"}
                </Box>
              </Text>
            </VStack>
          </VStack>
          {latestTip?.id && (
            <Text color="textSecondary" fontSize="sm">
              Transaction ID:
              <Box as="span" color="blue.500" ml={1}>{latestTip.id}</Box>
            </Text>
          )}
          <VStack gap={8} borderTop="0.6px dashed" borderColor="bgPrimary" pt={4} justify="center" w="80%">
            <HStack gap={4}>
              <BnbIcon w={9} h={9} />
              <SendIcon w={9} h={9} />
              <UsdtIcon w={9} h={9} />
              <UsdcIcon w={9} h={9} />
            </HStack>
            <VStack gap={2}>
              <Heading as="h1" fontSize="1.75rem" fontWeight="semibold" lineHeight="100%">
                {latestTip?.amount} {latestTip?.coin.toUpperCase()}
              </Heading>
              <Text color="textSecondary">≈ ${getUsdValue(sendTipForm.coin, sendTipForm.amount)} USD</Text>
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </Dialog.Body>
    <Dialog.Footer>
      <VStack w="full"  gap={2}>
        {isTipSuccess && (
          <Button asChild w="full" variant="formBtn">
            <a href={`https://sepolia.etherscan.io/tx/${latestTip?.txHash}`} target="_blank" rel="noopener noreferrer">
              View receipt
            </a>
          </Button>
        )}
        <Button w="full" variant="formBtnOutline" onClick={onClose}>Close</Button>
      </VStack>
    </Dialog.Footer>
  </>
);

export default SendTipSummary