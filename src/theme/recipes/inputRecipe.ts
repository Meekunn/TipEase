import { defineRecipe } from "@chakra-ui/react";

const inputRecipe = defineRecipe({
  base: {
    fontWeight: "medium",
    fontSize: "sm",
    borderRadius: "lg",
    p: 4,
    border: "0.8px solid #EAECF0 !important",
    h: 14,
    _placeholder: {
      color: "textLight",
    },
  },
  variants: {
    variant: {},
  },
});

export default inputRecipe;
