import React, { useEffect, useState } from 'react';
import { M } from './MailingService.styles';
import {
  query,
  collection,
  where,
  orderBy,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { useNavigate, useParams } from 'react-router-dom';

const MailingService = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { uid } = useParams();
  const userUid = uid;

  useEffect(() => {
    // firebase에서 데이터 불러오기
    const fetchData = async (userUid) => {
      if (userUid) {
        // Firestore에서 유저에 해당하는 데이터를 가져오기 위한 쿼리 생성
        try {
          // 쿼리 실행하여 데이터 가져오기
          const q = query(
            collection(db, 'template'),
            where('userId', '==', userUid),
            where('blockKind', '==', 'mailing'),
            orderBy('createdAt'),
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const firstDocument = querySnapshot.docs[0]; // 첫 번째 문서를 가져옴
            const data = firstDocument.data();
            setTitle(data?.title);
            setDesc(data?.description);
          }
        } catch (error) {
          console.error('데이터 가져오기 오류:', error);
        }
      }
    };
    fetchData(userUid);
  }, [userUid]);

  const submitButtonClick = async (e) => {
    e.preventDefault();
    try {
      // Firestore에 데이터 추가
      await addDoc(collection(db, 'userTemplate'), {
        dataKind: 'mailingData',
        name,
        phoneNumber,
        email,
        createdAt: serverTimestamp(),
        userId: userUid,
      });

      alert('신청 완료!');
      navigate(-1);
    } catch (error) {
      console.error('저장 중 오류 발생:', error.message);
    }
  };

  return (
    <div>
      <button>＜</button>
      <br />
      <br />
      <div>{title}</div>
      <div>{desc}</div>
      <M.Container>
        <label htmlFor="name">이름</label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
          autoFocus
        />

        <label htmlFor="number">연락처</label>
        <input
          id="number"
          name="number"
          type="tel"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
        />

        <label htmlFor="email">이메일</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />

        <button type="submit" onClick={submitButtonClick}>
          신청하기
        </button>
      </M.Container>
    </div>
  );
};

export default MailingService;
