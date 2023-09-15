import styled from 'styled-components';
import { Modal } from 'antd';

export const B = {
  MenuFormButton: styled.div`
    width: calc(100% - 32px);
    height: auto;
    border-radius: 15px;
    border: 1.5px solid var(--color-accent);
    background: none;
    text-align: center;
    margin-top: 20px;

    button {
      width: 100%;
      line-height: 58px;
      font-size: 14px;
      font-weight: 600;
      background: none;
    }
    ${({ theme }) =>
      theme === 'dark' &&
      `
    border: 1.5px solid #2E2E2E;
    button {
      color: var(--color-white);
    }
  `}
    ${({ theme }) =>
      theme === 'light' &&
      `
    border: 1.5px solid #DFDDE5;
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
  `,

  CustomModal: styled(Modal)`
    .ant-modal-header {
      margin: 0;
      padding: 0 0 33px;
      text-align: center;
    }
    .ant-modal-title {
      font-size: 14px;
      line-height: 14px;
      color: var(--color-text);
    }
    .ant-modal-close {
      top: 34px;
      right: 19px;
    }
    .ant-modal-close-x {
      color: #7a7a7a;
      font-size: 14px;
    }
    .ant-modal-content {
      padding: 40px 25px 43px;
    }
  `,
  ButtonsContainer: styled.div`
    & > button:first-child {
      margin-top: 0;
    }

    button {
      margin: 15px auto 0;
      padding: 12px 0;
      width: 100%;
      border-radius: 15px;
      background: var(--color-secondary);

      &:hover {
        color: var(--color-white);
        background: var(--color-accent);
      }

      &:disabled {
        border: 1px solid gray;
        color: gray;
        cursor: default;
        background-color: rgb(255, 250, 240, 0.8);
        border: none;
      }

      ${({ theme }) =>
        theme === 'dark' &&
        `
        color: var(--color-white);
        background:#2E2E2E;
        
        &:disabled{
          color:#000; 
          background:var(--color-white);
        }
      `}
      ${({ theme }) =>
        theme === 'light' &&
        `
          color:#2E2E2E; 
          background:#DFDDE5;

          &:disabled{
            color:#000; 
            background:var(--color-white);
          }
       `}
       ${({ theme }) =>
        theme !== 'dark' &&
        theme !== 'light' &&
        `    
        color:#FF7A16;  
      `}
    }
  `,
};
