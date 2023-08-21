import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
} from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const provider1 = new GoogleAuthProvider();
  const auth = getAuth();

  //구글 로그인 버튼 클릭 핸들러
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

  //로그인 버튼 클릭 핸들러
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
      </form>
    </div>
  );
};

export default Login;
