import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { colors } from "./colors";
import headingRecipe from "./recipes/headingRecipe";
// import linkRecipe from "./recipes/linkRecipe";
import buttonRecipe from "./recipes/buttonRecipe";
import tagSlotRecipe from "./slotRecipes/tagSlotRecipe";
import inputRecipe from "./recipes/inputRecipe";
import textareaRecipe from "./recipes/textareaRecipe";
import switchSlotRecipe from "./slotRecipes/switchSlotRecipe";
import numberInputSlotRecipe from "./slotRecipes/numberInputSlotRecipe";
import iconButtonRecipe from "./recipes/iconButtonRecipe";
import tabsSlotRecipe from "./slotRecipes/tabsSlotRecipe";
import selectSlotRecipe from "./slotRecipes/selectSlotRecipe";
import dialogSlotRecipe from "./slotRecipes/dialogSlotRecipe";

const config = defineConfig({
  globalCss: {
    "html, body": {
      margin: 0,
      padding: 0,
      fontFamily: "'Source Sans Pro', sans-serif",
      bgColor: "white",
      color: colors.textPrimary.value,
      lineHeight: "100%",
      letterSpacing: "0px",
      fontWeight: "500",
    },
  },
  theme: {
    tokens: {
      colors: colors,
      fonts: {
        body: { value: "Source Sans Pro, sans-serif" },
        heading: { value: "Source Sans Pro, sans-serif" },
      },
    },
    recipes: {
      heading: headingRecipe,
      // link: linkRecipe,
      button: buttonRecipe,
      input: inputRecipe,
      textarea: textareaRecipe,
      iconButton: iconButtonRecipe,
    },
    slotRecipes: {
      numberInput: numberInputSlotRecipe,
      tag: tagSlotRecipe,
      switch: switchSlotRecipe,
      tabs: tabsSlotRecipe,
      select: selectSlotRecipe,
      dialog: dialogSlotRecipe,
    },
    keyframes: {
      spin: {
        to: { transform: "rotate(360deg)" },
      },
    },
  },
});

const system = createSystem(defaultConfig, config);
export default system;
