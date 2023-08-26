import { styled } from 'styled-components';

export const L = {
  Container: styled.div``,
  ButtonContainer: styled.div`
    margin: 0 auto;
    display: block;
    max-width: 390px;
    width: 100%;
    & button {
      border-radius: 50%;
      background: none;
      img {
        width: 60px;
        border-radius: 50%;
      }
    }
  `,
};