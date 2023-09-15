import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import useInputs from '../../../../hooks/useInputs';
import { L } from './Login.styles';
import { message } from 'antd';
import { ERR_CODE } from '../ERR_CODE';

const EmailLogin = () => {
  const [{ email, password }, onChange] = useInputs({
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // password 상태가 변경될 때마다 passwordError를 null로 설정
    setPasswordError(null);
  }, [password]);

  // --이메일 로그인 버튼클릭 핸들러--
  const onLoginButtonClickHandler = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        setEmailError('이메일을 입력해주세요.');
        return;
      }
      if (!password) {
        setPasswordError('비밀번호를 입력해주세요.');
        return;
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      navigate('/loading', {
        state: { userUid: `${userCredential.user.uid}` },
      });
    } catch (error) {
      message.error(ERR_CODE[error.code]);
    }
  };

  return (
    <>
      <L.Title>
        <b>크리에이터를 위한</b>
        <br />단 하나의 링크, 크왕
      </L.Title>
      <L.Image src="https://picsum.photos/350/100" alt="배너 이미지" />
      <form>
        <div>
          <L.EmailInput
            type="email"
            value={email}
            name="email"
            placeholder="이메일"
            required
            onChange={onChange}
          />
          {emailError && <L.Error>{emailError}</L.Error>}
        </div>

        <div>
          <L.EmailInput
            type="password"
            value={password}
            name="password"
            placeholder="비밀번호"
            required
            onChange={onChange}
          />
          {passwordError && <L.Error>{passwordError}</L.Error>}
        </div>
        <L.LoginMoveButton type="submit" onClick={onLoginButtonClickHandler}>
          로그인
        </L.LoginMoveButton>
        <L.GridBox>SNS 계정으로 로그인</L.GridBox>
      </form>
    </>
  );
};

export default EmailLogin;
