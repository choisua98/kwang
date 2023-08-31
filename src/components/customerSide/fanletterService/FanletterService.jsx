import React, { useEffect, useState } from 'react';
import { F } from './FanletterService.styles';
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../../firebase/firebaseConfig';
import { Button, Col, Input, Modal, Row } from 'antd';
import { useAtom } from 'jotai';
import { modalVisibleAtom } from '../../../atoms/Atom';
const { TextArea } = Input;

const FanletterService = () => {
  const userUid = auth.currentUser?.uid; // 사용자 UID 가져오기
  const [modalVisible, setModalVisible] = useAtom(modalVisibleAtom); // 모달
  const [templates, setTemplates] = useState([]); // 템플릿 데이터 저장
  const [description, setDescription] = useState(''); // TextArea 값을 저장

  useEffect(() => {
    const fetchTemplates = async () => {
      if (userUid) {
        // Firestore의 template 컬렉션 userId가 현재 로그인한 사용자의 uid와 같은 문서들을 찾기
        const templatesCollection = collection(db, 'template');
        // 현재 사용자에 대한 문서만 가져오기
        const q = query(
          templatesCollection,
          where('userId', '==', userUid),
          where('blockKind', '==', 'fanletter'),
        );
        // 쿼리 실행하고 결과값 받기
        const templateSnapshot = await getDocs(q);
        setTemplates(
          templateSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        );
      }
    };

    fetchTemplates();
  }, [userUid]);

  // 파이어스토어에 데이터 전송
  const submitButtonClick = async () => {
    try {
      await addDoc(collection(db, 'userTemplate'), {
        dataKind: 'fanletterData',
        description,
        createdAt: serverTimestamp(),
        userId: userUid,
      });
      setModalVisible(true);
    } catch (error) {
      console.error('팬레터 데이터 추가 오류: ', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row justify="left">
        {templates.map((template) => {
          return (
            <div key={template.id} style={{ margin: '10px auto 0' }}>
              <h1>{template.title}</h1>
              <h2 style={{ margin: '10px 0', lineHeight: '16px' }}>
                {template.description}
              </h2>
            </div>
          );
        })}
      </Row>
      <Row justify="left">
        <h3 style={{ display: 'flex', width: '100%' }}>
          TO. 크왕에게
          <span style={{ marginLeft: 'auto' }}>{description.length}/100자</span>
        </h3>
        <TextArea
          id="description"
          name="description"
          value={description}
          showCount
          maxLength={100}
          style={{
            margin: '10px auto 0',
            height: 120,
            marginBottom: 24,
          }}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명을 작성해 주세요"
        />
      </Row>
      <Row justify="center">
        <Button
          type="primary"
          onClick={() => {
            submitButtonClick();
            setModalVisible(true);
          }}
          style={{ margin: '20px auto 0', width: '100%' }}
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
    </div>
  );
};

export default FanletterService;
