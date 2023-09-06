import { styled } from 'styled-components';
import { Modal } from 'antd';

export const B = {
  MenuFormButton: styled.div`
    padding: 18px 0;
    width: 100%;
    height: auto;
    border-radius: 15px;
    border: 1.5px solid var(--color-accent);
    background: none;
    text-align: center;

    button {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-accent);
      background-color: transparent;
    }
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
        color: #fff;
        background: var(--color-accent);
      }

      &:disabled {
        border: 1px solid gray;
        color: gray;
        cursor: default;
        background-color: rgb(255, 250, 240, 0.8);
        border: none;
      }
    }
  `,
};
