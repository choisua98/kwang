import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { I } from './Home.styles';
import IntroBanner from '../../assets/images/customer/home/banner/intro/intro-banner.webp';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../atoms/Atom';
const Intro = () => {
  const navigate = useNavigate();

  const user = useAtomValue(userAtom);
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
    <I.Container>
      <img src={IntroBanner} alt="" />
      <I.Footer>
        <p>나만의 링크 만들기</p>
        <button
          onClick={() => {
            if (isAuthenticated) {
              // 로그인된 상태에서는 마이홈으로 이동하도록 설정
              navigate(`/${userUid}`);
            } else {
              navigate('/login');
            }
          }}
        >
          {getButtonText()}
        </button>
        <address>Copyright 2023. READERS CLUB. All rights reserved.</address>
      </I.Footer>
    </I.Container>
  );
};

export default Intro;
