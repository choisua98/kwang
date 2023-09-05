import React, { useEffect } from 'react';
import Mailing from '../../components/adminSide/options/adminBlocks/Mailing';
import { useAtom } from 'jotai';
import { backgroundImageAtom, themeAtom } from '../../atoms/Atom';

const AdminMailing = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  // 배경 이미지
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);

  useEffect(() => {
    setTheme('light');
    setBackgroundImage(null);
  }, []);

  return <Mailing />;
};

export default AdminMailing;
