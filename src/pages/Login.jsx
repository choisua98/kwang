import React from 'react';
import { auth } from '../firebase/firebaseConfig';
import EmailLogin from '../components/adminSide/auth/login/EmailLogin';
import GoogleLogin from '../components/adminSide/auth/login/GoogleLogin';
import { useAtomValue } from 'jotai';
import { userAtom } from '../atoms/Atom';
import NaverLogin from '../components/adminSide/auth/login/NaverLogin';
import { signOut } from 'firebase/auth';
import KakaoLogin from '../components/adminSide/auth/login/KakaoLogin';

const { Kakao } = window;

const Login = () => {
  // const { naver } = window;
  // const NAVER_CLIENT_ID = 'hsnzexHuuJiVHO_hh5EP';
  // const NAVER_CALLBACK_URL = 'http://www.localhost:3000/login';
  const user = useAtomValue(userAtom);

  const 통합로그아웃 = async () => {
    if (user) {
      console.log('유저가있습니다.');
    }
    await signOut(auth); //파이어베이스 로그아웃
    // try {
    //   Kakao.Auth.logout(() => {
    //     //카카오로그아웃
    //     signOut(auth); //파이어베이스 로그아웃
    //     localStorage.clear();
    //     console.log('!로그아웃 요청!');
    //     console.log(
    //       '카카오 로그아웃 되었습니다.',
    //       '토큰?',
    //       Kakao.Auth.getAccessToken(),
    //     );
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
    // // try {
    // //   signOut(auth);
    // // } catch (error) {
    // //   //파이어베이스 로그아웃
    // //   console.error(error);
    // // }
    // try {
    //   naverLogin.logout(); //네이버 로그아웃
    //   window.location.href = 'http://localhost:3000/login';
    // } catch (error) {
    //   console.error(error);
    // }
  };
  // const naverLogin = new naver.LoginWithNaverId({
  //   clientId: NAVER_CLIENT_ID,
  //   callbackUrl: NAVER_CALLBACK_URL,
  //   isPopup: false,
  //   loginButton: { color: 'green', type: 1, height: 50 },
  //   callbackHandle: true,
  // });
  return (
    <div>
      <EmailLogin />

      {/* <button onClick={EmailLogout}>이메일로그아웃</button> */}
      <br />
      <br />
      <NaverLogin />
      <GoogleLogin />
      <KakaoLogin />
      <div>
        {user ? (
          <div>
            <h2>**로그인 성공!**</h2>
            <h3>이름:{user.name}</h3>
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
