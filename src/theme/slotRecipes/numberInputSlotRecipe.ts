import { defineSlotRecipe } from "@chakra-ui/react";

const numberInputSlotRecipe = defineSlotRecipe({
  slots: ["root", "input"],
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
    },
  },
});

export default numberInputSlotRecipe;
