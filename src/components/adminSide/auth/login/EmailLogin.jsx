import React, { useState } from 'react';

import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      // 로그인 성공시
      alert('로그인 되었습니다.');
      navigate(`/admin/${userCredential.user.uid}`);
    } catch (error) {
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
      <h1 style={{ fontSize: '20px', lineHeight: '26px' }}>
        <b style={{ fontWeight: 'bold' }}>크리에이터를 위한</b>
        <br />단 하나의 링크, 크왕
      </h1>
      <img
        src="https://picsum.photos/350/100"
        style={{ margin: '25px auto', width: '100%' }}
        alt="배너 이미지"
      />
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
            style={{
              padding: '15.5px 15px',
              width: '100%',
              boxSizing: 'border-box',
              fontSize: '14px',
              border: '2px solid #f5f5f5',
              borderRadius: '15px',
            }}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            name="password"
            placeholder="비밀번호"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            style={{
              margin: '15px auto 0',
              padding: '15.5px 15px',
              width: '100%',
              boxSizing: 'border-box',
              fontSize: '14px',
              border: '2px solid #f5f5f5',
              borderRadius: '15px',
            }}
          />
        </div>
        <button
          type="submit"
          onClick={onLoginButtonClickHandler}
          style={{
            margin: '26px auto 0',
            width: '100%',
            height: '60px',
            fontSize: '14px',
            fontWeight: '700',
            color: '#fff',
            background: '#FFBE51',
            borderRadius: '15px',
          }}
        >
          로그인
        </button>
        <div
          style={{
            margin: '61px auto 0',
            fontSize: '14px',
            textAlign: 'center',
            color: '#484848',
          }}
        >
          SNS 계정으로 로그인
        </div>
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
