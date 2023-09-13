import React from 'react';
import GoogleIcon from '../../../../assets/images/google.png';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const provider1 = new GoogleAuthProvider();

  // --구글 로그인버튼 클릭시--
  const onGoogleLoginButtonClickHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider1);
      message.success('로그인 되었습니다.');
      navigate(`/admin/${result.user.uid}`);
    } catch (error) {
      message.error('로그인 중 에러 발생:', error.code);
    }
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
