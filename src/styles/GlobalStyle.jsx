import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

   :root {
    --color-bg: #FFFAF0;
    --color-text: #160E0E;
    --color-accent: #C12D2D;
    --color-white: #FEFEFE;
    --color-primary: #D1CFCF
  } 

  /* 전체 폰트 적용 */
  @font-face {
      font-family: 'Pretendard-Regular';
      src: url('//cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
  } 

  html {
    background: #fff;
    touch-action: pan-x pan-y;
  }

  body {
    margin: 0 auto;
    max-width: 390px;
    width: 100%;
    min-height: 100vh;
    height: auto;
    font-family: 'Pretendard-Regular'; 
    color: var(--color-text); 
    background-color: var(--color-bg); 
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }

  a,button {
    text-decoration: none;
    color: #000;
    border: none;
    cursor: pointer; 
  }

  input {
    width: 100%;
  }
  
  input::placeholder {
    color: #D3D3D3;
  }

`;

export { GlobalStyle };
