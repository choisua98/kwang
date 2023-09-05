import React, { useEffect } from 'react';
import Theme from '../../components/adminSide/myadmin/theme/Theme';
import MyProfile from '../../components/adminSide/myadmin/myprofile/MyProfile';
import Links from '../../components/adminSide/myadmin/links/Links';
import Blocks from '../../components/adminSide/myadmin/blocks/Blocks';
import BlocksArea from '../../components/adminSide/myadmin/blocksArea/BlocksArea';
import { backgroundImageAtom, themeAtom } from '../../atoms/Atom';
import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

const Admin = () => {
  // 테마 상태
  const [theme, setTheme] = useAtom(themeAtom);
  // 배경 이미지
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);
  const { uid } = useParams();
  const userUid = uid;

  useEffect(() => {
    const unsubscribe = async (userUid) => {
      if (userUid) {
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
    <div style={{ padding: '20px 20px 74px' }}>
      <Theme />
      <MyProfile />
      <Links />
      <BlocksArea />
      <Blocks />
    </div>
  );
};

export default Admin;
