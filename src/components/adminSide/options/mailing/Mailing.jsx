import React, { useState } from 'react';
import { M } from './Mailing.styles';
import useInput from '../../../../hooks/useInput';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../../../../firebase/firebaseConfig';

const Mailing = () => {
  const [toggle, setToggle] = useState(true);
  const [title, handleTitleChange] = useInput();
  const [content, handleContentChange] = useInput();

  const handleAddButtonClick = async (e) => {
    e.preventDefault();

    // Firestore에 데이터 추가
    await addDoc(collection(db, 'template'), {
      title,
      content,
      optionKind: 'mailing',
      createdAt: serverTimestamp(),
      // userId: userDocSnapshot.id,
    });
    console.log('데이터가 추가되었습니다.');
  };

  const swtichToggle = () => {
    setToggle(!toggle);
  };

  return (
    <M.Container>
      <M.Title>
        <input
          name="title"
          type="text"
          placeholder="메일링 서비스"
          value={title}
          onChange={handleTitleChange}
        />
        <button onClick={swtichToggle}>{toggle === true ? '⌄' : '--'}</button>
      </M.Title>
      {toggle && (
        <M.ContentForm onSubmit={handleAddButtonClick}>
          <p>메일링 서비스에 대한 간략한 설명을 작성해 주세요.</p>
          <input
            name="content"
            type="text"
            placeholder="설명을 작성해 주세요"
            value={content}
            onChange={handleContentChange}
          />
          <button type="submit">저장하기</button>
        </M.ContentForm>
      )}
    </M.Container>
  );
};

export default Mailing;
