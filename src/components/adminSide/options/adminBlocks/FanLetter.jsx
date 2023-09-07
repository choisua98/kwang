import React, { useState } from 'react';
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
import { useLocation, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { blocksAtom } from '../../../../atoms/Atom';
import { O } from '../Blocks.styles';
import IconFormCheck from '../../../../assets/images/common/icon/icon-Formcheck.png';
import { LeftOutlined } from '@ant-design/icons';

const FanLetter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 유저의 UID 가져오기
  const userUid = auth.currentUser?.uid;

  const blockId = location.state ? location.state.blocksId : null;
  const [blocks] = useAtom(blocksAtom);
  const selectedBlock = blocks.find((block) => block.id === blockId) || '';

  const [title, setTitle] = useState(selectedBlock?.title || '');
  const [description, setDescription] = useState(
    selectedBlock?.description || '',
  );
  const [titleCount, setTitleCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);

  const addButtonClick = async (e) => {
    e.preventDefault();

    if (!userUid) {
      alert('작업을 위해 로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }

    try {
      // Block 정렬을 위해 숫자로 blockId 값 지정
      const querySnapshot = await getDocs(
        query(collection(db, 'heejintest'), where('userId', '==', userUid)),
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
      await addDoc(collection(db, 'heejintest'), {
        title,
        description,
        blockKind: 'fanletter',
        blockId: blockId,
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
      const docRef = doc(db, 'heejintest', blockId);
      await updateDoc(docRef, {
        title,
        description,
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
        await deleteDoc(doc(db, 'heejintest', id));
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
          팬레터 보내기 <img src={IconFormCheck} alt="폼체크아이콘" />
        </h2>
        <p>
          팬,구독자들에게 팬레터와 같은 메세지를 받고자 하실 경우
          <span>[팬레터 받기 폼]</span>을 이용해보세요. 팬,구독자들이 보내주신
          메세지는 고객관리 페이지에서 모아 볼 수 있습니다.
        </p>
      </O.FormGuideStyle>

      <O.Container onSubmit={blockId ? editButtonClick : addButtonClick}>
        <label htmlFor="title">
          <p>
            팬레터 서비스 이름<span>*</span>
          </p>
          {titleCount}/20자
        </label>

        <input
          id="title"
          name="title"
          type="text"
          placeholder="팬레터 보내기 💘"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setTitleCount(e.target.value.length);
          }}
          maxLength={20}
          autoFocus
        />
        <label htmlFor="description">
          <p>
            팬레터 설명을 작성해 주세요<span>*</span>
          </p>
          {descriptionCount}/80자
        </label>

        <textarea
          id="description"
          name="description"
          type="text"
          placeholder="안녕하세요 크리에이터 크왕이에요! 저에게 전하고 싶은 메시지를 남겨주세용 ㅎㅎ"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
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

export default FanLetter;
