import { HStack, VStack, Text, Icon } from "@chakra-ui/react";

const TokenValueCard = ({
  tokenName,
  tokenValue,
  walletValue,
  icon,
}: TokenValueCardProps) => {
  return (
    <HStack gap={2} w="full" justify="space-between">
      <HStack gap={2}>
        <Icon size="2xl">{icon}</Icon>
        <VStack gap={1} align="start">
          <Text fontSize="xs">{tokenName}</Text>
          <Text fontSize="2xs" color="textSecondary">
            {tokenValue}
          </Text>
        </VStack>
      </HStack>
      <Text fontSize="xs">{walletValue}</Text>
    </HStack>
  );
};

export default TokenValueCard;
