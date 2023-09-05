import React, { useEffect } from 'react';
import ReservationService from '../../components/customerSide/options/customerBlocks/ReservationService';
import { useAtom } from 'jotai';
import { backgroundImageAtom, themeAtom } from '../../atoms/Atom';

const CustomerReservation = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  // 배경 이미지
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);

  useEffect(() => {
    setTheme('light');
    setBackgroundImage(null);
  }, []);

  return <ReservationService />;
};

export default CustomerReservation;
