import React, { useEffect, useState } from 'react';
import { F } from './FanletterService.styles';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../../firebase/firebaseConfig';
import { Button, Col, Input, Modal, Row } from 'antd';
import { useAtom } from 'jotai';
import { modalVisibleAtom } from '../../../atoms/Atom';
const { TextArea } = Input;

const onChange = (e) => {
  console.log('Change:', e.target.value);
};

const FanletterService = () => {
  // 사용자 UID 가져오기
  const userUid = auth.currentUser?.uid;
  const [modalVisible, setModalVisible] = useAtom(modalVisibleAtom);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      if (userUid) {
        // Firestore의 template 컬렉션 userId가 현재 로그인한 사용자의 uid와 같은 문서들을 찾기
        const templatesCollection = collection(db, 'template');
        // 현재 사용자에 대한 문서만 가져오기
        const q = query(templatesCollection, where('userId', '==', userUid));
        // 쿼리 실행하고 결과값 받기
        const templateSnapshot = await getDocs(q);
        setTemplates(
          templateSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        );
      }
    };

    fetchTemplates();
  }, [userUid]);

  return (
    <>
      <Row justify="center">
        {templates.map((template) => {
          return (
            <div key={template.id}>
              <h1>{template.title}</h1>
              <h2>{template.description}</h2>
            </div>
          );
        })}
      </Row>
      <Row justify="center">
        <h3>
          TO. 크왕에게<span>11/100자</span>
        </h3>
        <TextArea
          showCount
          maxLength={100}
          style={{
            height: 120,
            marginBottom: 24,
          }}
          onChange={onChange}
          placeholder="can resize"
        />
      </Row>

      <Row justify="center">
        <Button
          type="primary"
          onClick={() => setModalVisible(true)}
          style={{ width: '100%' }}
        >
          발송하기
        </Button>
      </Row>

      <Modal
        title=""
        centered
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        closable={false}
        width={300}
      >
        <Row justify="center">
          <Col span={24}>
            <Row gutter={[5, 0]} style={{ margin: '10px 0' }}>
              <Col span={12}>팬레터 전송이 완료 되었습니다.</Col>
              <Button
                type="primary"
                onClick={() => setModalVisible(false)}
                style={{ width: '100%' }}
              >
                확인
              </Button>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default FanletterService;
