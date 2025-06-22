import { Box, Button, useSelectContext } from "@chakra-ui/react";
import { RiForbidLine } from "react-icons/ri";
import { PiCaretDownFill } from "react-icons/pi";

const SelectCurrencyTrigger = () => {
  const select = useSelectContext();
  const items = select.selectedItems as ISelectCurrency[];
  return (
    <Button
      variant="outline"
      size="sm"
      gap={2.5}
      display="flex"
      alignItems="center"
      borderRadius="3xl"
      bgColor="white"
      border="0.6px solid"
      borderColor="bgPrimary"
      color="textPrimary"
      py={1.5}
      px={2}
      {...select.getTriggerProps()}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        fontSize="xs"
        fontWeight="medium"
      >
        {select.hasSelectedItems ? items[0].icon : <RiForbidLine />}
        {select.hasSelectedItems ? items[0].label : "None Selected"}
      </Box>
      <PiCaretDownFill color="textSecondary" />
    </Button>
  );
};

export default SelectCurrencyTrigger;
