import { truncateWalletAddress } from "@/utils/formatText"
import { Box, Button, ButtonGroup, HStack, Icon, Separator, Text, VStack } from "@chakra-ui/react"
import { PiWarningCircleLight } from "react-icons/pi"

const Step4 = ({setCurrentStep}: StepProps) => {
  return (
    <VStack bg="transparent" gap={16} w="full" h="full" justify="space-between">
      <VStack gap={6} w="full">
        <VStack gap={2}>
          <Text fontSize="sm" fontWeight="semibold">Confirm Withdraw</Text>
          <Text fontSize="xs" color="textSecondary">Review your withdrawal details.</Text>
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
                <Text fontWeight="semibold"color="blue.500">{truncateWalletAddress("0x4aF934569203874072030Ed9e")}</Text>
              </HStack>
              <HStack align="center" gap={4} justify="space-between" w="full">
                <Text fontWeight="medium" color="textSecondary">Network Fee</Text>
                <Text fontWeight="semibold">-0.0021 ETH ($7.56)</Text>
              </HStack>
              <Separator w="full" />
              <HStack align="center" gap={4} justify="space-between" w="full">
                <Text fontWeight="medium" color="textSecondary">Total Cost</Text>
                <Text fontWeight="semibold">2.45 ETH + fees</Text>
              </HStack>
            </VStack>
          </VStack>
          
          <HStack borderRadius="xl" border="1px dotted" borderColor="red.300" bg="red.50" color="red.600"  gap={2} p={3} align="start">
            <Icon as={PiWarningCircleLight} fontSize="lg" />
            <Text fontSize="xs" fontWeight="medium"><Box as="span" color="red.700">Important:</Box>  Double-check the recipient address. Cryptocurrency transactions cannot be reversed.</Text>
          </HStack>
        </VStack>
      </VStack>
      <ButtonGroup w="full" flexDir={{ base: "column", md: "row" }}>
        <Button variant="subtle" w={{base: "full", md: "50%"}} borderRadius="full" onClick={() => setCurrentStep(2)}>Back</Button>
        <Button variant="solid" w={{base: "full", md: "50%"}} borderRadius="full" onClick={() => setCurrentStep(4)}>Confirm & Send</Button>
      </ButtonGroup>
    </VStack>
  )
}

export default Step4