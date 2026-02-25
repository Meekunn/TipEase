import { truncateWalletAddress } from "@/utils/formatText"
import { HStack, Text, VStack } from "@chakra-ui/react"

const Step5 = () => {

  return (
    <VStack bg="transparent" gap={16} w="full" h="full" justify="space-between">
      <VStack gap={6} w="full">
        <VStack gap={2}>
          <Text fontSize="sm" fontWeight="semibold">Processing Transaction</Text>
          <Text fontSize="xs" color="textSecondary">Please wait while your withdrawal is being processed</Text>
        </VStack>
        <VStack gap={2} w="full" align="start">
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
                <Text fontWeight="semibold" color="yellow.500">Pending...</Text>
              </HStack>
            </VStack>
          </VStack>
          <Text color="textSecondary" fontSize="xs">This usually takes 30 seconds to 2 minutes depending on network congestion.</Text>
        </VStack>
      </VStack>
    </VStack>
  )
}

export default Step5