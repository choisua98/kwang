import React from 'react';
import Theme from '../components/adminSide/myadmin/theme/Theme';
import MyProfile from '../components/adminSide/myadmin/myprofile/MyProfile';
import Links from '../components/adminSide/myadmin/links/Links';
import Blocks from '../components/adminSide/myadmin/blocks/Blocks';

const Admin = () => {
  return (
    <>
      <Theme />
      <MyProfile />
      <Links />
      <Blocks />
      <button>저장하기</button>
    </>
  );
};

export default Admin;
