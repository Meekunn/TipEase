import { CloseButton, Dialog, Grid, GridItem, HStack, Portal, Text, VStack } from "@chakra-ui/react"
import { useState, type ReactNode } from "react";
import { ClipboardIcon } from "../icon";
import CustomSteps from "@/components/ui/custom-steps";
import { PiHandWithdraw, PiAddressBookTabsLight } from "react-icons/pi";
import { AiOutlineTransaction } from "react-icons/ai";
import { IoMdDoneAll } from "react-icons/io";
import Step1 from "./Step1";

interface WithdrawDialogProps {
  children: ReactNode;
}


const WithdrawDialog = ({ children }: WithdrawDialogProps) => {

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
  return (
    <Dialog.Root placement="center" size="lg">
      {children}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header justifyContent="center">
              <Dialog.Title>Withdraw</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                <GridItem colSpan={1}>
                  <VStack borderRadius="xl" border="1px solid" borderColor="bgPrimary" bg="bgDark" p={4} gap={8} align="start" w="full">
                    <CustomSteps
                      steps={steps}
                      currentStep={currentStep}
                    />

                    <VStack bg="white" borderRadius="xl" border="1px solid" borderColor="bgPrimary" py={4} px={3} gap={4} align="start" w="full">
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

                <GridItem colSpan={3}>
                  <VStack bg="white" borderRadius="xl" border="1px solid" borderColor="bgPrimary" p={4} w="full">
                    {currentStep === 0 && (
                      <Step1 setCurrentStep={setCurrentStep} />
                    )}
                    
                  </VStack>
                </GridItem>
              </Grid>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" color="textPrimary" borderRadius="full"/>
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default WithdrawDialog;