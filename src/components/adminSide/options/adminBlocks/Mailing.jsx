import React, { useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useInputs from '../../../../hooks/useInputs';
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
import { db } from '../../../../firebase/firebaseConfig';
import { useAtom, useAtomValue } from 'jotai';
import {
  blocksAtom,
  deleteModalVisibleAtom,
  modalVisibleAtom,
  userAtom,
} from '../../../../atoms/Atom';
import {
  handleCloseDeleteModal,
  handleCloseModal,
} from '../../../../utils/\butils';
import _ from 'lodash';
import { O } from '../Blocks.styles';
import IconFormCheck from '../../../../assets/images/common/icon/icon-Formcheck.webp';
import IconModalConfirm from '../../../../assets/images/common/icon/icon-modalConfirm.webp';
import { LeftOutlined } from '@ant-design/icons';
import { message } from 'antd';

const Mailing = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAtomValue(userAtom);
  const userUid = user?.uid;

  // 현재 블록 ID 가져오기
  const blockId = location.state ? location.state.blocksId : null;

  // 전역 상태에서 블록 정보 가져오기
  const [blocks] = useAtom(blocksAtom);
  const selectedBlock = blocks.find((block) => block.id === blockId) || '';

  const [modalVisible, setModalVisible] = useAtom(modalVisibleAtom);
  const [deleteModalVisible, setDeleteModalVisible] = useAtom(
    deleteModalVisibleAtom,
  );

  const [{ title, description }, onChange] = useInputs({
    title: selectedBlock?.title || '',
    description: selectedBlock?.description || '',
  });

  // 제목과 설명의 글자 수를 추적하는 상태
  const [titleTextCount, setTitleTextCount] = useState(0);
  const [descriptionTextCount, setDescriptionTextCount] = useState(0);

  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);

  // "저장하기" 버튼 클릭 시 실행되는 함수
  const handleAddButtonClick = useCallback(async () => {
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

      setModalVisible(true);
    } catch (error) {
      message.error('저장 중 오류 발생:', error.message);
    }
  }, [userUid, navigate, title, description, setModalVisible]);

  // "수정하기" 버튼 클릭 시 실행되는 함수
  const handleEditButtonClick = useCallback(async () => {
    try {
      // Firestore에 데이터 업로드
      const docRef = doc(db, 'template', blockId);
      await updateDoc(docRef, {
        title,
        description,
      });

      setModalVisible(true);
    } catch (error) {
      message.error('수정 중 오류 발생:', error.message);
    }
  }, [blockId, title, description, setModalVisible]);

  // 디바운싱된 함수 생성
  const debouncedSubmit = _.debounce(
    blockId ? handleEditButtonClick : handleAddButtonClick,
    300,
  );

  // "삭제하기" 버튼 클릭 시 실행되는 함수
  const handleRemoveButtonClick = useCallback(
    async (id) => {
      const shouldDelete = window.confirm('정말 삭제하시겠습니까?');
      if (shouldDelete) {
        try {
          // 사용자 확인 후 삭제 작업 진행
          await deleteDoc(doc(db, 'template', id));

          setDeleteModalVisible(true);
        } catch (error) {
          message.error('삭제 중 오류 발생:', error.message);
        }
      }
    },
    [setDeleteModalVisible],
  );

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
        onSubmit={(e) => {
          e.preventDefault();
          debouncedSubmit();
        }}
      >
        <label htmlFor="title">
          메일링 서비스 이름
          <p>{titleTextCount}/20자</p>
        </label>
        <div className="input-container">
          <input
            id="title"
            name="title"
            type="text"
            placeholder="메일링 서비스 📩"
            value={title}
            onChange={(e) => {
              onChange(e);
              setIsTitleValid(e.target.value === '');
              setTitleTextCount(e.target.value.length);
            }}
            maxLength={20}
            autoFocus
          />
          {isTitleValid && <span>필수입력 항목입니다.</span>}
        </div>

        <label htmlFor="description">
          메일링 서비스 상세설명
          <p>{descriptionTextCount}/80자</p>
        </label>
        <div className="input-container">
          <textarea
            id="description"
            name="description"
            type="text"
            placeholder="상세 설명을 입력해 주세요."
            value={description}
            onChange={(e) => {
              onChange(e);
              setIsDescriptionValid(e.target.value === '');
              setDescriptionTextCount(e.target.value.length);
            }}
            maxLength={80}
          />
          {isDescriptionValid && <span>필수입력 항목입니다.</span>}
        </div>

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

      <O.Modal
        title=""
        centered
        open={modalVisible}
        onCancel={() => handleCloseModal(setModalVisible, navigate)}
        footer={null}
        closable={false}
        width={330}
      >
        <div>
          <img src={IconModalConfirm} alt="완료아이콘" />
          <h1>{blockId ? '수정완료!' : '저장완료!'}</h1>
          <p>{blockId ? '수정이 완료되었습니다.' : '저장이 완료되었습니다.'}</p>
        </div>
        <button
          type="button"
          onClick={() => handleCloseModal(setModalVisible, navigate)}
        >
          닫기
        </button>
      </O.Modal>

      <O.Modal
        title=""
        centered
        open={deleteModalVisible}
        onCancel={() => handleCloseDeleteModal(setDeleteModalVisible, navigate)}
        footer={null}
        closable={false}
        width={330}
      >
        <div>
          <img src={IconModalConfirm} alt="완료아이콘" />
          <h1>삭제완료!</h1>
          <p>삭제가 완료되었습니다.</p>
        </div>
        <button
          type="button"
          onClick={() =>
            handleCloseDeleteModal(setDeleteModalVisible, navigate)
          }
        >
          닫기
        </button>
      </O.Modal>
    </>
  );
};
export default Mailing;
