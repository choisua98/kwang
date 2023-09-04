import React, { useState } from 'react';
import { auth } from '../../../../firebase/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { E } from './EmailSignup.styles';

const EmailSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // 이메일 중복확인 버튼클릭 핸들러
  const onDuplicateCheckButtonClickHandler = async () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        alert('이미 사용 중인 이메일입니다.');
      } else {
        alert('사용 가능한 이메일입니다.');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };
  // 회원가입 버튼클릭 핸들러
  const onSignupButtonClickHandler = async (e) => {
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
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            // 회원가입 성공시
            console.log(userCredential);
            alert('회원가입에 성공하셨습니다.');
            navigate('/admin');
          },
        );
      } else {
        alert(getErrorMessage('auth/wrong-password'));
      }
    } catch (error) {
      alert(getErrorMessage(error.code));
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };
  // 에러 코드에 따른 유효성 검사
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
      case 'auth/missing-email':
        return '잘못된 이메일입니다.';
      case 'auth/missing-password':
        return '잘못된 비밀번호입니다.';
      case 'auth/wrong-password':
        return '비밀번호가 일치하지 않습니다.';
      case 'auth/email-already-in-use':
        return '이미 사용 중인 이메일입니다.';
      case 'auth/weak-password':
        return '비밀번호는 6글자 이상이어야 합니다.';
      case 'auth/network-request-failed':
        return '네트워크 연결에 실패 하였습니다.';
      case 'auth/invalid-email':
        return '잘못된 이메일 형식입니다.';
      case 'auth/internal-error':
        return '잘못된 요청입니다.';
      default:
        return '회원가입에 실패하셨습니다.';
    }
  };

  return (
    <>
      <E.FormContainer style={{ position: 'relative', height: '100%' }}>
        <label>아이디(이메일)</label>
        <E.EmailDiv>
          <input
            type="email"
            value={email}
            name="email"
            placeholder="이메일 주소"
            required
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button type="button" onClick={onDuplicateCheckButtonClickHandler}>
            중복확인
          </button>
        </E.EmailDiv>

        <E.PasswordDiv>
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            name="password"
            placeholder="비밀번호"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            placeholder="비밀번호 확인"
            required
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </E.PasswordDiv>
        <Button
          type="submit"
          onClick={onSignupButtonClickHandler}
          style={{
            position: 'absolute',
            bottom: '38px',
            margin: '0 auto',
            display: 'block',
            width: '100%',
            height: '60px',
            fontSize: '14px',
            fontWeight: '700',
            textDecoration: 'underline',
            color: '#fff',
            borderRadius: '15px',
            background: '#FFBE51',
          }}
        >
          회원가입하기
        </Button>
      </E.FormContainer>
    </>
  );
};

export default EmailSignup;
