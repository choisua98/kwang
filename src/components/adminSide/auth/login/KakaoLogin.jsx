// import {
//   createUserWithEmailAndPassword,
//   fetchSignInMethodsForEmail,
//   getAuth,
//   signInWithEmailAndPassword,
// } from 'firebase/auth';
// import KakaoIcon from '../../../../assets/images/kakao.png';
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { message } from 'antd';
// import { useAtomValue } from 'jotai';
// import { userAtom } from '../../../../atoms/Atom';

// const KakaoLogin = () => {
//   const navigate = useNavigate();
//   const auth = getAuth();
//   const user = useAtomValue(userAtom);
//   const userUid = user?.uid;

//   const kakaoLogin = async () => {
//     const jsKey = process.env.REACT_APP_KAKAO_JSKEY;
//     const Kakao = window.Kakao;
//     if (Kakao && !Kakao.isInitialized()) {
//       Kakao.init(jsKey);
//     }
//     await Kakao.Auth.login({
//       success(res) {
//         Kakao.Auth.setAccessToken(res.access_token);
//         Kakao.API.request({
//           url: '/v2/user/me',
//           success(res) {
//             const kakaoAccount = res.kakao_account;
//             const checkEmailExists = async () => {
//               try {
//                 const methods = await fetchSignInMethodsForEmail(
//                   auth,
//                   kakaoAccount.email,
//                 );
//                 if (methods.length > 0) {
//                   try {
//                     await signInWithEmailAndPassword(
//                       auth,
//                       kakaoAccount.email,
//                       kakaoAccount.email, //비번으로 쓸값이 없음
//                     );
//                   } catch (error) {
//                     console.error(error);
//                   }
//                 } else {
//                   createUserWithEmailAndPassword(
//                     auth,
//                     kakaoAccount.email,
//                     kakaoAccount.email,
//                   )
//                     .then((userCredential) => {
//                       console.log(`회원가입유저${userCredential}`);
//                       console.log('회원가입성공. 이메일로 로그인완료.');
//                       navigate('/loading');
//                     })
//                     .catch((error) => {
//                       console.error(error);
//                     });
//                 }
//               } catch (error) {
//                 console.error(error);
//               }
//             };
//             checkEmailExists().then((res) => {
//               navigate(`/admin/${userUid}`);
//               message.success('로그인 되었습니다.');
//             });
//           },
//           fail(error) {
//             console.log(error);
//           },
//         });
//       },
//       fail(error) {
//         message.error('로그인 중 에러 발생:', error.code);
//       },
//     });
//   };

//   return (
//     <Link to="#">
//       <button onClick={kakaoLogin} style={{ padding: 0 }}>
//         <img src={KakaoIcon} alt="kakao-login-medium" border="0" />
//       </button>
//     </Link>
//   );
// };

// export default KakaoLogin;

import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import KakaoIcon from '../../../../assets/images/kakao.png';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { L } from './Login.styles';
import { message } from 'antd';
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

    try {
      const { access_token } = await Kakao.Auth.login();
      Kakao.Auth.setAccessToken(access_token);

      const { kakao_account } = await Kakao.API.request({
        url: '/v2/user/me',
      });

      const checkEmailExists = async () => {
        try {
          const methods = await fetchSignInMethodsForEmail(
            auth,
            kakao_account.email,
          );
          if (methods.length > 0) {
            try {
              await signInWithEmailAndPassword(
                auth,
                kakao_account.email,
                kakao_account.email, // 비밀번호로 쓸 값이 없음
              );
            } catch (error) {
              console.error(error);
            }
          } else {
            await createUserWithEmailAndPassword(
              auth,
              kakao_account.email,
              kakao_account.email,
            );
            navigate('/loading');
          }
        } catch (error) {
          console.error(error);
        }
      };

      await checkEmailExists();
      navigate('/loading');
    } catch (error) {
      message.error(`로그인 중 에러 발생: ${error.code}`);
    }
  };

  return (
    <Link to="#">
      <L.ButtonKakao onClick={kakaoLogin}>
        <img src={KakaoIcon} alt="kakao-login-medium" />
      </L.ButtonKakao>
    </Link>
  );
};

export default KakaoLogin;
