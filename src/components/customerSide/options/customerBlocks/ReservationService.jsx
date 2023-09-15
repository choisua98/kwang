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
import { useNavigate, useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { modalVisibleAtom } from '../../../../atoms/Atom';
import { Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { C } from '../CustomerBlocks.style';
import { LeftOutlined } from '@ant-design/icons';
import IconModalConfirm from '../../../../assets/images/common/icon/icon-modalConfirm.png';
import { message } from 'antd';

const ReservationService = () => {
  const navigate = useNavigate();
  const [reservationData, setReservationData] = useState([]);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [modalVisible, setModalVisible] = useAtom(modalVisibleAtom);

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
      message.error('데이터 가져오기 오류:', error);
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

      setModalVisible(true);
    } catch (error) {
      message.error('저장 중 오류 발생:', error.message);
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
        <label htmlFor="name">
          <p>이름</p>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력해주세요."
          autoFocus
        />
        <label htmlFor="phoneNumber">
          <p>연락처</p>
        </label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="010-1234-5678"
        />
        <C.ButtonArea>
          <C.SubmitButton
            type="submit"
            disabled={!name || !phoneNumber}
            onClick={submitButtonClick}
          >
            신청하기
          </C.SubmitButton>
        </C.ButtonArea>
      </C.Container>

      <C.Modal
        title=""
        centered
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          navigate(-1);
        }}
        footer={null}
        closable={false}
        width={330}
      >
        <div>
          <img src={IconModalConfirm} alt="완료아이콘" />
          <h1>신청완료!</h1>
          <p>예약서비스 신청이 완료되었습니다.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setModalVisible(false);
            navigate(-1);
          }}
        >
          닫기
        </button>
      </C.Modal>
    </>
  );
};

export default ReservationService;
