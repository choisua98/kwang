import React, { useEffect, useState } from 'react';
import { F } from './FanLetter.styles';
import {
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../../../firebase/firebaseConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAtom, useAtomValue } from 'jotai';
import { blocksAtom, userAtom } from '../../../../atoms/Atom';

const FanLetter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Jotai에서 유저 정보 가져오기
  const user = useAtomValue(userAtom);

  // 유저의 UID 가져오기
  const userUid = auth.currentUser?.uid;

  const blockId = location.state ? location.state.blocksId : null;
  const [blocks, setBlocks] = useAtom(blocksAtom);
  const selectedBlock = blocks.find((block) => block.id === blockId) || '';

  const addButtonClick = async (e) => {
    e.preventDefault();

    if (!userUid) {
      alert('작업을 위해 로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }

    // Firestore에 데이터 추가
    await addDoc(collection(db, 'template'), {
      title,
      description,
      blockKind: 'fanletter',
      createdAt: serverTimestamp(),
      userId: userUid,
    });
    navigate('/admin');
  };

  const editButtonClick = async (e) => {
    e.preventDefault();

    // Firestore에 데이터 업로드
    const docRef = doc(db, 'template', blockId);
    await updateDoc(docRef, {
      title,
      description,
    });
    navigate('/admin');
  };

  // firebase에서 데이터 불러오기
  const fetchData = async () => {
    try {
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
    <F.Container onSubmit={blockId ? editButtonClick : addButtonClick}>
      <F.Contents>
        <p>팬레터 서비스 이름</p>
        <input
          name="title"
          type="text"
          placeholder={blockId ? '' : '팬레터'}
          defaultValue={blockId ? selectedBlock.title : title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <p>팬레터 설명을 작성해 주세요</p>
        <input
          name="description"
          type="text"
          placeholder={blockId ? '' : '설명을 작성해 주세요'}
          defaultValue={blockId ? selectedBlock.description : description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button type="submit">{blockId ? '수정하기' : '저장하기'}</button>
      </F.Contents>
    </F.Container>
  );
};

export default FanLetter;
