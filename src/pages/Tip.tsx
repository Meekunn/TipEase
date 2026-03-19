import { useEffect, useState } from "react";
import { Center, VStack } from "@chakra-ui/react";
import ConnectAndTip from "@/components/reusables/SendTip/ConnectAndTip";
import PreviewTip from "@/components/reusables/SendTip/PreviewTip";
import TransactionSummary from "@/components/reusables/SendTip/TransactionSummary";
import Loader from "@/components/reusables/Loader";
import { useDisconnectWallet } from "@/hooks/useDisconnectWallet";

const Tip = () => {
  const [step, setStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [tipSuccess, setTipSuccess] = useState(false);

  // const {disconnectWallet} = useDisconnectWallet()
  
  // useEffect(() => {
  //   disconnectWallet()
  // }, [])

  return (
    <Center py={{base: 7, md: 16}} w="full">
      <VStack w={{base: "full", md: "533px"}} gap={4}>
        {step === 1 && <ConnectAndTip setStep={setStep} />}
        {step === 2 && <PreviewTip setStep={setStep} setIsSending={setIsSending} setTipSuccess={setTipSuccess}/>}
        {step === 3 && <TransactionSummary setStep={setStep} isSuccess={tipSuccess} />}
      </VStack>
      <Loader text="Sending tip..." open={isSending} />
    </Center>
  );
};

export default Tip;
