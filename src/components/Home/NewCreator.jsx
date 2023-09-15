import React, { useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { db } from '../../firebase/firebaseConfig';
import { collection, query, limit, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { N } from './Home.styles';
import kwangProfileImage from '../../assets/images/Kwang-background-white.webp';
import defaultProfileImage from '../../assets/images/profile-default-image.webp';
import { message } from 'antd';

const NewCreator = () => {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'users'), limit(30));
    getDocs(q)
      .then((querySnapshot) => {
        let usersArray = [];
        querySnapshot.forEach((doc) => {
          usersArray.push(doc.data());
        });
        setUsersData(usersArray);
      })
      .catch((error) => {
        message.error('문서를 가져오지 못하는 오류: ', error);
      });
  }, []);

  return (
    <N.NewCreatorContainer>
      <N.H1>NEW 크리에이터</N.H1>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={2.2}
        lazy={{ loadPrevNext: true }}
      >
        {usersData.map((user, index) => (
          <SwiperSlide
            key={index}
            onClick={() => {
              navigate(`/${user.uid}`);
            }}
          >
            <img
              src={
                !user.profileImageURL ||
                user.profileImageURL === defaultProfileImage
                  ? kwangProfileImage
                  : user.profileImageURL
              }
              alt={`User Profile ${index + 1}`}
            />
            <p>{user.nickname}</p>
            <p>{user.introduction}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </N.NewCreatorContainer>
  );
};

export default NewCreator;
