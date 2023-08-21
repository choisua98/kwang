import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';

const Header = () => {
  return (
    <header
      style={{
        padding: '15px 20px',
        height: 'initial',
        lineHeight: 'initial',
        backgroundColor: '#fff',
      }}
    >
      <Row align="middle">
        <Col span={23}>
          {/* 로고 영역 */}
          <Link to="/">
            <Logo />
          </Link>
        </Col>
        <Col span={1}>
          {/* 우측 영역 */}
          <div className="right-area">
            <Button icon={<MenuOutlined />} />
          </div>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
