import React from 'react';
import { auth } from '../firebase/firebaseConfig';
import EmailLogin from '../components/adminSide/auth/login/EmailLogin';
import GoogleLogin from '../components/adminSide/auth/login/GoogleLogin';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/Atom';
import NaverLogin from '../components/adminSide/auth/login/NaverLogin';
import { signOut } from 'firebase/auth';
import KakaoLogin from '../components/adminSide/auth/login/KakaoLogin';

const Login = () => {
  const [user, setUser] = useAtom(userAtom);

  const 통합로그아웃 = async () => {
    if (user) {
      console.log('유저가있습니다.');
    }
    await signOut(auth); //파이어베이스 로그아웃
    setUser();
  };
  console.log(user);

  return (
    <div>
      <EmailLogin />
      <br />
      <br />
      <NaverLogin />
      <GoogleLogin />
      <KakaoLogin />
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
    </div>
  );
};

export default Login;
