import { Button } from 'antd';
import { styled } from 'styled-components';

export const E = {
  FormContainer: styled.form`
    position: relative;
    height: 100%;

    label {
      font: 14px;
    }
  `,

  EmailDiv: styled.div`
    display: flex;

    input {
      margin-top: 12px;
      padding: 16.5px 16px;
      max-width: 225px;
      box-sizing: border-box;
      border: none;
      border-radius: 15px;
      background: #fafafa;
    }

    button {
      margin: 12px 0 0 9px;
      padding: 16.5px 0;
      max-width: 116px;
      width: 116px;
      height: 48.5px;
      box-sizing: border-box;
      color: var(--color-white);
      border-radius: 10px;
      background: var(--color-primary);
    }
  `,

  PasswordDiv: styled.div`
    display: grid;

    label {
      margin-top: 30px;
    }

    input {
      margin-top: 12px;
      padding: 16.5px 16px;
      box-sizing: border-box;
      border: none;
      border-radius: 15px;
      background: #fafafa;
    }
  `,

  Error: styled.p`
    color: red;
    margin-top: 10px;
    font-size: 12px;
  `,

  SignupButton: styled(Button)`
    position: absolute;
    bottom: 38px;
    margin: 0 auto;
    display: block;
    width: 100%;
    height: 60px;
    font-size: 14px;
    font-weight: 700;
    text-decoration: underline;
    color: var(--color-white);
    border-radius: 15px;
    background: var(--color-accent);

    &:disabled {
      border: 1px solid gray;
      color: var(--color-white);
      cursor: default;
      background-color: #d3d3d3;
      border: none;
    }
  `,
};
