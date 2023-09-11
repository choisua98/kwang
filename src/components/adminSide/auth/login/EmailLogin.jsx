import React, { useState } from 'react';

import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { E } from './EmailLogin.styles';

const EmailLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  // --이메일 로그인 버튼클릭 핸들러--
  const onLoginButtonClickHandler = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        alert('이메일을 입력해주세요.');
        return;
      }
      if (!password) {
        alert('비밀번호를 입력해주세요.');
        return;
      }
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // 로그인 성공시
          console.log(userCredential);
          navigate(`/admin/${userCredential.user.uid}`);
        },
      );
    } catch (error) {
      console.log(error.code);
      alert(getErrorMessage(error.code));
    }
  };

  // 에러 코드에 따른 유효성 검사
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return '가입되지 않은 이메일입니다.';
      case 'auth/wrong-password':
        return '잘못된 비밀번호입니다.';
      case 'auth/network-request-failed':
        return '네트워크 연결에 실패 하였습니다.';
      case 'auth/invalid-email':
        return '잘못된 이메일 형식입니다.';
      case 'auth/internal-error':
        return '잘못된 요청입니다.';
      default:
        return '로그인에 실패하셨습니다.';
    }
  };
  return (
    <>
      <E.Title style={{ fontSize: '20px', lineHeight: '26px' }}>
        <b>크리에이터를 위한</b>
        <br />단 하나의 링크, 크왕
      </E.Title>
      <E.Image src="https://picsum.photos/350/100" alt="배너 이미지" />
      <form>
        <div>
          <E.EmailInput
            type="email"
            value={email}
            name="email"
            placeholder="이메일"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <E.EmailInput
            type="password"
            value={password}
            name="password"
            placeholder="비밀번호"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            style={{ marginTop: '15px' }}
          />
        </div>
        <E.LoginMoveButton type="submit" onClick={onLoginButtonClickHandler}>
          로그인
        </E.LoginMoveButton>
        <E.GridBox>SNS 계정으로 로그인</E.GridBox>
        {/* Login.jsx로 회원가입 버튼 이동 */}
        {/* <button
          onClick={() => {
            navigate('/signup');
          }}
        >
          회원가입
        </button> */}
      </form>
    </>
  );
};

export default EmailLogin;
