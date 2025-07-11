import { useState } from "react";
import { Button, Center, VStack } from "@chakra-ui/react";
import ConnectAndTip from "@/components/reusables/SendTip/ConnectAndTip";
import PreviewTip from "@/components/reusables/SendTip/PreviewTip";
import TransactionSummary from "@/components/reusables/SendTip/TransactionSummary";
import Loader from "@/components/reusables/Loader";

const Tip = () => {
  const [step, setStep] = useState(1);
  const [btnText, setBtnText] = useState("Preview tip");
  const [isLoading] = useState(false);

  const previewTip = () => {
    setStep(2);
  };

  const sendTip = () => {
    // setIsLoading(true);
    setStep(3);
  };

  const backToHome = () => {
    setStep(1);
  };

  const handleClick = () => {
    if (step === 1) {
      previewTip();
      setBtnText("Send tip");
    } else if (step === 2) {
      sendTip();
      setBtnText("Back to home");
    } else {
      backToHome();
      setBtnText("Preview tip");
    }
  };

  return (
    <Center py={16}>
      <VStack w="533px" gap={4}>
        {step === 1 && <ConnectAndTip />}
        {step === 2 && <PreviewTip setStep={setStep} />}
        {step === 3 && <TransactionSummary />}
        <VStack gap={2} w="full" mt={16}>
          <Button w="full" variant="formBtn" onClick={handleClick}>
            {btnText}
          </Button>

          {step === 3 && (
            <Button w="full" variant="formBtnOutline">
              View receipt
            </Button>
          )}
        </VStack>
      </VStack>
      <Loader text="Sending tip..." open={isLoading} />
    </Center>
  );
};

export default Tip;
