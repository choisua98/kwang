import React from 'react';
import FanletterService from '../../components/customerSide/options/customerBlocks/FanletterService';
import { useTheme, useThemeReset } from '../../hooks/useTheme';

const CustomerFanletter = () => {
  const [theme, backgroundImage] = useThemeReset();
  useTheme(theme, backgroundImage);

  return (
    <>
      <FanletterService />
    </>
  );
};

export default CustomerFanletter;
