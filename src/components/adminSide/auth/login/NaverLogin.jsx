import React, { useEffect } from 'react';
import {
  getAuth,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const { naver } = window;

const clientId = process.env.REACT_APP_NAVER_CLIENT_ID;
const callbackUrl = process.env.REACT_APP_NAVER_CALLBACK_URL;

export const naverLogin = new naver.LoginWithNaverId({
  clientId,
  callbackUrl,
  isPopup: false,
  loginButton: { color: 'green', type: 1, height: 50 },
  callbackHandle: true,
});

const NaverLogin = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const initializeNaverLogin = () => {
    naverLogin.init();
    naverLogin.logout();

    naverLogin.getLoginStatus(async (status) => {
      if (status) {
        console.log(`로그인?: ${status}`);
        // 네이버 로그인 유저 정보를 이용해서 Firebase 이메일+패스워드로 가입시켜주기.
        // Firebase에 등록된 기존 회원이면 로그인 -> 안되면 비회원이니까 회원가입시켜주기.
        const checkEmailExists = async () => {
          try {
            const methods = await fetchSignInMethodsForEmail(
              auth,
              naverLogin.user.email,
            );
            if (methods.length > 0) {
              try {
                await signInWithEmailAndPassword(
                  auth,
                  naverLogin.user.email,
                  naverLogin.user.email,
                ); // 비번으로 쓸값이 없음
              } catch (error) {
                console.error(error);
              }
            } else {
              try {
                const userCredential = await createUserWithEmailAndPassword(
                  auth,
                  naverLogin.user.email,
                  naverLogin.user.email,
                );
                console.log(`네이버 회원가입 유저 ${userCredential}`);
              } catch (error) {
                console.error(error);
              }
            }
          } catch (error) {
            console.error(error);
          }
        };

        try {
          await checkEmailExists();
          alert('로그인 되었습니다.');
          navigate(`/admin/${auth.currentUser.uid}`);
        } catch (error) {
          alert('로그인 중 에러 발생:', error.code);
        }
      }
    });
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return (
    <>
      <span id="naverIdLogin"></span>
    </>
  );
};

export default NaverLogin;
