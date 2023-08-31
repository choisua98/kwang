import React from 'react';
import { H } from './Home.styles';
import MainBanner from '../components/Home/MainBanner';
import Service from '../components/Home/Service';
import BestCreator from '../components/Home/BestCreator';

const Home = () => {
  return (
    <H.BodyWrapper>
      <MainBanner />
      <Service />
      <BestCreator />
    </H.BodyWrapper>
  );
};

export default Home;
