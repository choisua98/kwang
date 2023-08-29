import React, { useEffect, useState } from 'react';
import { B } from './BannerImage.styles';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../../../firebase/firebaseConfig';
import { styled } from 'styled-components';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { bannerImageAtom } from '../../../../atoms/Atom';
import { useAtom } from 'jotai';

const BannerImage = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [bannerImage, setBannerImage] = useAtom(bannerImageAtom);
  const [selectedImage, setSelectedImage] = useState(null);

  const addButtonClick = async () => {
    try {
      // Firebase에 이미지 업로드
      if (selectedImage) {
        const imageRef = ref(storage, `bannerImages/${user.uid}/bannerimage`);
        await uploadBytes(imageRef, selectedImage);
        const imageURL = await getDownloadURL(imageRef);
        setBannerImage(imageURL);
        return imageURL;
      }
      return null;
    } catch (error) {
      console.error('업데이트 실패', error);
      return null;
    }
  };

  // firebase에서 데이터 불러오기
  const fetchData = async () => {
    // 이미지 URL 가져오기
    const imageRef = ref(storage, `bannerImages/${user.uid}/bannerimage`);
    try {
      const imageUrl = await getDownloadURL(imageRef);
      setBannerImage(imageUrl);
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

  const onChangeImgaeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setBannerImage(URL.createObjectURL(file));
      // setUpdatedImage(defaultProfileImage); // 이미지 변경 시 갱신
    }
  };

  return (
    <B.Container>
      <B.Title>
        <p>배너 이미지 추가하기</p>
      </B.Title>
      <B.Contents>
        <p>이미지를 추가해 주세요</p>
        {bannerImage ? (
          <label htmlFor="imageInput">이미지 수정하기</label>
        ) : (
          <label htmlFor="imageInput">이미지 추가 +</label>
        )}

        {bannerImage ? <PreviewImage src={bannerImage} /> : ''}

        <input
          id="imageInput"
          type="file"
          style={{ display: 'none' }}
          onChange={onChangeImgaeFile}
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
