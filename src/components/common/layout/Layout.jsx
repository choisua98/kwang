import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { styled } from 'styled-components';

const Layout = () => {
  return (
    <StyledAppContainer>
      <Header />
      <Outlet />
    </StyledAppContainer>
  );
};

export default Layout;

const StyledAppContainer = styled.div`
  max-width: 390px;
  margin: 0 auto;
`;
