import { styled } from 'styled-components';

export const B = {
  Container: styled.div`
    img {
      cursor: pointer;
      width: 100%;
      height: 200px;
      object-fit: cover; // 이미지가 잘리지 않도록 설정
      background-color: #d6d6d6;
    }
  `,
};
