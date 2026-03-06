import { defineSlotRecipe } from "@chakra-ui/react";

const tabsSlotRecipe = defineSlotRecipe({
  slots: ["root", "list", "trigger", "indicator"],
  base: {},
  variants: {
    variant: {
      customLine: {
        list: {
          w: "full",
          borderColor: "bgPrimary",
          _horizontal: {
            borderBottomWidth: "1px",
            gap: 4,
          },
          bottom: "3px",
        },
        trigger: {
          color: "textSecondary",
          _disabled: {
            _active: { bg: "initial" },
          },
          _selected: {
            color: "textPrimary",
            _horizontal: {
              layerStyle: "indicator.bottom",
              "--indicator-offset-y": "-1px",
              "--indicator-color": "#0D0D0D",
              borderBottomWidth: "3px",
            },
          },
        },
      },
    },
  },
});

export default tabsSlotRecipe;
