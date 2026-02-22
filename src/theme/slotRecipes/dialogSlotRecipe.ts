import { defineSlotRecipe } from "@chakra-ui/react";
import { dialogAnatomy } from "@chakra-ui/react/anatomy";

const dialogSlotRecipe = defineSlotRecipe({
  slots: dialogAnatomy.keys(),
  base: {
    content: {
      bg: "bgSecondary",
      borderRadius: "xl",
    },
  },
});

export default dialogSlotRecipe;
