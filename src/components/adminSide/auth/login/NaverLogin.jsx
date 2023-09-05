import React, { useEffect } from 'react';
import {
  getAuth,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const { naver } = window;

const NAVER_CLIENT_ID = 'hsnzexHuuJiVHO_hh5EP';
const NAVER_CALLBACK_URL = 'https://kwang-nine.vercel.app/login';

export const naverLogin = new naver.LoginWithNaverId({
  clientId: NAVER_CLIENT_ID,
  callbackUrl: NAVER_CALLBACK_URL,
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
        //네이버로그인 유저정보를 이용해서 firebase 이메일+패스워드로 가입시켜주기.
        //firebase에 등록된 기존회원이면 로그인 -> 안되면 비회원이니까 회원가입시켜주기.
        const checkEmailExists = async () => {
          try {
            const methods = await fetchSignInMethodsForEmail(
              auth,
              naverLogin.user.email,
            );
            if (methods.length > 0) {
              console.log('기존회원/로그인진행합니다.');
              try {
                await signInWithEmailAndPassword(
                  auth,
                  naverLogin.user.email,
                  naverLogin.user.email, //비번으로 쓸값이 없음
                );
                // console.log(userCredential);
                console.log('이메일로 로그인성공.');
              } catch (error) {
                console.error(error);
              }
            } else {
              console.log('비회원/회원가입진행합니다.');
              createUserWithEmailAndPassword(
                auth,
                naverLogin.user.email,
                naverLogin.user.email,
              )
                .then((userCredential) => {
                  console.log(`회원가입유저${userCredential}`);
                  console.log('회원가입성공. 이메일로 로그인완료.');
                })
                .catch((error) => {
                  console.error(error);
                });
            }
          } catch (error) {
            console.error(error);
          }
        };
        checkEmailExists().then((res) => {
          // navigate('/admin');
          navigate(`/admin/${auth.currentUser.uid}`);
        });
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
