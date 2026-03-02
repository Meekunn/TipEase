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
        transform: {
          md: "scale(0.95)",
        },
        transition: "0.3s all ease-in-out",
        _hover: {
          bgColor: "customPrimary",
          color: "white",
          transform: "scale(1.0)",
        },
        _active: {
          bgColor: "customPrimary",
          color: "white",
        },
      },
      formBtn: {
        h: "fit-content",
        py: 4,
        color: "white",
        bgColor: "customPrimary",
        borderRadius: "4xl",
        fontWeight: "medium",
        fontSize: "md",
        transition: "0.25s all ease-in-out",
        boxShadow: "2xl",
        _hover: {
          transform: "scale(1.05)",
        },
      },
      formBtnOutline: {
        h: "fit-content",
        py: 4,
        color: "textSecondary",
        bgColor: "bgSecondary",
        border: "0.6px solid #EAECF0",
        borderRadius: "4xl",
        fontWeight: "medium",
        fontSize: "md",
        transition: "0.3s all ease-in-out",
      },
    },
  },
});

export default buttonRecipe;
