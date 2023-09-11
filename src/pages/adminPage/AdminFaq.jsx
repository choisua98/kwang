import React from 'react';
import Faq from '../../components/adminSide/options/adminBlocks/Faq';
import { useTheme, useThemeReset } from '../../hooks/useTheme';

const AdminFaq = () => {
  const [theme, backgroundImage] = useThemeReset();
  useTheme(theme, backgroundImage);

  return <Faq />;
};

export default AdminFaq;
