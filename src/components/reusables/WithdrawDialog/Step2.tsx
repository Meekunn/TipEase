import { Box, Button, ButtonGroup, Field, Input, InputGroup, Select, Tag, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { BiCaretDown } from "react-icons/bi"
import { VscCircleFilled } from "react-icons/vsc"
import { currencyOptions } from "@/constants/currencies"

const Step2 = ({setCurrentStep}: StepProps) => {

  const [withdrawAmount, setWithdrawAmount] = useState("2")

  return (
    <VStack bg="transparent" gap={16} w="full" h="full" justify="space-between">
      <VStack gap={6} w="full">
        <VStack gap={2}>
          <Text fontSize="sm" fontWeight="semibold">Withdraw Amount</Text>
          <Text fontSize="xs" color="textSecondary">Choose the token and amount to withdraw</Text>
        </VStack>
        <VStack gap={6} w="full" align="start">
          <Select.Root collection={currencyOptions}>
            <Select.HiddenSelect />
            <Select.Label color="textSecondary" fontSize="xs">Select Token</Select.Label>

            <Select.Control>
              <Select.Trigger>
                <Select.ValueText fontSize="xs" placeholder={'Select token'}/>
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator>
                  <BiCaretDown />
                </Select.Indicator>
              </Select.IndicatorGroup>
            </Select.Control>

            <Select.Positioner>
              <Select.Content>
                {currencyOptions.items.map((currency) => (
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
              Amount
            </Field.Label>
            <InputGroup
              flex="1"
              endElement={
                <Box cursor="pointer">
                  <Tag.Root variant="inputRoundTag" colorPalette="green">
                    <Tag.StartElement>
                      <VscCircleFilled width="6px" />
                    </Tag.StartElement>
                    <Tag.Label>Max</Tag.Label>
                  </Tag.Root>
                </Box>
              }
              >
              <Input 
                placeholder="Input amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                borderRadius="xl"
                py={3.5}
                px={3}
                w="full"
                fontSize="xs"
                h={11}
              />
            </InputGroup>
            <Field.HelperText fontSize="xs" color="textSecondary">
              Available - <Box as="span" color="blue.600">2.4500 ETH</Box>
            </Field.HelperText>
          </Field.Root>
        </VStack>
      </VStack>
      <ButtonGroup w="full" flexDir={{ base: "column", md: "row" }}>
        <Button variant="subtle" w={{base: "full", md: "50%"}} borderRadius="full" onClick={() => setCurrentStep(0)}>Back</Button>
        <Button variant="solid" w={{base: "full", md: "50%"}} borderRadius="full" onClick={() => setCurrentStep(2)}>Continue</Button>
      </ButtonGroup>
    </VStack>
  )
}

export default Step2