import { createListCollection, Field, NumberInput, Select, Text, Textarea, VStack, InputGroup, Switch, HStack } from "@chakra-ui/react"
import { useState } from "react"
import { BiCaretDown, BiCaretUp } from "react-icons/bi";

const Payment = () => {

  const currencies = createListCollection({
    items: [
      { value: "usd", label: "USD - US Dollar" },
      { value: "cad", label: "CAD - Canadian Dollar" },
      { value: "eur", label: "EUR - Euros" },
    ],
  })

  const [defaultMessage, setDefaultMessage] = useState('Thank you for the tip')
  const [minTip, setMinTip] = useState("10")

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
      <Text color="textPrimary">Payment Preferences</Text>
      <VStack gap={6} align="start" w="full">
        <Select.Root collection={currencies}>
          <Select.HiddenSelect />
          <Select.Label color="textSecondary" fontSize="xs">Default Currency</Select.Label>

          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder={'Select currency'}/>
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator>
                <BiCaretDown />
              </Select.Indicator>
            </Select.IndicatorGroup>
          </Select.Control>

          <Select.Positioner>
            <Select.Content>
              {currencies.items.map((currency) => (
                  <Select.Item item={currency} key={currency.value}>
                    {currency.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
        <Field.Root>
          <Field.Label color="textSecondary" fontSize="xs">
            Minimum Tip Amount
          </Field.Label>
          <InputGroup startElement="$">
            <NumberInput.Root 
              min={5}
              value={minTip}
              onValueChange={(e) => setMinTip(e.value)}
              allowMouseWheel
              w="full"
              variant="outlineIcon"
            >
              <NumberInput.Control>
                <NumberInput.IncrementTrigger>
                  <BiCaretUp />
                </NumberInput.IncrementTrigger>
                <NumberInput.DecrementTrigger>
                  <BiCaretDown />
                </NumberInput.DecrementTrigger>
              </NumberInput.Control>
              <NumberInput.Input />
            </NumberInput.Root>
          </InputGroup>
        </Field.Root>
        <Field.Root>
          <Field.Label color="textSecondary" fontSize="xs">Default Thank You Message</Field.Label>
          <Textarea maxH="5lh" h={28} placeholder="Add a note" fontSize={"xs"} value={defaultMessage} onChange={(e)=>setDefaultMessage(e.target.value)} />
          <Field.HelperText color="textSecondary" fontSize="2xs">This message will be sent automatically when you recieve a tip</Field.HelperText>
        </Field.Root>
        <VStack gap={2} align="start" w="full">
          <Text fontSize="xs" color="textSecondary">
            Auto - Accept Tips
          </Text>
          <HStack w="full" justify="space-between">
            <Switch.Root
              colorPalette="gray"
              size="lg"
              w="full"
              justifyContent="space-between"
            >
              <Switch.HiddenInput />
              <Switch.Label fontSize="xs" lineHeight="16px">
                Automatically accept all incoming tips.
              </Switch.Label>
              <Switch.Control>
                <Switch.Thumb />
                <Switch.Indicator />
              </Switch.Control>
            </Switch.Root>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  )
}
export default Payment;