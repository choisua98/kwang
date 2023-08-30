import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../../firebase/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { B } from './Blocks.styles';

const Blocks = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const userUid = auth.currentUser?.uid;
  const [disableBlocks, setDisableBlocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (userUid) {
        // 쿼리 실행하여 데이터 가져오기
        const q = query(
          collection(db, 'template'),
          where('userId', '==', userUid),
          // where('blockKind', '==', 'mailing'),
        );
        const querySnapshot = await getDocs(q);
        console.log('>>', querySnapshot);

        const initialDocuments = [];
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            blockKind: doc.data().blockKind,
          };
          initialDocuments.push(data);
        });
        setDisableBlocks(initialDocuments);
      }
    };

    fetchData();
  }, [userUid]);

  console.log('>>>', disableBlocks);

  const isBlockDisabled = (blockKind) => {
    return disableBlocks.some((block) => block.blockKind === blockKind);
  };

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
            <B.ActivButton
              onClick={() => navigate('/admin/challenge')}
              disabled={isBlockDisabled('challenge')}
            >
              함께해요 챌린지
            </B.ActivButton>
          </Col>
          <Col span={24}>
            <B.ActivButton
              onClick={() => navigate('/admin/mailing')}
              disabled={isBlockDisabled('mailing')}
            >
              메일링 서비스
            </B.ActivButton>
          </Col>
          <Col span={24}>
            <B.ActivButton
              onClick={() => navigate('/admin/reservation')}
              disabled={isBlockDisabled('reservation')}
            >
              예약 서비스
            </B.ActivButton>
          </Col>
          <Col span={24}>
            <B.ActivButton
              onClick={() => navigate('/admin/faq')}
              disabled={isBlockDisabled('faq')}
            >
              자주 묻는 질문
            </B.ActivButton>
          </Col>
          <Col span={24}>
            <B.ActivButton
              onClick={() => navigate('/admin/bannerimage')}
              disabled={isBlockDisabled('bannerimage')}
            >
              배너 이미지 추가
            </B.ActivButton>
          </Col>
          <Col span={24}>
            <B.ActivButton
              onClick={() => navigate('/admin/fanletter')}
              disabled={isBlockDisabled('fanletter')}
            >
              팬레터 보내기
            </B.ActivButton>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Blocks;
