import React, { useEffect } from 'react';
import Challenge from '../../components/adminSide/options/adminBlocks/Challenge';
import { useAtom } from 'jotai';
import { backgroundImageAtom, themeAtom } from '../../atoms/Atom';

const AdminChallenge = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  // 배경 이미지
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);

  useEffect(() => {
    setTheme('light');
    setBackgroundImage(null);
  }, []);

  return <Challenge />;
};

export default AdminChallenge;
