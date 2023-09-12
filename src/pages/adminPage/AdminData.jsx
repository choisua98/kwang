import React from 'react';
import Data from '../../components/adminSide/adminData/Data';
import { useTheme, useThemeReset } from '../../hooks/useTheme';

const AdminData = () => {
  const [theme, backgroundImage] = useThemeReset();
  useTheme(theme, backgroundImage);

  return (
    <>
      <Data />
    </>
  );
};

export default AdminData;
