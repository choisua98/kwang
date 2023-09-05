import React, { useEffect } from 'react';
import ChallengeService from '../../components/customerSide/options/customerBlocks/challengeService/ChallengeService';
import { useAtom } from 'jotai';
import { backgroundImageAtom, themeAtom } from '../../atoms/Atom';

const CustomerChallenge = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  // 배경 이미지
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);

  useEffect(() => {
    setTheme('light');
    setBackgroundImage(null);
  }, []);

  return (
    <>
      <ChallengeService />
    </>
  );
};

export default CustomerChallenge;
