import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import KakaoIcon from '../../../../assets/images/kakao.webp';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { L } from './Login.styles';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../../../atoms/Atom';

const KakaoLogin = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = useAtomValue(userAtom);
  const userUid = user?.uid;

  const kakaoLogin = async () => {
    const jsKey = process.env.REACT_APP_KAKAO_JSKEY;
    const Kakao = window.Kakao;
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init(jsKey);
    }
    await Kakao.Auth.login({
      success(res) {
        Kakao.Auth.setAccessToken(res.access_token);
        Kakao.API.request({
          url: '/v2/user/me',
          success(res) {
            const kakaoAccount = res.kakao_account;
            const checkEmailExists = async () => {
              try {
                const methods = await fetchSignInMethodsForEmail(
                  auth,
                  kakaoAccount.email,
                );
                if (methods.length > 0) {
                  try {
                    await signInWithEmailAndPassword(
                      auth,
                      kakaoAccount.email,
                      kakaoAccount.email, //비번으로 쓸값이 없음
                    );
                  } catch (error) {
                    console.error(error);
                  }
                } else {
                  createUserWithEmailAndPassword(
                    auth,
                    kakaoAccount.email,
                    kakaoAccount.email,
                  )
                    .then((userCredential) => {
                      console.log(`회원가입유저${userCredential}`);

                      navigate('/loading', {
                        state: { userUid: userUid },
                      });
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
              navigate('/loading', {
                state: { userUid: userUid },
              });
            });
          },
          fail(error) {
            console.log(error);
          },
        });
      },
      fail(error) {
        message.error('로그인 중 에러 발생:', error.code);
      },
    });
  };

  return (
    <Link to="#">
      <L.ButtonKakao onClick={kakaoLogin}>
        <img src={KakaoIcon} alt="kakao-login-medium" border="0" />
      </L.ButtonKakao>
    </Link>
  );
};

export default KakaoLogin;
