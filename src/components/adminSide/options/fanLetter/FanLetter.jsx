import React, { useEffect, useState } from 'react';
import { F } from './FanLetter.styles';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const FanLetter = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addButtonClick = async (e) => {
    e.preventDefault();

    // Firestore에 데이터 추가
    await addDoc(collection(db, 'template'), {
      title,
      description,
      blockKind: 'fanletter',
      userId: '1',
    });
    navigate('/admin');
  };

  return (
    <F.Container onSubmit={addButtonClick}>
      <F.Title>
        <input
          name="title"
          type="text"
          placeholder="팬레터"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </F.Title>
      <F.Contents>
        <p>팬레터 설명을 작성해 주세요</p>
        <input
          name="description"
          type="text"
          placeholder="설명을 작성해 주세요"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button type="submit">저장하기</button>
      </F.Contents>
    </F.Container>
  );
};

export default FanLetter;
