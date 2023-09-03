import React from 'react';
import IntroBanner from '../../assets/images/customer/home/banner/intro/intro-banner.png';

const Intro = () => {
  return (
    <div style={{ margin: '42px auto 50px' }}>
      <h1
        style={{
          padding: '0 20px',
          fontSize: '18px',
          fontWeight: '600',
          lineHeight: 'normal',
        }}
      >
        크리에이터를 위한
        <br />단 하나의 링크, 크왕
      </h1>
      <img
        src={IntroBanner}
        alt="크왕 크리에이터 이미지"
        style={{
          margin: '22px auto 31.5px',
        }}
      />
      <h2
        style={{ fontSize: '16px', lineHeight: '141% ', textAlign: 'center' }}
      >
        누구나 다양한 형태로 창작활동을 하는
        <br />
        <b style={{ fontWeight: 'bold' }}>크리에이터가 되는 시대</b>
      </h2>
      <h3
        style={{
          margin: '12.5px auto 0',
          fontSize: '14px',
          textAlign: 'center',
          lineHeight: '141%',
          color: '#a1a1a1',
        }}
      >
        멀티링크 서비스 크왕은 크리에이터가 작업을 심으면 그것의 <br /> 열매가
        발화하도록 돕는 토양의 역할을 해요.
      </h3>
    </div>
  );
};

export default Intro;
