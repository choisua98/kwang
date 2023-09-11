import { styled } from 'styled-components';

export const H = {
  BodyWrapper: styled.div`
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    color: #333;
  `,
};

export const L = {
  Login: styled.div`
    padding: 25px 20px;
  `,
  Sns: styled.div`
    margin-top: 17.5px;
    display: flex;
    justify-content: center;
    gap: 20px;

    // 네이버
    & span {
      a {
        img {
          overflow: hidden;
          width: 52.5px;
          height: 52.5px;
          border-radius: 50%;
        }
      }
    }

    // 구글
    & img {
      overflow: hidden;
      width: 52.5px;
      height: 52.5px;
      border-radius: 50%;
      cursor: pointer;
    }

    // 카카오
    button {
      background: none;
      img {
        overflow: hidden;
        width: 52.5px;
        height: 52.5px;
        border-radius: 50%;
        background-color: none;
      }
    }
  `,

  AlignBox: styled.div`
    margin: 37.5px auto 10px;
    font-size: 16px;
    text-align: center;
  `,

  SignupMoveButton: styled.button`
    margin: 0 auto;
    display: block;
    font-size: 14px;
    text-decoration: underline;
    color: #a1a1a1;
    background: none;
  `,
};

export const S = {
  Signup: styled.div`
    padding: 25px 20px;
    height: calc(100vh - 113px);
  `,
};
