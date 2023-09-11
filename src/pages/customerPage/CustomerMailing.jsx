import React from 'react';
import MailingService from '../../components/customerSide/options/customerBlocks/MailingService';
import { useTheme, useThemeReset } from '../../hooks/useTheme';

const CustomerMailing = () => {
  const [theme, backgroundImage] = useThemeReset();
  useTheme(theme, backgroundImage);

  return (
    <>
      <MailingService />
    </>
  );
};

export default CustomerMailing;
