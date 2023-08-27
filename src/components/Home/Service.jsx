import React from 'react';
import { S } from './Service.style';
import ServiceBanner from '../../assets/images/customer/home/banner/service/service-banner-1.svg';

const Service = () => {
  return (
    <div style={{ margin: '39px auto 0' }}>
      <h1 style={{ fontSize: '16px' }}>크왕 서비스</h1>
      <ul style={{ margin: '15px auto', display: 'flex' }}>
        <li>
          <img src={ServiceBanner} alt="Service Banner" />
        </li>
        <li style={{ margin: '14px  14px 0' }}>
          <p>크왕의 서비스 어떻게 표현할건지?</p>
          <p style={{ margin: '10px 0 0' }}>생각해봐야됨</p>
        </li>
      </ul>
      <ul
        style={{
          padding: '10px 0',
          display: 'flex',
          borderTop: '1px solid #D9D9D9',
        }}
      >
        <li>
          <img src={ServiceBanner} alt="Service Banner" />
        </li>
        <li style={{ margin: '14px  14px 0' }}>
          <p>크왕의 서비스 어떻게 표현할건지?</p>
          <p style={{ margin: '10px 0 0' }}>생각해봐야됨</p>
        </li>
      </ul>
      <ul
        style={{
          padding: '10px 0',
          display: 'flex',
          borderTop: '1px solid #D9D9D9',
        }}
      >
        <li>
          <img src={ServiceBanner} alt="Service Banner" />
        </li>
        <li style={{ margin: '14px  14px 0' }}>
          <p>크왕의 서비스 어떻게 표현할건지?</p>
          <p style={{ margin: '10px 0 0' }}>생각해봐야됨</p>
        </li>
      </ul>
    </div>
  );
};

export default Service;
