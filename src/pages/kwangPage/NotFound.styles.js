import { styled } from 'styled-components';

export const N = {
  Container: styled.div`
    display: flex;
    flex-direction: column; /* 주 축을 세로로 설정 */
    justify-items: center;
    align-items: center;
    padding: 20px;
  `,

  LogoImage: styled.img`
    width: 130px;
    margin-top: 120px;
    margin-bottom: 12px;
  `,

  Text: styled.p`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
  `,

  MessageImage: styled.img`
    width: 170px;
    margin-bottom: 55px;
  `,

  SmallText: styled.p`
    width: 315px;
    color: gray;
    font-size: 14px;
    text-align: center;
    line-height: 1.3;
    margin-bottom: 150px;
  `,

  MoveButton: styled.button`
    display: flex;
    margin: 70px auto;
    bottom: 0;
    padding: 20px 0px;
    justify-content: center;
    width: 100%;
    font-size: 14px;
    font-weight: 700;
    color: var(--color-white);
    border-radius: 15px;
    background-color: ${(props) => props.color || `var(--color-accent)`};
  `,
};
