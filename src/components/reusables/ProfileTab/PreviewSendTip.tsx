import { Dialog, Portal, CloseButton } from "@chakra-ui/react"
import { useTip } from "@/hooks/useTip";
import { useSendTipTransaction } from "@/hooks/useSendTransaction";
import { useCoinPrices } from "@/hooks/useCoinPrices";
import { useEstimateFeesPerGas } from "wagmi";
import { sepolia } from "wagmi/chains";
import { useState } from "react";
import { TOKEN_CONTRACTS } from "@/lib/wagmi";
import { useGetSentTips } from "@/lib/queries";
import SendTipSummary from "./SendTipSummary";
import TipPreview from "./TipPreview";

interface IPreviewSendTip {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PreviewSendTip = ({ open, setOpen }: IPreviewSendTip) => {
  const { sendTipForm, clearSendTipForm } = useTip();
  const { sendTip, isLoading, isTipError, isTipSuccess } = useSendTipTransaction();
  const { getUsdValue } = useCoinPrices();
  const { data: sentTips } = useGetSentTips();
  const { data: feeData } = useEstimateFeesPerGas({ chainId: sepolia.id });
  const [isAgree, setIsAgree] = useState(false);

  const latestTip = sentTips?.[0];
  const estimatedFeeEth = feeData
    ? (Number(feeData.maxFeePerGas) * 21000 / 1e18).toFixed(6)
    : "...";

  const isSettled = isTipSuccess || isTipError;

  const handleSendTip = async () => {
    try {
      await sendTip({
        coin: sendTipForm.coin,
        amount: sendTipForm.amount,
        recipientAddress: sendTipForm.recipientAddress as `0x${string}`,
        note: sendTipForm.note,
        anonymous: sendTipForm.anonymous,
        tokenContract: TOKEN_CONTRACTS[sendTipForm.coin as keyof typeof TOKEN_CONTRACTS],
      });
      setOpen(false);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  const closeModal = () => {
    clearSendTipForm();
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Preview and Transfer</Dialog.Title>
            </Dialog.Header>

            {isSettled ? (
              <SendTipSummary
                isTipSuccess={isTipSuccess}
                sendTipForm={sendTipForm}
                latestTip={latestTip}
                getUsdValue={getUsdValue}
                onClose={closeModal}
              />
            ) : (
              <TipPreview
                sendTipForm={sendTipForm}
                estimatedFeeEth={estimatedFeeEth}
                getUsdValue={getUsdValue}
                isAgree={isAgree}
                setIsAgree={setIsAgree}
                isLoading={isLoading}
                onEdit={() => setOpen(false)}
                onSend={handleSendTip}
              />
            )}

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default PreviewSendTip;