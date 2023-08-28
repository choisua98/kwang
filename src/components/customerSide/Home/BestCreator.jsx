import React, { useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import { B } from './BestCreator.styles';
// import BestBanner from '../../../assets/images/customer/home/banner/best/best-banner-1.svg';
import { db } from './../../../firebase/firebaseConfig';
import { collection, query, limit, getDocs } from 'firebase/firestore';

const BestCreator = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'users'),
      //   orderBy('popularity', 'desc'), // 인기순 필드 추가시
      limit(10),
    );
    getDocs(q)
      .then((querySnapshot) => {
        let usersArray = [];
        querySnapshot.forEach((doc) => {
          usersArray.push(doc.data());
        });
        setUsersData(usersArray);
      })
      .catch((error) => {
        console.log('문서를 가져오지 못하는 오류: ', error);
      });
  }, []);
  // console.log(usersData.profileImageURL);

  return (
    <>
      <h1>인기 크리에이터 BEST</h1>

      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={2.2}
        // navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        style={{
          margin: '20px auto 0',
          width: '349px',
          height: '150px',
          objectFit: 'contain',
        }}
      >
        {usersData.map((user, index) => (
          <SwiperSlide key={index}>
            <img
              src={user.profileImageURL}
              style={{
                width: '100%',
                height: '100px',
                borderRadius: '10px',
                // objectFit: 'contain',
              }}
              alt={`Service Banner ${index + 1}`}
            />
            <p>{user.nickname}</p>
            <p>{user.introduction}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default BestCreator;
