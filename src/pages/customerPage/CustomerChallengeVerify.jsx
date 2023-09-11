import React from 'react';
import ChallengeComment from '../../components/customerSide/options/customerBlocks/challengeService/ChallengeComment';
import { useTheme, useThemeReset } from '../../hooks/useTheme';

const CustomerChallengeVerify = () => {
  const [theme, backgroundImage] = useThemeReset();
  useTheme(theme, backgroundImage);

  return (
    <>
      <ChallengeComment />
    </>
  );
};

export default CustomerChallengeVerify;
