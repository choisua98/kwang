import React from 'react';
import ChallengeService from '../components/customerSide/challengeService/ChallengeService';
import ChallengeComment from '../components/customerSide/challengeService/ChallengeComment';

const CustomerChallenge = () => {
  return (
    <>
      <ChallengeService />;
      <ChallengeComment />;
    </>
  );
};

export default CustomerChallenge;
