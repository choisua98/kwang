import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { M } from './Home.styles';
import PromoBanner1 from '../../assets/images/customer/home/banner/promo/promo-banner-1.webp';
import PromoBanner2 from '../../assets/images/customer/home/banner/promo/promo-banner-2.webp';

const MainBanner = () => {
  return (
    <M.MainBannerContainer>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true} // 무한 반복 활성화
      >
        <SwiperSlide>
          <Link to="#">
            <img
              src={PromoBanner1}
              alt="크리에이터를 위한 단 하나의 링크, 크왕!"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/login">
            <img
              src={PromoBanner2}
              alt="누구나 크리에이터가 되는 시대! 멀티링크 서비스, 크왕 나만의 링크 만들기"
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </M.MainBannerContainer>
  );
};

export default MainBanner;
