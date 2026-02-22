import { defineSlotRecipe } from "@chakra-ui/react";
import { numberInputAnatomy } from "@chakra-ui/react/anatomy";

const numberInputSlotRecipe = defineSlotRecipe({
  slots: numberInputAnatomy.keys(),
  variants: {
    variant: {
      borderless: {
        root: {
          border: "none",
          bg: "transparent",
        },
        input: {
          fontSize: "1.75rem ",
          color: "textPrimary",
          bg: "transparent",
          p: 0,
          _placeholder: {
            color: "#71809666",
          },
        },
      },
      outlineIcon: {
        root: {
          border: "1px solid",
          borderColor: "bgPrimary",
          borderRadius: "xl",
          bg: "white",
        },
        input: {
          fontSize: "sm",
          color: "textPrimary",
          bg: "white",
          pl: 6,
          borderRadius: "inherit",
        },
        control: {
          border: "none",
        },
        decrementTrigger: {
          border: "none",
        },
      },
    },
  },
});

export default numberInputSlotRecipe;
