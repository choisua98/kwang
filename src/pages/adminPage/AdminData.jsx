import React, { useEffect } from 'react';
import Data from '../../components/adminSide/adminData/Data';
import { useAtom } from 'jotai';
import { backgroundImageAtom, themeAtom } from '../../atoms/Atom';

const AdminData = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  // 배경 이미지
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);

  useEffect(() => {
    setTheme('light');
    setBackgroundImage(null);
  }, []);

  return (
    <>
      <Data />
    </>
  );
};

export default AdminData;
