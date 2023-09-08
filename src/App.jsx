import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAtom } from 'jotai';
import Router from './shared/Router';
import { backgroundImageAtom, themeAtom } from './atoms/Atom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { GlobalStyle } from './styles/GlobalStyle';
import useTheme from './hooks/useTheme';

const queryClient = new QueryClient();

function App() {
  // 테마 상태
  const [theme, setTheme] = useAtom(themeAtom);
  // 배경 이미지
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);

  // onAuthStateChanged 사용
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log({ 로그인한유저: user });
    });
    setTheme('light');
    setBackgroundImage('');
  }, []);

  // 변경: 커스텀 훅 사용
  useTheme(theme, backgroundImage);

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle theme={theme} />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
