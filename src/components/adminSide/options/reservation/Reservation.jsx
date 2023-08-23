import React, { useState } from 'react';
import { R } from './Reservation.styles';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig';

const Reservation = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const swtichToggle = () => {
    setToggle(!toggle);
  };

  const addButtonClick = async (e) => {
    e.preventDefault();

    // Firestore에 데이터 추가
    await addDoc(collection(db, 'fanletter'), {
      title,
      description,
      blockKind: 'reservation',
      // createdAt: serverTimestamp(),
      // userId: userDocSnapshot.id,
    });
    alert('데이터가 추가되었습니다.');
  };

  return (
    <R.Container>
      <R.Title>
        <input
          placeholder="예약 서비스"
          value={title}
          ongitChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button onClick={swtichToggle}>{toggle === true ? '⌄' : '--'}</button>
      </R.Title>
      {toggle && (
        <R.Contents>
          <p>예약 서비스 설명</p>
          <input
            placeholder="예약 서비스에 대한 간략한 설명을 작성해 주세요"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </R.Contents>
      )}
      <button
        onClick={() => {
          addButtonClick();
          navigate('/admin');
        }}
      >
        저장하기
      </button>
    </R.Container>
  );
};

export default Reservation;
