import React, { useState } from 'react';
import { F } from './FanLetter.styles';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../../../../firebase/firebaseConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { blocksAtom } from '../../../../atoms/Atom';

const FanLetter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 유저의 UID 가져오기
  const userUid = auth.currentUser?.uid;

  const blockId = location.state ? location.state.blocksId : null;
  const [blocks] = useAtom(blocksAtom);
  const selectedBlock = blocks.find((block) => block.id === blockId) || '';

  const [title, setTitle] = useState(selectedBlock?.title);
  const [description, setDescription] = useState(selectedBlock?.description);

  const addButtonClick = async (e) => {
    e.preventDefault();

    if (!userUid) {
      alert('작업을 위해 로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }

    try {
      // Firestore에 데이터 추가
      await addDoc(collection(db, 'template'), {
        title,
        description,
        blockKind: 'fanletter',
        createdAt: serverTimestamp(),
        userId: userUid,
      });

      alert('저장 완료!');
      navigate('/admin');
    } catch (error) {
      console.error('저장 중 오류 발생:', error.message);
    }
  };

  const editButtonClick = async (e) => {
    e.preventDefault();

    try {
      // Firestore에 데이터 업로드
      const docRef = doc(db, 'template', blockId);
      await updateDoc(docRef, {
        title,
        description,
      });

      alert('수정 완료!');
      navigate('/admin');
    } catch (error) {
      console.error('수정 중 오류 발생:', error.message);
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
    <F.Container onSubmit={blockId ? editButtonClick : addButtonClick}>
      <label htmlFor="title">팬레터 서비스 이름</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="팬레터"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        autoFocus
      />
      <label htmlFor="description">팬레터 설명을 작성해 주세요</label>
      <input
        id="description"
        name="description"
        type="text"
        placeholder="설명을 작성해 주세요"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button type="submit">{blockId ? '수정하기' : '저장하기'}</button>
      <button type="button" onClick={() => handleRemoveButtonClick(blockId)}>
        삭제하기
      </button>
    </F.Container>
  );
};

export default FanLetter;
