import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // 회원가입 버튼클릭 핸들러
  const onSignupButtonClickHandler = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // 회원가입 성공시
        console.log(userCredential);
      })
      .catch((error) => {
        // 회원가입 실패시
        console.error(error);
      });
    navigate('/admin');
  };

  return (
    <div>
      <div>signup page</div>
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
        <div>
          <input
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            placeholder="비밀번호 확인"
            required
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          ></input>
        </div>
        <button type="submit" onClick={onSignupButtonClickHandler}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Signup;
