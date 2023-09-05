import React from 'react';
import GoogleIcon from '../../../../assets/images/google.png';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const provider1 = new GoogleAuthProvider();

  // --구글 로그인버튼 클릭시--
  const onGoogleLoginButtonClickHandler = async (e) => {
    e.preventDefault();
    await signInWithPopup(auth, provider1)
      .then((result) => {
        console.log(result.user);
        navigate(`/admin/${result.user.uid}`);
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

  return (
    <Link to="#">
      <img
        src={GoogleIcon}
        alt="google"
        onClick={onGoogleLoginButtonClickHandler}
      />
    </Link>
  );
};

export default GoogleLogin;
