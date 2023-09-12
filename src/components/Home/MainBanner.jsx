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
import PromoBanner1 from '../../assets/images/customer/home/banner/promo/promo-banner-1.png';
import PromoBanner2 from '../../assets/images/customer/home/banner/promo/promo-banner-2.png';

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
              alt="크리에이터를 위한 단 하나의 링크, 크왕! 1"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="#">
            <img
              src={PromoBanner2}
              alt="크리에이터를 위한 단 하나의 링크, 크왕! 2"
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </M.MainBannerContainer>
  );
};

export default MainBanner;
