import React from 'react';
import GoogleIcon from '../../../../assets/images/google.png';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useAtom } from 'jotai';
import { userAtom } from '../../../../atoms/Atom';
import firebase from 'firebase/app';
import 'firebase/firestore';

const GoogleLogin = () => {
  const [user, setUser] = useAtom(userAtom);
  const auth = getAuth();
  const provider1 = new GoogleAuthProvider();
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
  const googleLogout = () => {
    window.location.href = 'http://localhost:3000/login';
  };

  return (
    <div>
      <div>
        {' '}
        <img
          src={GoogleIcon}
          alt="google"
          onClick={onGoogleLoginButtonClickHandler}
          style={{
            height: '50px',
          }}
        />
      </div>
    </div>
  );
};

export default GoogleLogin;
