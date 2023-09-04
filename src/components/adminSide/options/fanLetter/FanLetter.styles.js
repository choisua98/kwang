import { styled } from 'styled-components';

export const F = {
  Container: styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;

    ::placeholder {
      color: #999;
      padding: 5px 7px;
    }

    input {
      height: 30px;
      padding-left: 10px;
    }

    textarea {
      height: 100px;
      padding-left: 10px;
    }

    p {
      text-align: end;
    }

    label span {
      color: red;
    }

    button {
      height: 30px;
    }
  `,
};
