import React from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import ChallengeComment from '../components/customerSide/challengeService/ChallengeComment';

const CustomerChallengeVerify = () => {
  const location = useLocation();
  const selectedDate = location.state.selectedDate;

  return (
    <>
      <div>
        {moment(selectedDate, 'ddd MMM DD YYYY HH:mm:ss ZZ').format(
          'YYYY년 MM월 DD일',
        )}
      </div>
      {/* 선택된 날짜 props로 전달 */}
      <ChallengeComment selectedDate={selectedDate} />
    </>
  );
};

export default CustomerChallengeVerify;
