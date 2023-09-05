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

const defaultProfileImagePath =
  '/static/media/profile-default-image.a6c8cf9f335e270bca0f.png';
const defaultProfileImagePath2 =
  'data:image/png;base64,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';

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
    <div style={{ margin: '50px auto 62px', padding: '0 20px' }}>
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
                user.profileImageURL === defaultProfileImagePath ||
                user.profileImageURL === defaultProfileImagePath2
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
