import React, { useEffect, useState } from 'react';
import { auth } from '../../../../firebase/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import useInputs from '../../../../hooks/useInputs';
import { E } from './EmailSignup.styles';
import { message } from 'antd';
import { ERR_CODE } from '../ERR_CODE';

const EmailSignup = () => {
  const navigate = useNavigate();

  const [{ email, password, confirmPassword }, onChange] = useInputs({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  useEffect(() => {
    // password 상태가 변경될 때마다 passwordError를 null로 설정
    setPasswordError(null);
  }, [password]);

  // 이메일 중복확인 버튼클릭 핸들러
  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const onDuplicateCheckButtonClickHandler = async () => {
    if (!email) {
      setEmailError('이메일을 입력해주세요.');
      return;
    }
    if (!isEmailValid(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
      return;
    }
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        setEmailError('이미 사용 중인 이메일입니다.');
      } else {
        setEmailError('사용 가능한 이메일입니다.');
      }
    } catch (error) {
      message.error('에러 발생:', error);
    }
  };
  // 회원가입 버튼클릭 핸들러
  const onSignupButtonClickHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError('이메일을 입력해주세요.');
      return;
    }
    if (!password) {
      setPasswordError('비밀번호를 입력해주세요.');
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
        navigate('/loading', {
          state: { userUid: `${userCredential.user.uid}` },
        });
      } else {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      message.error(ERR_CODE[error.code]);
    } finally {
      // reset();
    }
  };

  return (
    <>
      <E.FormContainer>
        <label>아이디(이메일)</label>
        <E.EmailDiv>
          <input
            type="email"
            value={email}
            name="email"
            placeholder="이메일 주소"
            required
            autoFocus
            onChange={onChange}
          />

          <button type="button" onClick={onDuplicateCheckButtonClickHandler}>
            중복확인
          </button>
        </E.EmailDiv>
        {emailError && <E.Error>{emailError}</E.Error>}

        <E.PasswordDiv>
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            name="password"
            placeholder="비밀번호"
            onChange={onChange}
          />
          <input
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            placeholder="비밀번호 확인"
            onChange={onChange}
          />
        </E.PasswordDiv>
        {passwordError && <E.Error>{passwordError}</E.Error>}

        <E.SignupButton type="submit" onClick={onSignupButtonClickHandler}>
          회원가입하기
        </E.SignupButton>
      </E.FormContainer>
    </>
  );
};

export default EmailSignup;
