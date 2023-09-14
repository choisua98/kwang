import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import { L } from './Layout.styles';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const hideHeaderPage = [
    '/admin/challenge',
    '/admin/mailing',
    '/admin/reservation',
    '/admin/faq',
    '/admin/bannerimage',
    '/admin/fanletter',
    '/admin/addlink',
  ];
  const hideHeader = hideHeaderPage.includes(location.pathname);
  const hideFooter = location.pathname === '/';
  return (
    <L.StyledAppContainer>
      {!hideHeader && <Header />}
      <Outlet />
      {!hideFooter && <Footer />}
    </L.StyledAppContainer>
  );
};

export default Layout;
