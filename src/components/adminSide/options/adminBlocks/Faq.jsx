import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useInput from '../../../../hooks/useInput';
import { nanoid } from 'nanoid';
import { auth, db } from '../../../../firebase/firebaseConfig';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useAtom } from 'jotai';
import { blocksAtom } from '../../../../atoms/Atom';
import { O } from '../Blocks.styles';
import IconFormCheck from '../../../../assets/images/common/icon/icon-Formcheck.png';
import { DeleteOutlined, LeftOutlined } from '@ant-design/icons';

const Faq = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 사용자 UID 가져오기
  const userUid = auth.currentUser?.uid;

  // FAQ 리스트를 관리하는 상태 설정
  const [faqList, setFaqList] = useState([]);

  // 현재 블록 ID 가져오기
  const blockId = location.state ? location.state.blocksId : null;

  // 전역 상태에서 블록 정보 가져오기
  const [blocks] = useAtom(blocksAtom);

  // blocks 배열에서 선택된 블록 찾기
  const selectedBlock = blocks.find((block) => block.id === blockId);

  // 질문과 답변에 대한 상태 및 상태 변경 함수 설정
  const [title, handleTitleChange] = useInput(selectedBlock?.title);
  const [question, handleQuestionChange, resetQuestion] = useInput();
  const [answer, handleAnswerChange, resetAuswer] = useInput();

  const [titleCount, setTitleCount] = useState(0);

  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isQuestionValid, setIsQuestionValid] = useState(false);
  const [isAnswerValid, setIsAnswerValid] = useState(false);

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

    if (!userUid) {
      alert('작업을 위해 로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }

    // Block 정렬을 위해 숫자로 blockId 값 지정
    const querySnapshot = await getDocs(
      query(collection(db, 'template'), where('userId', '==', userUid)),
    );
    let maxNum = 0;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.blockId && typeof data.blockId === 'number') {
        // "id" 값이 숫자이고 "userId"가 userUid와 일치하는 경우만 처리
        maxNum = Math.max(maxNum, data.blockId);
      }
    });
    const blockId = maxNum + 1;

    try {
      // Firestore에 데이터 추가
      await addDoc(collection(db, 'template'), {
        title,
        faqs: faqList,
        blockKind: 'faq',
        blockId: blockId,
        createdAt: serverTimestamp(),
        userId: userUid,
      });

      // 저장 완료 알림 후 어드민 페이지로 이동
      alert('저장 완료!');
      navigate(`/admin/${userUid}`);
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
        faqs: faqList,
      });

      // 수정 완료 알림 후 어드민 페이지로 이동
      alert('수정 완료!');
      navigate(`/admin/${userUid}`);
    } catch (error) {
      console.error('수정 중 오류 발생:', error.message);
    }
  };

  // FAQ 삭제 버튼 클릭 시 호출되는 함수
  const handleDeleteFaqButtonClick = async (faqId) => {
    const shouldDelete = window.confirm('정말 삭제하시겠습니까?');
    if (shouldDelete) {
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
      }
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

  // "삭제하기" 버튼 클릭 시 실행되는 함수
  const handleRemoveButtonClick = async (id) => {
    const shouldDelete = window.confirm('정말 삭제하시겠습니까?');
    if (shouldDelete) {
      try {
        // 사용자 확인 후 삭제 작업 진행
        await deleteDoc(doc(db, 'template', id));
        alert('삭제 완료!');
        navigate(`/admin/${userUid}`);
      } catch (error) {
        console.error('삭제 중 오류 발생:', error.message);
      }
    }
  };

  return (
    <>
      <O.HeaderStyle>
        <button onClick={() => navigate(`/admin/${userUid}`)}>
          <LeftOutlined />
        </button>
        <p>설정</p>
      </O.HeaderStyle>

      <O.FormGuideStyle>
        <h2>
          자주 묻는 질문 <img src={IconFormCheck} alt="폼체크아이콘" />
        </h2>
        <p>
          팬,구독자들이 궁금해 할 만한 질문과 답변을 미리 작성할 수 있는
          폼입니다.
        </p>
      </O.FormGuideStyle>

      <O.Container
        onSubmit={blockId ? handleEditButtonClick : handleAddButtonClick}
      >
        <label htmlFor="title">
          자주묻는 질문 이름
          <p>{titleCount}/20자</p>
        </label>
        <div className="input-container">
          <input
            id="title"
            name="title"
            type="text"
            placeholder="자주 묻는 질문 😊"
            value={title}
            onChange={(e) => {
              handleTitleChange(e);
              setIsTitleValid(e.target.value === '');
              setTitleCount(e.target.value.length);
            }}
            maxLength={20}
            autoFocus
          />
          {isTitleValid && <span>필수입력 항목입니다.</span>}
        </div>

        <O.FaqList>
          {faqList.map((faq) => {
            return (
              <div key={faq.faqId}>
                <p>
                  Q. {faq.question}
                  <button
                    type="button"
                    onClick={
                      blockId
                        ? () => handleDeleteFaqButtonClick(faq.faqId)
                        : () => handleDeleteAddedFaq(faq.faqId)
                    }
                  >
                    <DeleteOutlined />
                  </button>
                </p>

                <p>A. {faq.answer}</p>
              </div>
            );
          })}
        </O.FaqList>

        <label htmlFor="question">질문 입력</label>
        <div className="input-container">
          <input
            id="question"
            name="question"
            type="text"
            placeholder="질문을 입력해 주세요."
            value={question}
            onChange={(e) => {
              handleQuestionChange(e);
              setIsQuestionValid(e.target.value === '');
            }}
          />
          {isQuestionValid && <span>필수입력 항목입니다.</span>}
        </div>

        <label htmlFor="answer">답변 입력</label>
        <div className="input-container">
          <textarea
            id="answer"
            name="answer"
            type="text"
            placeholder="답변을 입력해 주세요."
            value={answer}
            onChange={(e) => {
              handleAnswerChange(e);
              setIsAnswerValid(e.target.value === '');
            }}
          />
          {isAnswerValid && <span>필수입력 항목입니다.</span>}
        </div>

        <O.MenuFormButton
          type="button"
          disabled={!question || !answer}
          onClick={handleAddFaqButtonClick}
        >
          질문 추가하기
        </O.MenuFormButton>

        <O.ButtonArea>
          <O.SubmitButton
            type="submit"
            disabled={!title || faqList.length === 0}
          >
            {blockId ? '수정하기' : '저장하기'}
          </O.SubmitButton>
          <O.SubmitButton
            type="button"
            color="#313733"
            onClick={() => handleRemoveButtonClick(blockId)}
          >
            삭제하기
          </O.SubmitButton>
        </O.ButtonArea>
      </O.Container>
    </>
  );
};

export default Faq;
