import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

export const B = {
  Container: styled.div`
    button {
      margin-bottom: 15px;
      padding: 21.5px 0;
      width: 100%;
      font-size: 14px;
      color: var(--color-white);
      border-radius: 15px;
      background: var(--color-accent);
    }
  `,

  Swiper: styled(Swiper)`
    margin-bottom: 11px;
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
};
