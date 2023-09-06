import React, { useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../../../../firebase/firebaseConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { blocksAtom } from '../../../../atoms/Atom';
import { O } from '../Blocks.styles';
import IconFormCheck from '../../../../assets/images/common/icon/icon-Formcheck.png';
import { LeftOutlined } from '@ant-design/icons';

const AddLink = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 유저의 UID 가져오기
  const userUid = auth.currentUser?.uid;

  const blockId = location.state ? location.state.blocksId : null;
  const [blocks] = useAtom(blocksAtom);
  const selectedBlock = blocks.find((block) => block.id === blockId) || '';

  const [title, setTitle] = useState(selectedBlock?.title || '');
  const [addLink, setAddLink] = useState(selectedBlock?.description || '');

  const addButtonClick = async (e) => {
    e.preventDefault();

    if (!userUid) {
      alert('작업을 위해 로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }

    try {
      // Firestore에 데이터 추가
      await addDoc(collection(db, 'template'), {
        title,
        addLink,
        blockKind: 'addlink',
        createdAt: serverTimestamp(),
        userId: userUid,
      });

      alert('저장 완료!');
      navigate(`/admin/${userUid}`);
    } catch (error) {
      console.error('저장 중 오류 발생:', error.message);
    }
  };

  const editButtonClick = async (e) => {
    e.preventDefault();

    try {
      // Firestore에 데이터 업로드
      const docRef = doc(db, 'template', blockId);
      await updateDoc(docRef, {
        title,
        addLink,
      });

      alert('수정 완료!');
      navigate(`/admin/${userUid}`);
    } catch (error) {
      console.error('수정 중 오류 발생:', error.message);
    }
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
          링크 추가하기 <img src={IconFormCheck} alt="폼체크아이콘" />
        </h2>
        <p>링크를 추가하여 다양한 채널을 공유해보세요.</p>
      </O.FormGuideStyle>

      <O.Container onSubmit={blockId ? editButtonClick : addButtonClick}>
        <label htmlFor="title">
          <p>
            링크 제목<span>*</span>
          </p>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="링크 추가하기 ✔️"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          autoFocus
        />
        <label htmlFor="description">
          <p>
            링크를 추가해 주세요<span>*</span>
          </p>
        </label>
        <input
          id="description"
          name="description"
          type="text"
          value={addLink || 'https://'}
          onChange={(e) => {
            setAddLink(e.target.value);
          }}
        />

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
    </>
  );
};

export default AddLink;
