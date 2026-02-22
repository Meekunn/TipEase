import { defineSlotRecipe } from "@chakra-ui/react";
import { selectAnatomy } from "@chakra-ui/react/anatomy";

const selectSlotRecipe = defineSlotRecipe({
  slots: selectAnatomy.keys(),
  variants: {
    variant: {
      outline: {
        trigger: {
          borderColor: "bgPrimary",
          borderRadius: "xl",
        },
        content: {
          bg: "white",
        },
      },
    },
  },
});

export default selectSlotRecipe;
