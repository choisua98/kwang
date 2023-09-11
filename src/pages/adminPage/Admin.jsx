import React, { useEffect } from 'react';
import Theme from '../../components/adminSide/myadmin/theme/Theme';
import MyProfile from '../../components/adminSide/myadmin/myprofile/MyProfile';
import Links from '../../components/adminSide/myadmin/links/Links';
import Blocks from '../../components/adminSide/myadmin/blocks/Blocks';
import BlocksArea from '../../components/adminSide/myadmin/blocksArea/BlocksArea';
import { backgroundImageAtom, themeAtom } from '../../atoms/Atom';
import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebaseConfig';
import { useFetchTheme } from '../../hooks/useTheme';

const Admin = () => {
  const [theme, setTheme] = useAtom(themeAtom); // 테마 상태
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom); // 배경 이미지
  const { uid } = useParams();
  const userUid = uid;

  useFetchTheme(db, userUid, setTheme, setBackgroundImage);

  return (
    <div style={{ padding: '20px 20px 74px' }}>
      <Theme />
      <MyProfile />
      <Links />
      <BlocksArea />
      <Blocks />
    </div>
  );
};

export default Admin;
