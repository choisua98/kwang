import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAtom } from 'jotai';
import Router from './shared/Router';
import { backgroundImageAtom, themeAtom } from './atoms/Atom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const queryClient = new QueryClient();

function App() {
  // 테마 상태
  const [theme, setTheme] = useAtom(themeAtom);
  // 배경 이미지
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);
  const [user, setUser] = useState('');

  // onAuthStateChanged 사용
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log({ 로그인한유저: user });
      if (user) {
        setUser(user);
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log({ onAuthStateChanged: user });
      if (user) {
        setUser(user);

        // Firestore에서 사용자의 테마 정보 불러오기
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setTheme(userData.theme || 'light');
          setBackgroundImage(userData.backgroundImage || null);
          // console.log('테마:', userData.theme);
          // console.log('배경 이미지:', userData.backgroundImage);
        }
      } else {
        // 로그인 안 한 사용자는 기본 테마로 light 사용
        setTheme('light');
        // 로그아웃 상태에서 배경이미지도 초기화
        setBackgroundImage(null);
      }
    });
    // unsubscribe();
    // cleanup 함수 등록
    return () => unsubscribe();
  }, [setUser, setTheme, user]);

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#333' : '#fff';
    document.body.style.color = theme === 'dark' ? '#fff' : '#000';
    // 배경 이미지가 있으면 body의 배경 이미지 적용
    if (backgroundImage) {
      document.body.style.backgroundImage = `url("${backgroundImage}")`;
    } else {
      // 배경 이미지가 없으면 body의 배경 이미지 제거
      document.body.style.backgroundImage = '';
    }
    // 테마나 배경이미지가 변경될 때마다 hook 실행
  }, [theme, backgroundImage]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
