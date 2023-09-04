import React from 'react';
import { H } from './kwangPage.styles';
import MainBanner from '../../components/Home/MainBanner';
import Service from '../../components/Home/Service';
import BestCreator from '../../components/Home/BestCreator';
import Intro from '../../components/Home/Intro';
import Intro2 from '../../components/Home/Intro2';
import Intro3 from '../../components/Home/Intro3';
import Intro4 from '../../components/Home/Intro4';

const Home = () => {
  return (
    <H.BodyWrapper>
      <MainBanner />
      <Intro />
      <Intro2 />
      <Intro3 />
      <Intro4 />
      <BestCreator />
    </H.BodyWrapper>
  );
};

export default Home;
