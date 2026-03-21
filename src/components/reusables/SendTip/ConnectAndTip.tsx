import { Heading, VStack } from "@chakra-ui/react";
import TipForm from "./TipForm";

const ConnectAndTip = ({setStep}: {setStep: React.Dispatch<React.SetStateAction<number>>}) => {

  const onBtnClick = () => {
    if(setStep) {
      setStep(2)
    }
  }

  return (
    <VStack w="full" gap={4}>
      <Heading as="h1" size="h1" >
        Connect wallet and tip anyone, anywhere, anytime.
      </Heading>
      <VStack mt={3}>
        <TipForm btnText="Preview tip" onBtnClick={onBtnClick}/>
      </VStack>
    </VStack>
  );
};

export default ConnectAndTip;
