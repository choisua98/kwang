import React from 'react';
import { U } from './UserHome.styles';
import MainBanner from './MainBanner';
import Service from './Service';
import BestCreator from './BestCreator';

const UserHome = () => {
  return (
    <div style={{ padding: '0 20px' }}>
      <MainBanner />
      <Service />
      <BestCreator />
    </div>
  );
};

export default UserHome;
