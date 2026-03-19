import { HStack, Text, VStack, Avatar } from "@chakra-ui/react";

interface IWalletCard {
  connectWallet: () => void;
  card: WalletCardProps;
}

const WalletCard = ({ card: {isDisabled = true, ...card}, connectWallet }: IWalletCard) => {
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
      onClick={() => connectWallet()}
      cursor={isDisabled ? "not-allowed": "pointer"}
      opacity={isDisabled ? 0.5 : 1}
    >
      <HStack gap={2} align="center">
        <AvatarCard image={card.icon} name={card.label} />
        <VStack gap={2} align="start">
          <Text>{card.label}</Text>
          <Text color="textLight" fontSize="xs">
            {card.description}
          </Text>
        </VStack>
      </HStack>
      <HStack justify="end" align="center">
        {card.extra}
      </HStack>
    </HStack>
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

export default WalletCard;
