import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { M } from './MainBanner.styles';
import PromoBanner1 from '../../assets/images/customer/home/banner/promo/promo-banner-1.png';
import PromoBanner2 from '../../assets/images/customer/home/banner/promo/promo-banner-2.png';

const MainBanner = () => {
  return (
    <div style={{ padding: '0 20px' }}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        pagination={{ clickable: true }}
        style={{ margin: '20px auto 0', width: '100%' }}
      >
        <SwiperSlide>
          <Link to="#">
            <img
              src={PromoBanner1}
              alt="Promo Banner 1"
              style={{ width: '100%' }}
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="#">
            <img
              src={PromoBanner2}
              alt="Promo Banner 2"
              style={{ width: '100%' }}
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MainBanner;
