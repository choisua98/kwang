import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useInput from '../../../../hooks/useInput';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../../../firebase/firebaseConfig';
import { useAtom } from 'jotai';
import { blocksAtom } from '../../../../atoms/Atom';
import { O } from '../Blocks.styles';
import IconFormCheck from '../../../../assets/images/common/icon/icon-Formcheck.png';
import { LeftOutlined } from '@ant-design/icons';
import { message } from 'antd';

const Mailing = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 사용자 UID 가져오기
  const userUid = auth.currentUser?.uid;

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

  // 제목과 설명의 글자 수를 추적하는 상태
  const [titleCount, setTitleCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);

  // "저장하기" 버튼 클릭 시 실행되는 함수
  const handleAddButtonClick = async (e) => {
    e.preventDefault();

    if (!userUid) {
      message.error(
        '작업을 위해 로그인이 필요합니다. 로그인 페이지로 이동합니다.',
      );
      navigate('/login');
      return;
    }
    try {
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

      // Firestore에 데이터 추가
      await addDoc(collection(db, 'template'), {
        title,
        description,
        blockKind: 'mailing',
        blockId: blockId,
        createdAt: serverTimestamp(),
        userId: userUid,
      });
      // 저장 완료 알림 후 어드민 페이지로 이동
      message.success('저장 완료!');
      navigate(`/admin/${userUid}`);
    } catch (error) {
      message.error('저장 중 오류 발생:', error.message);
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
      message.success('수정 완료!');
      navigate(`/admin/${userUid}`);
    } catch (error) {
      message.error('수정 중 오류 발생:', error.message);
    }
  };

  // "삭제하기" 버튼 클릭 시 실행되는 함수
  const handleRemoveButtonClick = async (id) => {
    const shouldDelete = window.confirm('정말 삭제하시겠습니까?');
    if (shouldDelete) {
      try {
        // 사용자 확인 후 삭제 작업 진행
        await deleteDoc(doc(db, 'template', id));
        message.success('삭제 완료!');
        navigate(`/admin/${userUid}`);
      } catch (error) {
        message.error('삭제 중 오류 발생:', error.message);
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
          메일링 서비스 <img src={IconFormCheck} alt="폼체크아이콘" />
        </h2>
        <p>
          팬, 구독자들에게 정기적인 이메일이나 이메일 정보를 수집하고 싶은 경우
          <span>[메일링 신청 폼]</span>을 추가해보세요. 이름과 연락처,
          이메일주소를 수집할 수 있고 고객관리 페이지에서 모아 볼 수 있습니다.
        </p>
      </O.FormGuideStyle>

      <O.Container
        onSubmit={blockId ? handleEditButtonClick : handleAddButtonClick}
      >
        <label htmlFor="title">
          <p>
            메일링 서비스 이름<span>*</span>
          </p>
          {titleCount}/20자
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="메일링 서비스 📩"
          value={title}
          onChange={(e) => {
            handleTitleChange(e);
            setTitleCount(e.target.value.length);
          }}
          maxLength={20}
          autoFocus
        />
        <label htmlFor="description">
          <p>
            메일링 서비스에 대한 간략한 설명<span>*</span>
          </p>
          {descriptionCount}/80자
        </label>

        <textarea
          id="description"
          name="description"
          type="text"
          placeholder="메일링 서비스에 대해 간단히 설명해주세요."
          value={description}
          onChange={(e) => {
            handleDescriptionChange(e);
            setDescriptionCount(e.target.value.length);
          }}
          maxLength={80}
        />
        <O.ButtonArea>
          <O.SubmitButton type="submit" disabled={!title || !description}>
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
export default Mailing;
