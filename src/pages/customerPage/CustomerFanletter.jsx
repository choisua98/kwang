import React, { useEffect } from 'react';
import FanletterService from '../../components/customerSide/options/customerBlocks/FanletterService';
import { useAtom } from 'jotai';
import { backgroundImageAtom, themeAtom } from '../../atoms/Atom';

const CustomerFanletter = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  // 배경 이미지
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);

  useEffect(() => {
    setTheme('light');
    setBackgroundImage(null);
  }, []);

  return (
    <>
      <FanletterService />
    </>
  );
};

export default CustomerFanletter;
