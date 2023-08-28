import React, { useState } from 'react';

import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const EmailLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  // --이메일 로그인--
  const onLoginButtonClickHandler = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(userCredential);
    } catch (error) {
      console.error(error);
    }
    navigate('/admin');
  };

  return (
    <div>
      <div>login page</div>
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
          ></input>
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
          ></input>
        </div>
        <button type="submit" onClick={onLoginButtonClickHandler}>
          로그인
        </button>
        <br />
      </form>
    </div>
  );
};

export default EmailLogin;
