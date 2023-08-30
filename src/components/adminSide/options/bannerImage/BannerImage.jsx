import React, { useEffect, useState } from 'react';
import { B } from './BannerImage.styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { db, storage } from '../../../../firebase/firebaseConfig';
import { styled } from 'styled-components';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { bannerImageAtom, blocksAtom } from '../../../../atoms/Atom';
import { useAtom } from 'jotai';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

const BannerImage = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const location = useLocation();
  // const [bannerImage, setBannerImage] = useAtom(bannerImageAtom);

  const [selectedImage, setSelectedImage] = useState(null);
  const blockId = location.state ? location.state.blocksId : null;
  const [blocks] = useAtom(blocksAtom);
  const selectedBlock = blocks.find((block) => block.id === blockId) || '';
  const userUid = auth.currentUser?.uid;

  const [image, setImage] = useState(selectedBlock?.imageURL);

  const addButtonClick = async () => {
    try {
      // Firebase에 이미지 업로드
      if (selectedImage) {
        const imageRef = ref(storage, `bannerImages/${user.uid}/bannerimage`);
        await uploadBytes(imageRef, selectedImage);
        const imageURL = await getDownloadURL(imageRef);
        setImage(imageURL);

        await addDoc(collection(db, 'template'), {
          imageURL: imageURL,
          blockKind: 'bannerimage',
          createdAt: serverTimestamp(),
          userId: userUid,
        });

        alert('저장 완료!');
        navigate('/admin');
      }
      return null;
    } catch (error) {
      console.error('업데이트 실패', error);
      return null;
    }
  };

  const editButtonClick = async (e) => {
    e.preventDefault();

    try {
      const imageRef = ref(storage, `bannerImages/${user.uid}/bannerimage`);
      await uploadBytes(imageRef, selectedImage);
      const imageURL = await getDownloadURL(imageRef);
      setImage(imageURL);
      // Firestore에 데이터 업로드
      const docRef = doc(db, 'template', blockId);
      await updateDoc(docRef, {
        imageURL: imageURL,
        blockKind: 'bannerimage',
        createdAt: serverTimestamp(),
        userId: userUid,
      });

      alert('수정 완료!');
      navigate('/admin');
    } catch (error) {
      console.error('수정 중 오류 발생:', error.message);
    }
  };

  // // firebase에서 데이터 불러오기
  // const fetchData = async () => {
  //   // 이미지 URL 가져오기
  //   const imageRef = ref(storage, `bannerImages/${user.uid}/bannerimage`);
  //   try {
  //     const imageUrl = await getDownloadURL(imageRef);
  //     setImage(imageUrl);
  //   } catch (error) {
  //     console.error('프로필 이미지 업데이트 실패:', error);
  //   }
  // };

  // // 컴포넌트 마운트 시 데이터 가져오기 함수 호출
  // useEffect(() => {
  //   if (user) {
  //     fetchData();
  //   }
  // }, [user]);

  const onChangeImgaeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImage(URL.createObjectURL(file));
    }
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
    <B.Container>
      <B.Title>
        <p>배너 이미지 추가하기</p>
      </B.Title>
      <B.Contents>
        <p>이미지를 추가해 주세요</p>
        {image ? (
          <label htmlFor="imageInput">이미지 수정하기</label>
        ) : (
          <label htmlFor="imageInput">이미지 추가 +</label>
        )}

        {image ? <PreviewImage src={image} /> : ''}

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
        <button type="button" onClick={() => handleRemoveButtonClick(blockId)}>
          삭제하기
        </button>
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
