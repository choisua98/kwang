import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IntroBanner from '../../assets/images/customer/home/banner/intro/intro-banner.png';
import { auth } from '../../firebase/firebaseConfig';
const Intro = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const userUid = user?.uid;
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 상태를 저장할 상태 변수
  // Firebase 인증 상태가 변경될 때마다 호출되는 이벤트 핸들러 등록
  useEffect(() => {
    if (user) {
      // 사용자가 로그인한 경우
      setIsAuthenticated(true);
    } else {
      // 사용자가 로그아웃한 경우
      setIsAuthenticated(false);
    }
    console.log(userUid);
  }, []);

  // 버튼 텍스트 설정 함수
  const getButtonText = () => {
    if (isAuthenticated) {
      return '마이홈으로 가기';
    } else {
      return '시작하기';
    }
  };
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
          onClick={() => {
            if (isAuthenticated) {
              // 로그인된 상태에서는 마이홈으로 이동하도록 설정
              navigate(`/${userUid}`);
            } else {
              navigate('/login');
            }
          }}
          style={{
            marginTop: '20px',
            width: '129px',
            height: '43px',
            fontFamily: 'Pretendard-Regular',
            fontSize: '14px',
            fontWeight: '600',
            color: '#FF7A16',
            background: '#fff',
            borderRadius: '15px',
            boxShadow: '2px 2px 4px 0 rgba(0, 0, 0, 0.25)',
          }}
        >
          {getButtonText()}
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
