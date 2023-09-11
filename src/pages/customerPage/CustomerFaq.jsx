import React from 'react';
import FaqService from '../../components/customerSide/options/customerBlocks/FaqService';
import { useTheme, useThemeReset } from '../../hooks/useTheme';

const CustomerFaq = () => {
  const [theme, backgroundImage] = useThemeReset();
  useTheme(theme, backgroundImage);

  return (
    <>
      <FaqService />
    </>
  );
};

export default CustomerFaq;
