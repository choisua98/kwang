import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { backgroundImageAtom, themeAtom } from '../atoms/Atom';

// 테마 기본 설정
export const useTheme = (theme, backgroundImage) => {
  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#333' : '#fff';
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
