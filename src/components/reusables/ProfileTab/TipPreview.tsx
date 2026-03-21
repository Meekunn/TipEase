import { coinIconMap } from "@/constants/currencies";
import { copyToClipboard, truncateWalletAddress } from "@/utils/formatText";
import { Box, Button, Dialog, Heading, HStack, Icon, IconButton, Switch, Text, VStack } from "@chakra-ui/react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { CopyIcon } from "../icon";
import { RiEdit2Fill } from "react-icons/ri";

const TipPreview = ({ sendTipForm, estimatedFeeEth, getUsdValue, isAgree, setIsAgree, isLoading, onEdit, onSend }: {
  sendTipForm: ISendTip;
  estimatedFeeEth: string;
  getUsdValue: (coin: string, amount: string) => string;
  isAgree: boolean;
  setIsAgree: (v: boolean) => void;
  isLoading: boolean;
  onEdit: () => void;
  onSend: () => void;
}) => (
  <>
    <Dialog.Body>
      <VStack w="full" gap={4}>
        <VStack border="0.6px solid" borderColor="bgPrimary" borderRadius="xl" p={2} gap={4} w="full">
          <VStack position="relative" gap={2} align="center" w="full" py={2}>
            <Text color="textSecondary" fontSize="sm">Preview and transfer</Text>
            <Heading as="h1" fontSize="1.75rem" fontWeight="semibold" lineHeight="100%" mt={1}>
              {sendTipForm.amount} {sendTipForm.coin.toUpperCase()}
            </Heading>
            <Text color="textSecondary">≈ ${getUsdValue(sendTipForm.coin, sendTipForm.amount)} USD</Text>
          </VStack>
          <VStack bg="bgSecondary" borderRadius="xl" border="0.6px solid" borderColor="bgPrimary" p={4} gap={8} w="full">
            <HStack justify="space-between" w="full">
              <Text color="textSecondary" fontSize="sm">You&apos;re Sending</Text>
              <HStack gap={1}>
                {coinIconMap[sendTipForm.coin] ?? null}
                <Text fontSize="sm">{sendTipForm.amount} {sendTipForm.coin.toUpperCase()}</Text>
              </HStack>
            </HStack>
            <HStack justify="space-between" w="full">
              <HStack gap={2}>
                <Text color="textSecondary" fontSize="sm">Fee</Text>
                <Icon fontSize="18px" color="textSecondary" pb={1}><IoInformationCircleOutline /></Icon>
              </HStack>
              <Text fontSize="sm">
                {estimatedFeeEth} ETH{" "}
                <Text as="span" color="textSecondary">≈ ${getUsdValue("ethereum", estimatedFeeEth)} USD</Text>
              </Text>
            </HStack>
            <HStack justify="space-between" w="full">
              <Text color="textSecondary" fontSize="sm">Estimated Time</Text>
              <Text fontSize="sm">≈ 15 secs</Text>
            </HStack>
            <HStack justify="space-between" w="full">
              <Text color="textSecondary" fontSize="sm">Recipient Address</Text>
              <HStack gap={2}>
                <Text fontSize="sm">{truncateWalletAddress(sendTipForm.recipientAddress, 9, 7)}</Text>
                <IconButton aria-label="Copy Wallet Address" size="xs" variant="ghost" p={0} _hover={{ bgColor: "bgPrimary" }}
                  onClick={() => copyToClipboard(sendTipForm.recipientAddress)}>
                  <CopyIcon />
                </IconButton>
              </HStack>
            </HStack>
          </VStack>
          <VStack bg="bgSecondary" borderRadius="xl" border="0.6px solid" borderColor="bgPrimary" p={4} gap={6} w="full">
            <VStack gap={4} w="full" align="start">
              <Text color="textSecondary" fontSize="sm">Recipient Address</Text>
              <HStack gap={2} justify="space-between" w="full">
                <Text fontSize="sm">{truncateWalletAddress(sendTipForm.recipientAddress, 17, 15)}</Text>
                <IconButton aria-label="Copy Wallet Address" size="xs" variant="ghost" p={0} _hover={{ bgColor: "bgPrimary" }}
                  onClick={() => copyToClipboard(sendTipForm.recipientAddress)}>
                  <CopyIcon />
                </IconButton>
              </HStack>
            </VStack>
            {sendTipForm.note && (
              <VStack gap={4} w="full" align="start">
                <Text color="textSecondary" fontSize="sm">Note</Text>
                <HStack gap={2} justify="space-between" w="full">
                  <Text fontSize="sm">{sendTipForm.note}</Text>
                  <Button size="xs" variant="ghost" color="blue.500" _hover={{ bgColor: "blue.100" }} onClick={onEdit}>
                    <RiEdit2Fill /> Edit
                  </Button>
                </HStack>
              </VStack>
            )}
          </VStack>
        </VStack>
        <HStack justify="start" w="full" my={2}>
          <Switch.Root colorPalette="gray" size="lg" checked={isAgree} onCheckedChange={(e) => setIsAgree(e.checked)}>
            <Switch.HiddenInput />
            <Switch.Control><Switch.Thumb /><Switch.Indicator /></Switch.Control>
            <Switch.Label color="textSecondary">
              I agree to the{" "}
              <Box as="span" color="textPrimary">terms and conditions</Box>{" "}
              of this platform service
            </Switch.Label>
          </Switch.Root>
        </HStack>
      </VStack>
    </Dialog.Body>
    <Dialog.Footer>
      <Button w="full" variant="formBtn" onClick={onSend} loading={isLoading} loadingText="Sending..." disabled={!isAgree}>
        Send tip
      </Button>
    </Dialog.Footer>
  </>
);

export default TipPreview