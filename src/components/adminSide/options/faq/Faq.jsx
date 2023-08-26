import React, { useEffect, useState } from 'react';
import { F } from './Faq.styles';
import { useLocation, useNavigate } from 'react-router-dom';
import useInput from '../../../../hooks/UseInput';
import { nanoid } from 'nanoid';
import { auth, db } from '../../../../firebase/firebaseConfig';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { useAtom } from 'jotai';
import { blocksAtom } from '../../../../atoms/Atom';

const Faq = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 질문과 답변에 대한 상태 및 상태 변경 함수 설정
  const [title, handleTitleChange] = useInput();
  const [question, handleQuestionChange, resetQuestion] = useInput();
  const [answer, handleAnswerChange, resetAuswer] = useInput();

  // FAQ 리스트를 관리하는 상태 설정
  const [faqList, setFaqList] = useState([]);

  // 현재 블록 ID 가져오기
  const blockId = location.state ? location.state.blocksId : null;

  // 전역 상태에서 블록 정보 가져오기
  const [blocks] = useAtom(blocksAtom);

  // blocks 배열에서 선택된 블록 찾기
  const selectedBlock = blocks.find((block) => block.id === blockId);

  useEffect(() => {
    // 만약 현재 블록 ID가 존재한다면 (수정 모드일 때)
    if (blockId) {
      if (selectedBlock) {
        setFaqList(selectedBlock.faqs);
      }
    }
  }, [blockId, blocks]);

  // "질문 추가하기" 버튼 클릭 시 실행되는 함수
  const handleAddFaqButtonClick = () => {
    // 새로운 FAQ 객체 생성
    const newFaq = { faqId: nanoid(), question, answer };

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

    // Firestore에 데이터 추가
    await addDoc(collection(db, 'template'), {
      title,
      faqs: faqList,
      blockKind: 'faq',
      createdAt: serverTimestamp(),
      userId: userUid,
    });

    // 저장 완료 알림 후 어드민 페이지로 이동
    alert('저장 완료!');
    navigate('/admin');
  };

  // "수정하기" 버튼 클릭 시 실행되는 함수
  const handleEditButtonClick = async (e) => {
    e.preventDefault();

    // Firestore에 데이터 업로드
    const docRef = doc(db, 'template', blockId);
    await updateDoc(docRef, {
      title,
      faqs: faqList,
      createdAt: serverTimestamp(),
    });

    // 수정 완료 알림 후 어드민 페이지로 이동
    alert('수정 완료!');
    navigate('/admin');
  };

  // FAQ 삭제 버튼 클릭 시 호출되는 함수
  const handleDeleteFaqButtonClick = async (faqId) => {
    const docRef = doc(db, 'template', blockId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();

      // 삭제할 faqId를 제외한 나머지 FAQ 목록 필터링
      const updatedFaqs = data.faqs.filter((faq) => faq.faqId !== faqId);

      // faqs 필드를 업데이트하여 해당 faqId를 삭제한 상태로 업데이트
      await updateDoc(docRef, { faqs: updatedFaqs });

      // 삭제한 항목을 제외한 새로운 FAQ 목록 생성
      const updatedFaqList = faqList.filter((faq) => faq.faqId !== faqId);

      // FAQ 목록 상태 업데이트
      setFaqList(updatedFaqList);
    } else {
      console.error('문서가 존재하지 않습니다.');
    }
  };

  // 추가한 FAQ 항목 삭제 시 호출되는 함수
  const handleDeleteAddedFaq = (faqId) => {
    // 삭제한 항목을 제외한 새로운 FAQ 목록 생성
    const updatedFaqList = faqList.filter((faq) => faq.faqId !== faqId);

    // FAQ 목록 상태 업데이트
    setFaqList(updatedFaqList);
  };

  return (
    <F.Container
      onSubmit={blockId ? handleEditButtonClick : handleAddButtonClick}
    >
      <label htmlFor="title">자주묻는 질문 이름</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder={blockId ? '' : '자주 묻는 질문'}
        defaultValue={blockId ? selectedBlock.title : title}
        onChange={handleTitleChange}
        autoFocus
      />

      <F.FaqList>
        {faqList.map((faq) => {
          return (
            <div key={faq.faqId}>
              <p>질문: {faq.question}</p>
              <p>답변: {faq.answer}</p>
              <button
                onClick={
                  blockId
                    ? () => handleDeleteFaqButtonClick(faq.faqId)
                    : () => handleDeleteAddedFaq(faq.faqId)
                }
              >
                삭제
              </button>
            </div>
          );
        })}
      </F.FaqList>

      <label htmlFor="question">질문 입력</label>
      <input
        id="question"
        name="question"
        type="text"
        placeholder="질문을 입력해 주세요"
        value={question}
        onChange={handleQuestionChange}
        autoFocus
      />

      <label htmlFor="answer">답변 입력</label>
      <textarea
        id="answer"
        name="answer"
        type="text"
        placeholder="답변을 작성해 주세요"
        value={answer}
        onChange={handleAnswerChange}
      />
      <button type="button" onClick={handleAddFaqButtonClick}>
        질문 추가하기
      </button>
      <button type="submit">{blockId ? '수정하기' : '저장하기'}</button>
    </F.Container>
  );
};

export default Faq;
