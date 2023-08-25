import React from 'react';
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
import { DatePicker, Space } from 'antd';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};

const Challenge = () => {
  // 제목과 설명에 대한 상태 및 상태 변경 함수 설정
  const [title, handleTitleChange] = useInput();
  const [description, handleDescriptionChange] = useInput();

  return (
    <C.Container>
      <label htmlFor="description">
        함께하기 챌린지에 대해 간략히 설명해주세요.
      </label>
      <textarea
        id="description"
        name="description"
        type="text"
        placeholder="설명을 작성해 주세요"
        value={description}
        onChange={handleDescriptionChange}
        autoFocus
      />

      <label htmlFor="title">챌린지 제목</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="제목을 입력해 주세요"
        value={title}
        onChange={handleTitleChange}
      />

      <label htmlFor="editor">챌린지 상세설명</label>
      <Editor
        id="editor"
        placeholder="내용을 입력해주세요."
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
      <Space direction="vertical" size={12}>
        <RangePicker
          disabledDate={disabledDate}
          style={{ width: '100%' }}
          popupStyle={{ width: '250px' }}
        />
      </Space>
      <button type="submit">저장하기</button>
    </C.Container>
  );
};

export default Challenge;
