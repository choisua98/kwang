import React, { useState } from 'react';
import { Button, Col, Modal, Row } from 'antd';

const Blocks = () => {
  const [modal2Visible, setModal2Visible] = useState(false);
  return (
    <>
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
