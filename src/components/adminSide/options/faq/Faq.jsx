import React, { useState } from 'react';
import { F } from './Faq.styles';
import { useNavigate } from 'react-router-dom';
import useInput from '../../../../hooks/useInput';
import { auth, db } from '../../../../firebase/firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const Faq = () => {
  const navigate = useNavigate();

  // 질문과 답변에 대한 상태 및 상태 변경 함수 설정
  const [question, handleQuestionChange, resetQuestion] = useInput();
  const [answer, handleAnswerChange, resetAuswer] = useInput();

  // FAQ 리스트를 관리하는 상태 설정
  const [faqList, setFaqList] = useState([]);

  // "질문 추가하기" 버튼 클릭 시 실행되는 함수
  const handleAddFaqButtonClick = () => {
    // 새로운 FAQ 객체 생성
    const newFaq = { question, answer };

    // faqList 상태 업데이트
    setFaqList((prev) => [...prev, newFaq]);

    // 입력 필드 초기화
    resetQuestion();
    resetAuswer();
  };

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

    // faqList에 있는 데이터를 faqData에 매핑하여 저장
    const faqData = faqList.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    }));

    // Firestore에 데이터 추가
    await addDoc(collection(db, 'template'), {
      faqs: faqData,
      blockKind: 'faq',
      createdAt: serverTimestamp(),
      userId: userUid,
    });

    // 저장 완료 알림 후 어드민 페이지로 이동
    alert('저장 완료!');
    navigate('/admin');
  };

  return (
    <>
      <F.FaqList>
        {faqList.map((faq) => (
          <div key={faq.id}>
            <p>질문: {faq.question}</p>
            <p>답변: {faq.answer}</p>
          </div>
        ))}
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
