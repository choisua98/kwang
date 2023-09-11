import React from 'react';
import FanLetter from '../../components/adminSide/options/adminBlocks/FanLetter';
import { useTheme, useThemeReset } from '../../hooks/useTheme';

const AdminFanLetter = () => {
  const [theme, backgroundImage] = useThemeReset();
  useTheme(theme, backgroundImage);

  return <FanLetter />;
};

export default AdminFanLetter;
