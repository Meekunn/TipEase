import { HStack, Portal, Select, type ListCollection } from "@chakra-ui/react";
import SelectCurrencyTrigger from "./SelectCurrencyTrigger";

const SelectCurrency = ({ currencies, value, onValueChange }: { currencies: ListCollection, value?: string, onValueChange: (value:string) => void }) => {
  return (
    <Select.Root
      positioning={{ sameWidth: false }}
      collection={currencies}
      size="sm"
      width="fit-content"
      defaultValue={["ethereum"]}
      value={value ? [value] : undefined}
      onValueChange={(e) => onValueChange(e.value[0])}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <SelectCurrencyTrigger />
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content minW="32" bg="bgBrightGray">
            {currencies.items.map((currency) => (
              <Select.Item
                item={currency}
                key={currency.value}
                _hover={{ bg: "bgPrimary" }}
              >
                <HStack>
                  {currency.icon}
                  {currency.label}
                </HStack>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default SelectCurrency;
