import { styled } from 'styled-components';

export const M = {
  Container: styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;

    ::placeholder {
      color: #999;
      padding: 5px 7px;
    }

    input,
    button {
      height: 30px;
    }

    textarea {
      height: 60px;
    }
  `,
};
