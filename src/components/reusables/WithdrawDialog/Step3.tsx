import { Box, Button, ButtonGroup, Field, HStack, Icon, Input, InputGroup, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { MdOutlineDownloadDone } from "react-icons/md"
import { PiWarningCircleLight } from "react-icons/pi"
import { TbEdit } from "react-icons/tb"

const Step3 = ({setCurrentStep}: StepProps) => {

  const [address, setAddress] = useState("0x71C7656EC7ab88b098defB751B7401B5f6d8976F")
  const [isEdit, setIsEdit] = useState(false)

  const handleEditmode = () => {
    setAddress("")
    setIsEdit(true)
  }

  return (
    <VStack bg="transparent" gap={16} w="full" h="full" justify="space-between">
      <VStack gap={6} w="full">
        <VStack gap={2}>
          <Text fontSize="sm" fontWeight="semibold">Recipient Address</Text>
          <Text fontSize="xs" color="textSecondary">Enter the destination wallet address</Text>
        </VStack>
        <VStack gap={6} w="full" align="start">
          <Field.Root>
            <Field.Label color="textSecondary" fontSize="xs">
              Destination Address
            </Field.Label>
            <InputGroup
              flex="1"
              endElement={
                isEdit ? (
                  <Button
                  borderRadius="2xl"
                  py={1}
                  h="fit-content"
                  px={2}
                  gap={1}
                  bgColor={"bgSecondary"}
                  color="textPrimary"
                  fontSize="2xs"
                  _hover={{ bgColor: "bgPrimary" }}
                  onClick={() => setIsEdit(false)}
                >
                  <MdOutlineDownloadDone />
                  Done
                </Button>
                ) : (
                  <Button
                    borderRadius="2xl"
                    py={1}
                    h="fit-content"
                    px={2}
                    gap={1}
                    bgColor="white"
                    color="textPrimary"
                    fontSize="2xs"
                    onClick={handleEditmode}
                  >
                    <TbEdit />
                    Edit
                  </Button>
                )
              }
            >
              <Input 
                placeholder="Input amount"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                borderRadius="xl"
                py={3.5}
                px={3}
                w="full"
                fontSize="xs"
                h={11}
                variant={isEdit ? 'outline' : 'subtle'}
                disabled={!isEdit}
              /> 
            </InputGroup>
            <Field.HelperText fontSize="2xs" color="textSecondary">
              Enter a valid Ethereum  address (Ox followed by 40 characters)
            </Field.HelperText>
          </Field.Root>

          <HStack borderRadius="xl" border="1px dotted" borderColor="yellow.300" bg="yellow.50" color="yellow.600"  gap={2} p={3} align="start">
            <Icon as={PiWarningCircleLight} fontSize="lg" />
            <Text fontSize="xs" fontWeight="medium"><Box as="span" color="yellow.700">Important:</Box>  Double-check the recipient address. Cryptocurrency transactions cannot be reversed.</Text>
          </HStack>

          {/* <HStack borderRadius="xl" border="1px dotted" borderColor="red.300" bg="red.50" color="red.600"  gap={2} p={3} align="start" w="full">
            <Icon as={PiWarningCircleLight} fontSize="lg" />
            <Text fontSize="xs" fontWeight="medium">Please enter a valid Ethereum address</Text>
          </HStack> */}

        </VStack>
      </VStack>
      <ButtonGroup w="full" flexDir={{ base: "column", md: "row" }}>
        <Button variant="subtle" w={{base: "full", md: "50%"}} borderRadius="full" onClick={() => setCurrentStep(1)}>Back</Button>
        <Button variant="solid" w={{base: "full", md: "50%"}} borderRadius="full" onClick={() => setCurrentStep(3)}>Continue</Button>
      </ButtonGroup>
    </VStack>
  )
}

export default Step3