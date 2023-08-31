import { styled } from 'styled-components';

export const R = {
  Container: styled.form`
    padding: 20px;

    h3 {
      font-size: 20px;
      text-align: center;
      margin: 30px 10px 10px 10px;
    }
    h4 {
      text-align: center;
      margin-bottom: 30px;
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover; // 이미지가 잘리지 않도록 설정
      background-color: #d6d6d6;
      margin: 5px 0px;
    }

    p {
      margin: 5px;
    }

    button {
      width: 100%;
      padding: 15px 0px;
      margin-top: 30px;
      border-radius: 10px;
    }

    input {
      height: 30px;
      margin: 10px 0px;
    }
  `,
};
