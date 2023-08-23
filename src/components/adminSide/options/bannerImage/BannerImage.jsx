import React, { useState } from 'react';
import { B } from './BannerImage.styles';
import { useNavigate } from 'react-router-dom';

const BannerImage = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(true);

  const swtichToggle = () => {
    setToggle(!toggle);
  };

  return (
    <B.Container>
      <B.Title>
        <p>배너 이미지 추가하기</p>

        <button onClick={swtichToggle}>{toggle === true ? '⌄' : '--'}</button>
      </B.Title>
      {toggle && (
        <B.Contents>
          <p>이미지를 추가해 주세요</p>
          <button>이미지 추가 +</button>
        </B.Contents>
      )}
      <button onClick={() => navigate('/admin')}>저장하기</button>
    </B.Container>
  );
};

export default BannerImage;
