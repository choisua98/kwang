import { styled } from 'styled-components';

export const L = {
  Container: styled.div`
    margin-top: 40px;
    padding: 40px 35px;
    background: #fff;
    border-radius: 15px;
  `,
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
        height: 60px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  `,
};
