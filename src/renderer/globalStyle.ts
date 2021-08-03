import { createGlobalStyles as css } from "goober/global";

export const GlobalStyle = css`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: calc(112.5% + 0.25vw);
  }

  body {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN",
      "Hiragino Sans", Meiryo, sans-serif;
  }
`;
