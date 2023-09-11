import React from 'react';
import Challenge from '../../components/adminSide/options/adminBlocks/Challenge';
import { useTheme, useThemeReset } from '../../hooks/useTheme';

const AdminChallenge = () => {
  const [theme, backgroundImage] = useThemeReset();
  useTheme(theme, backgroundImage);

  return <Challenge />;
};

export default AdminChallenge;
