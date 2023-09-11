import React from 'react';
import Reservation from '../../components/adminSide/options/adminBlocks/Reservation';
import { useTheme, useThemeReset } from '../../hooks/useTheme';

const AdminReservation = () => {
  const [theme, backgroundImage] = useThemeReset();
  useTheme(theme, backgroundImage);

  return <Reservation />;
};

export default AdminReservation;
