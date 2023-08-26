import React, { useState } from 'react';
import { C } from './Challenge.styles';
import useInput from '../../../../hooks/useInput';

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
import { DatePicker, InputNumber, Space, Tag } from 'antd';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const { CheckableTag } = Tag;

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};

const Challenge = () => {
  const durationOptions = [
    '1주 동안',
    '2주 동안',
    '3주 동안',
    '4주 동안',
    '기타 주기',
  ];

  const [title, handleTitleChange] = useInput();
  const [selectedDurations, setSelectedDurations] = useState('');
  const [participantCount, setParticipantCount] = useState(null);

  const handleChange = (tag, checked) => {
    if (checked) {
      console.log(tag);
      setSelectedDurations(tag); // 새로운 태그 선택 시 기존 선택한 태그를 덮어씀
    }
  };

  return (
    <C.Container>
      <label htmlFor="title">챌린지 제목</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="제목을 입력해 주세요"
        value={title}
        onChange={handleTitleChange}
        autoFocus
      />

      <label htmlFor="editor">챌린지 소개</label>
      <Editor
        id="editor"
        placeholder="사진과 글을 추가해 챌린지를 소개해보세요."
        height="300px" // 에디터 창 높이
        initialEditType="wysiwyg" // 초기 입력모드 설정
        hideModeSwitch={true} // 텍스트 입력 모드 전환 버튼 숨김
        toolbarItems={[
          // 툴바 옵션 설정
          ['heading', 'bold'],
          ['ul', 'ol', 'task'],
          ['table', 'image', 'link'],
        ]}
        plugins={[colorSyntax]}
      />

      <label htmlFor="date">챌린지 인증 기간</label>
      <Space id="date" direction="vertical" size={12}>
        <RangePicker
          disabledDate={disabledDate}
          style={{ width: '100%' }}
          dropdownClassName="customRangePickerPopup"
        />
      </Space>

      <label htmlFor="participant">모집 인원</label>
      <InputNumber
        id="participant"
        placeholder="참여할 인원을 입력해 주세요. ('제한없음' 입력 가능)"
        value={participantCount}
        onChange={setParticipantCount}
        style={{ width: '100%' }}
        min={0}
      />

      <label htmlFor="choice">챌린지 주기 선택</label>
      <Space
        id="choice"
        size={[0, 8]}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        {durationOptions.map((tag) => (
          <CheckableTag
            key={tag}
            checked={selectedDurations === tag}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </Space>

      <button type="submit">저장하기</button>
    </C.Container>
  );
};

export default Challenge;
