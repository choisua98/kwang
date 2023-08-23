import React from 'react';
import { M } from './Mailing.styles';
import { useNavigate } from 'react-router-dom';
import useInput from '../../../../hooks/useInput';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
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
      alert('사용자가 로그인하지 않았습니다.');
      navigate('/login');
      return;
    }

    // 사용자 UID를 이용하여 문서 경로 만들기
    const userDocPath = `users/${userUid}`;

    // 사용자 문서 조회
    const userDocRef = doc(db, userDocPath);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      console.log('사용자 데이터:', userData);

      // Firestore에 데이터 추가
      await addDoc(collection(db, 'template'), {
        title,
        description,
        blockKind: 'mailing',
        // createdAt: serverTimestamp(),
        userId: userDocSnapshot.id,
      });
      alert('저장 완료!');
      navigate('/admin');
    } else {
      console.log('사용자 데이터가 없습니다');
    }
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
