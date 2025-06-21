import { HStack, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <HStack justify="end" py={10} px={28} position="fixed" bottom={0} w="100%">
      <Text fontSize="xs" color="#A3A3A3">
        © 2025 abisabii. All Rights Reserved
      </Text>
    </HStack>
  );
};

export default Footer;
