import { Heading, VStack } from "@chakra-ui/react";
import TipForm from "./TipForm";

// interface ConnectAndTipProps {
//   setStep: React.Dispatch<React.SetStateAction<number>>;
// }

const ConnectAndTip = () => {
  return (
    <VStack w="533px" gap={4}>
      <Heading as="h1" size="h1">
        Connect wallet and tip anyone, anywhere, anytime.
      </Heading>
      <VStack mt={3}>
        <TipForm />
      </VStack>
    </VStack>
  );
};

export default ConnectAndTip;
