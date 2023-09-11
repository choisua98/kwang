import React from 'react';
import ReservationService from '../../components/customerSide/options/customerBlocks/ReservationService';
import { useTheme, useThemeReset } from '../../hooks/useTheme';

const CustomerReservation = () => {
  const [theme, backgroundImage] = useThemeReset();
  useTheme(theme, backgroundImage);

  return <ReservationService />;
};

export default CustomerReservation;
