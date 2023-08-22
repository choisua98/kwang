import { useAtomValue } from 'jotai';
import React from 'react';
import { userAtom } from '../atoms/Atom';

const Home = () => {
  const user = useAtomValue(userAtom);
  console.log(user);
  const naverLogout = () => {
    localStorage.removeItem('com.naver.nid.access_token');
    window.location.reload();
  };
  return (
    <div>
      home{' '}
      {user ? (
        <div>
          <h2>네이버 로그인 성공!</h2>
          <h3>사용자 이름</h3>
          <div>{user.name}</div>
          <h3>사용자 이메일</h3>
          <div>{user.email}</div>
          <h3>사용자 프로필사진</h3>
          <img src={user.profile_image} alt="프로필 사진" />
          <button onClick={naverLogout}>로그아웃</button>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
