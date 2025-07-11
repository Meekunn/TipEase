import { HStack, Text, VStack } from "@chakra-ui/react";

const WalletCard = ({ icon, label, description, extra }: WalletCardProps) => {
  return (
    <HStack
      w="full"
      borderRadius="xl"
      p={3}
      gap={2}
      justify="space-between"
      border="0.6px solid"
      borderColor="bgPrimary"
      bg="transparent"
      transition="all 0.3s ease-in-out"
      _hover={{
        bg: "bgPrimary",
      }}
    >
      <HStack gap={2} align="center">
        {icon}
        <VStack gap={2} align="start">
          <Text>{label}</Text>
          <Text color="textLight" fontSize="xs">
            {description}
          </Text>
        </VStack>
      </HStack>
      <HStack justify="end" align="center">
        {extra}
      </HStack>
    </HStack>
  );
};

export default WalletCard;
