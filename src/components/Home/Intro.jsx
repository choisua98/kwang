import React from 'react';
import { useNavigate } from 'react-router-dom';
import IntroBanner from '../../assets/images/customer/home/banner/intro/intro-banner.png';

const Intro = () => {
  const navigate = useNavigate();
  return (
    <>
      <img src={IntroBanner} alt="" style={{ width: '100%' }} />
      <div
        style={{
          padding: '43px 0 32px',
          width: '100%',
          textAlign: 'center',
          background: '#FF7A16',
        }}
      >
        <p
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#fff',
          }}
        >
          나만의 링크 만들기
        </p>
        <button
          onClick={() => navigate('/login')}
          style={{
            marginTop: '20px',
            width: '129px',
            height: '43px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#FF7A16',
            background: '#fff',
            borderRadius: '15px',
            boxShadow: '2px 2px 4px 0 rgba(0, 0, 0, 0.25)',
          }}
        >
          시작하기
        </button>
        <address
          style={{
            padding: '73px 0 0',
            fontFamily: 'Roboto',
            fontSize: '12px',
            fontWeight: '400',
            color: 'rgba(255, 255, 255, 0.80)',
          }}
        >
          Copyright 2023. READERS CLUB. All rights reserved.
        </address>
      </div>
    </>
  );
};

export default Intro;
