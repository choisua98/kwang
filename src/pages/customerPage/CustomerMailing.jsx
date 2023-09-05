import React, { useEffect } from 'react';
import MailingService from '../../components/customerSide/options/customerBlocks/MailingService';
import { useAtom } from 'jotai';
import { backgroundImageAtom, themeAtom } from '../../atoms/Atom';

const CustomerMailing = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  // 배경 이미지
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);

  useEffect(() => {
    setTheme('light');
    setBackgroundImage(null);
  }, []);

  return (
    <>
      <MailingService />
    </>
  );
};

export default CustomerMailing;
