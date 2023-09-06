import React, { useEffect } from 'react';
import BannerImage from '../../components/adminSide/options/adminBlocks/BannerImage/BannerImage';
import { useAtom } from 'jotai';
import { backgroundImageAtom, themeAtom } from '../../atoms/Atom';

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
