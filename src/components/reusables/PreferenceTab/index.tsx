import { Stack, VStack } from "@chakra-ui/react"
import Payment from "./Payment"
import Security from "./Security"

const PreferenceTab = () => {
  return (
    <Stack direction={{base: "column", md: "row"}} gap={4} w="full" justify="space-between" align="start">
      <VStack gap={4} w={{ base: "full", lg: "50%" }}>
        <Payment />
      </VStack>
      <VStack gap={4} w={{ base: "full", lg: "50%" }}>
        <Security />
      </VStack>
    </Stack>
  )
}

export default PreferenceTab