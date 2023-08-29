import React, { useEffect, useState } from 'react';
import { R } from './Reservation.styles';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
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
import moment from 'moment';

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
  const [pickDate, setPickDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [reservationImage, setReservationImage] = useAtom(reservationImageAtom);
  const [selectedImage, setSelectedImage] = useState(null);

  const user = useAtomValue(userAtom);
  const userUid = user?.uid;

  const blockId = location.state ? location.state.blocksId : null;
  const [blocks, setBlocks] = useAtom(blocksAtom);
  const selectedBlock = blocks.find((block) => block.id === blockId) || '';

  // 저장 버튼
  const addButtonClick = async () => {
    try {
      // Firestore에 데이터 추가
      await addDoc(collection(db, 'template'), {
        title,
        description,
        numberOfPeople,
        pickDate,
        startDate,
        endDate,
        blockKind: 'reservation',
        createdAt: serverTimestamp(),
        userId: userUid,
      });
      // Firebase에 이미지 추가
      const imageRef = ref(storage, `reservationImages/${user.uid}/image`);
      await uploadBytes(imageRef, selectedImage);
      const imageURL = await getDownloadURL(imageRef);
      setReservationImage(imageURL);
      alert('데이터가 추가되었습니다.');
      navigate('/admin');
    } catch (error) {
      console.error('저장 실패', error);
    }
  };

  // 수정 버튼
  const editButtonClick = async () => {
    try {
      // Firestore에 데이터 업로드
      const docRef = doc(db, 'template', blockId);
      await updateDoc(docRef, {
        title,
        description,
        numberOfPeople,
        pickDate,
        startDate,
        endDate,
        blockKind: 'reservation',
        createdAt: serverTimestamp(),
        userId: userUid,
      });
      // Firebase에 이미지 업로드
      const imageRef = ref(storage, `reservationImages/${user.uid}/image`);
      await uploadBytes(imageRef, selectedImage);
      const imageURL = await getDownloadURL(imageRef);
      setReservationImage(imageURL);
      alert('데이터가 저장되었습니다.');
      navigate('/admin');
    } catch (error) {
      console.error('업데이트 실패', error);
    }
  };

  const datePickInput = (_, dateString) => {
    setPickDate(dateString);
  };

  const periodPickInput = (_, dateString) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };

  // firebase에서 데이터 불러오기
  const fetchData = async () => {
    const imageRef = ref(storage, `reservationImages/${user.uid}/image`);
    try {
      // 이미지 Url 가져오기
      const imageUrl = await getDownloadURL(imageRef);
      setReservationImage(imageUrl);

      // 쿼리 실행하여 데이터 가져오기
      const q = query(
        collection(db, 'template'),
        where('userId', '==', userUid),
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

      console.log(initialDocuments);
      // 가공된 데이터를 상태에 업데이트
      setBlocks(initialDocuments);
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <R.Container>
      <R.Contents>
        <p>예약 서비스 이름</p>
        <input
          placeholder={blockId ? '' : '예약 서비스'}
          defaultValue={blockId ? selectedBlock.title : title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <p>예약 상세설명</p>
        <textarea
          placeholder={blockId ? '' : '상세 설명을 입력해주세요'}
          defaultValue={blockId ? selectedBlock.description : description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <p>이미지를 추가해 주세요</p>
        {reservationImage ? (
          <label htmlFor="imageInput">이미지 수정하기</label>
        ) : (
          <label htmlFor="imageInput">이미지 추가 +</label>
        )}
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
          placeholder={blockId ? '' : '모집 인원을 선택해주세요'}
          defaultValue={blockId ? selectedBlock.numberOfPeople : numberOfPeople}
          onChange={(e) => {
            setNumberOfPeople(e.target.value);
          }}
        />
        <p>시작 날짜 선택</p>
        <Space id="period" direction="vertical" size={12}>
          {/* <DatePicker
            defaultValue={blockId ? dayjs(selectedBlock.pickDate) : undefined}
            disabledDate={disabledDate}
            onChange={datePickInput}
            popupClassName="datePickerPopup"
          /> */}
          <DatePicker defaultValue={moment('2023-09-01', 'YYYY-MM-DD')} />
        </Space>
        <p>모집 기간 선택</p>
        <Space id="period" direction="vertical" size={12}>
          <RangePicker
            defaultValue={
              blockId
                ? [dayjs(selectedBlock.startDate), dayjs(selectedBlock.endDate)]
                : undefined
            }
            onChange={periodPickInput}
            disabledDate={disabledDate}
            style={{ width: '100%' }}
            popupClassName="periodPickerPopup"
          />
        </Space>{' '}
        {blockId ? (
          <button
            onClick={() => {
              editButtonClick();
            }}
          >
            수정하기
          </button>
        ) : (
          <button
            onClick={() => {
              addButtonClick();
            }}
          >
            저장하기
          </button>
        )}
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
