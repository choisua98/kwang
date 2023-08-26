import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { C } from './Challenge.styles';
import useInput from '../../../../hooks/useInput';
import { useAtom } from 'jotai';
import { blocksAtom } from '../../../../atoms/Atom';
import { auth, db } from '../../../../firebase/firebaseConfig';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

// Toast Editor
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

// Toast ColorSyntax Plugin
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

// ant Design
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Space } from 'antd';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

// 오늘 이전의 날짜는 선택 불가능하도록 설정하는 함수
const disabledDate = (current) => {
  return current && current < dayjs().endOf('day');
};

const Challenge = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [title, handleTitleChange] = useInput();

  // 현재 블록 ID 가져오기
  const blockId = location.state ? location.state.blocksId : null;

  // 전역 상태에서 블록 정보 가져오기
  const [blocks] = useAtom(blocksAtom);

  // blocks 배열에서 선택된 블록 찾기
  const selectedBlock = blocks.find((block) => block.id === blockId);

  // Editor DOM 선택용
  const editorRef = useRef();

  // 입력창에 입력한 내용을 HTML 태그 형태로 취득
  const content = editorRef.current?.getInstance().getHTML();

  // useEffect(() => {
  //   // 만약 현재 블록 ID가 존재한다면 (수정 모드일 때)
  //   if (blockId) {
  //     // blocks 배열에서 선택된 블록 찾기
  //     const selectedBlock = blocks.find((block) => block.id === blockId);

  //     if (selectedBlock) {
  //       setFaqList(selectedBlock.faqs);
  //     }
  //   }
  // }, [blockId, blocks]);

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
      content,
      blockKind: 'challenge',
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
      content,
      createdAt: serverTimestamp(),
    });

    // 수정 완료 알림 후 어드민 페이지로 이동
    alert('수정 완료!');
    navigate('/admin');
  };

  return (
    <C.Container
      onSubmit={blockId ? handleEditButtonClick : handleAddButtonClick}
    >
      <label htmlFor="title">함께해요 챌린지 이름</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder={blockId ? '' : '함께해요 챌린지 🔥'}
        defaultValue={blockId ? selectedBlock.title : title}
        onChange={handleTitleChange}
        autoFocus
      />

      <label htmlFor="editor">챌린지 상세설명</label>
      <Editor
        id="editor"
        ref={editorRef} // DOM 선택용 useRef
        placeholder={blockId ? '' : '사진과 글을 추가해 챌린지를 소개해보세요.'}
        height="300px" // 에디터 창 높이
        initialEditType="wysiwyg" // 초기 입력모드 설정
        hideModeSwitch={true} // 텍스트 입력 모드 전환 버튼 숨김
        toolbarItems={[
          // 툴바 옵션 설정
          ['heading', 'bold'],
          ['ul', 'ol', 'task'],
          ['table', 'image', 'link'],
        ]}
        useCommandShortcut={false} // 키보드 입력 컨트롤 방지
        plugins={[colorSyntax]}
      />

      <label htmlFor="period">챌린지 기간</label>
      <Space id="period" direction="vertical" size={12}>
        <RangePicker
          disabledDate={disabledDate}
          style={{ width: '100%' }}
          popupClassName="customRangePickerPopup"
        />
      </Space>

      <button type="submit">{blockId ? '수정하기' : '저장하기'}</button>
    </C.Container>
  );
};

export default Challenge;
