import React, { useState } from 'react';
import { F } from './Faq.styles';
import { useNavigate } from 'react-router-dom';
import useInput from '../../../../hooks/useInput';
import { auth, db } from '../../../../firebase/firebaseConfig';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';

const Faq = () => {
  const navigate = useNavigate();
  const [question, handleQuestionChange] = useInput();
  const [answer, handleAnswerChange] = useInput();

  const [faqList, setFaqList] = useState([]);

  const handleAddFaqButtonClick = () => {};

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
        question,
        answer,
        blockKind: 'faq',
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
    <>
      <F.FaqList>
        {faqList.map((faq) => {
          return (
            <div key={faq.id}>
              <p>질문: {faq.question}</p>
              <p>답변: {faq.answer}</p>
            </div>
          );
        })}
      </F.FaqList>
      <F.Container onSubmit={handleAddButtonClick}>
        <label>질문 입력</label>
        <input
          name="question"
          type="text"
          placeholder="질문을 입력해 주세요"
          value={question}
          onChange={handleQuestionChange}
          autoFocus
          required
        />

        <label>답변 입력</label>
        <textarea
          name="answer"
          type="text"
          placeholder="답변을 작성해 주세요"
          value={answer}
          onChange={handleAnswerChange}
          required
        />
        <button onClick={handleAddFaqButtonClick}>질문 추가하기</button>
        <button type="submit">저장하기</button>
      </F.Container>
    </>
  );
};

export default Faq;
