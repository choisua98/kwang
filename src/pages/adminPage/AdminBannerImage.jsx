import React from 'react';
import BannerImage from '../../components/adminSide/options/adminBlocks/BannerImage';
import { useThemeReset } from '../../hooks/useTheme';
import { useTheme } from 'styled-components';

const AdminBannerImage = () => {
  const [theme, backgroundImage] = useThemeReset();
  useTheme(theme, backgroundImage);

  return <BannerImage />;
};

export default AdminBannerImage;
