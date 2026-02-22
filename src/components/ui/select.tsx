import { Select as ChakraSelect, type ListCollection } from "@chakra-ui/react"

type SelectProps = {
  label: string;
  placeholder?: string;
  collection: ListCollection;
}
export const Select = ({collection, label='Select', placeholder='Select framework'}: SelectProps) => {
  return (
    <ChakraSelect.Root collection={collection}>
      <ChakraSelect.HiddenSelect />
      <ChakraSelect.Label>{label}</ChakraSelect.Label>

      <ChakraSelect.Control>
        <ChakraSelect.Trigger>
          <ChakraSelect.ValueText placeholder={placeholder}/>
        </ChakraSelect.Trigger>
        <ChakraSelect.IndicatorGroup>
          <ChakraSelect.Indicator />
          <ChakraSelect.ClearTrigger />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>

      <ChakraSelect.Positioner>
        <ChakraSelect.Content>
          {collection.items.map((col) => (
              <ChakraSelect.Item item={col} key={col.value}>
                {col.label}
                <ChakraSelect.ItemIndicator />
              </ChakraSelect.Item>
            ))}
        </ChakraSelect.Content>
      </ChakraSelect.Positioner>
    </ChakraSelect.Root>
  )
}