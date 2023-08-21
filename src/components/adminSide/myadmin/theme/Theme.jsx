import React, { useState } from 'react';
import { Button, Col, Modal, Row } from 'antd';

const Theme = () => {
  const [modal2Visible, setModal2Visible] = useState(false);

  return (
    <>
      <Row justify="center">
        <Button
          type="primary"
          onClick={() => setModal2Visible(true)}
          style={{ width: '100%' }}
        >
          테마 바꾸기
        </Button>
      </Row>
      <Modal
        title="테마 수정"
        centered
        visible={modal2Visible}
        onCancel={() => setModal2Visible(false)}
        footer={null}
        width={300}
      >
        <Row justify="center">
          <Col span={24}>
            <Row gutter={[10, 20]}>
              <Col span={12}>
                <button
                  style={{
                    width: '100%',
                    height: '100px',
                    border: '1px solid #000',
                    borderRadius: '5px',
                  }}
                >
                  테마 1
                </button>
              </Col>
              <Col span={12}>
                <button
                  style={{
                    width: '100%',
                    height: '100px',
                    border: '1px solid #000',
                    borderRadius: '5px',
                  }}
                >
                  테마 2
                </button>
              </Col>
            </Row>
            <Row gutter={[10, 40]}>
              <Col span={12}>
                <button
                  style={{
                    width: '100%',
                    height: '100px',
                    border: '1px solid #000',
                    borderRadius: '5px',
                  }}
                >
                  테마 3
                </button>
              </Col>
              <Col span={12}>
                <button
                  style={{
                    width: '100%',
                    height: '100px',
                    border: '1px solid #000',
                    borderRadius: '5px',
                  }}
                >
                  테마 4
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <button
              style={{
                width: '100%',
                border: '1px solid #000',
                borderRadius: '5px',
              }}
            >
              수정하기
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
              적용하기
            </button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Theme;
