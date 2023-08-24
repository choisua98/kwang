import React from 'react';
import { M } from './Mailing.styles';
import { useNavigate, useLocation } from 'react-router-dom';
import useInput from '../../../../hooks/useInput';
import {
  addDoc,
  collection,
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

  // 제목과 설명에 대한 상태 및 상태 변경 함수 설정
  const [title, handleTitleChange] = useInput();
  const [description, handleDescriptionChange] = useInput();

  // 현재 블록 ID 가져오기
  const blockId = location.state ? location.state.blocksId : null;

  // 전역 상태에서 블록 정보 가져오기
  const [blocks] = useAtom(blocksAtom);
  const selectedBlock = blocks.find((block) => block.id === blockId) || '';

  // "저장하기" 버튼을 누를 때 실행되는 함수
  const handleAddButtonClick = async (e) => {
    e.preventDefault();

    // 사용자 UID 가져오기
    const userUid = auth.currentUser?.uid;

    if (!userUid) {
      alert('작업을 위해 로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }

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
  };

  const handleEditButtonClick = async (e) => {
    e.preventDefault();

    // Firestore에 데이터 업로드
    const docRef = doc(db, 'template', blockId);
    await updateDoc(docRef, {
      title,
      description,
    });
    navigate('/admin');
  };

  return (
    <M.Container
      onSubmit={blockId ? handleEditButtonClick : handleAddButtonClick}
    >
      <label>서비스 이름 변경하기</label>
      <input
        name="title"
        type="text"
        placeholder={blockId ? '' : '메일링 서비스'}
        defaultValue={blockId ? selectedBlock.title : title}
        onChange={handleTitleChange}
        autoFocus
        required
      />

      <label>메일링 서비스에 대한 간략한 설명</label>
      <textarea
        name="description"
        type="text"
        placeholder={blockId ? '' : '설명을 작성해 주세요'}
        defaultValue={blockId ? selectedBlock.description : description}
        onChange={handleDescriptionChange}
        required
      />
      <button type="submit">{blockId ? '수정하기' : '저장하기'}</button>
    </M.Container>
  );
};

export default Mailing;
