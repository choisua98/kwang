import React, { useState } from 'react';
import { F } from './FanLetter.styles';
import { MenuOutlined } from '@ant-design/icons';

const FanLetter = () => {
  const [blockToggle, setBlockToggle] = useState(false);

  return (
    <F.Container>
      <F.Title>
        <h2>팬레터</h2>
        <button>⌄</button>
      </F.Title>
      <F.Contents>
        <p>팬레터 설명을 작성해 주세요</p>
        <F.Input placeholder="설명을 작성해 주세요"></F.Input>
      </F.Contents>
    </F.Container>
  );
};

export default FanLetter;

// 팬레터, 배너 이미지 추가, 예약서비스
