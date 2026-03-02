import { useState } from "react";
import { Center, VStack } from "@chakra-ui/react";
import ConnectAndTip from "@/components/reusables/SendTip/ConnectAndTip";
import PreviewTip from "@/components/reusables/SendTip/PreviewTip";
import TransactionSummary from "@/components/reusables/SendTip/TransactionSummary";
import Loader from "@/components/reusables/Loader";

const Tip = () => {
  const [step, setStep] = useState(1);
  const [isSending, setIsSending] = useState(false);

  return (
    <Center py={{base: 7, md: 16}} w="full">
      <VStack w={{base: "full", md: "533px"}} gap={4}>
        {step === 1 && <ConnectAndTip setStep={setStep} />}
        {step === 2 && <PreviewTip setStep={setStep} setIsSending={setIsSending}/>}
        {step === 3 && <TransactionSummary setStep={setStep} />}
      </VStack>
      <Loader text="Sending tip..." open={isSending} />
    </Center>
  );
};

export default Tip;
