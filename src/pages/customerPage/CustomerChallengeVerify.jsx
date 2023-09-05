import React, { useEffect } from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import ChallengeComment from '../../components/customerSide/options/customerBlocks/challengeService/ChallengeComment';
import { useAtom } from 'jotai';
import { backgroundImageAtom, themeAtom } from '../../atoms/Atom';

const CustomerChallengeVerify = () => {
  const location = useLocation();
  const selectedDate = location.state.selectedDate;

  const [theme, setTheme] = useAtom(themeAtom);
  // 배경 이미지
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);

  useEffect(() => {
    setTheme('light');
    setBackgroundImage(null);
  }, []);

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
