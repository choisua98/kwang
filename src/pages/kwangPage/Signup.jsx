import React from 'react';
import { S } from './kwangPage.styles';
import EmailSignup from '../../components/adminSide/auth/signup/EmailSignup';

const Signup = () => {
  return (
    <S.Signup>
      <EmailSignup />
    </S.Signup>
  );
};

export default Signup;
