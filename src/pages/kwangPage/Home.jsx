import React from 'react';
import { H } from './kwangPage.styles';
import MainBanner from '../../components/Home/MainBanner';
import Intro from '../../components/Home/Intro';
import NewCreator from '../../components/Home/NewCreator';

const Home = () => {
  return (
    <H.BodyWrapper>
      <MainBanner />
      <Intro />
      <NewCreator />
    </H.BodyWrapper>
  );
};

export default Home;
