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
      color: #b0b0b0;
      border-radius: 10px;
      background: #e7e7e7;
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
};
