import { styled } from 'styled-components';

export const R = {
  Container: styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;

    ::placeholder {
      color: #999;
      padding: 5px 7px;
    }

    p {
      padding: 10px 0px;
    }

    label {
      display: flex;
      justify-content: center;
      text-align: center;
      background-color: lightgray;
      padding: 8px 0px;
      margin-bottom: 10px;
      cursor: pointer;
    }

    button {
      height: 30px;
      margin: 10px 0px;
    }

    input {
      height: 50px;
      margin: 10px 0px;
    }
    textarea {
      height: 80px;
    }
  `,
};
