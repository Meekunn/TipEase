import { HStack, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <HStack
      justify={{base: "center", md: "end"}}
      py={10}
      px={{base: 6, md: 28}}
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      top="100%"
      w="full"
    >
      <Text fontSize="xs" color="#A3A3A3" fontWeight="normal">
        © 2025 abisabii & Ayomikun. All Rights Reserved
      </Text>
    </HStack>
  );
};

export default Footer;
