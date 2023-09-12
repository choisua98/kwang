import React from 'react';
import BannerImage from '../../components/adminSide/options/adminBlocks/BannerImage';
import { useTheme, useThemeReset } from '../../hooks/useTheme';

const AdminBannerImage = () => {
  const [theme, backgroundImage] = useThemeReset();
  useTheme(theme, backgroundImage);

  return <BannerImage />;
};

export default AdminBannerImage;
