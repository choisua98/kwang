import React, { useState } from 'react';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { E } from './EmailLogin.styles';
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

      navigate('/loading', {
        state: { userUid: `${userCredential.user.uid}` },
      });
    } catch (error) {
      message.error(ERR_CODE[error.code]);
    }
  };

  return (
    <>
      <E.Title style={{ fontSize: '20px', lineHeight: '26px' }}>
        <b>크리에이터를 위한</b>
        <br />단 하나의 링크, 크왕
      </E.Title>
      <E.Image src="https://picsum.photos/350/100" alt="배너 이미지" />
      <form onSubmit={onLoginButtonClickHandler}>
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
        <E.LoginMoveButton type="submit">로그인</E.LoginMoveButton>
        <E.GridBox>SNS 계정으로 로그인</E.GridBox>
      </form>
    </>
  );
};

export default EmailLogin;
