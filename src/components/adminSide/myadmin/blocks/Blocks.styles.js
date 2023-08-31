import { styled } from 'styled-components';

export const B = {
  // Container: styled.div``,
  ActivButton: styled.button`
    padding: 5px;
    margin: 5px 0;
    width: 100%;
    border: 1px solid #000;
    border-radius: 5px;

    &:disabled {
      border: 1px solid gray;
      color: gray;
      cursor: default;
    }
  `,
};
