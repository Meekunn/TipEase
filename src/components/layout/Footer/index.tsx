import { HStack, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <HStack
      justify={{ base: "center", md: "end" }}
      py={6}
      px={{ base: 6, md: 28 }}
      w="full"
      mt="auto"
    >
      <Text fontSize="xs" color="#A3A3A3" fontWeight="normal">
        © 2025 abisabii & Ayomikun. All Rights Reserved
      </Text>
    </HStack>
  );
};

export default Footer;
