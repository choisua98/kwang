import { createGlobalStyle } from 'styled-components';
import btnEditImageLight from '../assets/images/common/btn/btn-edit-light.png';
import btnEditImageDark from '../assets/images/common/btn/btn-edit-dark.png';

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
  :where(.css-dev-only-do-not-override-17a39f8).ant-btn-default,
  :where(.css-17a39f8).ant-btn-default {
    // background: none;
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
  .ant-picker-range-arrow {
  display: none;
}
:where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown
  .ant-picker-header
  > button {
  visibility: initial !important;
}
:where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown
  .ant-picker-panel-container {
  width: 350px !important;
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
  .ant-picker-decade-panel,
:where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown
  .ant-picker-year-panel,
:where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown
  .ant-picker-quarter-panel,
:where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown
  .ant-picker-month-panel,
:where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown
  .ant-picker-week-panel,
:where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown
  .ant-picker-date-panel,
:where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown
  .ant-picker-time-panel {
  display: flex;
  flex-direction: column;
  width: 350px !important;
}
:where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown
  .ant-picker-date-panel
  .ant-picker-content {
  width: 310px !important;
}
:where(.css-dev-only-do-not-override-17a39f8).ant-picker-dropdown-range {
  padding: 40px 0 0 !important;
}
:where(.css-17a39f8).ant-picker-dropdown .ant-picker-panel-container .ant-picker-panels {
  display: grid !important;
}
  
  // 테마
  .eicwgS {
    ${({ theme }) =>
      theme === 'dark' && {
        background: '#333',
      }}
  ${({ theme }) =>
    theme === 'light' && {
      background: '#F4F3F6',
    }}
  ${({ theme }) =>
    theme !== 'dark' &&
    theme !== 'light' && {
      background: '#FFFAF0',
    }}
  }

  // 상단 토글 메뉴
  :where(.css-dev-only-do-not-override-17a39f8).ant-btn.ant-btn-icon-only {
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

  // 테마 바꾸기 버튼
  .ant-btn.csujge {
    ${({ theme }) =>
      theme === 'dark' && {
        background: '#2E2E2E',
      }}
    ${({ theme }) =>
      theme === 'light' && {
        color: '#000',
        background: '#fff',
      }}
    ${({ theme }) =>
      theme !== 'dark' &&
      theme !== 'light' && {
        color: '#fff',
      }}
  }

  // 프로필
  .eVBSlO {
    ${({ theme }) =>
      theme === 'dark' &&
      `background-image: url(${btnEditImageDark});
    `}
    ${({ theme }) =>
      theme === 'light' &&
      `background-image: url(${btnEditImageLight});
    `}
    ${({ theme }) =>
      theme !== 'dark' &&
      theme !== 'light' &&
      `
      // color: '#fff';
    `}
  }

  // 링크
  .iHnBgB {
    ${({ theme }) =>
      theme === 'dark' &&
      `
      color: #fff;
      background: #2E2E2E;
  
      p {
        color: #fff;
      }
    `}
    ${({ theme }) =>
      theme === 'light' &&
      `
      color: #000;
      background: #fff;
  
      p {
        color: #000;
      }
    `}
    ${({ theme }) =>
      theme !== 'dark' &&
      theme !== 'light' &&
      `
       color: '#fff';
  
       p {
         color: '#fff';
       }
     `}
  }

  // 블록
  .iGiRYI button {
    ${({ theme }) =>
      theme === 'dark' && {
        color: '#fff',
        background: '#2E2E2E',
      }}
    ${({ theme }) =>
      theme === 'light' && {
        color: '#2E2E2E',
        background: '#fff',
      }}
    ${({ theme }) =>
      theme !== 'dark' &&
      theme !== 'light' && {
        color: '#fff',
        background: '#FF7A16',
      }}
  }
  
  .bypPBO {
    border:${({ theme }) =>
      theme === 'dark' ? '1.5px solid #2E2E2E;' : '1px solid #fff'};
      button {
        color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#2E2E2E')};
      }
  }

  .bypPBO {
    ${({ theme }) =>
      theme === 'dark' &&
      `
      border: 1.5px solid #2E2E2E;
      button {
        color: #fff;
      }
    `}
    ${({ theme }) =>
      theme === 'light' &&
      `
      border: 1.5px solid #fff;
  
      button {
        color: #2E2E2E;
      }
    `}
    ${({ theme }) =>
      theme !== 'dark' &&
      theme !== 'light' &&
      `
      border: 1.5px solid #FF7A16;
    
      button {
         color: #FF7A16;
       }
     `}
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
