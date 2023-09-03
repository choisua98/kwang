import React from 'react';
import { auth } from '../firebase/firebaseConfig';
import EmailLogin from '../components/adminSide/auth/login/EmailLogin';
import GoogleLogin from '../components/adminSide/auth/login/GoogleLogin';
import NaverLogin from '../components/adminSide/auth/login/NaverLogin';
import { signOut } from 'firebase/auth';
import KakaoLogin from '../components/adminSide/auth/login/KakaoLogin';
import { L } from './Login.styles';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const 통합로그아웃 = async () => {
    if (user) {
      console.log('유저가있습니다.');
    }
    await signOut(auth); //파이어베이스 로그아웃
  };
  console.log(user);

  return (
    <L.Login>
      <EmailLogin />
      <L.Sns>
        {/* <NaverLogin /> */}
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
          paddingBottom: '68px',
          display: 'block',
          fontSize: '14px',
          textDecoration: 'underline',
          color: '#a1a1a1',
          background: 'none',
        }}
      >
        회원가입 바로가기
      </button>
      <div>
        {user ? (
          <div>
            <h2>**로그인 성공!**</h2>
            <h3>이메일:{user.email}</h3>
            <h3>프로필사진</h3>
            <img src={user.profile_image} alt="프로필 사진" />
            <br />
            {/* <button onClick={SocialLogout}>소셜로그아웃</button> */}
            <button onClick={통합로그아웃}>통합로그아웃</button>
          </div>
        ) : null}
      </div>
    </L.Login>
  );
};

export default Login;
