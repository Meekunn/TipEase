import { defineSlotRecipe } from "@chakra-ui/react";

const tagSlotRecipe = defineSlotRecipe({
  slots: ["root", "label", "startElement"],
  variants: {
    variant: {
      roundTag: {
        root: {
          borderRadius: "3xl",
          px: 2,
          py: 1.5,
        },
        label: {
          fontSize: "xs",
        },
      },
    },
    colorPalette: {
      orange: {
        root: {
          border: "1px solid",
          borderColor: "orange.600",
          color: "orange.600",
          bgColor: "orange.100",
        },
      },
      blue: {
        root: {
          border: "1px solid",
          borderColor: "blue.500",
          color: "blue.500",
          bgColor: "blue.100",
        },
      },
      green: {
        root: {
          border: "1px solid",
          borderColor: "green.600",
          color: "green.600",
          bgColor: "green.100",
        },
      },
      red: {
        root: {
          border: "1px solid",
          borderColor: "red.500",
          color: "red.500",
          bgColor: "red.100",
        },
      },
      purple: {
        root: {
          border: "1px solid",
          borderColor: "purple.500",
          color: "purple.500",
          bgColor: "purple.100",
        },
      },
      gray: {
        root: {
          border: "1px solid",
          borderColor: "gray.500",
          color: "gray.500",
          bgColor: "gray.100",
        },
      },
    },
  },
});

export default tagSlotRecipe;
