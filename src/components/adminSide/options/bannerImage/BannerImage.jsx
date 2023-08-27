import React, { useEffect, useState } from 'react';
import { B } from './BannerImage.styles';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../../../firebase/firebaseConfig';
import { styled } from 'styled-components';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { bannerImageAtom, userAtom } from '../../../../atoms/Atom';
import { useAtom, useAtomValue } from 'jotai';

const BannerImage = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const userUid = user?.uid;
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useAtom(bannerImageAtom);
  const [selectedImage, setSelectedImage] = useState(null);

  const addButtonClick = async () => {
    try {
      // 이전 이미지 삭제
      if (previewImage) {
        const previousImageRef = ref(
          storage,
          `bannerImages/${user.uid}/bannerimage`,
        );
        await deleteObject(previousImageRef);
      }

      // Firebase에 이미지 업로드
      if (selectedImage) {
        const imageRef = ref(storage, `bannerImages/${user.uid}/bannerimage`);
        await uploadBytes(imageRef, selectedImage);
        const imageURL = await getDownloadURL(imageRef);
        setPreviewImage(imageURL);
      }

      alert('데이터가 추가되었습니다.');
    } catch (error) {
      console.error('업데이트 실패', error);
    }
  };

  // firebase에서 데이터 불러오기
  const fetchData = async () => {
    // 이미지 URL 가져오기
    const imageRef = ref(storage, `bannerImages/${userUid}/bannerimage`);
    try {
      const imageUrl = await getDownloadURL(imageRef);
      setPreviewImage(imageUrl);
    } catch (error) {
      console.error('프로필 이미지 업데이트 실패:', error);
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기 함수 호출
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <B.Container>
      <B.Title>
        <p>배너 이미지 추가하기</p>
      </B.Title>
      <B.Contents>
        <p>이미지를 추가해 주세요</p>
        <label htmlFor="imageInput">이미지 추가 +</label>
        {previewImage ? <PreviewImage src={previewImage} /> : ''}

        <input
          id="imageInput"
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setSelectedImage(file);
              setPreviewImage(URL.createObjectURL(file));
            }
          }}
        />
        <button
          type="submit"
          onClick={() => {
            addButtonClick();
            navigate('/admin');
          }}
        >
          저장하기
        </button>
        <button>삭제하기</button>
      </B.Contents>
    </B.Container>
  );
};

export default BannerImage;

const PreviewImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover; // 이미지가 잘리지 않도록 설정
  background-color: #d6d6d6;
`;
