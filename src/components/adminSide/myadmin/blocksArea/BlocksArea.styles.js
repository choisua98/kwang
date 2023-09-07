import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

export const B = {
  Container: styled.div`
    div {
      display: flex;
      /* flex-direction: row; */
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

  Swiper: styled(Swiper)`
    padding: 21.5px 0;
    width: 100%;
  `,

  SwiperSlide: styled(SwiperSlide)`
    img {
      cursor: pointer;
      width: 100%;
      height: 200px;
      object-fit: cover; // 이미지가 잘리지 않도록 설정
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
      /* border: 1px solid black; */
      padding: 5px;
    }
  `,
};
