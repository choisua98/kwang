import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAtom } from 'jotai';
import Router from './shared/Router';
import { backgroundImageAtom, themeAtom, userAtom } from './atoms/Atom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const queryClient = new QueryClient();

function App() {
  const [theme, setTheme] = useAtom(themeAtom);
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);
  const [, setUser] = useAtom(userAtom); // userAtom 사용

  // onAuthStateChanged 사용
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
        }
      } else {
        // 로그인 안 한 사용자는 기본 테마로 light 사용
        setTheme('light');
        // 로그아웃 상태에서 배경이미지도 초기화
        setBackgroundImage(null);
      }
    });

    // cleanup 함수 등록
    return () => unsubscribe();
  }, [setUser, setTheme, setBackgroundImage]);

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#333' : '#fff';
    document.body.style.color = theme === 'dark' ? '#fff' : '#000';
    if (backgroundImage) {
      document.body.style.backgroundImage = `url("${backgroundImage}")`;
      document.body.style.backgroundSize = 'cover';
    } else {
      document.body.style.backgroundImage = '';
    }
  }, [theme, backgroundImage]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedBackgroundImage = localStorage.getItem('backgroundImage');
    if (savedTheme) setTheme(savedTheme);
    if (savedBackgroundImage) setBackgroundImage(savedBackgroundImage);
  }, [setBackgroundImage, setTheme]);

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#333' : '#fff';
    document.body.style.color = theme === 'dark' ? '#fff' : '#000';
    if (backgroundImage) {
      document.body.style.backgroundImage = `url("${backgroundImage}")`;
      document.body.style.backgroundSize = 'cover';
    } else {
      document.body.style.backgroundImage = '';
    }
  }, [theme, backgroundImage]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
