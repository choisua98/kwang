import React from 'react';
import Theme from '../../components/adminSide/myadmin/theme/Theme';
import MyProfile from '../../components/adminSide/myadmin/myprofile/MyProfile';
import Links from '../../components/adminSide/myadmin/links/Links';
import Blocks from '../../components/adminSide/myadmin/blocks/Blocks';
import BlocksArea from '../../components/adminSide/myadmin/blocksArea/BlocksArea';
import { backgroundImageAtom, themeAtom } from '../../atoms/Atom';
import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebaseConfig';
import { A } from './Admin.styles';
import { useFetchTheme } from '../../hooks/useTheme';

const Admin = () => {
  const [, setTheme] = useAtom(themeAtom); // 테마 상태
  const [, setBackgroundImage] = useAtom(backgroundImageAtom); // 배경 이미지
  const { uid } = useParams();
  const userUid = uid;

  useFetchTheme(db, userUid, setTheme, setBackgroundImage);

  return (
    <A.Container>
      <Theme />
      <MyProfile />
      <Links />
      <BlocksArea />
      <Blocks />
    </A.Container>
  );
};

export default Admin;
