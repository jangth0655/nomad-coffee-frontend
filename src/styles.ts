import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

export const GlobalStyles = createGlobalStyle`
  ${reset}
  * { 
    box-sizing: border-box;
  }
  body { 
    font-family:'Open Sans', sans-serif;
    background-color: #FAFAFA;
  }  
`;

//transition: 150ms all cubic-bezier(0.4, 0, 0.2, 1);
