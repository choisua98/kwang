import React from 'react';

import EmailLogin from '../../components/adminSide/auth/login/EmailLogin';
import GoogleLogin from '../../components/adminSide/auth/login/GoogleLogin';
import NaverLogin from '../../components/adminSide/auth/login/NaverLogin';

import KakaoLogin from '../../components/adminSide/auth/login/KakaoLogin';
import { L } from './kwangPage.styles';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  return (
    <L.Login>
      <EmailLogin />
      <L.Sns>
        <NaverLogin />
        <GoogleLogin />
        <KakaoLogin />
      </L.Sns>
      <div
        style={{
          margin: '37.5px auto 10px',
          fontSize: '16px',
          textAlign: 'center',
        }}
      >
        아직 크왕 회원이 아니신가요?
      </div>
      <button
        onClick={() => {
          navigate('/signup');
        }}
        style={{
          margin: '0 auto',
          display: 'block',
          fontSize: '14px',
          textDecoration: 'underline',
          color: '#a1a1a1',
          background: 'none',
        }}
      >
        회원가입 바로가기
      </button>
    </L.Login>
  );
};

export default Login;
