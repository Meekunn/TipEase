import { useState } from "react";
import { Box, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { PiSealCheckFill } from "react-icons/pi";
import { FaTimesCircle } from "react-icons/fa";
import { BnbIcon, SendIcon, UsdtIcon } from "../icon";

const TransactionSummary = () => {
  const [isSuccess] = useState(false);
  return (
    <VStack
      w="533px"
      gap={4}
      p={2}
      borderRadius="xl"
      border="0.6px solid"
      borderColor="bgPrimary"
    >
      <VStack
        bg="bgSecondary"
        borderRadius="xl"
        py={4}
        gap={12}
        w="full"
        align="center"
      >
        <VStack gap={7} align="center">
          <Icon color={isSuccess ? "green.500" : "red.500"} w={20} h={20}>
            {isSuccess ? <PiSealCheckFill /> : <FaTimesCircle />}
          </Icon>
          <VStack gap={3}>
            <Heading
              as="h1"
              size="h1"
              fontSize="1.75rem"
              fontWeight="semibold"
              lineHeight="100%"
            >
              {isSuccess ? "Tip Successful!" : "Tip Failed!"}
            </Heading>
            <Text color="textSecondary" fontSize="sm">
              Congratulations! You have tipped{" "}
              <Box as="span" color="textPrimary">
                @nerdthejohn
              </Box>
            </Text>
          </VStack>
        </VStack>
        <Text color="textSecondary" fontSize="sm">
          Transaction ID:
          <Box as="span" color="blue.500" ml={1}>
            TXN-23141312
          </Box>
        </Text>
        <VStack
          gap={8}
          borderTop="0.6px dashed"
          borderColor="bgPrimary"
          pt={4}
          justify="center"
          w="80%"
        >
          <HStack gap={4}>
            <BnbIcon w={9} h={9} />
            <SendIcon w={9} h={9} />
            <UsdtIcon w={9} h={9} />
          </HStack>
          <VStack gap={2}>
            <Heading
              as="h1"
              size="h1"
              fontSize="1.75rem"
              fontWeight="semibold"
              lineHeight="100%"
            >
              0.3231 ETH
            </Heading>
            <Text color="textSecondary">≈ $350.06</Text>
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default TransactionSummary;
