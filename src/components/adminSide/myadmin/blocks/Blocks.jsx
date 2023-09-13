import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../../firebase/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { B } from './Blocks.styles';
import { userAtom } from '../../../../atoms/Atom';
import { useAtomValue } from 'jotai';

const Blocks = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [disableBlocks, setDisableBlocks] = useState([]);

  const user = useAtomValue(userAtom);
  const userUid = user?.uid;

  useEffect(() => {
    const fetchData = async () => {
      if (userUid) {
        // 쿼리 실행하여 데이터 가져오기
        const q = query(
          collection(db, 'template'),
          where('userId', '==', userUid),
        );
        const querySnapshot = await getDocs(q);
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

  const isBlockDisabled = (blockKind) => {
    return disableBlocks.some((block) => block.blockKind === blockKind);
  };

  return (
    <>
      <B.MenuFormButton>
        <button type="button" onClick={() => setModalVisible(true)}>
          메뉴(폼) 추가하기
        </button>
      </B.MenuFormButton>

      <B.CustomModal
        title={<>메뉴(폼) 추가하기</>}
        centered
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={350}
      >
        <>
          <B.ButtonsContainer>
            <button onClick={() => navigate('/admin/addlink')}>
              링크 추가하기 ✔️
            </button>
            <button
              onClick={() => navigate('/admin/challenge')}
              disabled={isBlockDisabled('challenge')}
            >
              함께해요 챌린지 🔥
            </button>
            <button
              onClick={() => navigate('/admin/mailing')}
              disabled={isBlockDisabled('mailing')}
            >
              메일링 서비스 📩
            </button>
            <button
              onClick={() => navigate('/admin/reservation')}
              disabled={isBlockDisabled('reservation')}
            >
              예약 서비스 🗓
            </button>
            <button
              onClick={() => navigate('/admin/faq')}
              disabled={isBlockDisabled('faq')}
            >
              자주 묻는 질문 😊
            </button>
            <button
              onClick={() => navigate('/admin/bannerimage')}
              disabled={isBlockDisabled('bannerimage')}
            >
              배너 이미지 추가
            </button>
            <button
              onClick={() => navigate('/admin/fanletter')}
              disabled={isBlockDisabled('fanletter')}
            >
              팬레터 보내기 💘
            </button>
          </B.ButtonsContainer>
        </>
      </B.CustomModal>
    </>
  );
};

export default Blocks;
