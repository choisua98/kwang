import { styled } from 'styled-components';

export const L = {
  Login: styled.div`
    padding: 25px 20px;
    height: calc(100vh - 113px);
    background: #fff;
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
};
