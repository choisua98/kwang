import React from 'react';
import { M } from './Mailing.styles';
import { useNavigate } from 'react-router-dom';
import useInput from '../../../../hooks/useInput';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../../../firebase/firebaseConfig';

const Mailing = () => {
  const navigate = useNavigate();
  const [title, handleTitleChange] = useInput();
  const [description, handleDescriptionChange] = useInput();

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
    alert('저장 완료!');
    navigate('/admin');
  };

  return (
    <M.Container onSubmit={handleAddButtonClick}>
      <label>서비스 이름 변경하기</label>
      <input
        name="title"
        type="text"
        placeholder="메일링 서비스"
        value={title}
        onChange={handleTitleChange}
        autoFocus
        required
      />

      <label>메일링 서비스에 대한 간략한 설명</label>
      <textarea
        name="description"
        type="text"
        placeholder="설명을 작성해 주세요"
        value={description}
        onChange={handleDescriptionChange}
        required
      />
      <button type="submit">저장하기</button>
    </M.Container>
  );
};

export default Mailing;
