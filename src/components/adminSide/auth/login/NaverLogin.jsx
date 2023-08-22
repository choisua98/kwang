import React, { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
import { addDoc, collection } from 'firebase/firestore';

import { useAtom } from 'jotai';
import { userAtom } from '../../../../atoms/Atom';
import { db } from '../../../../firebase/firebaseConfig';
const NaverLogin = () => {
  const [user, setUser] = useAtom(userAtom);
  const auth = getAuth();

  // --파이어베이스에 데이터 저장--
  const saveUserData = async (userData) => {
    const collectionRef = collection(db, 'users');
    await addDoc(collectionRef, userData);
    // const db = firebase.firestore();
    // const usersCollection = db.collection('users');
    // return usersCollection.add(userData);
  };

  // --네이버 로그인--
  const { naver } = window;
  const NAVER_CLIENT_ID = 'hsnzexHuuJiVHO_hh5EP';
  const NAVER_CALLBACK_URL = 'http://www.localhost:3000/login';

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: 'green', type: 1, height: 50 },
      callbackHandle: true,
    });
    naverLogin.init();

    naverLogin.getLoginStatus(async (status) => {
      if (status) {
        console.log(`로그인?: ${status}`);
        setUser(naverLogin.user);
      }
    });
  };
  console.log(user);
  //8/22 데이터베이스에 넣는 로직 진행중. 네이버 로그인버튼을 누를때 한번만 데이터베이스에 들어가게 해야함. 지금은 유즈이팩트로 해도 몇번씩 들어감..

  const naverUserData = {
    age: `${user?.age}`,
    birthday: `${user?.birthday}`,
    email: `${user?.email}`,
    gender: `${user?.gender}`,
    id: `${user?.id}`,
    mobile: `${user?.mobile}`,
    name: `${user?.name}`,
    nickname: `${user?.nickname}`,
    profile_image: `${user?.profile_image}`,
  };
  useEffect(() => {
    saveUserData(naverUserData)
      .then((docRef) => {
        console.log('Document written with ID:', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document:', error);
      });
  }, [saveUserData]);

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return (
    <div>
      <span id="naverIdLogin"></span>
    </div>
  );
};

export default NaverLogin;
