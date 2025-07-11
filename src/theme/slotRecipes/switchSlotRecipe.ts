import { defineSlotRecipe } from "@chakra-ui/react";

const switchSlotRecipe = defineSlotRecipe({
  slots: ["root", "label", "control", "thumb"],
  variants: {
    variant: {},
    colorPalette: {
      gray: {
        control: {
          bgColor: "gray.100",
          _checked: {
            bgColor: "customPrimary",
          },
        },
        thumb: {
          bgColor: "white",
          _checked: {
            bgColor: "white",
          },
        },
      },
    },
  },
});

export default switchSlotRecipe;
