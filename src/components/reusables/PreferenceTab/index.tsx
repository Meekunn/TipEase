import { HStack, VStack } from "@chakra-ui/react"
import Payment from "./Payment"
import Security from "./Security"

const PreferenceTab = () => {
  return (
    <HStack gap={4} w="full" justify="space-between" align="start">
      <VStack gap={4} w={{ base: "full", lg: "50%" }}>
        <Payment />
      </VStack>
      <VStack gap={4} w={{ base: "full", lg: "50%" }}>
        <Security />
      </VStack>
    </HStack>
  )
}

export default PreferenceTab