import { styled } from 'styled-components';

export const E = {
  Title: styled.h1`
    font-size: 20px;
    line-height: 26px;
  `,
  Image: styled.img`
    margin: 25px auto;
    width: 100%;
  `,

  EmailInput: styled.input`
    padding: 15.5px 15px;
    width: 100%;
    box-sizing: border-box;
    font-size: 14px;
    border: 2px solid #f5f5f5;
    border-radius: 15px;
  `,
  LoginMoveButton: styled.button`
    margin: 26px auto 0;
    width: 100%;
    height: 60px;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    background: #ffbe51;
    border-radius: 15px;
  `,
  GridBox: styled.div`
    margin: 61px auto 0;
    font-size: 14px;
    text-align: center;
    color: #484848;
  `,
};
