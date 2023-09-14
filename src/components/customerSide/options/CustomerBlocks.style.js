import { styled } from 'styled-components';
import { Collapse, Modal } from 'antd';

// adminSide options 공통 css
export const C = {
  HeaderStyle: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 20px;
    position: relative;

    button {
      position: absolute;
      left: 0;
      padding: 0;
      font-size: 20px;
      background-color: transparent;
    }

    p {
      font-size: 18px;
      font-weight: 500;
    }
  `,

  Container: styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;

    h1 {
      font-weight: 500;
      margin-bottom: 10px;
    }

    h2 {
      font-size: 14px;
    }

    h3 {
      width: 137px;
      height: 30px;
      border-radius: 15px;
      border: 1.5px solid var(--color-accent);
      font-size: 14px;
      font-weight: 600;
      color: var(--color-accent);
      background: none;

      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      margin: 5px 0px;
      border-radius: 15px;
    }

    ::placeholder {
      color: #999;
      padding: 5px 7px;
      font-size: 14px;
    }

    input {
      padding: 16.5px 16px;
      box-sizing: border-box;
      border: none;
      border-radius: 15px;
      background: #fafafa;
    }

    textarea {
      height: 120px;
      padding: 16.5px 16px;
      box-sizing: border-box;
      border: none;
      border-radius: 15px;
      background: #fafafa;
    }

    p {
      font-size: 14px;
    }

    label {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      margin-top: 30px;
    }
  `,

  Collapse: styled(Collapse)`
    text-align: center;
    background-color: var(--color-secondary);
    margin: 40px 20px;
    border: none;

    .ant-collapse-content-box {
      padding: 30px 45px !important;
    }
    .ant-collapse-content {
      background: var(--color-bg);
      border: none;
    }
    .ant-collapse-item {
      border-bottom: 1px solid #ddd;
      &:last-child {
        border: none;
      }
    }
  `,

  Divider: styled.div`
    height: 10px;
    width: 100%;
    background-color: #fafafa;
    margin-bottom: 40px;
  `,

  ButtonArea: styled.div`
    display: grid;
    margin: 50px 0px 40px 0px;
    position: relative;
  `,

  SubmitButton: styled.button`
    display: flex;
    margin: 12px auto;
    padding: 20px 0px;
    justify-content: center;
    width: 100%;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    border-radius: 15px;
    background-color: ${(props) => props.color || '#FF7C38;'};

    &:disabled {
      border: 1px solid gray;
      color: gray;
      cursor: default;
      background-color: rgb(255, 250, 240, 0.8);
      border: none;
    }
  `,

  Modal: styled(Modal)`
    &.ant-modal .ant-modal-content {
      border-radius: 15px;
      padding: 40px 44px 0px 44px;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: 500;
    }

    img {
      padding-bottom: 15px;
    }

    h1 {
      font-size: 22px;
      padding-bottom: 15px;
    }

    P {
      font-size: 14px;
      color: #787878;
      padding-bottom: 60px;
    }

    button {
      width: 330px;
      height: 60px;
      font-size: 18px;
      color: var(--color-white);
      background-color: var(--color-text);
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
    }
  `,
};
