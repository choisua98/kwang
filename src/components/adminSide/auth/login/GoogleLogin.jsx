import React from 'react';
import GoogleIcon from '../../../../assets/images/google.png';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useAtom } from 'jotai';
import { userAtom } from '../../../../atoms/Atom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
  const navigate = useNavigate();
  // const [user, setUser] = useAtom(userAtom);
  // console.log({ 로그인한유저: user });
  const auth = getAuth();
  const provider1 = new GoogleAuthProvider();
  // --구글 로그인--
  const onGoogleLoginButtonClickHandler = async (e) => {
    e.preventDefault();
    await signInWithPopup(auth, provider1)
      .then((result) => {
        console.log(result.user);
        // setUser(result.user); // console로 들어온 데이터 표시
      })
      .catch((error) => {});
    navigate('/admin');
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
