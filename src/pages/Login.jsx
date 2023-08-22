import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
} from 'firebase/auth';
import GoogleIcon from '../assets/images/google.png';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/Atom';

const Login = () => {
  // const [user, setUser] = useState(null);
  const [user, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const provider1 = new GoogleAuthProvider();
  const auth = getAuth();

  // --이메일 로그인--
  const onLoginButtonClickHandler = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(userCredential);
    } catch (error) {
      console.error(error);
    }
  };

  // --구글 로그인--
  const onGoogleLoginButtonClickHandler = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider1)
      .then((result) => {
        // setUserData(result.user); // user data 설정
        console.log(result.user);
        setUser(result.user); // console로 들어온 데이터 표시
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // // ...
      });
  };

  // 네이버 로그인

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

    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        console.log(`로그인?: ${status}`);
        setUser(naverLogin.user);
      }
      console.log(user);
    });
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  const naverLogout = () => {
    window.location.href = 'http://localhost:3000/login';
  };

  return (
    <div>
      <div>login page</div>
      <form>
        <div>
          <input
            type="email"
            value={email}
            name="email"
            placeholder="이메일"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            type="password"
            value={password}
            name="password"
            placeholder="비밀번호"
            require
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <button type="submit" onClick={onLoginButtonClickHandler}>
          로그인
        </button>
        <br />

        <img
          src={GoogleIcon}
          alt="google"
          onClick={onGoogleLoginButtonClickHandler}
          style={{
            height: '50px',
          }}
        />
        <span id="naverIdLogin"></span>
      </form>
      <div>
        {' '}
        {user ? (
          <div>
            <h2>**로그인 성공!**</h2>
            {/* <h3>이름:{user.name}</h3> */}
            <h3>이메일:{user.email}</h3>
            {/* <h3>프로필사진</h3> */}
            {/* <img src={user.profile_image} alt="프로필 사진" /> */}
            <br />
            <button onClick={naverLogout}>로그아웃</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Login;
