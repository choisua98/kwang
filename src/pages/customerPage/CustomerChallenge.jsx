import React from 'react';
import ChallengeService from '../../components/customerSide/options/customerBlocks/challengeService/ChallengeService';
import { useTheme, useThemeReset } from '../../hooks/useTheme';

const CustomerChallenge = () => {
  const [theme, backgroundImage] = useThemeReset();
  useTheme(theme, backgroundImage);

  return (
    <>
      <ChallengeService />
    </>
  );
};

export default CustomerChallenge;
