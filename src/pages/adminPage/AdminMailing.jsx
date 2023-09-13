import React from 'react';
import Mailing from '../../components/adminSide/options/adminBlocks/Mailing';
import { useTheme, useThemeReset } from '../../hooks/useTheme';

const AdminMailing = () => {
  const [theme, backgroundImage] = useThemeReset();
  useTheme(theme, backgroundImage);

  return <Mailing />;
};

export default AdminMailing;
