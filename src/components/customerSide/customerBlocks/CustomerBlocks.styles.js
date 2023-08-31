import { styled } from 'styled-components';

export const C = {
  Container: styled.div`
    button {
      width: 100%;
      padding: 10px 0px;
      margin: 5px 0px;
      border-radius: 10px;
    }

    img {
      cursor: pointer;
      width: 100%;
      height: 200px;
      object-fit: cover; // 이미지가 잘리지 않도록 설정
      background-color: #d6d6d6;
      margin: 5px 0px;
    }
  `,
};
