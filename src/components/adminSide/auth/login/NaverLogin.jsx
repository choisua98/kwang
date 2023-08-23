import React, { useEffect } from 'react';
import {
  getAuth,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAtom } from 'jotai';
import { userAtom } from '../../../../atoms/Atom';

const NaverLogin = () => {
  const [user, setUser] = useAtom(userAtom);
  const auth = getAuth();

  // --네이버 로그인--
  const { naver } = window;
  const NAVER_CLIENT_ID = 'hsnzexHuuJiVHO_hh5EP';
  const NAVER_CALLBACK_URL = 'http://www.localhost:3000/login';

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: 'green', type: 1, height: 50 },
      callbackHandle: true,
    });
    naverLogin.init();
    naverLogin.logout();

    naverLogin.getLoginStatus(async (status) => {
      if (status) {
        console.log(`로그인?: ${status}`);
        console.log(naverLogin.user);
        setUser(naverLogin.user);
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
                const userCredential = await signInWithEmailAndPassword(
                  auth,
                  naverLogin.user.email,
                  naverLogin.user.id,
                );
                console.log(userCredential);
                console.log('로그인성공.');
              } catch (error) {
                console.error(error);
              }
            } else {
              console.log('비회원/회원가입진행합니다.');
              createUserWithEmailAndPassword(
                auth,
                naverLogin.user.email,
                naverLogin.user.id,
              )
                .then((userCredential) => {
                  console.log(`회원가입유저${userCredential}`);
                  console.log('회원가입성공. 로그인완료.');
                })
                .catch((error) => {
                  console.error(error);
                });
            }
          } catch (error) {
            console.error(error);
          }
        };
        checkEmailExists();
      }
    });
  };
  console.log(user);

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return (
    <div>
      <span id="naverIdLogin"></span>
    </div>
  );
};

export default NaverLogin;
