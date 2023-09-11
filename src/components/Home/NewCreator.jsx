import React, { useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// import BestBanner from '../../../assets/images/customer/home/banner/best/best-banner-1.svg';
import { db } from '../../firebase/firebaseConfig';
import { collection, query, limit, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import kwangProfileImage from '../../assets/images/Kwang-background-white.png';
import defaultProfileImage from '../../assets/images/profile-default-image.png';

const NewCreator = () => {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'users'),
      //   orderBy('popularity', 'desc'), // 인기순 필드 추가시
      limit(30),
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
        console.error('문서를 가져오지 못하는 오류: ', error);
      });
  }, []);

  return (
    <div style={{ margin: '28px auto 40px', padding: '0 20px' }}>
      <h1
        style={{
          fontSize: '16px',
          fontWeight: 'bold',
          lineHeight: 'normal',
          color: '#000',
        }}
      >
        NEW 크리에이터
      </h1>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={2.2}
        style={{
          margin: '20px auto 0',
          width: '349px',
          height: '170px',
          objectFit: 'contain',
        }}
      >
        {usersData.map((user, index) => (
          <SwiperSlide
            key={index}
            onClick={() => {
              navigate(`/${user.uid}`);
            }}
            style={{
              cursor: 'pointer',
            }}
          >
            <img
              src={
                !user.profileImageURL ||
                user.profileImageURL === defaultProfileImage
                  ? kwangProfileImage
                  : user.profileImageURL
              }
              style={{
                width: '150px',
                height: '100px',
                borderRadius: '10px',
                objectFit: 'cover', // 이미지가 잘리지 않도록 설정
              }}
              alt={`User Profile ${index + 1}`}
            />
            <p
              style={{
                marginTop: '12px',
                fontSize: '14px',
                fontWeight: 'bold',
                lineHeight: 'normal',
                color: '#000',
              }}
            >
              {user.nickname}
            </p>
            <p
              style={{
                marginTop: '5px',
                fontSize: '12px',
                lineHeight: 'normal',
                color: '#9A9EA5',
              }}
            >
              {user.introduction}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewCreator;
