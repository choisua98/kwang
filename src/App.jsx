import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAtom } from 'jotai';
import Router from './shared/Router';

import { backgroundImageAtom, themeAtom, userAtom } from './atoms/Atom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';

const queryClient = new QueryClient();

function App() {
  const [theme, setTheme] = useAtom(themeAtom);
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);
  const [, setUser] = useAtom(userAtom); // userAtom 사용

  // onAuthStateChanged 사용
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log({ onAuthStateChanged: user });
      user ? setUser(user) : setUser(null);
    });

    // cleanup 함수 등록
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // 로컬 스토리지에서 저장된 테마 정보 불러오기
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      // 로컬 상태에 테마 설정
      setTheme(savedTheme);
    }

    // 로컬 스토리지에서 저장된 배경 이미지 불러오기
    const savedBackgroundImage = localStorage.getItem('backgroundImage');
    if (savedBackgroundImage) {
      setBackgroundImage(savedBackgroundImage);
    }

    // 테마와 배경 이미지 스타일
    document.body.style.backgroundColor = theme === 'dark' ? '#333' : '#fff';
    document.body.style.color = theme === 'dark' ? '#fff' : '#000';

    if (backgroundImage) {
      document.body.style.height = '100vh';
      document.body.style.backgroundImage = `url("${backgroundImage}")`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
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
