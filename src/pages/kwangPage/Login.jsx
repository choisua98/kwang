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
      <L.AlignBox>아직 크왕 회원이 아니신가요?</L.AlignBox>
      <L.SignupMoveButton
        onClick={() => {
          navigate('/signup');
        }}
      >
        회원가입 바로가기
      </L.SignupMoveButton>
    </L.Login>
  );
};

export default Login;
