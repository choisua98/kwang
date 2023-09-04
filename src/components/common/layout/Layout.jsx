import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { L } from './Layout.styles';

const Layout = () => {
  return (
    <L.StyledAppContainer>
      <Header />
      <Outlet />
    </L.StyledAppContainer>
  );
};

export default Layout;
