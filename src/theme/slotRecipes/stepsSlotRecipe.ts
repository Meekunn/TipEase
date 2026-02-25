import { defineSlotRecipe } from "@chakra-ui/react";
import { stepsAnatomy } from "@chakra-ui/react/anatomy";

const stepsSlotRecipe = defineSlotRecipe({
  slots: stepsAnatomy.keys(),
  variants: {
    variant: {
      solid: {
        indicator: {
          borderColor: "#e4e4e7",
          color: "textSecondary",
          bg: "#e4e4e7",

          _complete: {
            color: "#fff",
          },
        },
        title: {
          color: "textSecondary",

          "[data-complete] + &": {
            color: "textPrimary",
            fontWeight: "semibold",
          },

          "[data-current] + &": {
            color: "textPrimary",
          },
        },
      },
    },
  },
});

export default stepsSlotRecipe;
