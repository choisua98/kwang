import React from 'react';
import Theme from '../components/adminSide/myadmin/theme/Theme';
import MyProfile from '../components/adminSide/myadmin/myprofile/MyProfile';
import Links from '../components/adminSide/myadmin/links/Links';
import Blocks from '../components/adminSide/myadmin/blocks/Blocks';
import BlocksArea from '../components/adminSide/myadmin/blocksArea/BlocksArea';

const Admin = () => {
  return (
    <>
      <Theme />
      <MyProfile />
      <Links />
      <BlocksArea />
      <Blocks />
    </>
  );
};

export default Admin;
