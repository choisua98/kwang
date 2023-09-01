import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import KakaoIcon from '../../../../assets/images/kakao.png';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const KakaoLogin = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const kakaoLogin = async () => {
    const jsKey = '16378892d0b6ab1d19429225f98cc97a';
    const Kakao = window.Kakao;
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init(jsKey);
      console.log('카카오 이니셜라이즈', Kakao.isInitialized());
    }
    await Kakao.Auth.login({
      success(res) {
        Kakao.Auth.setAccessToken(res.access_token);
        console.log('카카오 로그인 성공');
        Kakao.API.request({
          url: '/v2/user/me',
          success(res) {
            console.log('카카오 인가 요청 성공');
            const kakaoAccount = res.kakao_account;
            console.log({ kakaoAccount });
            const checkEmailExists = async () => {
              try {
                const methods = await fetchSignInMethodsForEmail(
                  auth,
                  kakaoAccount.email,
                );
                if (methods.length > 0) {
                  console.log('기존회원/로그인진행합니다.');
                  try {
                    await signInWithEmailAndPassword(
                      auth,
                      kakaoAccount.email,
                      kakaoAccount.email, //비번으로 쓸값이 없음
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
                    kakaoAccount.email,
                    kakaoAccount.email,
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
              navigate('/admin');
            });
          },
          fail(error) {
            console.log(error);
          },
        });
      },
      fail(error) {
        console.log(error);
      },
    });
  };

  return (
    <Link to="#">
      <button onClick={kakaoLogin}>
        <img src={KakaoIcon} alt="kakao-login-medium" border="0" />
      </button>
    </Link>
  );
};

export default KakaoLogin;
