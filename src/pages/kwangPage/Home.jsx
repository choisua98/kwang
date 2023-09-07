import React, { useEffect, useState } from 'react';
import { H } from './kwangPage.styles';
import MainBanner from '../../components/Home/MainBanner';
import Intro from '../../components/Home/Intro';
import NewCreator from '../../components/Home/NewCreator';
import { backgroundImageAtom, themeAtom } from '../../atoms/Atom';
import { useAtom } from 'jotai';

const Home = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  // 배경 이미지
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);

  useEffect(() => {
    setTheme('light');
    setBackgroundImage(null);
  }, []);

  return (
    <H.BodyWrapper>
      <MainBanner />
      <NewCreator />
      <Intro />
    </H.BodyWrapper>
  );
};

export default Home;
