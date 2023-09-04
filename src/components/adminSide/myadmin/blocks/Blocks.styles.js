import { styled } from 'styled-components';
import { Modal } from 'antd';

export const B = {
  CustomModal: styled(Modal)`
    .ant-modal-header {
      margin: 0;
      padding: 0 0 33px;
      text-align: center;
    }
    .ant-modal-title {
      font-size: 14px;
      line-height: 14px;
      color: #000;
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
  `,
  ActivButton: styled.button`
    margin: 20px auto 0;
    padding: 21.5px 0;
    width: 100%;
    border-radius: 15px;
    background: #fff3d7;

    &:hover {
      color: #fff;
      background: #ff7c38;
    }

    &:disabled {
      border: 1px solid gray;
      color: gray;
      cursor: default;
    }
  `,
};
