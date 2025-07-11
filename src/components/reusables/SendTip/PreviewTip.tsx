import {
  Button,
  Heading,
  HStack,
  Text,
  VStack,
  Icon,
  Tag,
  IconButton,
  Switch,
  Box,
} from "@chakra-ui/react";
import { RxCaretLeft } from "react-icons/rx";
import { BnbIcon, CopyIcon } from "../icon";
import { IoInformationCircleOutline } from "react-icons/io5";
import { VscCircleFilled } from "react-icons/vsc";
import { RiEdit2Fill } from "react-icons/ri";
import { copyToClipboard, truncateWalletAddress } from "@/utils/formatText";

interface PreviewTipProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const PreviewTip = ({ setStep }: PreviewTipProps) => {
  const handleBackClick = () => {
    setStep(1);
  };

  return (
    <VStack w="534px" gap={4}>
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
            0.3231 ETH
          </Heading>
          <Text color="textSecondary">≈ $350.06</Text>
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
            <Text fontSize="sm">
              <BnbIcon />
              345.56 USDC
            </Text>
          </HStack>
          <HStack justify="space-between" w="full">
            <HStack gap={2}>
              <Text color="textSecondary" fontSize="sm">
                Fee
              </Text>
              <Icon fontSize="12px" color="textSecondary" pb={1}>
                <IoInformationCircleOutline />
              </Icon>
            </HStack>

            <HStack gap={2}>
              <Tag.Root variant="roundTag" colorPalette="green">
                <Tag.StartElement>
                  <VscCircleFilled />
                </Tag.StartElement>
                <Tag.Label>Max</Tag.Label>
              </Tag.Root>
              <Text fontSize="sm">0.04%</Text>
            </HStack>
          </HStack>
          <HStack justify="space-between" w="full">
            <Text color="textSecondary" fontSize="sm">
              Estimated Time
            </Text>
            <Text fontSize="sm">≈ 1 min</Text>
          </HStack>
          <HStack justify="space-between" w="full">
            <Text color="textSecondary" fontSize="sm">
              Recipient Address
            </Text>
            <HStack gap={2}>
              <Text fontSize="sm">
                {truncateWalletAddress("0x4aF934569203874072030Ed9e", 9, 7)}
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
                  copyToClipboard("0x4aF934569203874072030Ed9e");
                }}
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
                {truncateWalletAddress(
                  "0x4aF934569203874072030Ed9eEd9e03E53415D30xd8dA6BF26964aF9",
                  17,
                  15
                )}
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
                  copyToClipboard("0x4aF934569203874072030Ed9e");
                }}
              >
                <CopyIcon />
              </IconButton>
            </HStack>
          </VStack>
          <VStack gap={4} w="full" align="start">
            <Text color="textSecondary" fontSize="sm">
              Note
            </Text>
            <HStack gap={2} justify="space-between" w="full">
              <Text fontSize="sm">Birthday gift from John</Text>
              <Button
                size="xs"
                variant="ghost"
                color="blue.500"
                _hover={{
                  bgColor: "blue.100",
                }}
              >
                <RiEdit2Fill />
                Edit
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
      <HStack justify="start" w="full" my={2}>
        <Switch.Root colorPalette="gray" size="lg">
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
    </VStack>
  );
};

export default PreviewTip;
