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
    const jsKey = process.env.REACT_APP_KAKAO_JSKEY;
    const Kakao = window.Kakao;

    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init(jsKey);
      console.log('카카오 이니셜라이즈', Kakao.isInitialized());
    }

    try {
      const res = await Kakao.Auth.login();
      Kakao.Auth.setAccessToken(res.access_token);
      const userData = await Kakao.API.request({
        url: '/v2/user/me',
      });
      const kakaoAccount = userData.kakao_account;
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
                kakaoAccount.email,
              );
            } catch (error) {
              console.error(error);
            }
          } else {
            try {
              const userCredential = await createUserWithEmailAndPassword(
                auth,
                kakaoAccount.email,
                kakaoAccount.email,
              );
              console.log(`카카오 회원가입 유저 ${userCredential}`);
            } catch (error) {
              console.error(error);
            }
          }
        } catch (error) {
          console.error(error);
        }
      };
      await checkEmailExists();
      alert('로그인 되었습니다.');
      navigate(`/admin/${auth.currentUser.uid}`);
    } catch (error) {
      alert('로그인 중 에러 발생:', error.code);
    }
  };

  return (
    <Link to="#">
      <button onClick={kakaoLogin} style={{ padding: 0 }}>
        <img src={KakaoIcon} alt="kakao-login-medium" border="0" />
      </button>
    </Link>
  );
};

export default KakaoLogin;
