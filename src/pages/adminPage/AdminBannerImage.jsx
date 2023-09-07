import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { backgroundImageAtom, themeAtom } from '../../atoms/Atom';
import BannerImage from '../../components/adminSide/options/adminBlocks/BannerImage';

const AdminBannerImage = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  // 배경 이미지
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);

  useEffect(() => {
    setTheme('light');
    setBackgroundImage(null);
  }, []);

  return <BannerImage />;
};

export default AdminBannerImage;
