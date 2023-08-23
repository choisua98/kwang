import React, { useState } from 'react';
import { B } from './BannerImage.styles';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig';

const BannerImage = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(true);

  const swtichToggle = () => {
    setToggle(!toggle);
  };

  const addButtonClick = async (e) => {
    e.preventDefault();

    // Firestore에 데이터 추가
    await addDoc(collection(db, 'fanletter'), {
      blockKind: 'bannerimage',
      // createdAt: serverTimestamp(),
      // userId: userDocSnapshot.id,
    });
    alert('데이터가 추가되었습니다.');
  };

  return (
    <B.Container>
      <B.Title>
        <p>배너 이미지 추가하기</p>

        <button onClick={swtichToggle}>{toggle === true ? '⌄' : '--'}</button>
      </B.Title>
      {toggle && (
        <B.Contents>
          <p>이미지를 추가해 주세요</p>
          <button>이미지 추가 +</button>
        </B.Contents>
      )}
      <button
        onClick={() => {
          addButtonClick();
          navigate('/admin');
        }}
      >
        저장하기
      </button>
    </B.Container>
  );
};

export default BannerImage;
