import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/logo.webp';
import WhiteLogo from '../../../assets/images/logo-white.webp';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { themeAtom } from '../../../atoms/Atom';

const Footer = () => {
  const [theme] = useAtom(themeAtom);

  return (
    <FooterStyle>
      <Link to="/">
        <img src={theme === 'dark' ? WhiteLogo : Logo} alt="크왕" />
      </Link>
    </FooterStyle>
  );
};

export default Footer;

const FooterStyle = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 0 5% 0;

  img {
    height: 17px;
  }
`;
