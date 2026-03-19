import { Button, Text, VStack } from "@chakra-ui/react";

const Security = () => {
  return (
    <VStack
      bg="white"
      border="0.6px solid"
      borderColor="bgPrimary"
      p={4}
      gap={4}
      borderRadius="xl"
      w="full"
      align="start"
    >
      <Text color="textPrimary">Security</Text>
      <VStack gap={2} align="start">
        <Text fontSize="xs" color="textSecondary">Session Management</Text>
        <Text fontSize="xs">Manage your active sessions and sign out from other devices</Text>
      </VStack>
      <Button variant="subtle" borderRadius="xl" size="sm" fontSize="xs" disabled>
        Manage session
      </Button>
    </VStack>
  )
}

export default Security;