import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { M } from './MainBanner.styles';
import { ReactComponent as PromoBanner } from '../../assets/images/customer/home/banner/promo/promo-banner-1.svg';

const MainBanner = () => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        // navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        onSwiper={(swiper) => {
          // console.log(swiper);
        }}
        onSlideChange={() => {
          // console.log('slide change')
        }}
        style={{ margin: '20px auto 0', width: '100%', height: '100px' }}
      >
        <SwiperSlide>
          <PromoBanner alt="Promo Banner 1" />
        </SwiperSlide>
        <SwiperSlide>
          <PromoBanner alt="Promo Banner 2" />
        </SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
      </Swiper>
    </>
  );
};

export default MainBanner;
