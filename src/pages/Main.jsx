import React from 'react';
import Profile from '../components/customerSide/profile/Profile';
import LinkService from '../components/customerSide/linkService/LinkService';

const Main = () => {
  return (
    <div>
      <div style={{ padding: '20px' }}>
        <Profile />
        <LinkService />
      </div>
    </div>
  );
};

export default Main;
