import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { C } from './Challenge.styles';
import useInput from '../../../../hooks/useInput';
import { useAtom } from 'jotai';
import { blocksAtom } from '../../../../atoms/Atom';
import { auth, db, storage } from '../../../../firebase/firebaseConfig';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

// ant Design
import { CameraOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Modal, Space } from 'antd';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

// 오늘 이전의 날짜는 선택 불가능하도록 설정하는 함수
const disabledDate = (current) => {
  return current && current < dayjs().endOf('day');
};

const Challenge = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [title, handleTitleChange] = useInput();
  const [description, handleDescriptionChange] = useInput();

  // 현재 블록 ID 가져오기
  const blockId = location.state ? location.state.blocksId : null;

  // 전역 상태에서 블록 정보 가져오기
  const [blocks] = useAtom(blocksAtom);

  // blocks 배열에서 선택된 블록 찾기
  const selectedBlock = blocks.find((block) => block.id === blockId);

  // 실제로 업로드한 이미지 정보를 저장하는 배열
  const [uploadedImages, setUploadedImages] = useState([]);

  // 최대 업로드 가능한 이미지 개수
  const maxUploads = 4;

  useEffect(() => {
    if (blockId) {
      // 이미지 데이터를 가져와서 업로드된 이미지 배열을 초기화
      const initialImages = selectedBlock.images || [];
      setUploadedImages(initialImages);
    }
  }, [blockId, selectedBlock]);

  // 이미지 업로드 시 실행되는 함수
  const handleImageChange = (e) => {
    if (uploadedImages.length >= maxUploads) {
      // 이미지 개수가 최대 개수에 도달한 경우 모달 창을 띄워 알림 표시
      Modal.info({
        content: `이미지는 최대 ${maxUploads}장까지 첨부할 수 있어요.`,
      });
      return;
    }

    const file = e.target.files[0];

    if (file) {
      setUploadedImages([...uploadedImages, file]);
    }
  };

  // 이미지 수정을 위한 클릭 핸들러 함수
  const handleEditImageClick = (index) => (e) => {
    const newImageFile = e.target.files[0];

    if (newImageFile) {
      // 업데이트된 이미지 배열을 생성하고, 기존 이미지를 교체
      const updatedImages = [...uploadedImages];
      updatedImages[index] = newImageFile;

      setUploadedImages(updatedImages);
    }
  };

  // "저장하기" 버튼 클릭 시 실행되는 함수
  const handleAddButtonClick = async (e) => {
    e.preventDefault();

    // 사용자 UID 가져오기
    const userUid = auth.currentUser?.uid;

    if (!userUid) {
      alert('작업을 위해 로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }

    try {
      // Firestore에 데이터 추가
      const docRef = await addDoc(collection(db, 'template'), {
        title,
        description,
        blockKind: 'challenge',
        createdAt: serverTimestamp(),
        userId: userUid,
      });

      // 저장된 문서의 ID 가져오기
      const docId = docRef.id;

      // 이미지 업로드 및 URL 저장
      const imageUrls = [];
      for (const imageFile of uploadedImages) {
        const imageRef = ref(
          storage,
          `callengeImages/${docId}/${imageFile.name}`,
        );
        await uploadBytes(imageRef, imageFile);
        const imageUrl = await getDownloadURL(imageRef);
        imageUrls.push(imageUrl);
      }

      // 이미지 URL들을 Firestore 문서에 업데이트
      await updateDoc(docRef, {
        images: imageUrls,
      });

      // 저장 완료 알림 후 어드민 페이지로 이동
      alert('저장 완료!');
      navigate('/admin');
    } catch (error) {
      console.error('저장 중 오류 발생:', error.message);
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
        createdAt: serverTimestamp(),
      });

      // 이미지 업로드 및 URL 저장
      const imageUrls = [];
      for (const imageFile of uploadedImages) {
        const imageRef = ref(
          storage,
          `callengeImages/${blockId}/${imageFile.name}`,
        );
        await uploadBytes(imageRef, imageFile);
        const imageUrl = await getDownloadURL(imageRef);
        imageUrls.push(imageUrl);
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

  return (
    <C.Container
      onSubmit={blockId ? handleEditButtonClick : handleAddButtonClick}
    >
      <label htmlFor="title">함께해요 챌린지 이름</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder={blockId ? '' : '함께해요 챌린지 🔥'}
        defaultValue={blockId ? selectedBlock.title : title}
        onChange={handleTitleChange}
        autoFocus
      />

      <C.ImageContainer>
        <label htmlFor="imageInput">
          <CameraOutlined style={{ fontSize: '30px' }} />
          <span>{`${uploadedImages.length} / ${maxUploads}`}</span>
        </label>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {uploadedImages.map((image, index) => (
          <label
            key={index}
            className="square-preview"
            style={{
              backgroundImage: `url(${
                typeof image === 'string' ? image : URL.createObjectURL(image)
              })`,
            }}
          >
            <input
              id={`editImageInput-${index}`}
              type="file"
              accept="image/*"
              onChange={handleEditImageClick(index)}
            />
          </label>
        ))}
      </C.ImageContainer>

      <label htmlFor="description">챌린지 상세설명</label>
      <textarea
        id="description"
        name="description"
        type="text"
        placeholder={blockId ? '' : '사진과 글을 추가해 챌린지를 소개해보세요.'}
        defaultValue={blockId ? selectedBlock.description : description}
        onChange={handleDescriptionChange}
      />

      <label htmlFor="period">챌린지 기간</label>
      <Space id="period" direction="vertical" size={12}>
        <RangePicker
          disabledDate={disabledDate}
          style={{ width: '100%' }}
          popupClassName="customRangePickerPopup"
        />
      </Space>

      <button type="submit">{blockId ? '수정하기' : '저장하기'}</button>
    </C.Container>
  );
};

export default Challenge;
