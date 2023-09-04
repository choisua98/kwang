import React, { useEffect, useState } from 'react';
import Profile from '../components/customerSide/profile/Profile';
import LinkService from '../components/customerSide/linkService/LinkService';
import { useParams } from 'react-router-dom';
import CustomerBlocks from '../components/customerSide/customerBlocks/CustomerBlocks';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAtom } from 'jotai';
import { backgroundImageAtom, themeAtom } from '../atoms/Atom';

const Main = () => {
  // 테마 상태
  const [theme, setTheme] = useAtom(themeAtom);
  // 배경 이미지
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);
  const { uid } = useParams();
  const userUid = uid;
  console.log(userUid);

  useEffect(() => {
    console.log('useEffect들어옴');
    const unsubscribe = async (userUid) => {
      if (userUid) {
        console.log('userUid있음');
        // Firestore에서 사용자의 테마 정보 불러오기
        try {
          const userDocRef = doc(db, 'users', userUid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setTheme(userData.theme || 'light');
            setBackgroundImage(userData.backgroundImage || null);
          }
        } catch (error) {
          console.error('데이터 가져오기 오류:', error);
        }
      }
    };
    unsubscribe(userUid);
    // cleanup 함수 등록
    return () => unsubscribe();
  }, [setTheme, userUid]);

  return (
    <div>
      <div style={{ padding: '20px' }}>
        <Profile />
        <LinkService />
        <CustomerBlocks />
      </div>
    </div>
  );
};

export default Main;
