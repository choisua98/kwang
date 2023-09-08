import { styled } from 'styled-components';

export const B = {
  Container: styled.div`
    div {
      display: flex;
      align-items: center;
    }

    // icon
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 5px 0 5px 5px;
      font-size: 20px;
      -ms-transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      color: lightgray;
    }

    button {
      margin: 7.5px 0;
      padding: 21.5px 0;
      width: 100%;
      font-size: 14px;
      color: var(--color-white);
      border-radius: 15px;
      background: var(--color-accent);
    }
  `,

  ImageContainer: styled.div`
    margin: 7.5px 0;
    display: flex;

    img {
      cursor: pointer;
      width: 100%;
      height: 200px;
      object-fit: cover; // 이미지가 잘리지 않도록 설정
      background-color: #d6d6d6;
      border-radius: 15px;
    }
  `,

  ArrowContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;

    p {
      cursor: pointer;
      padding: 5px;
    }
  `,
};
