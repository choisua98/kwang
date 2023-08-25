import React from 'react';
import { C } from './Challenge.styles';
import useInput from '../../../../hooks/useInput';

const Challenge = () => {
  // 제목과 설명에 대한 상태 및 상태 변경 함수 설정
  const [title, handleTitleChange] = useInput();
  const [description, handleDescriptionChange] = useInput();
  return (
    <C.Container>
      <label>함께하기 챌린지에 대해 간략히 설명해주세요.</label>
      <textarea
        name="description"
        type="text"
        placeholder="설명을 작성해 주세요"
        value={description}
        onChange={handleDescriptionChange}
        autoFocus
      />

      <label>챌린지 제목</label>
      <input
        name="title"
        type="text"
        placeholder="제목을 입력해 주세요"
        value={title}
        onChange={handleTitleChange}
      />
      <button type="submit">저장하기</button>
    </C.Container>
  );
};

export default Challenge;
