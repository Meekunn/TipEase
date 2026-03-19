import { Button, ButtonGroup, CloseButton, Dialog, Grid, GridItem, HStack, IconButton, Portal, Separator, Text, useDialog, VStack } from "@chakra-ui/react"
import { useEffect, useState, type ReactNode } from "react";
import { ClipboardIcon, CopyIcon } from "../icon";
import CustomSteps from "@/components/ui/custom-steps";
import { PiHandWithdraw, PiAddressBookTabsLight } from "react-icons/pi";
import { AiOutlineTransaction } from "react-icons/ai";
import { IoMdDoneAll } from "react-icons/io";
import { copyToClipboard, truncateWalletAddress } from "@/utils/formatText";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

interface WithdrawDialogProps {
  children: ReactNode;
}


const WithdrawDialog = ({ children }: WithdrawDialogProps) => {

  const dialog = useDialog()
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Balance Check",
      description: "Step 1 description",
      icon: <ClipboardIcon />
    },
    {
      title: "Withdraw Amount",
      description: "Step 2 description",
      icon: <PiHandWithdraw />
    },
    {
      title: "Recipient Address",
      description: "Step 3 description",
      icon: <PiAddressBookTabsLight />
    },
    {
      title: "Confirm Transaction",
      description: "Step 3 description",
      icon: <AiOutlineTransaction />
    },
    {
      title: "Complete Transaction",
      description: "Step 3 description",
      icon: <IoMdDoneAll />
    },
  ]

  const closeDialog = () => {
    dialog.setOpen(false)
    setCurrentStep(0)
  }  

  useEffect(() => {
    if (currentStep == 4) {
      const timer = setTimeout(() => {
        setCurrentStep(5)
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <Dialog.RootProvider value={dialog} placement="center" size="xl">
      {children}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header justifyContent="center">
              <Dialog.Title>Withdraw</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Grid templateColumns={{base: "repeat(4, 1fr)", md: "repeat(3, 1fr)"}} gap={2}>
                <GridItem colSpan={1}>
                  <VStack borderRadius="xl" border="1px solid" borderColor="bgPrimary" bg="bgDark" p={4} gap={8} align="start" w="full">
                    <CustomSteps
                      steps={steps}
                      currentStep={currentStep}
                      setCurrentStep={setCurrentStep}
                    />

                    <VStack bg="white" borderRadius="xl" border="1px solid" borderColor="bgPrimary" py={4} px={3} gap={4} align="start" w="full" display={{base: "none", md: "flex"}}>
                      <Text fontSize="xs">Tipping Summary</Text>
                      <VStack gap={3} align="start" w="full">
                        <HStack justify="space-between" align="center" gap={4} w="full">
                          <Text fontSize="2xs" color="textSecondary">Tips Received:</Text>
                          <Text fontSize="2xs" color="green.400">15.2 ETH</Text>
                        </HStack>
                        <HStack justify="space-between" align="center" gap={4} w="full">
                          <Text fontSize="2xs" color="textSecondary">Tips Given:</Text>
                          <Text fontSize="2xs" color="red.400">15.2 ETH</Text>
                        </HStack>
                      </VStack>
                    </VStack>
                  </VStack>
                </GridItem>

                <GridItem colSpan={{base: 3, md: 2}}>
                  <VStack bg="white" borderRadius="xl" border="1px solid" borderColor="bgPrimary" p={4} w="full" h="full">
                    {currentStep === 0 && (
                      <Step1 setCurrentStep={setCurrentStep} />
                    )}

                    {currentStep === 1 && (
                      <Step2 setCurrentStep={setCurrentStep} />
                    )}

                    {currentStep === 2 && (
                      <Step3 setCurrentStep={setCurrentStep} />
                    )}

                    {currentStep === 3 && (
                      <Step4 setCurrentStep={setCurrentStep} />
                    )}

                    {currentStep === 4 && (
                      <Step5 />
                    )}

                    {(currentStep === 5) && (
                      <>
                        <VStack gap={6} w="full" h="full">
                          <VStack gap={2}>
                            <Text fontSize="sm" fontWeight="semibold">Withdrawal Complete!</Text>
                            <Text fontSize="xs" color="textSecondary">Your withdrawal has been successfully processed.</Text>
                          </VStack>
                          <VStack gap={6} w="full" align="start">
                            <VStack gap={4} p={4} border="1px solid" borderColor="bgPrimary" borderRadius="lg" fontSize="xs" w="full" bg="gray.100">
                              <VStack gap={5} w="full">
                                <HStack align="center" gap={4} justify="space-between" w="full">
                                  <Text fontWeight="medium" color="textSecondary">Amount</Text>
                                  <Text fontWeight="semibold">2.45 ETH</Text>
                                </HStack>
                                <HStack align="center" gap={4} justify="space-between" w="full">
                                  <Text fontWeight="medium" color="textSecondary">To Address</Text>
                                  <Text fontWeight="semibold">{truncateWalletAddress("0x4aF934569203874072030Ed9e")}</Text>
                                </HStack>
                                <HStack align="center" gap={4} justify="space-between" w="full">
                                  <Text fontWeight="medium" color="textSecondary">Status</Text>
                                  <Text fontWeight="semibold" color="green.500">Complete!</Text>
                                </HStack>
                                <Separator w="full" />
                                <HStack align="center" gap={4} justify="space-between" w="full">
                                  <Text fontWeight="medium" color="textSecondary">Transaction Hash</Text>
                                  <HStack align="center" gap={2}>
                                    <Text fontWeight="semibold">{truncateWalletAddress("0x4aF934569203874072030Ed9e")}</Text>
                                    <IconButton
                                      aria-label="Copy Wallet Address"
                                      size="xs"
                                      variant="ghost"
                                      p={0}
                                      _hover={{
                                        bgColor: "bgPrimary",
                                      }}
                                      onClick={() => {
                                        copyToClipboard("0x4aF934569203874072030Ed9e");
                                      }}
                                    >
                                      <CopyIcon />
                                    </IconButton>
                                  </HStack>
                                </HStack>
                              </VStack>
                            </VStack>
                          </VStack>
                        </VStack>
                        <ButtonGroup w="full" flexDir={{ base: "column", md: "row" }}>
                          <Button variant="subtle" w={{base: "full", md: "50%"}} borderRadius="full">View on Etherscan</Button>
                          <Button variant="solid" w={{base: "full", md: "50%"}} borderRadius="full" onClick={() => setCurrentStep(0)}>New Withdrawal</Button>
                        </ButtonGroup>
                      </>
                    )}
                  
                  </VStack>
                </GridItem>
              </Grid>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" color="textPrimary" borderRadius="full" onClick={closeDialog}/>
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  )
}

export default WithdrawDialog;