import React, { useEffect } from 'react';
import Faq from '../../components/adminSide/options/adminBlocks/Faq';
import { backgroundImageAtom, themeAtom } from '../../atoms/Atom';
import { useAtom } from 'jotai';

const AdminFaq = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  // 배경 이미지
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);

  // onAuthStateChanged 사용
  useEffect(() => {
    setTheme('light');
    setBackgroundImage(null);
  }, []);

  return <Faq />;
};

export default AdminFaq;
