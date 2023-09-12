import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { backgroundImageAtom, themeAtom } from '../atoms/Atom';
import { doc, getDoc } from 'firebase/firestore';
import { message } from 'antd';

// 테마 기본 설정
export const useTheme = (theme, backgroundImage) => {
  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#333' : '#F4F3F6';
    document.body.style.color = theme === 'dark' ? '#fff' : '#333';

    if (backgroundImage) {
      document.body.style.backgroundImage = `url("${backgroundImage}")`;
    } else {
      document.body.style.backgroundImage = '';
    }
  }, [theme, backgroundImage]);
};

// 테마 초기화
export const useThemeReset = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);

  useEffect(() => {
    setTheme('light');
    setBackgroundImage(null);
  }, []);

  return [theme, backgroundImage];
};

// 사용자 테마 정보 가져오기
export const useFetchTheme = (db, userUid, setTheme, setBackgroundImage) => {
  useEffect(() => {
    const fetchTheme = async () => {
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
          message.error('데이터 가져오기 오류:', error);
        }
      }
    };
    fetchTheme();
  }, [db, setTheme, setBackgroundImage, userUid]);
};
