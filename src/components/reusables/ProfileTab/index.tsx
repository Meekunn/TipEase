import { Stack, VStack } from "@chakra-ui/react";
import About from "./About";
import TipForm from "../SendTip/TipForm";
import WalletDetails from "./WalletDetails";
import WalletSummary from "./WalletSummary";
import { useState } from "react";
import PreviewSendTip from "./PreviewSendTip";

const ProfileTab = () => {
  const [openPreview, setOpenPreview] = useState(false)
  return (
    <Stack direction={{base: "column", md: "row"}} gap={4} w="full" justify="space-between" align="start">
      <VStack gap={4} w={{ base: "full", lg: "48%" }}>
        <About />
        <WalletDetails />
      </VStack>
      <VStack gap={4} w={{ base: "full", lg: "48%" }}>
        <VStack w="full" bg="white" px={2} pt={1} pb={4} borderRadius="xl">
          <TipForm border={false} margintop={8} btnText="Send tip" btnFontSize="sm" btnPaddingY={2} onBtnClick={() => {setOpenPreview(true)}}/>
        </VStack>
        <WalletSummary />
      </VStack>
      
      <PreviewSendTip open={openPreview} setOpen={setOpenPreview} />
    </Stack>
  );
};

export default ProfileTab;
