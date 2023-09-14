import React, { useState } from 'react';

import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { L } from './Login.styles';
import { message } from 'antd';
import { ERR_CODE } from '../ERR_CODE';

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
        message.error('이메일을 입력해주세요.');
        return;
      }
      if (!password) {
        message.error('비밀번호를 입력해주세요.');
        return;
      }
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      // 로그인 성공시
      message.success('로그인 되었습니다.');
      navigate(`/admin/${userCredential.user.uid}`);
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
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <L.EmailInput
            type="password"
            value={password}
            name="password"
            placeholder="비밀번호"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
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
