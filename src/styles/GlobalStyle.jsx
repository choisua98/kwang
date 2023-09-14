import { createGlobalStyle } from 'styled-components';
import btnEditImageLight from '../assets/images/common/btn/btn-edit-light.png';
import btnEditImageDark from '../assets/images/common/btn/btn-edit-dark.png';
import btnEditImageDefault from '../assets/images/common/btn/btn-edit.png';

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
    /* background-color: var(--color-bg);  */
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
  :where(.css-17a39f8).ant-btn-default:not(:disabled):not(
      .ant-btn-disabled
    ):hover {
    color: rgba(0, 0, 0, 0.88);
    border-color: none;
  }
  :where(.css-dev-only-do-not-override-17a39f8).ant-btn.ant-btn-icon-only
    .anticon {
    font-size: 18px;
  }
  :where(.css-dev-only-do-not-override-17a39f8).ant-btn:not(
      :disabled
    ):focus-visible {
    outline: none;
  }
  :where(.css-17a39f8).ant-drawer .ant-drawer-body,
  :where(.css-dev-only-do-not-override-17a39f8).ant-drawer .ant-drawer-body {
    padding: 0;
  }
  
  /* 스와이퍼 */
  .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
  .swiper-pagination-horizontal.swiper-pagination-bullets
    .swiper-pagination-bullet {
    background: #ffbe51;
  }
  
  /* 달력(RangePicker) */
  :where(
    .css-dev-only-do-not-override-17a39f8
  ).ant-picker-dropdown.ant-picker-dropdown-placement-topLeft
  .ant-picker-range-arrow,
  :where(.css-17a39f8).ant-picker-dropdown.ant-picker-dropdown-placement-topLeft .ant-picker-range-arrow {
  display: none;
}
:where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown
  .ant-picker-header
  > button,
  :where(.css-17a39f8).ant-picker-dropdown .ant-picker-header >button {
  visibility: initial !important;
}
:where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown
  .ant-picker-panel-container {
  width: 374px !important;
}
:where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown
  .ant-picker-panel-container
  .ant-picker-panels {
  display: inline-flex;
  flex-wrap: nowrap;
  direction: ltr;
  /* max-width: 350px !important; */
  width: 350px !important;
}
:where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown
  .ant-picker-panel-container
  .ant-picker-panels:last-child
  .ant-picker-panel {
  border-width: 0;
  width: 100% !important;
  max-width: 350px !important;
  min-width: 350px !important;
}
.ant-picker-date-panel {
  max-width: 350px !important;
}

:where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown
  .ant-picker-date-panel
  .ant-picker-content {
  width: 310px !important;
}
:where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown-range {
  padding: 40px 0 0 !important;
}





:where(.css-17a39f8).ant-picker .ant-picker-input >input,
.cHPDDZ input {
  margin-bottom: 0;
}

:where(.css-17a39f8).ant-picker-dropdown .ant-picker-panel-container {
  max-width: 374px;
  width: 100%;
}

:where(.css-17a39f8).ant-picker-dropdown .ant-picker-panel-container .ant-picker-panels:last-child .ant-picker-panel,
:where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown .ant-picker-panel-container .ant-picker-panels,
:where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown .ant-picker-panel-container .ant-picker-panels:last-child .ant-picker-panel {
  max-width: 374px !important;
  min-width: 200% !important;
  width: 100% !important;
}

:where(.css-17a39f8).ant-picker-dropdown .ant-picker-panel-container .ant-picker-panels {
  display: inline-flex;
  flex-wrap: nowrap;
  max-width: 200px !important;
  width: 100% !important;
  direction: ltr;
}

:where(.css-17a39f8).ant-picker-dropdown .ant-picker-date-panel {
  width: 100% !important;
}

:where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown .ant-picker-decade-panel, :where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown .ant-picker-year-panel, :where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown .ant-picker-quarter-panel, :where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown .ant-picker-month-panel, :where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown .ant-picker-week-panel, :where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown .ant-picker-date-panel, :where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown .ant-picker-time-panel,
:where(.css-17a39f8).ant-picker-dropdown .ant-picker-panel-container .ant-picker-panels {
  // max-width: 374px !important;
  width: 100% !important;
}

.ant-picker-date-panel,
:where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown .ant-picker-date-panels {
  width: 100% !important;
}

:where(.css-17a39f8).ant-picker-dropdown .ant-picker-panel-container .ant-picker-panel .ant-picker-content, :where(.css-17a39f8).ant-picker-dropdown .ant-picker-panel-container .ant-picker-panel table {
  width: 100% !important;
}

:where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown .ant-picker-date-panel .ant-picker-content th {
  width: 48px;
}

:where(.css-17a39f8).ant-picker-dropdown .ant-picker-year-panel, :where(.css-17a39f8).ant-picker-dropdown .ant-picker-decade-panel,:where(.css-17a39f8).ant-picker-dropdown .ant-picker-quarter-panel, :where(.css-17a39f8).ant-picker-dropdown .ant-picker-week-panel, :where(.css-17a39f8).ant-picker-dropdown .ant-picker-date-panel, :where(.css-17a39f8).ant-picker-dropdown .ant-picker-time-panel {
  width: 87%;
}

:where(.css-17a39f8).ant-picker-dropdown .ant-picker-month-panel {
  width: 94%;
}

.ant-picker-year-panel .ant-picker-content td {
  top: 13px;
}

:where(.css-17a39f8).ant-picker-dropdown .ant-picker-year-panel .ant-picker-cell::before, {
  top: 50%;
}

:where(.css-17a39f8).ant-picker-dropdown .ant-picker-cell:hover:not(.ant-picker-cell-in-view) .ant-picker-cell-inner, 
:where(.css-17a39f8).ant-picker-dropdown .ant-picker-cell:hover:not(.ant-picker-cell-selected):not(.ant-picker-cell-range-start):not(.ant-picker-cell-range-end):not(.ant-picker-cell-range-hover-start):not(.ant-picker-cell-range-hover-end) .ant-picker-cell-inner,
:where(.css-17a39f8).ant-picker-dropdown .ant-picker-cell-in-view.ant-picker-cell-in-range::before,
:where(.css-17a39f8).ant-picker-dropdown .ant-picker-cell-disabled::before,
:where(.css-17a39f8).ant-picker-dropdown .ant-picker-cell-in-view.ant-picker-cell-range-start:not(.ant-picker-cell-range-start-single)::before, :where(.css-17a39f8).ant-picker-dropdown .ant-picker-cell-in-view.ant-picker-cell-range-end:not(.ant-picker-cell-range-end-single)::before {
  background: none !important;
}

:where(.css-17a39f8).ant-picker-dropdown .ant-picker-cell-in-view.ant-picker-cell-in-range.ant-picker-cell-range-hover::before {
  background: #c8dfff !important;
}

  // 테마
  .eicwgS {
    ${({ theme }) =>
      theme === 'dark' && {
        background: '#333',
      }}
  ${({ theme }) =>
    theme === 'light' && {
      background: 'none',
    }}
  ${({ theme }) =>
    theme !== 'dark' &&
    theme !== 'light' && {
      background: '#FFFAF0',
    }}
  }

  // 상단 토글 메뉴
  :where(.css-dev-only-do-not-override-17a39f8).ant-btn.ant-btn-icon-only,
  :where(.css-17a39f8).ant-btn.ant-btn-icon-only {
    ${({ theme }) =>
      theme === 'dark' && {
        color: '#fff',
      }}
    ${({ theme }) =>
      theme === 'light' && {
        color: '#404040',
      }}
    ${({ theme }) =>
      theme !== 'dark' &&
      theme !== 'light' && {
        color: '#404040',
      }}
  }


  // 모달 내 블록
  .iQLRop button {
    ${({ theme }) =>
      theme === 'dark' &&
      `
      color: #fff;
      background: #2E2E2E;
      &:disabled {
        color: #000;
        background: #fff;
      }
    `}
    ${({ theme }) =>
      theme === 'light' &&
      `
      color: #2E2E2E;
      background: #DFDDE5;
      &:disabled {
        color: #000;
        background: #FFFF;
      }
    `}
    ${({ theme }) =>
      theme !== 'dark' &&
      theme !== 'light' &&
      `    
      button {
         color: #FF7A16;
       }
     `}
  }
`;

export { GlobalStyle };
