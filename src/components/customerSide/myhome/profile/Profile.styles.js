import { styled } from 'styled-components';

export const S = {
  Container: styled.div`
    > div {
      padding: 20px 0;
      > div {
        text-align: center;
        > div:nth-child(2) {
          margin: 20px 0 10px;
        }
        > div:nth-child(3) {
          margin: 20px 0;
        }
      }
    }
  `,

  ProfileImage: styled.img`
    width: 150px;
    height: 150px;
    object-fit: cover; // 이미지가 잘리지 않도록 설정
    border-radius: 100%;
  `,
};
