import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { M } from './MainBanner.styles';
import PromoBanner from '../../assets/images/customer/home/banner/promo/promo-banner-1.svg';
import { Link } from 'react-router-dom';

const MainBanner = () => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        pagination={{ clickable: true }}
        style={{ margin: '20px auto 0', width: '100%', height: '100px' }}
      >
        <SwiperSlide>
          <Link to="#">
            <img
              src={PromoBanner}
              alt="Promo Banner 1"
              style={{ width: '100%' }}
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="#">
            <img
              src={PromoBanner}
              alt="Promo Banner 2"
              style={{ width: '100%' }}
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="#">
            <img
              src={PromoBanner}
              alt="Promo Banner 3"
              style={{ width: '100%' }}
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default MainBanner;
