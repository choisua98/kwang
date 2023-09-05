import React, { useEffect } from 'react';
import Reservation from '../../components/adminSide/options/adminBlocks/Reservation';
import { useAtom } from 'jotai';
import { backgroundImageAtom, themeAtom } from '../../atoms/Atom';

const AdminReservation = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  // 배경 이미지
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);

  useEffect(() => {
    setTheme('light');
    setBackgroundImage(null);
  }, []);

  return <Reservation />;
};

export default AdminReservation;
