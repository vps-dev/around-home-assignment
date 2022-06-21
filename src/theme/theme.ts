import { Theme } from "@emotion/react";

export const theme: Theme = {
  colors: {
    primary: "#e8b000",
    secondary: "#005039",
    secondary10percent: "#0050391a",
    default: "#17171a",
    light: "#fff",
    gray: "#f3f3f3",
    darkGray: "#47525d",
    darkGray20percent: "#47525d33",
    error: "#e36049",
  },
  spacing: (multiplier?: number) => `${(multiplier || 1) * 8}px`,
};
