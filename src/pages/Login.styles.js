import { styled } from 'styled-components';

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
      border-radius: 50%;s
    }

    // 카카오
    button {
      img {
        overflow: hidden;
        width: 52.5px;
        height: 52.5px;
        border-radius: 50%;
      }
    }

  `,
};
