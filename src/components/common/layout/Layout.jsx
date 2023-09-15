import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import { L } from './Layout.styles';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  // const showHeaderPage = ['/', '/login', '/signup'];
  // const showHeader = showHeaderPage.includes(location.pathname);
  const hideFooter = location.pathname === '/';
  return (
    <L.StyledAppContainer>
      <Header />
      <Outlet />
      {!hideFooter && <Footer />}
    </L.StyledAppContainer>
  );
};

export default Layout;
