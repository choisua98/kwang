import React, { useEffect } from 'react';
import FanLetter from '../../components/adminSide/options/adminBlocks/FanLetter';
import { useAtom } from 'jotai';
import { backgroundImageAtom, themeAtom } from '../../atoms/Atom';

const AdminFanLetter = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  // 배경 이미지
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);

  useEffect(() => {
    setTheme('light');
    setBackgroundImage(null);
  }, []);

  return <FanLetter />;
};

export default AdminFanLetter;
