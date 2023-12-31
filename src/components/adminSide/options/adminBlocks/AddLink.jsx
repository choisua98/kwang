import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { useTheme, useThemeReset } from '../../../../hooks/useTheme';
import { message } from 'antd';

const AddLink = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAtomValue(userAtom);
  const userUid = user?.uid;

  const blockId = location.state ? location.state.blocksId : null;
  const [blocks] = useAtom(blocksAtom);
  const selectedBlock = blocks.find((block) => block.id === blockId) || '';

  const [modalVisible, setModalVisible] = useAtom(modalVisibleAtom);
  const [deleteModalVisible, setDeleteModalVisible] = useAtom(
    deleteModalVisibleAtom,
  );

  const [{ title, addLink }, onChange] = useInputs({
    title: selectedBlock?.title || '',
    addLink: selectedBlock?.addLink || '',
  });

  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isAddLinkValid, setIsAddLinkValid] = useState(false);
  const [titleTextCount, setTitleTextCount] = useState(0);

  // URL 유효성 검사 정규 표현식
  const urlRegex =
    /^(ftp|http|https):\/\/[A-Za-z0-9.-]+(:[0-9]+)?(\/[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]+)*$/;

  // 테마
  const [theme, backgroundImage] = useThemeReset();
  useTheme(theme, backgroundImage);

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
        addLink,
        blockKind: 'addlink',
        blockId: blockId,
        createdAt: serverTimestamp(),
        userId: userUid,
      });

      setModalVisible(true);
    } catch (error) {
      message.error('저장 중 오류 발생:', error.message);
    }
  }, [userUid, navigate, title, addLink, setModalVisible]);

  const handleEditButtonClick = useCallback(async () => {
    try {
      // Firestore에 데이터 업로드
      const docRef = doc(db, 'template', blockId);
      await updateDoc(docRef, {
        title,
        addLink,
      });

      setModalVisible(true);
    } catch (error) {
      message.error('수정 중 오류 발생:', error.message);
    }
  }, [blockId, title, addLink, setModalVisible]);

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
          링크 추가하기 <img src={IconFormCheck} alt="폼체크아이콘" />
        </h2>
        <p>링크를 추가하여 다양한 채널을 공유해보세요.</p>
      </O.FormGuideStyle>

      <O.Container
        onSubmit={(e) => {
          e.preventDefault();
          debouncedSubmit();
        }}
      >
        <label htmlFor="title">
          링크 제목<p>{titleTextCount}/20자</p>
        </label>
        <div className="input-container">
          <input
            id="title"
            name="title"
            type="text"
            placeholder="링크 추가하기 ✔️"
            value={title}
            onChange={(e) => {
              onChange(e);
              setIsTitleValid(e.target.value === '');
              setTitleTextCount(e.target.value.length);
            }}
            autoFocus
          />
          {isTitleValid && <span>필수입력 항목입니다.</span>}
        </div>

        <label htmlFor="addLink">링크를 추가해 주세요</label>
        <div className="input-container">
          <input
            id="addLink"
            name="addLink"
            type="text"
            value={addLink}
            onChange={(e) => {
              const inputValue = e.target.value;
              onChange(e);
              if (inputValue === '' || !urlRegex.test(inputValue)) {
                setIsAddLinkValid(true);
              } else {
                setIsAddLinkValid(false);
              }
            }}
          />
          {isAddLinkValid && <span>유효하지 않은 주소입니다.</span>}
        </div>

        <O.ButtonArea>
          <O.SubmitButton type="submit" disabled={!title || !addLink}>
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

export default AddLink;
