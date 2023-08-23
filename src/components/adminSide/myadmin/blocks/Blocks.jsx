import React, { useState } from 'react';
import { Button, Col, Modal, Row } from 'antd';
import Challenge from '../../options/challenge/Challenge';
import Mailing from '../../options/mailing/Mailing';
import Reservation from '../../options/reservation/Reservation';
import Faq from '../../options/faq/Faq';
import BannerImage from '../../options/bannerImage/BannerImage';
import FanLetter from '../../options/fanLetter/FanLetter';

const Blocks = () => {
  const [modal2Visible, setModal2Visible] = useState(false);
  const [options, setOptions] = useState([]);

  const handleOptionButtonClick = (option) => {
    setOptions((prev) => [...prev, option]);
    setModal2Visible(false);
  };

  return (
    <>
      {options.map((option) => {
        if (option === 1) return <Challenge key={option} />;
        if (option === 2) return <Mailing key={option} />;
        if (option === 3) return <Reservation key={option} />;
        if (option === 4) return <Faq key={option} />;
        if (option === 5) return <BannerImage key={option} />;
        if (option === 6) return <FanLetter key={option} />;
        return false;
      })}
      <Row justify="center">
        <Button
          type="primary"
          onClick={() => setModal2Visible(true)}
          style={{ width: '100%' }}
        >
          메뉴추가하기
        </Button>
      </Row>
      <Modal
        title="메뉴 추가하기"
        centered
        visible={modal2Visible}
        onCancel={() => setModal2Visible(false)}
        footer={null}
        width={300}
      >
        <Row>
          <Col span={24}>
            <button
              style={{
                width: '100%',
                border: '1px solid #000',
                borderRadius: '5px',
              }}
              onClick={() => handleOptionButtonClick(1)}
            >
              함께해요 챌린지
            </button>
          </Col>
          <Col span={24}>
            <button
              style={{
                width: '100%',
                border: '1px solid #000',
                borderRadius: '5px',
              }}
              onClick={() => handleOptionButtonClick(2)}
            >
              메일링 서비스
            </button>
          </Col>
          <Col span={24}>
            <button
              style={{
                width: '100%',
                border: '1px solid #000',
                borderRadius: '5px',
              }}
              onClick={() => handleOptionButtonClick(3)}
            >
              예약 서비스
            </button>
          </Col>
          <Col span={24}>
            <button
              style={{
                width: '100%',
                border: '1px solid #000',
                borderRadius: '5px',
              }}
              onClick={() => handleOptionButtonClick(4)}
            >
              자주 묻는 질문
            </button>
          </Col>
          <Col span={24}>
            <button
              style={{
                width: '100%',
                border: '1px solid #000',
                borderRadius: '5px',
              }}
              onClick={() => handleOptionButtonClick(5)}
            >
              배너 이미지 추가
            </button>
          </Col>
          <Col span={24}>
            <button
              style={{
                width: '100%',
                border: '1px solid #000',
                borderRadius: '5px',
              }}
              onClick={() => handleOptionButtonClick(6)}
            >
              팬레터 보내기
            </button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Blocks;
