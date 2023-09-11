import React from 'react';
import { H } from './kwangPage.styles';
import MainBanner from '../../components/Home/MainBanner';
import Intro from '../../components/Home/Intro';
import NewCreator from '../../components/Home/NewCreator';
import { useTheme, useThemeReset } from '../../hooks/useTheme';

const Home = () => {
  const [theme, backgroundImage] = useThemeReset();
  useTheme(theme, backgroundImage);

  return (
    <H.BodyWrapper>
      <MainBanner />
      <NewCreator />
      <Intro />
    </H.BodyWrapper>
  );
};

export default Home;
