import React, { useEffect, useState } from 'react';
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

import {
  backgroundImageAtom,
  blocksAtom,
  themeAtom,
} from '../../../../atoms/Atom';
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
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isAddLinkEmpty, setIsAddLinkEmpty] = useState(false);
  const [titleCount, setTitleCount] = useState(0);

  // URL 유효성 검사 정규 표현식
  const urlRegex =
    /^(ftp|http|https):\/\/[A-Za-z0-9.-]+(:[0-9]+)?(\/[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]+)*$/;

  const [theme, setTheme] = useAtom(themeAtom);

  // 배경 이미지
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);

  useEffect(() => {
    setTheme('light');
    setBackgroundImage(null);
  }, []);

  useEffect(() => {
    setTheme('light');
    setBackgroundImage(null);
  }, []);

  const addButtonClick = async (e) => {
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
        addLink,
        blockKind: 'addlink',
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
          링크 제목<p>{titleCount}/20자</p>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="링크 추가하기 ✔️"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setIsTitleEmpty(e.target.value === '');
            setTitleCount(e.target.value.length);
          }}
          autoFocus
        />
        {isTitleEmpty && <p style={{ color: 'red' }}>필수입력 항목입니다.</p>}
        <label htmlFor="description">링크를 추가해 주세요</label>
        <input
          id="description"
          name="description"
          type="text"
          value={addLink || 'https://'}
          onChange={(e) => {
            const inputValue = e.target.value;
            setAddLink(inputValue);
            if (inputValue === '' || !urlRegex.test(inputValue)) {
              setIsAddLinkEmpty(true);
            } else {
              setIsAddLinkEmpty(false);
            }
          }}
        />
        {isAddLinkEmpty && (
          <p style={{ color: 'red' }}>유효하지 않은 주소입니다.</p>
        )}

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
