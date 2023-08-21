import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
} from 'firebase/auth';

const Login = () => {
  const [user, setUser] = useState(null);
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
        console.log(result); // console로 들어온 데이터 표시
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  // ---네이버 로그인---
  const { naver } = window;

  const naverLogin = new naver.LoginWithNaverId({
    clientId: 'hsnzexHuuJiVHO_hh5EP',
    // process.env.REACT_APP_NAVER_CLIENT_ID,
    callbackUrl: 'http://www.localhost:3000/login',
    isPopup: true,
    loginButton: {
      color: 'green',
      type: 1,
      height: 50,
    },
  });

  useEffect(() => {
    naverLogin.init(); //초기화
    console.log('init!');
    getUser();
  }, []);

  const getUser = async () => {
    await naverLogin.getLoginStatus((status) => {
      console.log(`로그인?: ${status}`);
      if (status) {
        setUser({ ...naverLogin.user });
        if (window.opener && window.opener.location) {
          window.opener.location.href = 'http://localhost:3000/login';
          window.close();
        }
      }
    });
  };

  const naverLogout = () => {
    localStorage.removeItem('com.naver.nid.access_token');
    window.location.reload();
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
        <button onClick={onGoogleLoginButtonClickHandler}>google</button>
        <div className="grid-naver" id="naverIdLogin"></div>
      </form>
      <div>
        {user ? (
          <div>
            <h2>네이버 로그인 성공!</h2>
            <h3>사용자 이름</h3>
            <div>{user.name}</div>
            <h3>사용자 이메일</h3>
            <div>{user.email}</div>
            <h3>사용자 프로필사진</h3>
            <img src={user.profile_image} alt="프로필 사진" />
            <button onClick={naverLogout}>로그아웃</button>
          </div>
        ) : (
          // 네이버 로그인 버튼
          <div>
            <div id="naverIdLogin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
