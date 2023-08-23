import React, { useState } from 'react';
import { Col, Input, Modal, Row } from 'antd';
import { ReactComponent as Link } from '../../../../assets/images/admin/link.svg';

const Links = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [urlText, setUrlText] = useState('');

  const handleUrlChange = (e) => {
    setUrlText(e.target.value);
  };

  return (
    <>
      <Row justify="center" align="middle" style={{ padding: '20px 0' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <p>링크와 원하는 메뉴를 추가해주세요</p>
          <div style={{ marginTop: '20px' }}>
            <button onClick={() => setModalVisible(true)}>
              <Link />
            </button>
            <button onClick={() => setModalVisible(true)}>
              <Link />
            </button>
            <button onClick={() => setModalVisible(true)}>
              <Link />
            </button>
          </div>
        </Col>
      </Row>
      <Modal
        title="링크 수정"
        centered
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={300}
      >
        <Row>
          <Col span={24}>
            <div>로고 이미지 / 아이콘 추가</div>
          </Col>
          <Col span={24}>
            <button
              style={{
                width: '100%',
                border: '1px solid #000',
                borderRadius: '5px',
              }}
            >
              추가하기
            </button>
          </Col>
          <Col span={24} style={{ marginTop: '10px' }}>
            <div style={{ marginBottom: '10px' }}>URL</div>
            <Input.TextArea
              placeholder="텍스트를 입력하세요"
              value={urlText} // 여기서는 같은 값을 사용하겠지만, 텍스트와 다른 값도 사용할 수 있습니다.
              onChange={handleUrlChange}
              autoSize={{ minRows: 3, maxRows: 6 }} // 여러 줄 입력창 크기 조절
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Links;
