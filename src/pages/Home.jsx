import React from 'react';
import MainBanner from '../components/Home/MainBanner';
import Service from '../components/Home/Service';
import BestCreator from '../components/Home/BestCreator';

const Home = () => {
  return (
    <div style={{ padding: '0 20px' }}>
      <MainBanner />
      <Service />
      <BestCreator />
    </div>
  );
};

export default Home;
