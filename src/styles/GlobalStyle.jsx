import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --color-bg: #FFFAF0;
    --color-text: #313733;
    --color-accent: #FF7C38;
    --color-white: #FFFFFF;
    --color-primary: #FFBE51;
    --color-secondary: #FFF3D7;
  }
  /* Pretendard-Regular 전체 폰트 적용 */
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('//cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  } 
  /* Roboto 폰트 적용 */
  @font-face {
    font-family: 'Roboto';
    src:url('//fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2') format('woff2');
  }
  *,html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, menu, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, main, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    font-family: 'Pretendard-Regular';
  }
  html {
    background: lightgray;
    touch-action: pan-x pan-y;
  }
  body {
    margin: 0 auto;
    max-width: 414px;
    width: 100%;
    min-height: 100vh;
    height: auto;
    color: var(--color-text); 
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
  a,button {
    text-decoration: none;
    color: var(--color-text);
    border: none;
    cursor: pointer; 
  }
  input {
    width: 100%;
    font-size: 14px;
  }
  input::placeholder {
    color: #D3D3D3;
  }
  textarea {
    font-size: 14px;
  }
  /* 상단 메뉴 토글 */
  .ant-btn-default {
    background: none;
    border: none;
    box-shadow: none;
  }
  /* 스와이퍼 */
  .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
  .swiper-pagination-horizontal.swiper-pagination-bullets
    .swiper-pagination-bullet {
    background: var(--color-primary);
  }
  /* 달력(RangePicker) */
  .ant-picker-input input  {
    margin-bottom: 0 !important;
  }
  .ant-picker-dropdown {
    overflow: hidden;
    max-width: 288px;
    .ant-picker-year-panel
    .ant-picker-cell-disabled::before,
    .ant-picker-month-panel
    .ant-picker-cell-disabled::before {
      background: none;
    }
  }
  .ant-picker,
  .ant-picker-range {
    width: 100%;
  }
  .periodPickerPopup {
    .ant-picker-panel-container {
      margin-left: 0 !important;
      max-width: 288px;
      transition: none;
      .ant-picker-panel  {
        min-width: 288px;
        max-width: 288px;
        .ant-picker-header-next-btn,
        .ant-picker-header-super-next-btn {
          visibility:initial !important;
        }
      }
    }
  }
`;

export { GlobalStyle };
