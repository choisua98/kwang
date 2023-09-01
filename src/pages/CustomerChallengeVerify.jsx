import React from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import ChallengeComment from '../components/customerSide/challengeService/ChallengeComment';

const CustomerChallengeVerify = () => {
  const location = useLocation();
  const selectedDate = location.state.selectedDate;

  return (
    <>
      <div>{moment(selectedDate).format('YYYY년 MM월 DD일')}</div>
      <ChallengeComment />
    </>
  );
};

export default CustomerChallengeVerify;
