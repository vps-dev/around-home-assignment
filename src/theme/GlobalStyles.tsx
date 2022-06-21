import React from "react";
import { Global, css, useTheme } from "@emotion/react";

export function GlobalStyles() {
  const theme = useTheme();

  return (
    <Global
      styles={css(`
        body {
          color: ${theme.colors.default};
          font-size: 16px;
          font-weight: 500;
          font-family: 'Montserrat', sans-serif;
          margin: 0;
          line-height: normal;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        #root {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: auto;
        }

        a, button {
          outline: none;
        }

        * {
          box-sizing: border-box;
        }

        svg {
          transition: 0.2s ease-in;
          display: block;
        }
    `)}
    />
  );
}
