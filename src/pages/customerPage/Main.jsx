import React from 'react';
import Profile from '../../components/customerSide/myhome/profile/Profile';
import LinkService from '../../components/customerSide/myhome/linkService/LinkService';
import { useParams } from 'react-router-dom';
import CustomerBlocks from '../../components/customerSide/myhome/blocksArea/CustomerBlocks';
import { db } from '../../firebase/firebaseConfig';
import { C } from './Customer.styles';
import { useAtom } from 'jotai';
import { backgroundImageAtom, themeAtom } from '../../atoms/Atom';
import { useFetchTheme } from '../../hooks/useTheme';

const Main = () => {
  const [theme, setTheme] = useAtom(themeAtom); // 테마 상태
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom); // 배경 이미지
  const { uid } = useParams();
  const userUid = uid;

  useFetchTheme(db, userUid, setTheme, setBackgroundImage);

  return (
    <C.Container>
      <Profile />
      <LinkService />
      <CustomerBlocks />
    </C.Container>
  );
};

export default Main;
