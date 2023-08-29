import React, { useEffect, useState } from 'react';
import { R } from './Reservation.styles';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Timestamp,
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
import { auth, db, storage } from '../../../../firebase/firebaseConfig';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Space } from 'antd';
import {
  blocksAtom,
  reservationImageAtom,
  userAtom,
} from '../../../../atoms/Atom';
import { useAtom, useAtomValue } from 'jotai';
import { styled } from 'styled-components';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
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

  const userUid = auth.currentUser?.uid;

  const blockId = location.state ? location.state.blocksId : null;
  const [blocks] = useAtom(blocksAtom);
  const selectedBlock = blocks.find((block) => block.id === blockId) || '';

  const [title, setTitle] = useState(selectedBlock?.title);
  const [description, setDescription] = useState(selectedBlock?.description);
  const [titleCount, setTitleCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [numberOfPeople, setNumberOfPeople] = useState(
    selectedBlock?.numberOfPeople,
  );
  const [pickDate, setPickDate] = useState(
    selectedBlock ? selectedBlock?.pickDate : '',
  );
  const [startDate, setStartDate] = useState(
    selectedBlock ? selectedBlock?.startDate : '',
  );
  const [endDate, setEndDate] = useState(
    selectedBlock ? selectedBlock?.endDate : '',
  );

  const [reservationImage, setReservationImage] = useAtom(reservationImageAtom);
  const [selectedImage, setSelectedImage] = useState(null);

  // 저장 버튼
  const handleAddButtonClick = async (e) => {
    e.preventDefault();

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
      const imageRef = ref(storage, `reservationImages/${userUid}/image`);
      await uploadBytes(imageRef, selectedImage);
      const imageURL = await getDownloadURL(imageRef);
      setReservationImage(imageURL);
      alert('데이터가 추가되었습니다.');
      navigate('/admin');
    } catch (error) {
      console.error('저장 실패', error);
    }
  };

  // "수정하기" 버튼 클릭 시 실행되는 함수
  const handleEditButtonClick = async (e) => {
    e.preventDefault();

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
        createdAt: serverTimestamp(),
      });

      // 이미지 업로드 및 URL 저장
      const imageUrls = [];
      for (const imageFile of reservationImage) {
        if (typeof imageFile === 'string') {
          imageUrls.push(imageFile);
        } else {
          const imageRef = ref(
            storage,
            `reservationImages/${blockId}/${imageFile.name}`,
          );
          await uploadBytes(imageRef, imageFile);
          const imageUrl = await getDownloadURL(imageRef);
          imageUrls.push(imageUrl);
        }
      }

      // 이미지 URL들을 Firestore 문서에 업데이트
      await updateDoc(docRef, {
        images: imageUrls,
      });

      // 수정 완료 알림 후 어드민 페이지로 이동
      alert('수정 완료!');
      navigate('/admin');
    } catch (error) {
      console.error('수정 중 오류 발생:', error.message);
    }
  };

  const datePickInput = (_, dateString) => {
    setPickDate(dateString);
  };

  const periodPickInput = (_, dateString) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };

  // "삭제하기" 버튼 클릭 시 실행되는 함수
  const handleRemoveButtonClick = async (id) => {
    const shouldDelete = window.confirm('정말 삭제하시겠습니까?');
    if (shouldDelete) {
      try {
        // 사용자 확인 후 삭제 작업 진행
        await deleteDoc(doc(db, 'template', id));
        alert('삭제 완료!');
        navigate('/admin');
      } catch (error) {
        console.error('삭제 중 오류 발생:', error.message);
      }
    }
  };

  return (
    <R.Container
      onSubmit={blockId ? handleEditButtonClick : handleAddButtonClick}
    >
      <label>예약 서비스 이름</label>
      <p>{titleCount}/20자</p>
      <input
        placeholder={'예약 서비스'}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setTitleCount(e.target.value.length);
        }}
        maxLength={20}
        autoFocus
      />
      <label>예약 상세설명</label>
      <p>{descriptionCount}/50자</p>
      <textarea
        placeholder={'상세 설명을 입력해주세요'}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          setDescriptionCount(e.target.value.length);
        }}
        maxLength={50}
      />
      <label>이미지를 추가해 주세요</label>
      {reservationImage ? (
        <h3 htmlFor="imageInput">이미지 수정하기</h3>
      ) : (
        <h3 htmlFor="imageInput">이미지 추가 +</h3>
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
      <label>모집 인원</label>
      <input
        type="number"
        placeholder={'모집 인원을 선택해주세요'}
        value={numberOfPeople}
        onChange={(e) => {
          setNumberOfPeople(e.target.value);
        }}
      />
      <label>시작 날짜 선택</label>
      <Space id="period" direction="vertical" size={12}>
        <DatePicker
          value={blockId ? dayjs(pickDate) : undefined}
          disabledDate={disabledDate}
          onChange={datePickInput}
          style={{ width: '100%' }}
          popupClassName="datePickerPopup"
        />
      </Space>
      <label>모집 기간 선택</label>
      <Space id="period" direction="vertical" size={12}>
        <RangePicker
          // value={blockId ? moment(pickDate, 'YYYY-MM-DD') : undefined}
          value={
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
      <button type="submit">{blockId ? '수정하기' : '저장하기'}</button>
      <button type="button" onClick={() => handleRemoveButtonClick(blockId)}>
        삭제하기
      </button>
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
