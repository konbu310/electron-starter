import { injectGlobal } from "emotion";

injectGlobal`
  * {
    box-sizing: border-box;
    font-family: "Hiragino Maru Gothic ProN";
  }
  
  html {
    font-size: calc(112.5% + 0.25vw);
  }
  
  body {
   margin: 0;
   padding: 0;
  }
`;
