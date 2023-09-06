import { styled } from 'styled-components';

export const L = {
  Container: styled.div`
    margin: 40px auto;
    padding: 40px 35px;
    background: #fff;
    border-radius: 15px;
  `,
  ButtonContainer: styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: center;
    width: 100%;
    & button {
      margin: 0 9px;
      width: 100%;
      max-width: 60px;
      border-radius: 50%;
      background: none;
      img {
        max-width: 60px;
        width: 100%;
        max-height: 60px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  `,

  CustomerSideContainer: styled.div`
    margin-bottom: 20px;
  `,
};
