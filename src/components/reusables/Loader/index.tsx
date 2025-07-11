import { Portal, Box, VStack, Text } from "@chakra-ui/react";
import { LogoIcon } from "../icon";
import { SpinnerRing } from "./SpinnerRing";

interface LoaderProps {
  text?: string;
  open: boolean;
}

const Loader = ({ text, open }: LoaderProps) => {
  if (!open) return null;

  return (
    <Portal>
      <Box
        position="fixed"
        top={0}
        left={0}
        w="100vw"
        h="100vh"
        zIndex={1400}
        bg="rgba(13, 13, 13, 0.35)"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack
          gap={4}
          position="relative"
          w="full"
          bg="transparent"
          borderRadius="xl"
        >
          <SpinnerRing size={60}>
            <LogoIcon w={28} h={28} />
          </SpinnerRing>
          {text && <Text color="black">{text}</Text>}
        </VStack>
      </Box>
    </Portal>
  );
};

export default Loader;
