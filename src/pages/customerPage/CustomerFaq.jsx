import React, { useEffect } from 'react';
import FaqService from '../../components/customerSide/options/customerBlocks/FaqService';
import { useAtom } from 'jotai';
import { backgroundImageAtom, themeAtom } from '../../atoms/Atom';

const CustomerFaq = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  // 배경 이미지
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);

  useEffect(() => {
    setTheme('light');
    setBackgroundImage(null);
  }, []);

  return (
    <>
      <FaqService />
    </>
  );
};

export default CustomerFaq;
