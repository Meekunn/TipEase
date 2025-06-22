import { defineRecipe } from "@chakra-ui/react";

const textareaRecipe = defineRecipe({
  base: {
    fontWeight: "medium",
    fontSize: "sm",
    borderRadius: "lg",
    p: 4,
    border: "0.8px solid #EAECF0 !important",
    _placeholder: {
      color: "textLight",
    },
  },
  variants: {
    variant: {},
  },
});

export default textareaRecipe;
