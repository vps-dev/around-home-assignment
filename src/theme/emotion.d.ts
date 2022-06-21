import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      secondary10percent: string;
      default: string;
      light: string;
      gray: string;
      darkGray: string;
      darkGray20percent: string;
      error: string;
    };
    spacing: (multiplier?: number) => string;
  }
}
