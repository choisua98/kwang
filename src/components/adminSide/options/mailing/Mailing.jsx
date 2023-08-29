import React from 'react';
import { M } from './Mailing.styles';
import { useNavigate, useLocation } from 'react-router-dom';
import useInput from '../../../../hooks/useInput';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../../../../firebase/firebaseConfig';
import { useAtom } from 'jotai';
import { blocksAtom } from '../../../../atoms/Atom';

const Mailing = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 블록 ID 가져오기
  const blockId = location.state ? location.state.blocksId : null;

  // 전역 상태에서 블록 정보 가져오기
  const [blocks] = useAtom(blocksAtom);
  const selectedBlock = blocks.find((block) => block.id === blockId) || '';

  // 제목과 설명에 대한 상태 및 상태 변경 함수 설정
  const [title, handleTitleChange] = useInput(selectedBlock?.title);
  const [description, handleDescriptionChange] = useInput(
    selectedBlock?.description,
  );

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
      await addDoc(collection(db, 'template'), {
        title,
        description,
        blockKind: 'mailing',
        createdAt: serverTimestamp(),
        userId: userUid,
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
      });
      // 수정 완료 알림 후 어드민 페이지로 이동
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
    <M.Container
      onSubmit={blockId ? handleEditButtonClick : handleAddButtonClick}
    >
      <label htmlFor="title">서비스 이름 변경하기</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="메일링 서비스"
        value={title}
        onChange={handleTitleChange}
        autoFocus
      />

      <label htmlFor="description">메일링 서비스에 대한 간략한 설명</label>
      <textarea
        id="description"
        name="description"
        type="text"
        placeholder="설명을 작성해 주세요"
        value={description}
        onChange={handleDescriptionChange}
      />
      <button type="submit">{blockId ? '수정하기' : '저장하기'}</button>
      <button type="button" onClick={() => handleRemoveButtonClick(blockId)}>
        삭제하기
      </button>
    </M.Container>
  );
};

export default Mailing;
