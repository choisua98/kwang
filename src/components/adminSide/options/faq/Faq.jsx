import React, { useState } from 'react';
import { F } from './Faq.styles';
import { useNavigate } from 'react-router-dom';
import useInput from '../../../../hooks/useInput';
import { auth, db } from '../../../../firebase/firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const Faq = () => {
  const navigate = useNavigate();
  const [question, handleQuestionChange, resetQuestion] = useInput();
  const [answer, handleAnswerChange, resetAuswer] = useInput();

  const [faqList, setFaqList] = useState([]);

  const handleAddFaqButtonClick = () => {
    const newFaq = { question, answer };
    setFaqList((prev) => [...prev, newFaq]);

    resetQuestion();
    resetAuswer();
  };

  const handleAddButtonClick = async (e) => {
    e.preventDefault();

    // 사용자 UID 가져오기
    const userUid = auth.currentUser?.uid;

    if (!userUid) {
      alert('작업을 위해 로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }

    // faqList에 있는 모든 데이터를 Firestore에 추가
    for (const faq of faqList) {
      await addDoc(collection(db, 'template'), {
        question: faq.question,
        answer: faq.answer,
        blockKind: 'faq',
        createdAt: serverTimestamp(),
        userId: userUid,
      });
    }

    alert('저장 완료!');
    navigate('/admin');
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
        />

        <label>답변 입력</label>
        <textarea
          name="answer"
          type="text"
          placeholder="답변을 작성해 주세요"
          value={answer}
          onChange={handleAnswerChange}
        />
        <button type="button" onClick={handleAddFaqButtonClick}>
          질문 추가하기
        </button>
        <button type="submit">저장하기</button>
      </F.Container>
    </>
  );
};

export default Faq;
