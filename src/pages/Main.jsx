import React, { useEffect, useState } from 'react';
import Profile from '../components/customerSide/profile/Profile';
import LinkService from '../components/customerSide/linkService/LinkService';
import { useParams } from 'react-router-dom';

const Main = () => {
  const { uid } = useParams();
  const userUid = uid;

  console.log(userUid);
  return (
    <div>
      <div style={{ padding: '20px' }}>
        <Profile />
        <LinkService />
      </div>
    </div>
  );
};

export default Main;
