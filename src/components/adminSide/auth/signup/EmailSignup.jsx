import React, { useState } from 'react';
import { auth } from '../../../../firebase/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { E } from './EmailSignup.styles';
import { message } from 'antd';
import { ERR_CODE } from '../ERR_CODE';

const EmailSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // 이메일 중복확인 버튼클릭 핸들러
  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const onDuplicateCheckButtonClickHandler = async () => {
    if (!email) {
      message.error('이메일을 입력해주세요.');
      return;
    }
    if (!isEmailValid(email)) {
      message.error('올바른 이메일 형식이 아닙니다.');
      return;
    }
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        message.error('이미 사용 중인 이메일입니다.');
      } else {
        message.error('사용 가능한 이메일입니다.');
      }
    } catch (error) {
      message.error('에러 발생:', error);
    }
  };
  // 회원가입 버튼클릭 핸들러
  const onSignupButtonClickHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      message.error('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      if (password === confirmPassword) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        message.success('회원가입에 성공하셨습니다.');
        navigate(`/admin/${userCredential.user.uid}`);
      } else {
        message.error(ERR_CODE['auth/wrong-password']);
      }
    } catch (error) {
      message.error(ERR_CODE[error.code]);
    } finally {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
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
        <E.SignupButton type="submit" onClick={onSignupButtonClickHandler}>
          회원가입하기
        </E.SignupButton>
      </E.FormContainer>
    </>
  );
};

export default EmailSignup;
