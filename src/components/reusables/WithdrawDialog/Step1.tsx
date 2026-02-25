import { truncateWalletAddress } from "@/utils/formatText"
import { HStack, Text, Box, VStack, Button } from "@chakra-ui/react"
import { EthereumIcon, SolanaIcon, UsdtIcon } from "../icon";

const Step1 = ({setCurrentStep}: StepProps) => {
  return (
    <VStack bg="transparent" gap={16} w="full">
      <VStack gap={4} w="full">
        <VStack gap={1}>
          <VStack gap={2}>
            <Text fontSize="xs" color="textSecondary">Your wallet balance</Text>
            <Text fontSize="xl" fontWeight="semibold">$15,458.30</Text>
          </VStack>
          <Text fontSize="xs" color="textSecondary">Connected: <Box as="span" color="blue.500">{truncateWalletAddress("0x4aF934569203874072030Ed9e")}</Box></Text>
        </VStack>
        <VStack gap={2} w="full">
          <HStack gap={8} justify="space-between" align="center" px={3} py={3.5} borderRadius="xl" border="1px solid" borderColor="bgPrimary" w="full">
            <HStack gap={2} align="center">
              <EthereumIcon fontSize="40px" />
              <Text fontSize="sm">Ethereum</Text>
            </HStack>
            <VStack gap={2} align="end">
              <Text fontSize="sm">2.4500</Text>
              <Text fontSize="xs" color="textSecondary">$8,820.5</Text>
            </VStack>
          </HStack>
          <HStack gap={8} justify="space-between" align="center" px={3} py={3.5} borderRadius="xl" border="1px solid" borderColor="bgPrimary" w="full">
            <HStack gap={2} align="center">
              <UsdtIcon fontSize="40px" />
              <Text fontSize="sm">Tether USDT</Text>
            </HStack>
            <VStack gap={2} align="end">
              <Text fontSize="sm">2.4500</Text>
              <Text fontSize="xs" color="textSecondary">$8,820.5</Text>
            </VStack>
          </HStack>
          <HStack gap={8} justify="space-between" align="center" px={3} py={3.5} borderRadius="xl" border="1px solid" borderColor="bgPrimary" w="full">
            <HStack gap={2} align="center">
              <SolanaIcon fontSize="40px" />
              <Text fontSize="sm">Solana</Text>
            </HStack>
            <VStack gap={2} align="end">
              <Text fontSize="sm">2.4500</Text>
              <Text fontSize="xs" color="textSecondary">$8,820.5</Text>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
      <Button w="full" borderRadius="full" onClick={() => setCurrentStep(1)}>Start withdrawal</Button>
    </VStack>
  )
}

export default Step1