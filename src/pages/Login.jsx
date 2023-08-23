import React from 'react';

import EmailLogin from '../components/adminSide/auth/login/EmailLogin';
import GoogleLogin from '../components/adminSide/auth/login/GoogleLogin';
import { useAtomValue } from 'jotai';
import { userAtom } from '../atoms/Atom';
import NaverLogin from '../components/adminSide/auth/login/NaverLogin';

const Login = () => {
  const { naver } = window;
  const NAVER_CLIENT_ID = 'hsnzexHuuJiVHO_hh5EP';
  const NAVER_CALLBACK_URL = 'http://www.localhost:3000/login';
  const user = useAtomValue(userAtom);
  const Logout = () => {
    window.location.href = 'http://localhost:3000/login';
    naverLogin.logout();
  };
  const naverLogin = new naver.LoginWithNaverId({
    clientId: NAVER_CLIENT_ID,
    callbackUrl: NAVER_CALLBACK_URL,
    isPopup: false,
    loginButton: { color: 'green', type: 1, height: 50 },
    callbackHandle: true,
  });
  return (
    <div>
      <EmailLogin />
      <NaverLogin />
      <GoogleLogin />
      <div>
        {user ? (
          <div>
            <h2>**로그인 성공!**</h2>
            <h3>이름:{user.name}</h3>
            <h3>이메일:{user.email}</h3>
            <h3>프로필사진</h3>
            <img src={user.profile_image} alt="프로필 사진" />
            <br />
            <button onClick={Logout}>로그아웃</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Login;
