import React, { useState } from 'react';
import { Button, Col, Modal, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

const Blocks = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Row justify="center">
        <Button
          type="primary"
          onClick={() => setModalVisible(true)}
          style={{ width: '100%' }}
        >
          메뉴추가하기
        </Button>
      </Row>
      <Modal
        title="메뉴 추가하기"
        centered
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
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
              onClick={() => navigate('/admin/challenge')}
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
              onClick={() => navigate('/admin/mailing')}
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
              onClick={() => navigate('/admin/reservation')}
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
              onClick={() => navigate('/admin/faq')}
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
              onClick={() => navigate('/admin/bannerimage')}
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
              onClick={() => navigate('/admin/fanletter')}
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
