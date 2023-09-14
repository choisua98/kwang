import React, { useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import Loading from '../../assets/loading/loading.json';
import { useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';

const LoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userUid = location.state.userUid;

  // 3초 후에 어드민 페이지로 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/admin/${userUid}`);
      message.success('로그인 되었습니다.');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, userUid]);

  return (
    <>
      <Player autoplay loop src={Loading} style={{ width: '100%' }} />
    </>
  );
};

export default LoadingPage;
