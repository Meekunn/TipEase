import { defineRecipe } from "@chakra-ui/react";

const iconButtonRecipe = defineRecipe({
  base: {
    fontWeight: "normal",
  },
  variants: {
    variant: {
      formBtn: {
        h: "fit-content",
        py: 4,
        color: "white",
        bgColor: "customPrimary",
        borderRadius: "4xl",
        fontWeight: "medium",
        fontSize: "md",
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
      },
    },
  },
});

export default iconButtonRecipe;
