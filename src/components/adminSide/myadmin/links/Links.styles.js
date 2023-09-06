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
    > div {
      position: relative;
    }
    & button {
      overflow: hidden;
      margin: 0 9px;
      padding: 0;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: none;
      position: relative;
      &::before {
        content: '';
        display: inline-block;
        width: 100%;
        height: 100%;
        background-size: cover;
        opacity: 0.5;
        position: absolute;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  `,
  CustomerSideContainer: styled.div`
    margin-bottom: 20px;
  `,
};
