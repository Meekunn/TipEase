import { HStack, Portal, Select, type ListCollection } from "@chakra-ui/react";
import SelectCurrencyTrigger from "./SelectCurrencyTrigger";

const SelectCurrency = ({ currencies }: { currencies: ListCollection }) => {
  return (
    <Select.Root
      positioning={{ sameWidth: false }}
      collection={currencies}
      size="sm"
      width="fit-content"
      defaultValue={["react"]}
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
