import React, { useState } from 'react';
import { R } from './Reservation.styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../../../../firebase/firebaseConfig';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, InputNumber, Space, Tag } from 'antd';
import {
  blocksAtom,
  reservationImageAtom,
  userAtom,
} from '../../../../atoms/Atom';
import { useAtom, useAtomValue } from 'jotai';
import { styled } from 'styled-components';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { getAuth } from 'firebase/auth';

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

// 오늘 이전의 날짜는 선택 불가능하도록 설정하는 함수
const disabledDate = (current) => {
  return current && current < dayjs().endOf('day');
};

const Reservation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [date, setDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [reservationImage, setReservationImage] = useAtom(reservationImageAtom);
  const [selectedImage, setSelectedImage] = useState(null);

  const user = useAtomValue(userAtom);
  const userUid = user?.uid;

  const blockId = location.state ? location.state.blocksId : null;
  const [blocks] = useAtom(blocksAtom);
  const selectedBlock = blocks.find((block) => block.id === blockId) || '';

  const addButtonClick = async () => {
    // Firestore에 데이터 추가
    await addDoc(collection(db, 'template'), {
      title,
      description,
      numberOfPeople,
      // date,
      // startDate,
      // endDate,
      blockKind: 'reservation',
      createdAt: serverTimestamp(),
      userId: userUid,
    });
    alert('데이터가 추가되었습니다.');
  };

  const datePickInput = (date, dateString) => {
    console.log(date, dateString);
    setDate(date);
  };

  // 이미지 firebase 에 추가
  const addImageButtonClick = async () => {
    try {
      // Firebase에 이미지 업로드
      const imageRef = ref(storage, `reservationImages/${user.uid}/image`);
      await uploadBytes(imageRef, selectedImage);
      const imageURL = await getDownloadURL(imageRef);
      setReservationImage(imageURL);
    } catch (error) {
      console.error('업데이트 실패', error);
    }
  };

  return (
    <R.Container>
      <R.Contents>
        <p>예약 서비스 이름</p>
        <input
          placeholder="예약 서비스"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <p>예약 상세설명</p>
        <textarea
          placeholder="상세 설명을 입력해주세요"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <p>이미지를 추가해 주세요</p>
        <label htmlFor="imageInput">이미지 추가 +</label>
        {reservationImage ? <PreviewImage src={reservationImage} /> : ''}

        <input
          id="imageInput"
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setSelectedImage(file);
              setReservationImage(URL.createObjectURL(file));
            }
          }}
        />
        <p>모집 인원</p>
        <input
          type="number"
          placeholder="모집 인원을 선택해주세요"
          value={numberOfPeople}
          onChange={(e) => {
            setNumberOfPeople(e.target.value);
          }}
        />
        <p>예약 날짜 선택</p>
        <Space id="period" direction="vertical" size={12}>
          <DatePicker onChange={datePickInput} />
        </Space>
        <p>예약 기간</p>
        <Space id="period" direction="vertical" size={12}>
          <RangePicker
            disabledDate={disabledDate}
            style={{ width: '100%' }}
            dropdownClassName="customRangePickerPopup"
          />
        </Space>
        <button
          onClick={() => {
            addButtonClick();
            addImageButtonClick();
            navigate('/admin');
          }}
        >
          저장하기
        </button>
        <button>삭제하기</button>
      </R.Contents>
    </R.Container>
  );
};

export default Reservation;

const PreviewImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover; // 이미지가 잘리지 않도록 설정
  background-color: #d6d6d6;
`;
