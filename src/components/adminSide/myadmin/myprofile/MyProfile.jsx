import React, { useState } from 'react';
import { Row, Col, Button, Modal } from 'antd';
import { ReactComponent as Profile } from '../../../../assets/images/admin/profile.svg';

const MyProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Row justify="center" align="middle" style={{ padding: '20px 0' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Profile />
          <div style={{ margin: '20px 0 10px' }}>크왕이다.</div>
          <Button
            onClick={() => {
              setModalVisible(true);
            }}
          >
            내 정보 수정하기
          </Button>
        </Col>
      </Row>
      <Modal
        title="내 정보 수정"
        centered
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
        }}
        footer={null}
      >
        {/* 모달 내용 */}
      </Modal>
    </>
  );
};

export default MyProfile;
