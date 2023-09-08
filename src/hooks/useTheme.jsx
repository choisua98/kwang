import { useEffect } from 'react';

const useTheme = (theme, backgroundImage) => {
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

export default useTheme;
