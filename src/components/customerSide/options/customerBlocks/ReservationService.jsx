import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../../firebase/firebaseConfig';
import { Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { C } from '../CustomerBlocks.style';
import { useNavigate, useParams } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

const ReservationService = () => {
  const navigate = useNavigate();
  const [reservationData, setReservationData] = useState([]);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const { uid } = useParams();
  const userUid = uid;

  // firebase에서 데이터 불러오기
  const fetchData = async () => {
    try {
      // 쿼리 실행하여 데이터 가져오기
      const q = query(
        collection(db, 'template'),
        where('userId', '==', userUid),
        where('blockKind', '==', 'reservation'),
      );
      const querySnapshot = await getDocs(q);

      // 가져온 데이터를 가공하여 배열에 저장
      const initialDocuments = [];
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        initialDocuments.push(data);
      });

      // 가공된 데이터를 상태에 업데이트
      setReservationData(initialDocuments);
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기 함수 호출
  useEffect(() => {
    if (userUid) {
      fetchData();
    }
  }, [userUid]);

  const submitButtonClick = async (e) => {
    e.preventDefault();
    try {
      // Firestore에 데이터 추가
      await addDoc(collection(db, 'userTemplate'), {
        dataKind: 'reservationData',
        name,
        phoneNumber,
        createdAt: serverTimestamp(),
        userId: userUid,
      });

      alert('신청 완료!');
      navigate(-1);
    } catch (error) {
      console.error('저장 중 오류 발생:', error.message);
    }
  };

  return (
    <>
      {reservationData.map((data) => (
        <div key={data.id}>
          <C.HeaderStyle>
            <button onClick={() => navigate(`/${userUid}`)}>
              <LeftOutlined />
            </button>
            <p>{data.title}</p>
          </C.HeaderStyle>

          <C.Container>
            {data.blockKind === 'reservation' && (
              <div>
                <Swiper
                  modules={[Pagination, A11y]}
                  pagination={{ clickable: true }}
                  a11y
                >
                  {data.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img src={image} alt={`reservationimage ${index + 1}`} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
            <br />
            <p>일시 : {data.pickDate} </p>
            <p>
              신청기간 : {data.startDate} ~ {data.endDate}
            </p>
            <p>모집인원 : {data.numberOfPeople} 명</p>
            <br />
            <p>{data.description}</p>
          </C.Container>
        </div>
      ))}

      <C.Container>
        <h3>신청 방법</h3>
        <h4>하단의 신청 폼을 작성해 주세요.</h4>
        <label htmlFor="name">
          <p>
            이름<span>*</span>
          </p>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="phoneNumber">
          <p>
            연락처<span>*</span>
          </p>
        </label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </C.Container>

      <C.ButtonArea>
        <C.SubmitButton
          type="submit"
          disabled={!name || !phoneNumber}
          onClick={submitButtonClick}
        >
          신청하기
        </C.SubmitButton>
      </C.ButtonArea>
    </>
  );
};

export default ReservationService;
