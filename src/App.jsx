import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAtomValue, useSetAtom } from 'jotai';
import Router from './shared/Router';
import { backgroundImageAtom, themeAtom, userAtom } from './atoms/Atom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { GlobalStyle } from './styles/GlobalStyle';
import { useTheme } from './hooks/useTheme';

const queryClient = new QueryClient();

function App() {
  const setUser = useSetAtom(userAtom);
  const theme = useAtomValue(themeAtom);
  const backgroundImage = useAtomValue(backgroundImageAtom);

  // onAuthStateChanged 사용
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log({ 로그인한유저: user });
      setUser(user);
    });
  }, []);

  useTheme(theme, backgroundImage); // 테마

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle theme={theme} />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
