import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  /* :root {
    --color-bg: #FBFBFB;
    --color-text: #160E0E;
    --color-accent: #C12D2D;
    --color-white: #FEFEFE;
    --color-primary: #D1CFCF
  } */

  /* 전체 폰트 적용 */
  @font-face {
      font-family: 'Pretendard-Regular';
      src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
  } 
    
  body {
    /* background-color: var(--color-bg); */
    color: var(--color-text); 
    font-family: 'Pretendard-Regular'; 
  }

  a,button {
    color: #000;
    text-decoration: none;
    border: none;
    cursor: pointer; 
  }

`;

export { GlobalStyle };
