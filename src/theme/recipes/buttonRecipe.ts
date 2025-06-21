import { defineRecipe } from "@chakra-ui/react";

const buttonRecipe = defineRecipe({
  base: {
    fontWeight: "normal",
  },
  variants: {
    variant: {
      navBtnLink: {
        fontWeight: "normal",
        color: "textPrimary",
        bgColor: "bgBrightGray",
        border: "0.6px solid #EAECF0",
        py: 2,
        px: 4,
        borderRadius: "md",
        fontSize: "sm",
        _hover: {
          bgColor: "pink",
        },
        _active: {
          bgColor: "primary",
          color: "white",
        },
      },
    },
  },
});

export default buttonRecipe;
