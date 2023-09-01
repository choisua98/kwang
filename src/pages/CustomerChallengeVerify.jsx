import React from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

const CustomerChallengeVerify = () => {
  const location = useLocation();
  const selectedDate = location.state.selectedDate;

  return (
    <>
      <div>{moment(selectedDate).format('YYYY년 MM월 DD일')}</div>
    </>
  );
};

export default CustomerChallengeVerify;
