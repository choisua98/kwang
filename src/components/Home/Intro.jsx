import React from 'react';
import { useNavigate } from 'react-router-dom';
import { I } from './Home.styles';
import IntroBanner from '../../assets/images/customer/home/banner/intro/intro-banner.png';

const Intro = () => {
  const navigate = useNavigate();
  return (
    <I.Container>
      <img src={IntroBanner} alt="" />
      <I.Footer>
        <p>나만의 링크 만들기</p>
        <button onClick={() => navigate('/login')}>시작하기</button>
        <address>Copyright 2023. READERS CLUB. All rights reserved.</address>
      </I.Footer>
    </I.Container>
  );
};

export default Intro;
