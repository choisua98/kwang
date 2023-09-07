import React, { useEffect } from 'react';
import ChallengeComment from '../../components/customerSide/options/customerBlocks/challengeService/ChallengeComment';
import { useAtom } from 'jotai';
import { backgroundImageAtom, themeAtom } from '../../atoms/Atom';

const CustomerChallengeVerify = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  // 배경 이미지
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);

  useEffect(() => {
    setTheme('light');
    setBackgroundImage(null);
  }, []);

  return (
    <>
      <ChallengeComment />
    </>
  );
};

export default CustomerChallengeVerify;
