import React from 'react';
import Theme from '../components/adminSide/myadmin/theme/Theme';
import MyProfile from '../components/adminSide/myadmin/myprofile/MyProfile';
import Links from '../components/adminSide/myadmin/links/Links';
import Blocks from '../components/adminSide/myadmin/blocks/Blocks';
import FanLetter from '../components/adminSide/options/fanLetter/FanLetter';

const Admin = () => {
  return (
    <>
      <Theme />
      <MyProfile />
      <Links />
      <div>
        <FanLetter />
      </div>
      <Blocks />
    </>
  );
};

export default Admin;
